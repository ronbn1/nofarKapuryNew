import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { reviews } from '@/content/home'

export function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeReview, setActiveReview] = useState(0)

  const goToReview = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, reviews.length - 1))
    trackRef.current?.children[nextIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
    setActiveReview(nextIndex)
  }

  const updateActiveReview = () => {
    const track = trackRef.current
    if (!track) return
    const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2
    const cards = Array.from(track.children)
    const closestIndex = cards.reduce((closest, card, index) => {
      const rect = card.getBoundingClientRect()
      const distance = Math.abs(rect.left + rect.width / 2 - trackCenter)
      return distance < closest.distance ? { index, distance } : closest
    }, { index: 0, distance: Number.POSITIVE_INFINITY }).index
    setActiveReview(closestIndex)
  }

  return (
    <section
      id="reviews"
      className="reviews-section section-space"
      aria-labelledby="reviews-title"
      tabIndex={-1}
    >
      <div className="page-container">
        <SectionHeading eyebrow="מילים מכלות ולקוחות" id="reviews-title" className="text-center">
          הן מספרות על <span className="text-primary">החוויה שלהן.</span>
        </SectionHeading>
        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-7 text-muted-foreground">
          קטעים מתוך חוות דעת שמסומנות כמאומתות באתר „מתחתנים למען מתחתנים”.
        </p>

        <div
          ref={trackRef}
          className="reviews-track mt-12"
          role="region"
          aria-roledescription="קרוסלה"
          aria-label="חוות דעת של לקוחות"
          onScroll={updateActiveReview}
        >
          {reviews.map((review, index) => (
            <figure
              key={review.url}
              className="review-card"
              role="group"
              aria-roledescription="שקופית"
              aria-label={`${index + 1} מתוך ${reviews.length}`}
            >
              {review.image && (
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="review-photo"
                  aria-label={`התמונה שצירפה ${review.name} לביקורת — פתיחה בחלון חדש`}
                >
                  <img
                    src={review.image.src}
                    alt={review.image.alt}
                    width={review.image.width}
                    height={review.image.height}
                    loading="lazy"
                  />
                  <span>תמונה שצורפה לביקורת</span>
                </a>
              )}
              <Quote aria-hidden="true" className="size-8 text-primary/55" strokeWidth={1.25} />
              <blockquote className="mt-6 font-heading text-xl leading-9 md:text-2xl">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-auto pt-8">
                <p className="font-medium text-primary">{review.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">חוות דעת מאומתת</p>
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
        <div className="reviews-controls" aria-label="שליטה בקרוסלת ההמלצות">
          <button
            type="button"
            className="review-control"
            onClick={() => goToReview(activeReview - 1)}
            disabled={activeReview === 0}
            aria-label="להמלצה הקודמת"
          >
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
          <div className="flex gap-2" aria-label={`המלצה ${activeReview + 1} מתוך ${reviews.length}`}>
            {reviews.map((review, index) => (
              <button
                key={review.url}
                type="button"
                className="review-dot"
                data-active={activeReview === index || undefined}
                onClick={() => goToReview(index)}
                aria-label={`מעבר להמלצה ${index + 1}`}
                aria-current={activeReview === index ? 'true' : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            className="review-control"
            onClick={() => goToReview(activeReview + 1)}
            disabled={activeReview === reviews.length - 1}
            aria-label="להמלצה הבאה"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
