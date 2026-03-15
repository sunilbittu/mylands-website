import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { step: '01', title: 'Discovery & Vision', description: 'Site visits, soil analysis, and deep consultations to map your sustainable blueprint.', duration: '2-3 Weeks' },
  { step: '02', title: 'Design & Architecture', description: 'Traditional Deccan aesthetics meet modern sustainable design — optimized for light, air, and energy.', duration: '4-6 Weeks' },
  { step: '03', title: 'Material Sourcing', description: '80% of materials sourced within 100km — reclaimed wood, compressed earth blocks, local stone.', duration: '2-4 Weeks' },
  { step: '04', title: 'Construction & Craft', description: 'Skilled craftspeople bring designs to life with transparent timelines and regular updates.', duration: '6-12 Months' },
  { step: '05', title: 'Handover & Beyond', description: 'Garden setup, solar optimization, and lifetime maintenance support for your home.', duration: 'Lifetime' },
]

export default function Process() {
  const lineRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated progress line
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      )

      // Stagger step reveals
      gsap.utils.toArray<HTMLElement>('.process-step').forEach((step) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
          },
        })

        tl.fromTo(step.querySelector('.step-dot'),
          { scale: 0 },
          { scale: 1, duration: 0.5, ease: 'back.out(2)' }
        )
        .fromTo(step.querySelector('.step-content'),
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          0.1
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="py-20 sm:py-32 md:py-44 px-4 sm:px-6 md:px-12 bg-primary relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(200,169,110,0.5) 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-[150px]" />

      <div className="max-w-[1400px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-accent font-heading text-lg">04</span>
          <span className="w-12 h-[1px] bg-accent/40" />
          <span className="text-cream/30 text-xs uppercase tracking-[0.4em]">Our Process</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-cream leading-[1.05] mb-16 sm:mb-28 max-w-3xl"
        >
          From vision to
          <br />
          <span className="italic text-accent">living reality</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative pl-8 sm:pl-12 md:pl-20">
          {/* Animated line */}
          <div className="absolute left-3 sm:left-5 md:left-8 top-0 bottom-0 w-[1px] bg-cream/5">
            <div ref={lineRef} className="absolute inset-0 bg-gradient-to-b from-accent via-accent to-accent/20 origin-top" />
          </div>

          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {steps.map((step) => (
              <div key={step.step} className="process-step relative">
                {/* Dot */}
                <div className="step-dot absolute -left-8 sm:-left-12 md:-left-20 top-1 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-primary border-2 border-accent/30 flex items-center justify-center">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-accent" />
                </div>

                {/* Content */}
                <div className="step-content grid md:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                  <div className="md:col-span-2">
                    <span className="text-accent/40 font-heading text-sm tracking-wider">Step {step.step}</span>
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl text-cream mb-3">{step.title}</h3>
                    <p className="text-cream/40 text-sm sm:text-base font-light leading-relaxed">{step.description}</p>
                  </div>
                  <div className="md:col-span-4 md:text-right">
                    <span className="inline-block px-4 py-2 border border-accent/15 text-accent/60 text-[10px] sm:text-xs uppercase tracking-[0.2em] rounded-full">
                      {step.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
