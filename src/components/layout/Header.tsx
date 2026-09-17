import { useRef, useState, type MouseEvent } from 'react'
import { Menu } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { navigation } from '@/content/home'

export function Header() {
  const [open, setOpen] = useState(false)
  const destination = useRef<string | null>(null)
  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    destination.current = event.currentTarget.hash
    setOpen(false)
  }
  return (
    <header className="site-header">
      <div className="page-container flex h-24 items-center justify-between gap-5">
        <Logo />
        <nav aria-label="ניווט ראשי" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a className="nav-link" key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <WhatsAppButton className="hidden h-10 px-4 text-xs sm:inline-flex">
          לתיאום ושאלות
        </WhatsAppButton>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-11 lg:hidden"
              aria-label="פתיחת תפריט ניווט"
            >
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="overflow-y-auto bg-background p-8" dir="rtl"
            onCloseAutoFocus={(event) => {
              const hash = destination.current
              if (!hash) return
              event.preventDefault()
              destination.current = null
              requestAnimationFrame(() => {
                const target = document.getElementById(hash.slice(1))
                if (!target) return
                history.pushState(null, '', hash)
                target.setAttribute('tabindex', '-1')
                target.focus({ preventScroll: true })
                const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  || document.documentElement.hasAttribute('data-reduce-motion')
                target.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'instant' : 'smooth' })
              })
            }}>
            <SheetHeader className="px-0 pt-8">
              <SheetTitle className="font-heading text-3xl">נעים שבאת</SheetTitle>
              <SheetDescription>כל מה שצריך לקראת היום שלך</SheetDescription>
            </SheetHeader>
            <nav aria-label="ניווט בנייד" className="mt-5 flex flex-col">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={navigate}
                  className="border-b border-border py-5 text-lg"
                >
                  {item.label}
                </a>
              ))}
              <a href="#contact" onClick={navigate} className="py-5 text-lg">
                בואי נדבר
              </a>
            </nav>
            <WhatsAppButton className="mt-5 w-full">לבדיקת התאריך שלך</WhatsAppButton>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
