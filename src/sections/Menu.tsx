import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const menuCategories = [
  { name: 'Qəlyanaltılar', items: ['Qarışıq meze tabağı', 'Qızardılmış pendir', 'Xəngəl', 'Dolma'] },
  { name: 'Əsas Yeməklər', items: ['Şah plov', 'Qovurma', 'Balıq şorbası', 'Kabab çeşidləri'] },
  { name: 'Şirniyyatlar', items: ['Pakhlava', 'Şəkərbura', 'Qat-qat', 'Fıstıqlı dilim'] },
  { name: 'İçkilər', items: ['Evə şərablar', 'Türk qəhvəsi', 'Meyvə şirələri', 'Qazlı içkilər'] },
]

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (eyebrowRef.current) {
        gsap.fromTo(eyebrowRef.current, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        })
      }

      if (headingRef.current) {
        gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        })
      }

      if (leftRef.current) {
        gsap.fromTo(leftRef.current, { opacity: 0, x: -30 }, {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
        })
      }

      if (rightRef.current) {
        gsap.fromTo(rightRef.current, { opacity: 0, x: 30 }, {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-[120px] px-6 lg:px-20"
      style={{
        background: 'linear-gradient(180deg, #122B1E 0%, #0A1F15 100%)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div ref={eyebrowRef} className="mb-6">
          <span className="font-body text-[11px] uppercase tracking-[0.25em] text-gold">
            ZÖVQLƏRİN ZİRVƏSİ
          </span>
        </div>

        <h2
          ref={headingRef}
          className="font-heading font-light text-parchment mb-16 max-w-[600px]"
          style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
        >
          Şərq və Qərbin incə harmoniyası
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left - Menu Categories */}
          <div ref={leftRef} className="lg:w-1/2">
            {menuCategories.map((category, index) => (
              <div
                key={index}
                className="border-b border-emerald-border cursor-pointer group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center justify-between py-5">
                  <h3 className="font-heading text-[22px] text-parchment group-hover:translate-x-2 transition-transform duration-300">
                    {category.name}
                  </h3>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </div>
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{
                    maxHeight: openIndex === index ? '200px' : '0px',
                    opacity: openIndex === index ? 1 : 0,
                  }}
                >
                  <ul className="pb-5 space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="font-body text-[14px] text-gold-muted pl-4">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Featured Image */}
          <div ref={rightRef} className="lg:w-1/2 relative">
            <div className="relative overflow-hidden rounded-[4px]">
              <img
                src="/images/menu-feature.jpg"
                alt="Qızıl Qaya Hall - Gourmet yemək"
                className="w-full object-cover"
                style={{ aspectRatio: '4/3' }}
                loading="lazy"
              />
              {/* Gold corner brackets */}
              <div className="absolute top-4 left-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M0 40V0h40" stroke="#D4AF37" strokeWidth="2" />
                </svg>
              </div>
              <div className="absolute bottom-4 right-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M40 0v40H0" stroke="#D4AF37" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
