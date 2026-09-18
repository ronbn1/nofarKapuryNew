import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/shared/WhatsAppButton'
import { Hero } from '@/features/home/sections/Hero'
import { About } from '@/features/home/sections/About'
import { Services } from '@/features/home/sections/Services'
import { Experience } from '@/features/home/sections/Experience'
import { Reviews } from '@/features/home/sections/Reviews'
import { Questions } from '@/features/home/sections/Questions'
import { Contact } from '@/features/home/sections/Contact'
import { PortfolioSection } from '@/features/portfolio/PortfolioSection'
import { LegalPage } from '@/features/legal/LegalPage'
import { legalDocuments } from '@/content/legal'
import { AccessibilityTools } from '@/features/accessibility/AccessibilityTools'

export function App({ pathname = '/' }: { pathname?: string }) {
  const document = legalDocuments.find((page) => page.path === pathname)
  if (document)
    return (
      <>
        <LegalPage document={document} />
        <AccessibilityTools />
      </>
    )
  return (
    <>
      <a href="#main-content" className="skip-link">
        דילוג לתוכן הראשי
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <PortfolioSection />
        <Reviews />
        <Services />
        <Experience />
        <Questions />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
      <AccessibilityTools />
    </>
  )
}
