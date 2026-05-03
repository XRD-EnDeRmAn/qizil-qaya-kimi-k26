import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const goldLineRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Eyebrow clip-path reveal
      if (eyebrowRef.current) {
        gsap.fromTo(
          eyebrowRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0 0 0)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
          }
        )
      }

      // Heading word-by-word entrance
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word')
        gsap.fromTo(
          words,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      // Body text fade in
      if (bodyRef.current) {
        gsap.fromTo(
          bodyRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bodyRef.current,
              start: 'top 85%',
            },
          }
        )
      }

      // Image clip-path entrance
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 75%',
            },
          }
        )
      }

      // Gold line draw
      if (goldLineRef.current) {
        gsap.fromTo(
          goldLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 75%',
            },
          }
        )
      }

      // Stats count up
      if (statsRef.current) {
        const statNumbers = statsRef.current.querySelectorAll('.stat-number')
        statNumbers.forEach((el, index) => {
          const target = parseInt(el.getAttribute('data-target') || '0')
          gsap.fromTo(
            el,
            { textContent: '0' },
            {
              textContent: target,
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              delay: index * 0.2,
              scrollTrigger: {
                trigger: statsRef.current,
                start: 'top 85%',
              },
            }
          )
        })
      }

      // SVG border draw
      if (svgRef.current) {
        const length = svgRef.current.getTotalLength()
        gsap.set(svgRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
        gsap.to(svgRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const headingWords = 'Zamansız Zövq, Unudulmaz Anlar'.split(' ')

  return (
    <section
      ref={sectionRef}
      className="relative bg-emerald-deep py-[120px] px-6 lg:px-20"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-[60px] items-start">
          {/* Left Column - Text */}
          <div className="lg:w-[45%] relative">
            {/* SVG Border */}
            <svg
              className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <path
                ref={svgRef}
                className="svg-border-path"
                d="M20,20 L180,20 Q200,5 220,20 L380,20 L380,130 Q395,150 380,170 L380,280 L220,280 Q200,295 180,280 L20,280 L20,170 Q5,150 20,130 Z"
              />
            </svg>

            <div ref={eyebrowRef} className="mb-6">
              <span className="font-body text-[11px] uppercase tracking-[0.25em] text-gold">
                BİZ KİMİK?
              </span>
            </div>

            <h2
              ref={headingRef}
              className="font-heading font-light text-parchment leading-[1.15] mb-8"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
            >
              {headingWords.map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </h2>

            <div ref={bodyRef} className="space-y-4 max-w-[480px]">
              <p className="font-body text-[16px] font-light text-gold-muted leading-[1.8]">
                Qızıl Qaya Hall, Azərbaycanın toy və tədbir mədəniyyətinə yeni bir
                nəfəs gətirən premium məkan olaraq, hər bir detalı mükəmməllik üçün
                düşünmüşdür. 500+ qonaq tutumu, görkəmli memarlığı vəlimitsiz
                xidmət anlayışımızla, xüsusi günlərinizi unudulmaz xatirələrə
                çeviririk.
              </p>
              <p className="font-body text-[16px] font-light text-gold-muted leading-[1.8]">
                15 ildən artıq təcrübəmiz və 1000-dən çox xoşbəxt cütlüyün etibarı
                ilə, hər tədbiri incəsənət əsəri kimi hazırlayırıq. Şərq
                qonaqpərvərliyinin istiliyi və Qərb zərifliyinin harmoniyası,
                Qızıl Qaya Hall-ı seçənlərin fərqi.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="lg:w-[55%] relative flex gap-4">
            <div
              ref={goldLineRef}
              className="hidden lg:block w-[2px] bg-gold origin-top"
              style={{ minHeight: '100%' }}
            />
            <div
              ref={imageRef}
              className="relative overflow-hidden rounded-[4px] shadow-card"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src="/images/about-venue.jpg"
                alt="Qızıl Qaya Hall - Premium toy və tədbir mərkəzi"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-emerald-border"
        >
          <div className="text-center">
            <div
              className="stat-number font-heading text-[36px] text-parchment"
              data-target="500"
            >
              0
            </div>
            <div className="font-body text-[14px] text-gold-muted uppercase tracking-[0.1em] mt-2">
              Qonaq Tutumu
            </div>
          </div>
          <div className="text-center">
            <div
              className="stat-number font-heading text-[36px] text-parchment"
              data-target="15"
            >
              0
            </div>
            <div className="font-body text-[14px] text-gold-muted uppercase tracking-[0.1em] mt-2">
              İllik Təcrübə
            </div>
          </div>
          <div className="text-center">
            <div
              className="stat-number font-heading text-[36px] text-parchment"
              data-target="1000"
            >
              0
            </div>
            <div className="font-body text-[14px] text-gold-muted uppercase tracking-[0.1em] mt-2">
              Xoşbəxt Cütlük
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
