import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from '@/app/App'
import { AppProviders } from '@/app/providers'
import '@/styles/globals.css'

const app = (
  <StrictMode>
    <AppProviders>
      <App pathname={window.location.pathname} />
    </AppProviders>
  </StrictMode>
)

const root = document.getElementById('root')!
if (root.dataset.prerendered === 'true') {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
