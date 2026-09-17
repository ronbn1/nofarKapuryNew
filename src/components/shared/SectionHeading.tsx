import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  children,
  className,
  id,
}: {
  eyebrow: string
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <div className={cn('section-heading', className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="section-title">
        {children}
      </h2>
    </div>
  )
}
