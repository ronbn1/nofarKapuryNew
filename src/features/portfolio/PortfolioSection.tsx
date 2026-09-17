import { useState } from 'react'
import { ArrowUpLeft, Plus } from 'lucide-react'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { portfolioImages } from '@/content/home'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

const filters = ['הכול', 'שיער אסוף', 'שיער פזור'] as const

export function PortfolioSection() {
  const [filter, setFilter] = useState<string>('הכול')
  const images = portfolioImages.filter((image) => filter === 'הכול' || image.category === filter)
  return (
    <section
      id="portfolio"
      className="bg-secondary/45 py-18 md:py-24"
      aria-labelledby="inspiration-title"
    >
      <div className="page-container">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <SectionHeading eyebrow="הכלות שלי, הרגעים שלהן" id="inspiration-title">
            רגעים של <span className="text-primary">יופי שקט.</span>
          </SectionHeading>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            לעבודות של נופר באינסטגרם
            <ArrowUpLeft className="size-4" aria-hidden="true" />
            <span className="sr-only"> — פתיחה בחלון חדש</span>
          </a>
        </div>
        <div
          className="mb-8 mt-8 flex flex-wrap gap-2"
          role="group"
          aria-label="סינון תמונות הגלריה"
        >
          {filters.map((item) => (
            <Button
              key={item}
              variant="ghost"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              className={cn(
                'h-10 rounded-full px-5 text-xs font-normal',
                filter === item
                  ? 'bg-primary text-white hover:bg-primary/90 hover:text-white'
                  : 'text-muted-foreground hover:bg-background',
              )}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="inspiration-grid">
          {images.map((image) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <button
                  className="inspiration-item group text-start"
                  aria-labelledby={`portfolio-caption-${image.id}`}
                >
                  <span className="inspiration-image">
                    <img
                      src={image.src}
                      srcSet={`${image.src.replace('.webp', '-320.webp')} 320w, ${image.src} 480w`}
                      sizes="(max-width: 767px) calc((100vw - 58px) / 2), (max-width: 1328px) calc((100vw - 168px) / 3), 400px"
                      alt={image.alt}
                      style={{ objectPosition: image.position }}
                      width="600"
                      height="800"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="image-plus">
                      <Plus className="size-5" aria-hidden="true" />
                    </span>
                  </span>
                  <span
                    id={`portfolio-caption-${image.id}`}
                    className="mt-4 flex items-center justify-between"
                  >
                    <span className="sr-only">הגדלת תמונה: </span>
                    <span className="font-heading text-2xl">{image.title}</span>
                    <span className="text-[11px] text-muted-foreground">{image.category}</span>
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[92dvh] overflow-y-auto sm:max-w-2xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle className="font-heading text-3xl">{image.title}</DialogTitle>
                  <DialogDescription>
                    איפור ועיצוב שיער: נופר קפורי. מתוך גלריית העבודות באינסטגרם.
                  </DialogDescription>
                </DialogHeader>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="max-h-[65dvh] w-full object-contain"
                  width="1024"
                  height="1536"
                />
                <a
                  href={image.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link w-fit"
                >
                  לפוסט המקורי באינסטגרם
                  <ArrowUpLeft className="size-4" aria-hidden="true" />
                  <span className="sr-only"> — פתיחה בחלון חדש</span>
                </a>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        <p className="mt-7 text-xs leading-6 text-muted-foreground" aria-live="polite">
          {images.length} תמונות מתוך העבודות שלי · לחצי על תמונה למבט מקרוב.
        </p>
      </div>
    </section>
  )
}
