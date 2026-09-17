import { Logo } from '@/components/shared/Logo'
import { Footer } from '@/components/layout/Footer'
import { siteConfig } from '@/config/site'
import { legalUpdatedAt, type LegalDocument } from '@/content/legal'

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        דילוג לתוכן הראשי
      </a>
      <header className="border-b border-border bg-background py-5">
        <div className="page-container flex flex-wrap items-center justify-between gap-5">
          <Logo />
          <a href="/" className="text-link">
            חזרה לעמוד הבית
          </a>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="page-container py-14 md:py-20">
        <article className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm text-primary">נופר קפורי · מידע ושירות</p>
          <h1 className="font-heading text-4xl leading-tight md:text-5xl">{document.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{document.description}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            עדכון אחרון: <time dateTime="2026-09-17">{legalUpdatedAt}</time>
          </p>
          <nav
            aria-label="תוכן העמוד"
            className="my-10 rounded-2xl border border-border bg-secondary/40 p-6"
          >
            <p className="mb-3 font-semibold">בעמוד הזה</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {document.sections.map((section, index) => (
                <li key={section.title}>
                  <a className="underline underline-offset-4" href={`#legal-section-${index}`}>
                    {section.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#legal-contact" className="underline underline-offset-4">
                  פרטי קשר
                </a>
              </li>
            </ul>
          </nav>
          <div className="space-y-10">
            {document.sections.map((section, index) => (
              <section key={section.title} aria-labelledby={`legal-section-${index}`}>
                <h2
                  id={`legal-section-${index}`}
                  className="scroll-mt-8 mb-4 text-2xl font-semibold"
                >
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-8">
                    {paragraph}
                  </p>
                ))}
                {section.items && (
                  <ul className="list-disc space-y-3 ps-6 leading-8">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section
              aria-labelledby="legal-contact"
              className="rounded-2xl border border-border bg-secondary/40 p-6"
            >
              <h2 id="legal-contact" className="mb-4 text-2xl font-semibold">
                פרטי קשר
              </h2>
              <p className="leading-8">נופר קפורי · לפניות פרטיות, נגישות וקבלת עזרה</p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-4">
                <li>
                  <a className="text-link break-all" href={`mailto:${siteConfig.email}`}>
                    דואר אלקטרוני: <bdi>{siteConfig.email}</bdi>
                  </a>
                </li>
                <li>
                  <a className="text-link" href={siteConfig.phoneHref}>
                    טלפון: <bdi>{siteConfig.phoneDisplay}</bdi>
                  </a>
                </li>
                <li>
                  <a className="text-link" href="sms:+972546477885">
                    שליחת מסרון
                  </a>
                </li>
                <li>
                  <a
                    className="text-link"
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    פנייה בוואטסאפ<span className="sr-only"> — פתיחה בחלון חדש</span>
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
