import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpLeft, Plus } from 'lucide-react'
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
import { portfolioCollections, portfolioImages } from '@/content/home'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function PortfolioSection() {
  const [collectionId, setCollectionId] = useState<string>(portfolioCollections[0].id)
  const collection = portfolioCollections.find((item) => item.id === collectionId)!
  const imageIds: readonly string[] = collection.imageIds
  const images = portfolioImages
    .filter((image) => imageIds.includes(image.id))
    .sort((a, b) => imageIds.indexOf(a.id) - imageIds.indexOf(b.id))
  const [activeId, setActiveId] = useState<string>(images[0].id)
  const activeIndex = Math.max(
    0,
    images.findIndex((image) => image.id === activeId),
  )
  const activeImage = images[activeIndex]
  const moveImage = (offset: number) => {
    setActiveId(images[(activeIndex + offset + images.length) % images.length].id)
  }
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
        <div className="mb-8 mt-8 flex flex-wrap gap-2" role="group" aria-label="קטגוריות הגלריה">
          {portfolioCollections.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              aria-pressed={collectionId === item.id}
              onClick={() => {
                setCollectionId(item.id)
                setActiveId(item.imageIds[0])
              }}
              className={cn(
                'h-10 rounded-full px-5 text-xs font-normal',
                collectionId === item.id
                  ? 'bg-primary text-white hover:bg-primary/90 hover:text-white'
                  : 'text-muted-foreground hover:bg-background',
              )}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div className="inspiration-grid">
          {images.map((image) => (
            <Dialog
              key={image.id}
              onOpenChange={(open) => {
                if (open) setActiveId(image.id)
              }}
            >
              <DialogTrigger asChild>
                <button
                  className="inspiration-item group text-start"
                  data-analytics-image={image.id}
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
                    className="portfolio-caption mt-4 flex flex-wrap items-center justify-between gap-x-2"
                  >
                    <span className="sr-only">הגדלת תמונה: </span>
                    <span className="font-heading text-2xl">{image.title}</span>
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent
                className="h-[92dvh] grid-rows-[auto_minmax(0,1fr)_auto_auto] gap-3 overflow-hidden sm:max-w-2xl"
                dir="rtl"
                onKeyDown={(event) => {
                  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                    event.preventDefault()
                    moveImage(event.key === 'ArrowLeft' ? 1 : -1)
                  }
                }}
              >
                <DialogHeader className="pe-12">
                  <DialogTitle className="font-heading text-3xl">{activeImage.title}</DialogTitle>
                  <DialogDescription>
                    {'credit' in activeImage
                      ? activeImage.credit
                      : 'איפור ועיצוב שיער: נופר קפורי.'}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex min-h-0 items-center justify-center">
                  <img
                    src={activeImage.src.replace('.webp', '-large.webp')}
                    alt={activeImage.alt}
                    className="h-full min-h-0 w-full object-contain"
                    style={{ maxWidth: activeImage.width }}
                    width={activeImage.width}
                    height={activeImage.height}
                  />
                </div>
                <div className="flex items-center justify-between gap-2" aria-label="דפדוף בתמונות">
                  <Button
                    variant="ghost"
                    className="min-h-11 gap-2 px-2"
                    onClick={() => moveImage(-1)}
                  >
                    <ArrowRight className="size-4" aria-hidden="true" />
                    הקודמת
                  </Button>
                  <span className="text-xs text-muted-foreground" role="status" aria-atomic="true">
                    תמונה {activeIndex + 1} מתוך {images.length}
                  </span>
                  <Button
                    variant="ghost"
                    className="min-h-11 gap-2 px-2"
                    onClick={() => moveImage(1)}
                  >
                    הבאה
                    <ArrowLeft className="size-4" aria-hidden="true" />
                  </Button>
                </div>
                <a
                  href={activeImage.postUrl}
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
