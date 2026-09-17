import { ArrowUpLeft } from 'lucide-react'
import { services } from '@/content/home'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { siteConfig } from '@/config/site'

export function Services() {
  return (
    <section
      id="services"
      className="services-section section-space"
      aria-labelledby="services-title"
    >
      <div className="page-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow="כל מה שאת צריכה" id="services-title">
            המראה שלך.
            <br />
            <span className="text-[#dfbccc]">בדרך שלך.</span>
          </SectionHeading>
          <p className="mt-6 max-w-70 text-sm leading-7 text-white/75">
            מהעדין והטבעי ועד הזוהר והמרשים — נמצא יחד את האיזון שמרגיש לך נכון.
          </p>
          <span aria-hidden="true" className="mt-10 block font-heading text-7xl text-[#d6acbf]">
            ✳
          </span>
        </div>
        <div>
          {services.map((service) => (
            <article key={service.number} className="service-row">
              <span className="pt-1 font-heading text-xl text-[#dfbccc]">{service.number}</span>
              <div>
                <h3 className="font-heading text-2xl md:text-3xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/75">{service.description}</p>
                <p className="mt-3 text-xs text-[#dfbccc]">{service.detail}</p>
              </div>
              <a
                href={`${siteConfig.whatsappUrl}?text=${encodeURIComponent(`היי נופר, אשמח לשמוע על ${service.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="service-arrow"
                aria-label={`שיחה בוואטסאפ על ${service.title} — פתיחה בחלון חדש`}
              >
                <ArrowUpLeft className="size-5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
