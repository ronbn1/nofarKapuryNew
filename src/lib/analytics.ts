import { siteConfig } from '@/config/site'

type Consent = 'granted' | 'denied' | null
type AnalyticsSnapshot = { enabled: boolean; consent: Consent; settingsOpen: boolean }
type Gtag = (...args: unknown[]) => void
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

const storageKey = 'nofar-analytics-consent-v1'
const consentLifetime = 180 * 24 * 60 * 60 * 1000
const serverSnapshot: AnalyticsSnapshot = { enabled: false, consent: null, settingsOpen: false }
let snapshot = serverSnapshot
const listeners = new Set<() => void>()
let measurementId = ''
let initialized = false
let started = false
let observer: IntersectionObserver | undefined
const viewedSections = new Set<string>()

function publish(next: AnalyticsSnapshot) {
  snapshot = next
  listeners.forEach((listener) => listener())
}

export const analyticsStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  getSnapshot: () => snapshot,
  getServerSnapshot: () => serverSnapshot,
}

function readConsent(): Consent {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null')
    if (saved?.expires > Date.now() && ['granted', 'denied'].includes(saved.value)) {
      return saved.value
    }
  } catch {
    /* Storage can be unavailable in private browsing. */
  }
  return null
}

function track(event: string, params: Record<string, string>) {
  if (snapshot.consent !== 'granted' || !started) return
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
  if (started || snapshot.consent !== 'granted') return
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
  observer = new IntersectionObserver(
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

function stopMeasurement() {
  window[`ga-disable-${measurementId}`] = true
  document.removeEventListener('click', handleClick, true)
  observer?.disconnect()
  const hostname = window.location.hostname.split('.')
  const domains = ['', ...hostname.map((_, index) => hostname.slice(index).join('.'))]
  for (const name of ['_ga', `_ga_${measurementId.slice(2)}`]) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''} SameSite=Lax`
    }
  }
  // Unload the already executed Google library as well as removing its cookies.
  window.location.reload()
}

export function chooseAnalyticsConsent(consent: Exclude<Consent, null>) {
  if (!snapshot.enabled) return
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ value: consent, expires: Date.now() + consentLifetime }),
    )
  } catch {
    /* Choice still applies to this page if storage is blocked. */
  }
  publish({ enabled: true, consent, settingsOpen: false })
  if (consent === 'granted') startMeasurement()
  else if (started) stopMeasurement()
}

export function openAnalyticsSettings() {
  if (snapshot.enabled) publish({ ...snapshot, settingsOpen: true })
}

export function closeAnalyticsSettings() {
  publish({ ...snapshot, settingsOpen: false })
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
  const consent = readConsent()
  publish({ enabled: true, consent, settingsOpen: false })
  if (consent === 'granted') startMeasurement()
  window.addEventListener('storage', (event) => {
    if (event.key !== storageKey && event.key !== null) return
    const current = readConsent()
    publish({ enabled: true, consent: current, settingsOpen: false })
    if (current === 'granted') startMeasurement()
    else if (started) stopMeasurement()
  })
}
