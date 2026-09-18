import { ExternalLink, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { reviews } from '@/content/home'

export function Reviews() {
  return (
    <section className="reviews-section section-space" aria-labelledby="reviews-title">
      <div className="page-container">
        <SectionHeading eyebrow="מילים מכלות ולקוחות" id="reviews-title" className="text-center">
          הן מספרות על <span className="text-primary">החוויה שלהן.</span>
        </SectionHeading>
        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-7 text-muted-foreground">
          קטעים מתוך חוות דעת שמסומנות כמאומתות באתר „מתחתנים למען מתחתנים”.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.url} className="review-card">
              <Quote aria-hidden="true" className="size-8 text-primary/55" strokeWidth={1.25} />
              <blockquote className="mt-6 font-heading text-xl leading-9 md:text-2xl">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-auto pt-8">
                <p className="font-medium text-primary">{review.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">מועד השירות: {review.serviceDate}</p>
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs underline decoration-primary/40 underline-offset-4 hover:text-primary"
                  aria-label={`לביקורת של ${review.name} באתר מתחתנים למען מתחתנים — פתיחה בחלון חדש`}
                >
                  לביקורת המלאה במקור
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
