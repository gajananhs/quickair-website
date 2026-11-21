# Talk to Quickair Assistant

A floating button on every page. The visitor clicks it and talks to an AI
assistant in their own language; the assistant asks what compressed air piping
they need and takes a name, phone number and callback time. The conversation is
then mailed to the sales team as a lead report.

## How it works

| Part | Where | What it does |
| --- | --- | --- |
| Button and panel | `src/components/assistant/VoiceAssistant.jsx` | Listens and speaks with the browser's own speech engine (Web Speech API); has a text box as fallback |
| Endpoint | `public/api/assistant.php` | Sends the conversation to the Claude API and returns the reply; mails the report when a conversation ends or is abandoned |
| Prompt | `public/api/private/prompt.php` | What the assistant may say. Adapted from the phone script in `quickair-call-script.md` |
| Settings | `public/api/private/settings.php` | Model, report recipients, sender address, usage limits |
| API key | `public/api/private/config.php` | Written by the deploy workflow from the `ANTHROPIC_API_KEY` secret. Never committed |

`public/api/private/` is closed to browsers by its `.htaccess`.

## Things to know

- **Languages.** The visitor picks the language they speak ("I speak"), because browsers cannot detect a spoken language. The assistant answers in whatever language the visitor uses.
- **Voices depend on the device.** Listening works in Chrome, Edge and Safari; Firefox visitors type. A reply is read aloud only if the device has a voice for that language (most Android phones do; a desktop may only have English and Hindi). Otherwise it is shown as text.
- **Reports.** One mail per conversation in which the visitor said something, whatever the outcome. The subject line carries the outcome and the name.
- **Limits.** `settings.php` caps messages per conversation, per visitor address per hour and per day, so a stranger cannot run up the API bill.
- **Local run.** `vite dev` has no PHP. To try the whole thing: `composer install` in `public/api/private`, `npm run build`, add `dist/api/private/config.php` returning `['anthropic_api_key' => '...']`, and serve `dist/` with PHP.
