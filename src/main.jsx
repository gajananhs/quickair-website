import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/inter'
import '@fontsource-variable/sora'
import '@/styles/index.css'
import { prefersReducedMotion } from '@/lib/motion'
import App from '@/App'

// Enables the CSS pre-hide for [data-reveal] only when animations will run
// (index.html sets the same class before the first paint; this keeps the two in step).
if (!prefersReducedMotion()) document.documentElement.classList.add('motion-ok')

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Production pages arrive prerendered (scripts/prerender.mjs): attach to that HTML.
// The dev server sends an empty root, so render from scratch there.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
