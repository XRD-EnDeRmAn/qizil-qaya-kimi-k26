import { Routes, Route } from 'react-router'
import { useLenis } from './hooks/useLenis'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Gallery from './sections/Gallery'
import Menu from './sections/Menu'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import CustomCursor from './components/CustomCursor'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Menu />
      <Contact />
    </>
  )
}

function AboutPage() {
  return (
    <>
      <div className="h-[72px]" />
      <About />
      <Services />
      <Contact />
    </>
  )
}

function GalleryPage() {
  return (
    <>
      <div className="h-[72px]" />
      <Gallery />
      <Contact />
    </>
  )
}

function MenuPage() {
  return (
    <>
      <div className="h-[72px]" />
      <Menu />
      <Contact />
    </>
  )
}

export default function App() {
  useLenis()

  return (
    <div className="relative">
      <CustomCursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
