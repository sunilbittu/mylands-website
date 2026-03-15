import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 3.5 }
      )
    }
  }, [])

  // Lock body when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
          scrolled
            ? 'bg-cream/80 backdrop-blur-xl shadow-[0_1px_0_rgba(200,169,110,0.15)]'
            : 'bg-transparent'
        }`}
        style={{ opacity: 0 }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between h-20 md:h-24">
          <a href="#" className="flex items-center gap-3 group" data-hover>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <span className="text-accent font-heading text-lg font-bold">M</span>
            </div>
            <div>
              <span className={`font-heading text-xl font-semibold tracking-tight transition-colors duration-500 ${scrolled ? 'text-charcoal' : 'text-cream'}`}>
                My Lands
              </span>
              <span className={`block text-[10px] uppercase tracking-[0.3em] -mt-1 transition-colors duration-500 ${scrolled ? 'text-warm-gray' : 'text-cream/50'}`}>
                Construction
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[13px] uppercase tracking-[0.15em] transition-colors duration-300 relative group ${
                  scrolled ? 'text-warm-gray hover:text-charcoal' : 'text-cream/60 hover:text-cream'
                }`}
                data-hover
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-500 ease-out" />
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 px-6 py-3 bg-accent text-primary text-[13px] uppercase tracking-[0.15em] rounded-full hover:bg-accent-light hover:scale-105 transition-all duration-300"
              data-hover
            >
              Start a Project
            </a>
          </div>

          <button
            className="lg:hidden flex flex-col gap-1.5 w-11 h-11 items-center justify-center relative z-[101]"
            onClick={() => setIsOpen(!isOpen)}
            data-hover
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 5, backgroundColor: '#f5f0e8' } : { rotate: 0, y: 0, backgroundColor: scrolled ? '#1c1c1c' : '#f5f0e8' }}
              className="block w-6 h-[1.5px] origin-center"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-6 h-[1.5px]"
              style={{ backgroundColor: scrolled ? '#1c1c1c' : '#f5f0e8' }}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -5, backgroundColor: '#f5f0e8' } : { rotate: 0, y: 0, backgroundColor: scrolled ? '#1c1c1c' : '#f5f0e8' }}
              className="block w-6 h-[1.5px] origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-primary z-[99] flex items-center justify-center"
          >
            {/* Background number */}
            <span className="absolute right-8 bottom-8 font-heading text-[20rem] leading-none text-cream/[0.02] select-none">
              M
            </span>

            <div className="flex flex-col items-center gap-4 sm:gap-6">
              {navLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    className="font-heading text-4xl sm:text-5xl md:text-7xl text-cream hover:text-accent transition-colors duration-300 block"
                    onClick={() => setIsOpen(false)}
                    data-hover
                  >
                    {link.name}
                  </motion.a>
                </div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-8 flex flex-col items-center gap-4"
              >
                <span className="text-cream/20 text-xs uppercase tracking-[0.3em]">Follow us</span>
                <div className="flex gap-6">
                  {['Instagram', 'LinkedIn', 'YouTube'].map(s => (
                    <a key={s} href="#" className="text-cream/40 hover:text-accent text-sm transition-colors" data-hover>{s}</a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
