import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'

const navLinks = [
  { label: 'Ana Səhifə', href: '/' },
  { label: 'Haqqımızda', href: '/about' },
  { label: 'Qalereya', href: '/gallery' },
  { label: 'Menyu', href: '/menu' },
  { label: 'Əlaqə', href: '/#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3500)
    return () => clearTimeout(timer)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const id = href.replace('/#', '')
          const el = document.getElementById(id)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      } else {
        const id = href.replace('/#', '')
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[1000] h-[72px] flex items-center justify-between px-6 lg:px-20"
        style={{
          background: 'rgba(10, 31, 21, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <button
          onClick={() => handleNavClick('/')}
          className="font-heading font-semibold text-gold text-[20px] tracking-[0.15em] uppercase cursor-pointer"
        >
          Qızıl Qaya
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="relative font-body text-[13px] uppercase tracking-[0.1em] text-gold-muted hover:text-gold-light transition-colors duration-300 cursor-pointer group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(-10px)',
                transition: `opacity 600ms ease, transform 600ms ease`,
                transitionDelay: `${index * 80}ms`,
              }}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[6px] cursor-pointer z-[1001]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="w-6 h-[2px] bg-gold transition-transform duration-300"
            style={{
              transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
            }}
          />
          <span
            className="w-6 h-[2px] bg-gold transition-opacity duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="w-6 h-[2px] bg-gold transition-transform duration-300"
            style={{
              transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="font-heading text-[28px] text-parchment hover:text-gold transition-colors duration-300 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}
