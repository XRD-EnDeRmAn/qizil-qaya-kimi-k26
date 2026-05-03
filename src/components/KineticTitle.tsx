import { useEffect, useRef } from 'react'

function splitTextToChars(element: HTMLElement): HTMLElement[] {
  const text = element.textContent || ''
  element.innerHTML = ''
  const chars: HTMLElement[] = []
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span')
    span.className = 'char'
    if (text[i] === ' ') {
      span.innerHTML = '&nbsp;'
    } else {
      span.textContent = text[i]
    }
    element.appendChild(span)
    chars.push(span)
  }
  return chars
}

function animateKineticTitle(chars: HTMLElement[], delay = 600, stagger = 100) {
  chars.forEach((char, index) => {
    setTimeout(() => {
      char.classList.add('revealed')
    }, delay + index * stagger)
  })
}

interface KineticTitleProps {
  text: string
  className?: string
}

export default function KineticTitle({ text, className = '' }: KineticTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || hasAnimated.current) return

    const waitForFonts = async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready
      }
      const titleEl = container.querySelector('.kinetic-title-inner') as HTMLElement
      if (titleEl) {
        const chars = splitTextToChars(titleEl)
        animateKineticTitle(chars, 600, 100)
        hasAnimated.current = true
      }
    }

    waitForFonts()
  }, [text])

  return (
    <div ref={containerRef} className={`kinetic-title ${className}`}>
      <div className="kinetic-title-inner font-display font-bold text-parchment"
        style={{
          fontSize: 'clamp(48px, 8vw, 96px)',
          textShadow: '0 0 60px rgba(212, 175, 55, 0.3)',
          lineHeight: 1.1,
        }}
      >
        {text}
      </div>
    </div>
  )
}
