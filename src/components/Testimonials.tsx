import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

const testimonials = [
  {
    quote: "My Lands didn't just build our farmhouse — they created a sanctuary. The rainwater system alone saves us thousands of liters every monsoon.",
    author: 'Priya & Rajesh Reddy',
    role: 'Homeowners, Shamshabad',
    initials: 'PR',
  },
  {
    quote: "We wanted a home our children could inherit with pride. My Lands delivered beyond imagination — sustainable, beautiful, and deeply connected to the Telangana landscape.",
    author: 'Dr. Kavitha Sharma',
    role: 'Homeowner, Mokila',
    initials: 'KS',
  },
  {
    quote: "Their attention to detail is extraordinary. From window orientation for natural ventilation to the choice of local stone — every decision had purpose and beauty.",
    author: 'Srinivas Rao',
    role: 'Farmhouse Owner, Chevella',
    initials: 'SR',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Progress bar animation
  useEffect(() => {
    if (progressRef.current) {
      gsap.fromTo(progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 6, ease: 'none' }
      )
    }
  }, [active])

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 md:py-44 px-4 sm:px-6 md:px-12 bg-cream-dark relative overflow-hidden">
      {/* Background decorative */}
      <div className="absolute top-20 right-20 w-[300px] h-[300px] rounded-full border border-accent/5" />

      <div className="max-w-[1400px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12 sm:mb-20"
        >
          <span className="text-accent font-heading text-lg">05</span>
          <span className="w-12 h-[1px] bg-accent/40" />
          <span className="text-warm-gray text-xs uppercase tracking-[0.4em]">Testimonials</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
          {/* Quote */}
          <div className="lg:col-span-8">
            <div className="relative">
              {/* Quote mark */}
              <span className="absolute -top-2 -left-2 sm:-top-6 sm:-left-4 font-heading text-[4rem] sm:text-[6rem] md:text-[8rem] leading-none text-accent/[0.07] select-none pointer-events-none">
                &ldquo;
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-charcoal leading-[1.3] mb-8 sm:mb-10">
                    {testimonials[active].quote}
                  </blockquote>
                  <footer className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-accent text-sm font-heading font-bold">{testimonials[active].initials}</span>
                    </div>
                    <div>
                      <span className="font-heading text-base sm:text-lg text-primary font-semibold block">
                        {testimonials[active].author}
                      </span>
                      <span className="text-warm-gray text-xs sm:text-sm">{testimonials[active].role}</span>
                    </div>
                  </footer>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="mt-8 sm:mt-12 w-full max-w-xs h-[2px] bg-charcoal/5 rounded-full overflow-hidden">
                <div ref={progressRef} className="h-full bg-accent origin-left" />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 lg:justify-center overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {testimonials.map((t, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-500 text-left flex-shrink-0 lg:w-full min-w-[200px] sm:min-w-0 ${
                  active === i
                    ? 'bg-primary text-cream shadow-lg shadow-primary/20'
                    : 'bg-transparent text-charcoal hover:bg-charcoal/5'
                }`}
                data-hover
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 font-heading text-sm transition-all duration-500 ${
                  active === i ? 'bg-accent text-primary scale-110' : 'bg-charcoal/10 text-charcoal'
                }`}>
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <span className={`text-sm font-medium block truncate ${active === i ? 'text-cream' : 'text-charcoal'}`}>
                    {t.author}
                  </span>
                  <span className={`text-xs truncate block ${active === i ? 'text-cream/50' : 'text-warm-gray'}`}>
                    {t.role}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
