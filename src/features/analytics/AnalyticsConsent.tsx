import { useEffect, useRef, useSyncExternalStore } from 'react'
import { Button } from '@/components/ui/button'
import {
  analyticsStore,
  chooseAnalyticsConsent,
  closeAnalyticsSettings,
  openAnalyticsSettings,
} from '@/lib/analytics'

export function AnalyticsConsent() {
  const panel = useRef<HTMLElement>(null)
  const state = useSyncExternalStore(
    analyticsStore.subscribe,
    analyticsStore.getSnapshot,
    analyticsStore.getServerSnapshot,
  )
  useEffect(() => {
    if (!state.settingsOpen) return
    const previous = document.activeElement
    panel.current?.focus()
    return () => {
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus()
    }
  }, [state.settingsOpen])
  if (!state.enabled || (state.consent !== null && !state.settingsOpen)) return null
  return (
    <section
      ref={panel}
      tabIndex={-1}
      className="analytics-consent"
      aria-labelledby="analytics-consent-title"
      dir="rtl"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && state.consent !== null) closeAnalyticsSettings()
      }}
    >
      <h2 id="analytics-consent-title" className="text-lg font-medium">
        מדידת שימוש באתר
      </h2>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        אפשר לאפשר ל־Google Analytics למדוד ביקורים ולחיצות, כדי לעזור לי לשפר את האתר. המדידה
        משתמשת בעוגיות. אפשר לגלוש גם בלי לאפשר אותה ולשנות את הבחירה בכל עת.{' '}
        <a href="/privacy" className="underline underline-offset-4">
          למדיניות הפרטיות
        </a>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          variant="outline"
          className="min-h-11"
          onClick={() => chooseAnalyticsConsent('granted')}
        >
          לאפשר מדידה
        </Button>
        <Button
          variant="outline"
          className="min-h-11"
          onClick={() => chooseAnalyticsConsent('denied')}
        >
          ללא מדידה
        </Button>
        {state.consent !== null && (
          <Button variant="ghost" className="min-h-11" onClick={closeAnalyticsSettings}>
            סגירה
          </Button>
        )}
      </div>
    </section>
  )
}

export function AnalyticsSettingsButton() {
  const state = useSyncExternalStore(
    analyticsStore.subscribe,
    analyticsStore.getSnapshot,
    analyticsStore.getServerSnapshot,
  )
  if (!state.enabled) return null
  return (
    <button
      type="button"
      className="min-h-11 underline underline-offset-4"
      onClick={openAnalyticsSettings}
    >
      העדפות מדידה
    </button>
  )
}
