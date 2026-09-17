import { SectionHeading } from '@/components/shared/SectionHeading'
import { steps } from '@/content/home'

export function Experience() {
  return (
    <section id="experience" className="section-space" aria-labelledby="experience-title">
      <div className="page-container">
        <SectionHeading
          eyebrow="מההודעה הראשונה ועד לרגע שלך"
          id="experience-title"
          className="text-center"
        >
          חוויה יפה, <span className="text-primary">כבר מההתחלה.</span>
        </SectionHeading>
        <div className="mt-14 grid gap-9 md:grid-cols-3 md:gap-14">
          {steps.map((step, index) => (
            <article key={step.title} className="experience-step">
              <div className="step-number">
                <span>0{index + 1}</span>
              </div>
              <h3 className="mt-6 font-heading text-3xl">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-72 text-sm leading-7 text-muted-foreground">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
