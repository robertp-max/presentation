import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { EmbeddedCardTemplate } from './templates/EmbeddedCardTemplate'

const params = new URLSearchParams(window.location.search)

const title = params.get('title') ?? 'Google Cloud MVP Architecture'
const subtitle = params.get('subtitle') ?? 'HIPAA-ready, provider-first, launch-oriented'
const body =
  params.get('body') ??
  'This embedded card can be reused in Moodle, LMS pages, and partner portals as a high-confidence entry point into the full architecture experience.'
const ctaLabel = params.get('ctaLabel') ?? 'Open Experience'
const ctaHref = params.get('ctaHref') ?? 'http://127.0.0.1:4180/'
const badgeText = params.get('badge') ?? 'FindAHomeCare'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EmbeddedCardTemplate
      title={title}
      subtitle={subtitle}
      body={body}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
      badgeText={badgeText}
    />
  </StrictMode>,
)
