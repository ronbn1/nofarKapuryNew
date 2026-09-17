import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './app/App'
import { AppProviders } from './app/providers'

export { createSeoArtifacts, resolveSiteUrl } from './lib/seo'
export { seoConfig } from './config/seo'
export { legalDocuments } from './content/legal'

export function renderPage(pathname = '/') {
  return renderToString(
    <StrictMode>
      <AppProviders>
        <App pathname={pathname} />
      </AppProviders>
    </StrictMode>,
  )
}
