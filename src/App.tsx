import { useState, useCallback } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import Services from './components/Services'
import Sustainability from './components/Sustainability'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [loaded, setLoaded] = useState(false)

  useSmoothScroll()

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="grain-overlay">
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      {loaded && <ScrollProgress />}
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Services />
        <Sustainability />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
