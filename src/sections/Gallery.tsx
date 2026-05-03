import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/images/gallery-1.jpg', alt: 'Qızıl Qaya Hall - Böyük pilləkən', caption: 'Böyük Pilləkən' },
  { src: '/images/gallery-2.jpg', alt: 'Qızıl Qaya Hall - Ziyafət masası tərtibatı', caption: 'Ziyafət Tərtibatı' },
  { src: '/images/gallery-3.jpg', alt: 'Qızıl Qaya Hall - Lüks lobi', caption: 'Lüks Lobi' },
  { src: '/images/gallery-4.jpg', alt: 'Qızıl Qaya Hall - Toy mərhələsi', caption: 'Toy Mərhələsi' },
  { src: '/images/gallery-5.jpg', alt: 'Qızıl Qaya Hall - Tavan detalları', caption: 'Tavan Detalları' },
  { src: '/images/gallery-6.jpg', alt: 'Qızıl Qaya Hall - Xarici terras', caption: 'Xarici Terras' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

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

      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: subtitleRef.current, start: 'top 85%' },
        })
      }

      if (imagesRef.current) {
        const items = imagesRef.current.querySelectorAll('.gallery-item')
        gsap.fromTo(items, { opacity: 0, scale: 0.95 }, {
          opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: imagesRef.current, start: 'top 75%' },
        })

        // Parallax effect for each image wrapper
        items.forEach((item, index) => {
          const speed = index % 3 === 0 ? 0.9 : index % 3 === 1 ? 1.0 : 1.1
          gsap.to(item, {
            y: () => (speed - 1) * 50,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-emerald-deep py-[120px] px-6 lg:px-20"
    >
      <div className="max-w-[1200px] mx-auto">
        <div ref={eyebrowRef} className="mb-6">
          <span className="font-body text-[11px] uppercase tracking-[0.25em] text-gold">
            XATİRƏLƏR
          </span>
        </div>

        <h2
          ref={headingRef}
          className="font-heading font-light text-parchment mb-4"
          style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
        >
          Gözəlliyin hər kadrı
        </h2>

        <p
          ref={subtitleRef}
          className="font-body text-[16px] font-light text-gold-muted mb-12"
        >
          Minlərlə xoşbəxt ananın şahidi olduq
        </p>

        <div
          ref={imagesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`gallery-item group relative overflow-hidden rounded-[4px] cursor-pointer ${
                index === 0 || index === 3 ? 'md:row-span-2' : ''
              }`}
              style={{ aspectRatio: index === 0 || index === 3 ? '3/4' : '4/3' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,31,21,0.6)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-4 left-4 font-heading italic text-[14px] text-parchment opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                {image.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
