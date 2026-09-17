import { MapPin, Phone } from 'lucide-react'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { siteConfig } from '@/config/site'

export function Contact() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="page-container relative z-10 py-18 text-center md:py-24">
        <p className="eyebrow">היום שלך מתחיל בשיחה קטנה</p>
        <h2 id="contact-title" className="mt-5 font-heading text-5xl leading-tight md:text-7xl">
          בואי ניצור את
          <br />
          <span className="text-primary">הרגע היפה שלך.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-95 text-sm leading-7 text-muted-foreground">
          שלחי לי את תאריך החתונה שלך, ספרי לי מה את מדמיינת, ומשם נמשיך יחד.
        </p>
        <div className="mt-8">
          <WhatsAppButton>נופר, בואי נדבר</WhatsAppButton>
        </div>
        <p className="mx-auto mt-4 max-w-lg text-xs leading-6 text-muted-foreground">
          הפרטים שתבחרי לשלוח לנופר ישמשו למענה ולתיאום השירות. הפנייה עוברת דרך וואטסאפ.{' '}
          <a href="/privacy.html" className="underline underline-offset-4">
            למידע על פרטיות וזכויותייך
          </a>
        </p>
        <a
          href={siteConfig.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4"
        >
          לפרופיל ולחוות הדעת בגוגל<span className="sr-only"> — פתיחה בחלון חדש</span>
        </a>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 text-xs text-muted-foreground">
          <a className="inline-flex min-h-11 items-center gap-2" href={siteConfig.phoneHref}>
            <Phone className="size-3.5" aria-hidden="true" />
            <bdi>{siteConfig.phoneDisplay}</bdi>
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-3.5" aria-hidden="true" />
            אשדוד ובכל הארץ
          </span>
        </div>
      </div>
    </section>
  )
}
