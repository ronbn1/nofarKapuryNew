import { Camera, Phone, ArrowUp, MapPin } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="bg-background pb-24 pt-12 sm:pb-8">
      <div className="page-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <Logo />
        <p className="text-sm text-muted-foreground">איפור, שיער ורגעים יפים. אשדוד ובכל הארץ.</p>
        <div className="flex items-center gap-3">
          <a
            className="social-link"
            href={siteConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="הפרופיל של נופר בגוגל מפות — פתיחה בחלון חדש"
          >
            <MapPin className="size-4.5" />
          </a>
          <a
            className="social-link"
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="האינסטגרם של נופר — פתיחה בחלון חדש"
          >
            <Camera className="size-4.5" />
          </a>
          <a className="social-link" href={siteConfig.phoneHref} aria-label="התקשרות לנופר">
            <Phone className="size-4.5" />
          </a>
          <a className="social-link" href="/#home" aria-label="חזרה לראש עמוד הבית">
            <ArrowUp className="size-4.5" />
          </a>
        </div>
      </div>
      <div className="page-container mt-9">
        <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. כל הזכויות שמורות.
          </p>
          <nav aria-label="מידע משפטי" className="flex flex-wrap gap-5">
            <a href="/privacy.html" className="underline underline-offset-4">
              מדיניות פרטיות
            </a>
            <a href="/accessibility.html" className="underline underline-offset-4">
              הצהרת נגישות
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
