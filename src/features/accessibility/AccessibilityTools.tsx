import { useEffect, useState } from 'react'
import { Accessibility } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

export function AccessibilityTools() {
  const [largeText, setLargeText] = useState(false)
  const [contrast, setContrast] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.toggleAttribute('data-large-text', largeText)
    root.toggleAttribute('data-high-contrast', contrast)
    root.toggleAttribute('data-reduce-motion', reduceMotion)
    return () => {
      root.removeAttribute('data-large-text')
      root.removeAttribute('data-high-contrast')
      root.removeAttribute('data-reduce-motion')
    }
  }, [largeText, contrast, reduceMotion])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="accessibility-trigger" aria-label="נגישות — התאמות תצוגה">
          <Accessibility className="size-5" aria-hidden="true" />
          <span>נגישות</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" dir="rtl" className="overflow-y-auto">
        <SheetHeader className="pt-16">
          <SheetTitle className="text-2xl">התאמות נגישות</SheetTitle>
          <SheetDescription className="leading-7">
            אפשר להתאים את התצוגה לנוחותך. הבחירות חלות על העמוד הנוכחי ומתאפסות בטעינה מחדש.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4 pb-8">
          <Button
            variant="outline"
            className="h-auto min-h-12 whitespace-normal py-3"
            aria-pressed={largeText}
            onClick={() => setLargeText((value) => !value)}
          >
            הגדלת טקסט
          </Button>
          <Button
            variant="outline"
            className="h-auto min-h-12 whitespace-normal py-3"
            aria-pressed={contrast}
            onClick={() => setContrast((value) => !value)}
          >
            ניגודיות מוגברת
          </Button>
          <Button
            variant="outline"
            className="h-auto min-h-12 whitespace-normal py-3"
            aria-pressed={reduceMotion}
            onClick={() => setReduceMotion((value) => !value)}
          >
            הפחתת תנועה
          </Button>
          <Button
            variant="ghost"
            className="h-auto min-h-12 whitespace-normal py-3"
            onClick={() => {
              setLargeText(false)
              setContrast(false)
              setReduceMotion(false)
            }}
          >
            איפוס התאמות
          </Button>
          <p className="text-sm leading-7">
            אפשר להגדיל עוד את התצוגה באמצעות הזום בדפדפן. האתר מכבד גם את הגדרת הפחתת התנועה
            במכשיר.
          </p>
          <a href="/accessibility.html" className="text-link">
            להצהרת הנגישות ולפנייה לעזרה
          </a>
        </div>
      </SheetContent>
    </Sheet>
  )
}
