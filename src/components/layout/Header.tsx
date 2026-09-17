import { useState } from 'react'
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
          <SheetContent side="right" className="bg-background p-8" dir="rtl">
            <SheetHeader className="px-0 pt-8">
              <SheetTitle className="font-heading text-3xl">נעים שבאת</SheetTitle>
              <SheetDescription>כל מה שצריך לקראת היום שלך</SheetDescription>
            </SheetHeader>
            <nav aria-label="ניווט בנייד" className="mt-5 flex flex-col">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-5 text-lg"
                >
                  {item.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="py-5 text-lg">
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
