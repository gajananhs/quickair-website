import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/inter'
import '@fontsource-variable/sora'
import '@/styles/index.css'
import { prefersReducedMotion } from '@/lib/motion'
import App from '@/App'

// Enables the CSS pre-hide for [data-reveal] only when animations will run.
if (!prefersReducedMotion()) document.documentElement.classList.add('motion-ok')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
