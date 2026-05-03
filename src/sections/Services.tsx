import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'Mükəmməl Toy Tərtibatı',
    description:
      'Çiçək aranjmanlarından işıqlandırma dizaynına qədər, hər bir vizual elementi diqqətlə hazırlayırıq. Sizin xəyallarınızı gerçəkləşdirmək üçün peşəkar komandamız hər an yanınızdadır.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <path d="M24 4C12 4 8 14 8 20c0 8 6 16 16 24 10-8 16-16 16-24 0-6-4-16-16-16z" />
        <path d="M24 12v16" />
        <path d="M16 20h16" />
      </svg>
    ),
  },
  {
    title: 'Gourmet Mətbəx Təcrübəsi',
    description:
      'Dünya standartlarında şeflərimiz, hər zövqə uyğun fərdi menular hazırlayır. Şərq və Qərb mətbəxinin ən incə nüanslarını bir araya gətirən təamlarımız, tədbirinizin parlaq nöqtəsi olacaq.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <path d="M12 24c0-8 6-14 12-14s12 6 12 14-6 14-12 14-12-6-12-14z" />
        <path d="M18 28l6 6 6-6" />
        <path d="M24 20v10" />
      </svg>
    ),
  },
  {
    title: 'Premium Qonaqlama',
    description:
      'Elegant gəlin otaqları və qonaqlar üçün mükəmməl təchizatlı nömrələr. Hər detalda hiss edilən zəriflik və qüsursuz xidmət anlayışı ilə, özel gecənizi tamamlayırıq.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <path d="M8 40V20l16-12 16 12v20" />
        <path d="M16 40V28h16v12" />
        <path d="M4 40h40" />
      </svg>
    ),
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%' },
          }
        )
      }

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
          }
        )
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.service-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-[120px] px-6 lg:px-20"
      style={{
        background: 'linear-gradient(180deg, #0A1F15 0%, #122B1E 100%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div ref={eyebrowRef} className="mb-6">
          <span className="font-body text-[11px] uppercase tracking-[0.25em] text-gold">
            TƏKLİF ETDİKLƏRİMİZ
          </span>
        </div>

        <h2
          ref={headingRef}
          className="font-heading font-light text-parchment mb-16 max-w-[600px]"
          style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
        >
          Hər detal mükəmməllik üçün düşünülüb
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group p-10 md:p-8 rounded-lg border border-emerald-border bg-[rgba(26,61,46,0.5)] hover:border-gold hover:bg-[rgba(26,61,46,0.8)] hover:-translate-y-1 hover:shadow-hover transition-all duration-400"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="font-heading font-semibold text-[24px] text-parchment mb-4">
                {service.title}
              </h3>
              <p className="font-body text-[15px] font-light text-gold-muted leading-[1.7]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
