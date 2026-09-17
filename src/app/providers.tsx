import type { PropsWithChildren } from 'react'
import { DirectionProvider } from '@radix-ui/react-direction'

export function AppProviders({ children }: PropsWithChildren) {
  return <DirectionProvider dir="rtl">{children}</DirectionProvider>
}
