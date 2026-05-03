import { useEffect, useState } from 'react'

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
      <div className="w-[1px] h-6 bg-gold scroll-indicator-line" />
      <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gold-muted">
        Aşağı scroll edin
      </span>
    </div>
  )
}
