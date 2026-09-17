import { siteConfig } from '@/config/site'

export function Logo() {
  return (
    <a href="/#home" className="inline-flex shrink-0 items-center gap-3">
      <span className="brand-symbol" aria-hidden="true">
        <img src="/brand/Symbol1.png" alt="" width="1001" height="1001" />
      </span>
      <span className="border-s border-primary/20 ps-3">
        <span className="block font-heading text-[25px] leading-none">{siteConfig.name}</span>
        <span className="mt-1.5 block text-[10px] tracking-wide text-muted-foreground">
          איפור ועיצוב שיער לכלות
        </span>
      </span>
      <span className="sr-only"> — חזרה לראש העמוד</span>
    </a>
  )
}
