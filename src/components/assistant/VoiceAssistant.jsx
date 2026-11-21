import { useCallback, useEffect, useRef, useState } from 'react'
import { Mic, RotateCcw, Send, Square, Volume2, VolumeX, X } from 'lucide-react'
import { company } from '@/data/company'
import { cn } from '@/lib/cn'

const ENDPOINT = '/api/assistant.php'

const GREETING =
  'Hello, this is the Quickair AI assistant. Are you looking for compressed air piping for your factory or workshop? ' +
  'You can speak in any language you are comfortable with, Hindi, English, Kannada, Tamil, Telugu or others.'

/** Languages the visitor can speak in. `code` is what the browser's speech engine expects. */
const LANGUAGES = [
  { code: 'en-IN', label: 'English' },
  { code: 'hi-IN', label: 'हिन्दी' },
  { code: 'kn-IN', label: 'ಕನ್ನಡ' },
  { code: 'ta-IN', label: 'தமிழ்' },
  { code: 'te-IN', label: 'తెలుగు' },
  { code: 'ml-IN', label: 'മലയാളം' },
  { code: 'mr-IN', label: 'मराठी' },
  { code: 'bn-IN', label: 'বাংলা' },
  { code: 'gu-IN', label: 'ગુજરાતી' },
  { code: 'pa-IN', label: 'ਪੰਜਾਬੀ' },
  { code: 'or-IN', label: 'ଓଡ଼ିଆ' },
]

/** Unicode block of each script, to pick the voice that can read a reply aloud. */
const SCRIPTS = [
  [0x0900, 0x097f, 'hi-IN'],
  [0x0980, 0x09ff, 'bn-IN'],
  [0x0a00, 0x0a7f, 'pa-IN'],
  [0x0a80, 0x0aff, 'gu-IN'],
  [0x0b00, 0x0b7f, 'or-IN'],
  [0x0b80, 0x0bff, 'ta-IN'],
  [0x0c00, 0x0c7f, 'te-IN'],
  [0x0c80, 0x0cff, 'kn-IN'],
  [0x0d00, 0x0d7f, 'ml-IN'],
]

function languageOf(text, chosen) {
  for (const char of text) {
    const point = char.codePointAt(0)
    const script = SCRIPTS.find(([from, to]) => point >= from && point <= to)
    // Hindi and Marathi share a script: trust the visitor's choice between them.
    if (script) return script[2] === 'hi-IN' && chosen === 'mr-IN' ? 'mr-IN' : script[2]
  }
  return 'en-IN'
}

const Recognition = typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null
const synth = typeof window !== 'undefined' ? window.speechSynthesis : null

const STATUS_TEXT = {
  idle: 'Tap the microphone and speak, or type below.',
  listening: 'Listening…',
  thinking: 'Thinking…',
  speaking: 'Speaking…',
}

/**
 * "Talk to Quickair Assistant": a floating button that opens a voice conversation
 * with the AI assistant. The browser does the listening and the speaking; the
 * replies come from /api/assistant.php, which also mails the lead to the sales team.
 */
export default function VoiceAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState('idle')
  const [lang, setLang] = useState('en-IN')
  const [draft, setDraft] = useState('')
  const [hearing, setHearing] = useState('')
  const [ended, setEnded] = useState(false)
  const [muted, setMuted] = useState(false)
  const [notice, setNotice] = useState('')

  // Speech callbacks fire long after render, so they read the latest values from refs.
  const live = useRef({ messages, lang, muted, ended, open })
  live.current = { messages, lang, muted, ended, open }
  const recognition = useRef(null)
  const reported = useRef(false)
  const logEnd = useRef(null)
  const micButton = useRef(null)

  const stopAudio = useCallback(() => {
    recognition.current?.abort()
    recognition.current = null
    synth?.cancel()
  }, [])

  const speak = useCallback((text, then = () => {}) => {
    if (!live.current.open) return
    if (!synth || live.current.muted) return then()
    const target = languageOf(text, live.current.lang)
    const voice = synth.getVoices().find((v) => v.lang.replace('_', '-').toLowerCase().startsWith(target.slice(0, 2)))
    if (!voice && target !== 'en-IN') {
      setNotice('This device has no voice for this language, so replies are shown as text.')
      return then()
    }
    let done = false
    const finish = () => {
      if (done) return
      done = true
      clearTimeout(timer)
      if (live.current.open) then()
    }
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = target
    if (voice) utterance.voice = voice
    utterance.onend = finish
    utterance.onerror = finish
    // Some browsers never report the end of a long sentence.
    const timer = setTimeout(finish, 6000 + text.length * 110)
    setStatus('speaking')
    synth.cancel()
    synth.speak(utterance)
  }, [])

  const send = useCallback(
    async (text) => {
      const said = text.trim().slice(0, 600)
      if (!said || live.current.ended) return
      const history = [...live.current.messages, { role: 'user', content: said }]
      setMessages(history)
      reported.current = false
      setHearing('')
      setDraft('')
      setNotice('')
      setStatus('thinking')
      try {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'chat', messages: history }),
        })
        const data = await response.json()
        if (!response.ok || !data.reply) throw new Error(data.error || 'failed')
        setMessages([...history, { role: 'assistant', content: data.reply }])
        if (data.end) {
          setEnded(true)
          reported.current = Boolean(data.reported)
        }
        speak(data.reply, () => (data.end ? setStatus('idle') : listenRef.current()))
      } catch {
        setMessages(history.slice(0, -1))
        setDraft(said)
        setStatus('idle')
        setNotice(`Sorry, the assistant is not available right now. Please try again, or call ${company.phoneDisplay}.`)
      }
    },
    [speak],
  )

  const listen = useCallback(() => {
    if (!Recognition || live.current.ended || !live.current.open) return setStatus('idle')
    synth?.cancel()
    recognition.current?.abort()
    const rec = new Recognition()
    recognition.current = rec
    rec.lang = live.current.lang
    rec.interimResults = true
    let finalText = ''
    rec.onresult = (event) => {
      let interim = ''
      for (const result of event.results) {
        if (result.isFinal) finalText += result[0].transcript
        else interim += result[0].transcript
      }
      setHearing(finalText + interim)
    }
    rec.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setNotice('The microphone is blocked. Allow it in your browser, or type your message below.')
      }
    }
    rec.onend = () => {
      if (recognition.current !== rec) return
      recognition.current = null
      if (finalText.trim()) send(finalText)
      else setStatus('idle')
    }
    try {
      rec.start()
      setStatus('listening')
    } catch {
      setStatus('idle')
    }
  }, [send])
  const listenRef = useRef(listen)
  listenRef.current = listen

  /** Mail the conversation to the sales team if the visitor leaves before the assistant closes it. */
  const reportIfAbandoned = useCallback(() => {
    const history = live.current.messages
    if (reported.current || !history.some((m) => m.role === 'user')) return
    reported.current = true
    const body = JSON.stringify({ action: 'report', messages: history })
    if (!navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: 'application/json' }))) {
      fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {})
    }
  }, [])

  const start = useCallback(() => {
    reported.current = false
    setEnded(false)
    setNotice('')
    setDraft('')
    setHearing('')
    setMessages([{ role: 'assistant', content: GREETING }])
    live.current = { ...live.current, ended: false, open: true }
    speak(GREETING, () => listenRef.current())
  }, [speak])

  const openPanel = () => {
    setOpen(true)
    if (live.current.messages.length === 0 || live.current.ended) start()
  }

  const closePanel = useCallback(() => {
    stopAudio()
    reportIfAbandoned()
    setOpen(false)
    setStatus('idle')
    setHearing('')
  }, [stopAudio, reportIfAbandoned])

  const restart = () => {
    stopAudio()
    reportIfAbandoned()
    start()
  }

  const onMic = () => {
    if (status === 'listening') recognition.current?.stop()
    else if (status === 'speaking') {
      synth?.cancel()
      listen()
    } else if (status === 'idle') listen()
  }

  useEffect(() => {
    if (!open) return
    micButton.current?.focus()
    const onKey = (event) => event.key === 'Escape' && closePanel()
    window.addEventListener('keydown', onKey)
    window.addEventListener('pagehide', reportIfAbandoned)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pagehide', reportIfAbandoned)
    }
  }, [open, closePanel, reportIfAbandoned])

  useEffect(() => {
    logEnd.current?.scrollIntoView({ block: 'end' })
  }, [messages, hearing, status])

  useEffect(() => stopAudio, [stopAudio])

  if (!open) {
    return (
      <button
        type="button"
        onClick={openPanel}
        className="fixed right-5 bottom-24 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-electric-500 pr-5 pl-4 font-display text-sm font-semibold text-white shadow-glow transition-[background-color,transform] duration-300 ease-out-expo hover:scale-105 hover:bg-electric-400"
      >
        <Mic className="size-5" aria-hidden="true" />
        <span>
          Talk<span className="max-sm:sr-only"> to Quickair Assistant</span>
        </span>
      </button>
    )
  }

  const busy = status === 'thinking'
  return (
    <section
      role="dialog"
      aria-label="Quickair Assistant"
      data-lenis-prevent
      className="theme-dark fixed right-3 bottom-3 z-50 flex max-h-[min(38rem,calc(100dvh-1.5rem))] w-[min(23rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border border-(--line) shadow-[0_24px_70px_-20px_rgb(0_0_0/0.8)]"
    >
      <header className="flex items-center gap-3 border-b border-(--line) px-5 py-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-electric-500 text-white">
          <Mic className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-base font-semibold">Quickair Assistant</h2>
          <p className="text-xs text-(--fg-muted)">AI voice assistant</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (!muted) synth?.cancel()
            setMuted(!muted)
          }}
          aria-label={muted ? 'Turn the voice on' : 'Turn the voice off'}
          aria-pressed={muted}
          className="grid size-9 place-items-center rounded-full text-(--fg-muted) transition-colors hover:text-(--fg)"
        >
          {muted ? <VolumeX className="size-5" aria-hidden="true" /> : <Volume2 className="size-5" aria-hidden="true" />}
        </button>
        <button type="button" onClick={closePanel} aria-label="Close the assistant" className="grid size-9 place-items-center rounded-full text-(--fg-muted) transition-colors hover:text-(--fg)">
          <X className="size-5" aria-hidden="true" />
        </button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4" aria-live="polite">
        {messages.map((message, index) => (
          <p
            key={index}
            className={cn(
              'max-w-[88%] rounded-2xl px-4 py-2.5 text-[0.9375rem] leading-relaxed',
              message.role === 'user' ? 'ml-auto bg-electric-500 text-white' : 'bg-(--surface-raised) text-(--fg)',
            )}
          >
            {message.content}
          </p>
        ))}
        {hearing && <p className="ml-auto max-w-[88%] rounded-2xl border border-dashed border-(--line) px-4 py-2.5 text-[0.9375rem] text-(--fg-muted)">{hearing}</p>}
        <div ref={logEnd} />
      </div>

      <div className="border-t border-(--line) px-5 pt-3 pb-4">
        {notice && <p role="alert" className="mb-3 text-sm text-cyan-300">{notice}</p>}
        {ended ? (
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-(--fg-muted)">Thank you. The conversation has ended.</p>
            <button type="button" onClick={restart} className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-(--line) px-4 text-sm font-semibold transition-colors hover:border-(--accent) hover:text-(--accent)">
              <RotateCcw className="size-4" aria-hidden="true" />
              Start again
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              {Recognition && (
                <button
                  ref={micButton}
                  type="button"
                  onClick={onMic}
                  disabled={busy}
                  aria-label={status === 'listening' ? 'Stop listening' : 'Speak'}
                  className={cn(
                    'grid size-14 shrink-0 place-items-center rounded-full text-white transition-[background-color,transform] duration-300 ease-out-expo disabled:opacity-50',
                    status === 'listening' ? 'animate-pulse bg-cyan-500 motion-off:animate-none' : 'bg-electric-500 hover:bg-electric-400',
                  )}
                >
                  {status === 'listening' ? <Square className="size-5" aria-hidden="true" /> : <Mic className="size-6" aria-hidden="true" />}
                </button>
              )}
              <div className="min-w-0 flex-1">
                <p role="status" className="text-sm text-(--fg)">
                  {Recognition || status !== 'idle' ? STATUS_TEXT[status] : 'This browser cannot listen. Please type below.'}
                </p>
                <label className="mt-1 flex items-center gap-2 text-xs text-(--fg-muted)">
                  I speak
                  <select
                    value={lang}
                    onChange={(event) => setLang(event.target.value)}
                    className="rounded-md border border-(--line) bg-(--surface) px-1.5 py-1 text-xs text-(--fg) focus:border-(--accent) focus:outline-none"
                  >
                    {LANGUAGES.map(({ code, label }) => (
                      <option key={code} value={code}>{label}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault()
                stopAudio()
                send(draft)
              }}
            >
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={600}
                disabled={busy}
                aria-label="Type your message"
                placeholder="Or type here"
                className="h-11 min-w-0 flex-1 rounded-full border border-(--line) bg-(--surface) px-4 text-sm text-(--fg) placeholder:text-(--fg-muted) focus:border-(--accent) focus:outline-none"
              />
              <button type="submit" disabled={busy || !draft.trim()} aria-label="Send" className="grid size-11 shrink-0 place-items-center rounded-full bg-electric-500 text-white transition-colors hover:bg-electric-400 disabled:opacity-40">
                <Send className="size-4" aria-hidden="true" />
              </button>
            </form>
          </>
        )}
        <p className="mt-3 text-[0.6875rem] leading-snug text-(--fg-muted)">You are talking to an AI. This conversation is shared with the Quickair sales team so they can call you back.</p>
      </div>
    </section>
  )
}
