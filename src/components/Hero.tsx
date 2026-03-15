import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroCanvas from './HeroCanvas'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax push on canvas wrapper
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Overlay darkens on scroll
      gsap.to(overlayRef.current, {
        opacity: 0.85,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Heading scale + blur on scroll
      gsap.to(headingRef.current, {
        scale: 0.7,
        opacity: 0,
        filter: 'blur(20px)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '15% top',
          end: '55% top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[100svh] overflow-hidden">
      {/* Animated Canvas Background */}
      <div ref={imageRef} className="absolute inset-0 scale-110">
        <HeroCanvas />
      </div>

      {/* Gradient overlay — darkens on scroll */}
      <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/50" style={{ opacity: 0.2 }} />

      {/* Content */}
      <div ref={headingRef} className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 pt-24 md:pt-28">
        {/* Top tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
          className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10"
        >
          <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-accent" />
          <span className="text-accent/80 text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.5em]">
            Hyderabad's Finest Builders
          </span>
          <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-accent" />
        </motion.div>

        {/* Main heading with staggered reveal */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 3.7, ease: [0.76, 0, 0.24, 1] }}
            className="font-heading text-[2.8rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[8.5rem] text-cream text-center leading-[0.85] tracking-[-0.02em]"
          >
            Building
          </motion.h1>
        </div>
        <div className="overflow-hidden mt-1 sm:mt-2">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 3.85, ease: [0.76, 0, 0.24, 1] }}
            className="font-heading text-[2.8rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[8.5rem] text-center leading-[0.85] tracking-[-0.02em] italic text-accent"
          >
            Sustainable
          </motion.h1>
        </div>
        <div className="overflow-hidden mt-1 sm:mt-2">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 4.0, ease: [0.76, 0, 0.24, 1] }}
            className="font-heading text-[2.8rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[8.5rem] text-cream text-center leading-[0.85] tracking-[-0.02em]"
          >
            Futures
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.5 }}
          className="mt-8 sm:mt-12 text-cream/50 text-sm sm:text-base md:text-lg max-w-md sm:max-w-xl text-center font-light leading-relaxed"
        >
          Crafting eco-conscious homes & farmhouses that honor the land,
          embrace tradition, and define modern luxury in Hyderabad.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.8 }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto px-4 sm:px-0"
        >
          <a
            href="#projects"
            className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-accent text-primary font-medium text-[13px] uppercase tracking-[0.15em] rounded-full overflow-hidden text-center min-h-[52px] flex items-center justify-center"
            data-hover
            data-cursor-text="Explore"
          >
            <span className="relative z-10">Explore Projects</span>
            <div className="absolute inset-0 bg-accent-light scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
          </a>
          <a
            href="#about"
            className="group px-8 sm:px-10 py-4 sm:py-5 border border-cream/20 text-cream text-[13px] uppercase tracking-[0.15em] rounded-full hover:bg-cream/5 transition-all duration-500 text-center min-h-[52px] flex items-center justify-center hover:border-cream/40"
            data-hover
          >
            Our Story
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.5, duration: 1 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-cream/30 text-[10px] uppercase tracking-[0.4em]">Scroll to explore</span>
          <div className="w-5 h-9 border border-cream/20 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1 rounded-full bg-accent"
            />
          </div>
        </motion.div>
      </div>

      {/* Side label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4"
      >
        <span className="text-cream/15 text-[10px] uppercase tracking-[0.5em] [writing-mode:vertical-lr]">
          Est. 2012 — Hyderabad
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-accent/30 to-transparent" />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cream to-transparent z-10" />
    </section>
  )
}
