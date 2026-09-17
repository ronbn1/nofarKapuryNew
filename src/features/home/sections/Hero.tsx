import { ArrowDown, Heart, MapPin, Sparkles } from 'lucide-react'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="hero-section">
      <div className="page-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-primary/50" />
            נופר קפורי · כלה אחת ביום
          </p>
          <h1 id="hero-title" className="hero-title">
            הכי יפה.
            <br />
            <span className="text-primary">הכי את.</span>
            <span className="mt-5 block font-sans text-base font-normal leading-7 tracking-normal text-muted-foreground md:text-lg">
              איפור ועיצוב שיער לכלות באשדוד ובכל הארץ
            </span>
          </h1>
          <p className="mt-7 max-w-85 text-base leading-8 text-muted-foreground md:text-lg">
            ביום שכולו התרגשות, מגיע לך להרגיש בטוחה, נינוחה ויפה בדיוק כמו שאת.
          </p>
          <p className="mt-3 max-w-90 text-sm leading-7 text-muted-foreground">
            איפור ושיער שמספרים את הסיפור שלך.
            <br />
            במגע אישי, ברכות, ועם מקום לכל מה שאת.
          </p>
          <div className="mt-9">
            <WhatsAppButton>בואי נבדוק את התאריך שלך</WhatsAppButton>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Heart className="size-3.5 text-primary" aria-hidden="true" />
            כלה אחת ביום. כל הלב בשבילך.
          </p>
          <a
            href="#portfolio"
            className="mt-10 inline-flex min-h-11 items-center gap-3 text-xs text-foreground underline-offset-8 hover:underline"
          >
            <span className="flex size-8 items-center justify-center rounded-full border border-primary/25">
              <ArrowDown className="size-3.5" aria-hidden="true" />
            </span>
            לגלריית הכלות שלי
          </a>
        </div>
        <div className="hero-visual">
          <div className="hero-frame" aria-hidden="true" />
          <figure className="hero-photo">
            <img
              src="/images/optimized/hero-1280.webp"
              srcSet="/images/optimized/hero-640.webp 640w, /images/optimized/hero-960.webp 960w, /images/optimized/hero-1280.webp 1280w"
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 46vw, 565px"
              alt="לקוחה של נופר עם שיער חום ארוך וחלק, איפור עיניים עדין ושפתיים בגוון ורוד טבעי"
              fetchPriority="high"
              width="3072"
              height="4096"
            />
            <figcaption>איפור ועיצוב שיער: נופר קפורי</figcaption>
          </figure>
          <div className="hero-note">
            <Sparkles className="mb-2 size-5 text-primary" strokeWidth={1} aria-hidden="true" />
            <p className="font-heading text-2xl">
              היופי שלך,
              <br />
              ברגע שלך.
            </p>
          </div>
          <span className="hero-side-note" aria-hidden="true">
            טבעית. זוהרת. בלתי נשכחת.
          </span>
        </div>
      </div>
      <div className="hero-values">
        <div className="page-container flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs md:justify-between md:text-sm">
          <span>
            <Heart />
            יחס אישי, מהשיחה הראשונה
          </span>
          <span>
            <Sparkles />
            איפור ושיער בהתאמה אלייך
          </span>
          <span>
            <MapPin />
            מגיעה אלייך, בכל הארץ
          </span>
        </div>
      </div>
    </section>
  )
}
