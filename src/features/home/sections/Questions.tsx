import { SectionHeading } from '@/components/shared/SectionHeading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { questions } from '@/content/home'

export function Questions() {
  return (
    <section
      id="questions"
      className="border-t border-border py-18 md:py-24"
      aria-labelledby="questions-title"
    >
      <div className="page-container grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <div>
          <SectionHeading eyebrow="עוד קצת שקט בראש" id="questions-title">
            בטח רצית <span className="text-primary">לשאול.</span>
          </SectionHeading>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            יש לך שאלה אחרת?
            <br />
            <a href="#contact" className="underline decoration-primary/40 underline-offset-4">
              אני כאן, ואשמח לדבר.
            </a>
          </p>
        </div>
        <Accordion type="single" collapsible>
          {questions.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`question-${index}`}
              className="border-primary/15"
            >
              <AccordionTrigger className="min-h-17 py-5 text-start text-base font-normal hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent forceMount className="pb-6 text-sm leading-7 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
