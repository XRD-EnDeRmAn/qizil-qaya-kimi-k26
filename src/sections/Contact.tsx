import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word')
        gsap.fromTo(words, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        })
      }

      if (subheadingRef.current) {
        gsap.fromTo(subheadingRef.current, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: subheadingRef.current, start: 'top 85%' },
        })
      }

      if (buttonRef.current) {
        gsap.fromTo(buttonRef.current, { opacity: 0, scale: 0.9 }, {
          opacity: 1, scale: 1, duration: 0.6, delay: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: buttonRef.current, start: 'top 90%' },
        })
      }

      if (contactRef.current) {
        gsap.fromTo(contactRef.current, { opacity: 0 }, {
          opacity: 1, duration: 0.8, delay: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: contactRef.current, start: 'top 95%' },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const headingWords = 'Xəyallarınızdakı toyu planlaşdırın'.split(' ')

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-emerald-deep py-[120px] px-6 lg:px-20 min-h-[80vh] flex items-center justify-center"
    >
      <div className="max-w-[700px] mx-auto text-center">
        <h2
          ref={headingRef}
          className="font-heading font-light text-parchment leading-[1.15] mb-6"
          style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
        >
          {headingWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h2>

        <p
          ref={subheadingRef}
          className="font-body text-[16px] font-light text-gold-muted mb-10"
        >
          Bizimlə əlaqə saxlayın və xüsusi gününüzü birlikdə hazırlayaq
        </p>

        <button
          ref={buttonRef}
          className="font-body text-[14px] uppercase tracking-[0.2em] font-medium text-emerald-deep bg-gold px-12 py-[18px] rounded-[2px] hover:bg-gold-light hover:scale-[1.02] hover:shadow-gold transition-all duration-300 cursor-pointer"
          onClick={() => {
            window.location.href = 'tel:+994000000000'
          }}
        >
          ƏLAQƏ SAXLAYIN
        </button>

        <div
          ref={contactRef}
          className="mt-10 font-body text-[14px] text-gold-muted"
        >
          <span>+994 (00) 000 00 00</span>
          <span className="mx-3 text-gold">•</span>
          <span>info@qizilqaya.az</span>
        </div>
      </div>
    </section>
  )
}
