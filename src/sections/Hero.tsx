import FluidCanvas from '../components/FluidCanvas'
import KineticTitle from '../components/KineticTitle'
import ScrollIndicator from '../components/ScrollIndicator'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const subtitleRef = useRef<HTMLDivElement>(null)
  const [subtitleVisible, setSubtitleVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setSubtitleVisible(true), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '120vh' }}
    >
      <FluidCanvas />

      {/* Light Beams */}
      <div className="light-beams">
        <div className="beam beam-1" />
        <div className="beam beam-2" />
        <div className="beam beam-3" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
        <KineticTitle text="Qızıl Qaya Hall" />

        <div
          ref={subtitleRef}
          className="mt-6 font-heading italic text-gold-muted text-center transition-all duration-1000"
          style={{
            fontSize: 'clamp(16px, 2vw, 22px)',
            opacity: subtitleVisible ? 1 : 0,
            transform: subtitleVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          Azərbaycanın ən prestijli toy və tədbir mərkəzi
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
