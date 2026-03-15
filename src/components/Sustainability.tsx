import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCounter } from '../hooks/useCounter'

gsap.registerPlugin(ScrollTrigger)

function PillarCard({ icon, title, stat, suffix, description, index }: {
  icon: React.ReactNode; title: string; stat: number; suffix: string; description: string; index: number
}) {
  const { ref, display } = useCounter(stat, 2.5, suffix)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      viewport={{ once: true }}
      className="group bg-cream rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 hover:bg-primary transition-all duration-700 cursor-pointer relative overflow-hidden"
      data-hover
    >
      {/* Hover glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/0 group-hover:bg-accent/10 rounded-full blur-3xl transition-all duration-700" />

      <div className="relative">
        <div className="text-primary/60 group-hover:text-accent transition-colors duration-500 mb-4 sm:mb-6">
          {icon}
        </div>
        <span
          ref={ref}
          className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-primary group-hover:text-accent transition-colors duration-500 block mb-1 tabular-nums"
        >
          {display}
        </span>
        <h3 className="font-heading text-base sm:text-lg text-charcoal group-hover:text-cream transition-colors duration-500 mb-2 sm:mb-3">
          {title}
        </h3>
        <p className="text-warm-gray group-hover:text-cream/50 text-xs sm:text-sm font-light leading-relaxed transition-colors duration-500">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

const pillars = [
  {
    icon: <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    title: 'Solar Powered', stat: 100, suffix: '%',
    description: 'Every home designed for maximum solar energy capture with integrated panel systems.',
  },
  {
    icon: <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
    title: 'Water Recycled', stat: 85, suffix: '%',
    description: 'Advanced rainwater harvesting and greywater recycling in every project.',
  },
  {
    icon: <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Local Materials', stat: 80, suffix: '%',
    description: 'Materials sourced within 100km, supporting local economy and reducing emissions.',
  },
  {
    icon: <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    title: 'Carbon Reduced', stat: 60, suffix: '%',
    description: 'Lower carbon footprint compared to conventional construction methods.',
  },
]

export default function Sustainability() {
  const bgRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax bg shift
      gsap.to(bgRef.current, {
        backgroundPosition: '50% 30%',
        ease: 'none',
        scrollTrigger: {
          trigger: bgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={bgRef}
      className="py-20 sm:py-32 md:py-44 px-4 sm:px-6 md:px-12 bg-sage/10 relative overflow-hidden"
      style={{ backgroundPosition: '50% 70%' }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-accent/5" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full border border-accent/5" />

      <div className="max-w-[1400px] mx-auto relative">
        <div className="text-center mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-8 sm:w-12 h-[1px] bg-accent/40" />
            <span className="text-accent text-[10px] sm:text-xs uppercase tracking-[0.4em]">Sustainability Impact</span>
            <span className="w-8 sm:w-12 h-[1px] bg-accent/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal leading-[1.1]"
          >
            Building for the <span className="italic text-primary-light">planet</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {pillars.map((p, i) => (
            <PillarCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
