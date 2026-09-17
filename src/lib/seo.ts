import { seoConfig } from '../config/seo'
import { siteConfig } from '../config/site'
import { legalDocuments, type LegalDocument } from '../content/legal'

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!,
  )

export function resolveSiteUrl(value = '') {
  if (!value.trim()) return null
  const url = new URL(value.trim())
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.port ||
    url.pathname !== '/' ||
    url.search ||
    url.hash ||
    !url.hostname.includes('.') ||
    /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(url.hostname) ||
    /\.(local|test|invalid|example)$/.test(url.hostname)
  ) {
    throw new Error(
      'SITE_URL must be the public HTTPS origin, without a path, credentials, query, or fragment.',
    )
  }
  return url.origin + '/'
}

export function createSeoArtifacts(
  siteUrl: string | null,
  indexable: boolean,
  page?: LegalDocument,
) {
  if (indexable && !siteUrl) throw new Error('An indexable build requires SITE_URL.')
  const title = page ? `${page.title} | ${siteConfig.name}` : seoConfig.title
  const description = page?.description ?? seoConfig.description
  const pageUrl = siteUrl && page ? new URL(page.path, siteUrl).href : siteUrl
  const meta = (name: string, content: string, property = false) =>
    `<meta ${property ? 'property' : 'name'}="${name}" content="${escapeHtml(content)}" />`
  const head = [
    `<title>${escapeHtml(title)}</title>`,
    meta('description', description),
    meta('robots', indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'),
    meta('og:type', 'website', true),
    meta('og:locale', 'he_IL', true),
    meta('og:site_name', siteConfig.name, true),
    meta('og:title', title, true),
    meta('og:description', description, true),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', title),
    meta('twitter:description', description),
  ]
  if (siteUrl) {
    const absolute = (path: string) => new URL(path, siteUrl).href
    head.push(
      `<link rel="canonical" href="${escapeHtml(pageUrl!)}" />`,
      meta('og:url', pageUrl!, true),
      meta('og:image', absolute(seoConfig.image), true),
      meta('og:image:width', '1200', true),
      meta('og:image:height', '630', true),
      meta('og:image:alt', seoConfig.imageAlt, true),
      meta('twitter:image', absolute(seoConfig.image)),
      meta('twitter:image:alt', seoConfig.imageAlt),
    )
    const organizationId = siteUrl + '#organization'
    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': organizationId,
          name: siteConfig.name,
          url: siteUrl,
          description: seoConfig.description,
          telephone: '+972546477885',
          logo: absolute('/brand/Symbol1.png'),
          image: absolute(seoConfig.image),
          sameAs: [siteConfig.instagramUrl, siteConfig.googleMapsUrl],
          areaServed: [
            { '@type': 'City', name: 'אשדוד' },
            { '@type': 'Country', name: 'ישראל' },
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+972546477885',
            contactType: 'customer service',
            availableLanguage: ['he'],
          },
        },
        {
          '@type': 'WebSite',
          '@id': siteUrl + '#website',
          url: siteUrl,
          name: siteConfig.name,
          inLanguage: 'he-IL',
          publisher: { '@id': organizationId },
        },
        {
          '@type': 'WebPage',
          '@id': pageUrl + '#webpage',
          url: pageUrl,
          name: title,
          description,
          inLanguage: 'he-IL',
          isPartOf: { '@id': siteUrl + '#website' },
          about: { '@id': organizationId },
        },
        {
          '@type': 'Service',
          '@id': siteUrl + '#bridal-service',
          name: 'איפור ועיצוב שיער לכלות',
          serviceType: 'איפור ועיצוב שיער לכלות',
          provider: { '@id': organizationId },
          areaServed: [
            { '@type': 'City', name: 'אשדוד' },
            { '@type': 'Country', name: 'ישראל' },
          ],
          url: siteUrl + '#services',
        },
      ],
    }
    head.push(
      `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`,
    )
  }
  return {
    head: head.join('\n    '),
    robots: `User-agent: *\nAllow: /\n${indexable && siteUrl ? `\nSitemap: ${siteUrl}sitemap.xml\n` : ''}`,
    sitemap:
      indexable && siteUrl
        ? `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', ...legalDocuments.map((document) => document.path)].map((path) => `<url><loc>${escapeHtml(new URL(path, siteUrl).href)}</loc></url>`).join('')}</urlset>\n`
        : null,
  }
}
