import { useNavigate } from 'react-router'

const quickLinks = [
  { label: 'Ana Səhifə', href: '/' },
  { label: 'Haqqımızda', href: '/about' },
  { label: 'Qalereya', href: '/gallery' },
  { label: 'Menyu', href: '/menu' },
  { label: 'Əlaqə', href: '/#contact' },
]

export default function Footer() {
  const navigate = useNavigate()

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      navigate('/')
      setTimeout(() => {
        const id = href.replace('/#', '')
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      navigate(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-[#080F0C] py-[60px] px-6 lg:px-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left - Logo & Address */}
          <div>
            <h3 className="font-heading font-semibold text-[20px] text-gold mb-4">
              Qızıl Qaya Hall
            </h3>
            <p className="font-body text-[13px] text-gold-muted leading-[1.8]">
              Bakı, Azərbaycan<br />
              (Dəqiq ünvan müştəri tərəfindən təmin ediləcək)
            </p>
          </div>

          {/* Center - Quick Links */}
          <div className="flex flex-col gap-3">
            {quickLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-body text-[13px] text-gold-muted hover:text-gold-light transition-colors duration-300 text-left cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right - Social Icons */}
          <div className="flex gap-4 items-start">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-muted hover:text-gold hover:-translate-y-0.5 transition-all duration-300"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-muted hover:text-gold hover:-translate-y-0.5 transition-all duration-300"
              aria-label="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://wa.me/994000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-muted hover:text-gold hover:-translate-y-0.5 transition-all duration-300"
              aria-label="WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-border pt-6">
          <p className="font-body text-[12px] text-gold-muted text-center">
            © 2025 Qızıl Qaya Hall. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  )
}
