import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import SmoothScrollProvider from '@/providers/SmoothScrollProvider'
import { company } from '@/data/company'
import Navbar from './Navbar'
import Footer from './Footer'
import VoiceAssistant from '@/components/assistant/VoiceAssistant'

/** App shell shared by every route: smooth scroll, navbar, page transition, footer, talk-to-assistant button, WhatsApp button. */
export default function Layout() {
  const { pathname } = useLocation()

  return (
    <SmoothScrollProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-electric-500 focus:px-5 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      {/* Keyed by path so each navigation replays the fade-in */}
      <main id="main" key={pathname} className="page-enter min-h-dvh">
        <Suspense fallback={<div className="min-h-dvh bg-navy-900" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <VoiceAssistant />
      <a
        href={company.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Quickair on WhatsApp"
        className="fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-[#1fa855] text-white shadow-[0_10px_30px_-8px_rgb(31_168_85/0.7)] transition-transform duration-300 ease-out-expo hover:scale-110"
      >
        <MessageCircle className="size-6" aria-hidden="true" />
      </a>
    </SmoothScrollProvider>
  )
}
