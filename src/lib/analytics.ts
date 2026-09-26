import { siteConfig } from '@/config/site'

type Gtag = (...args: unknown[]) => void
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

let measurementId = ''
let initialized = false
let started = false
const viewedSections = new Set<string>()

function track(event: string, params: Record<string, string>) {
  if (!started) return
  window.gtag?.('event', event, params)
}

function locationOf(element: Element) {
  if (element.closest('.floating-contact')) return 'floating'
  if (element.closest('[data-analytics-location="mobile_menu"]')) return 'mobile_menu'
  if (element.closest('header')) return 'header'
  if (element.closest('footer')) return 'footer'
  const section = element.closest('section[id]')?.id
  return [
    'home',
    'about',
    'portfolio',
    'reviews',
    'services',
    'experience',
    'questions',
    'contact',
    'legal-contact',
  ].includes(section ?? '')
    ? section!
    : 'other'
}

function handleClick(event: MouseEvent) {
  const target = event.target instanceof Element ? event.target : null
  const link = target?.closest<HTMLAnchorElement>('a[href]')
  if (link) {
    const url = new URL(link.href)
    if (url.hostname === 'wa.me') {
      track('whatsapp_click', {
        button_location: locationOf(link),
        ...(link.dataset.analyticsService ? { service_id: link.dataset.analyticsService } : {}),
      })
    } else if (url.protocol === 'tel:') {
      track('phone_click', { button_location: locationOf(link) })
    }
  }
  const image = target?.closest<HTMLButtonElement>('[data-analytics-image]')
  if (image?.dataset.analyticsImage)
    track('gallery_open', { image_id: image.dataset.analyticsImage })
}

function startMeasurement() {
  if (started) return
  started = true
  const analyticsWindow = window
  analyticsWindow[`ga-disable-${measurementId}`] = false
  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? []
  // gtag expects the Arguments object, as in Google's installation snippet.
  analyticsWindow.gtag = function () {
    // eslint-disable-next-line prefer-rest-params -- Google's command queue uses Arguments objects.
    analyticsWindow.dataLayer!.push(arguments)
  }
  const gtag = analyticsWindow.gtag
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  gtag('js', new Date())
  const pageUrl = new URL(window.location.href)
  const campaign: Record<string, string> = {}
  for (const field of ['source', 'medium', 'name', 'content', 'term', 'id']) {
    const value = pageUrl.searchParams.get(field === 'name' ? 'utm_campaign' : `utm_${field}`)
    if (value) campaign[`campaign_${field}`] = value.slice(0, 100)
  }
  let referrer = ''
  try {
    const url = new URL(document.referrer)
    referrer = url.origin + url.pathname
  } catch {
    /* Direct visit, without a referrer. */
  }
  gtag('config', measurementId, {
    send_page_view: false,
    page_location: pageUrl.origin + pageUrl.pathname,
    page_referrer: referrer,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ...campaign,
  })
  gtag('event', 'page_view', { page_title: document.title })
  const script = document.createElement('script')
  script.id = 'google-analytics-tag'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)
  document.addEventListener('click', handleClick, true)
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || viewedSections.has(entry.target.id)) continue
        viewedSections.add(entry.target.id)
        track('section_view', { section_id: entry.target.id })
        observer?.unobserve(entry.target)
      }
    },
    { threshold: 0.5 },
  )
  // Observe headings so even a tall section has a reachable visibility threshold.
  for (const id of ['reviews-title', 'contact-title']) {
    const heading = document.getElementById(id)
    if (heading) observer.observe(heading)
  }
}

export function initializeAnalytics() {
  if (initialized) return
  initialized = true
  measurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? siteConfig.gaMeasurementId).trim()
  const allowedHosts = (
    import.meta.env.VITE_GA_ALLOWED_HOSTS ?? 'www.nofarkapury.co.il,nofarkapury.co.il'
  )
    .split(',')
    .map((host: string) => host.trim())
  if (
    !import.meta.env.PROD ||
    !/^G-[A-Z0-9]+$/.test(measurementId) ||
    !allowedHosts.includes(window.location.hostname)
  )
    return
  startMeasurement()
}
