import type { ReactNode } from 'react'
import { ArrowUpLeft, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function WhatsAppButton({
  children = 'בואי נדבר על היום שלך',
  className,
  message = 'היי נופר, אשמח לבדוק זמינות לאיפור ושיער לחתונה שלי.',
}: {
  children?: ReactNode
  className?: string
  message?: string
}) {
  return (
    <Button
      asChild
      className={cn(
        'h-[51px] gap-2.5 rounded-[2px] px-[22px] text-[13px] font-normal shadow-sm',
        className,
      )}
    >
      <a
        href={`${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle aria-hidden="true" className="size-4.5" />
        <span>{children}</span>
        <ArrowUpLeft aria-hidden="true" className="ms-3 size-4" />
        <span className="sr-only"> — פתיחת וואטסאפ בחלון חדש</span>
      </a>
    </Button>
  )
}

export function FloatingContact() {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-contact"
      aria-label="אני כאן בשבילך — שיחה עם נופר בוואטסאפ — פתיחה בחלון חדש"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
      <span className="hidden text-xs sm:inline">אני כאן בשבילך</span>
    </a>
  )
}
