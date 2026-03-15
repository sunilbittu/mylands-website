import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Sustainable Home Construction',
    description: 'Energy-efficient homes built with locally sourced, eco-friendly materials. Every element designed for minimal impact and maximum comfort.',
    features: ['Passive Solar Design', 'Rainwater Harvesting', 'Green Insulation'],
  },
  {
    num: '02',
    title: 'Farmhouse Development',
    description: 'Luxury farmhouses blending rural charm with modern amenities. Complete with organic gardens, natural pool systems, and off-grid capability.',
    features: ['Organic Farm Setup', 'Natural Pools', 'Off-Grid Ready'],
  },
  {
    num: '03',
    title: 'Land Development & Planning',
    description: 'Expert land assessment and development. We transform raw land into thriving communities with respect for natural topology.',
    features: ['Soil Analysis', 'Water Assessment', 'Eco-Zoning'],
  },
  {
    num: '04',
    title: 'Green Renovation',
    description: 'Transform existing structures into sustainable living spaces. Solar panels, improved insulation, water recycling, and biophilic design.',
    features: ['Solar Integration', 'Waste Reduction', 'Energy Audit'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.service-item').forEach((item) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          },
        })

        tl.fromTo(item.querySelector('.service-line'),
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.inOut' }
        )
        .fromTo(item.querySelector('.service-content'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          0.3
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-20 sm:py-32 md:py-44 px-4 sm:px-6 md:px-12 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-accent font-heading text-lg">03</span>
          <span className="w-12 h-[1px] bg-accent/40" />
          <span className="text-warm-gray text-xs uppercase tracking-[0.4em]">What We Do</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-charcoal leading-[1.05] mb-16 sm:mb-24 max-w-4xl"
        >
          Services built on
          <br />
          <span className="italic text-accent">trust & tradition</span>
        </motion.h2>

        <div>
          {services.map((service) => (
            <div key={service.num} className="service-item" data-hover>
              <div className="service-line h-[1px] bg-charcoal/10 origin-left" />
              <div className="service-content py-8 sm:py-10 md:py-14">
                <div className="grid md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 items-start group cursor-pointer">
                  {/* Number */}
                  <div className="md:col-span-1 flex items-center gap-3 md:block">
                    <span className="font-heading text-2xl sm:text-3xl text-accent/30 group-hover:text-accent transition-colors duration-700">
                      {service.num}
                    </span>
                    <span className="md:hidden font-heading text-xl sm:text-2xl text-charcoal">{service.title}</span>
                  </div>

                  {/* Title (desktop) */}
                  <div className="hidden md:block md:col-span-4">
                    <h3 className="font-heading text-2xl lg:text-3xl text-charcoal group-hover:text-primary transition-colors duration-700 leading-tight">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-5">
                    <p className="text-warm-gray text-sm sm:text-base font-light leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((f) => (
                        <span
                          key={f}
                          className="px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.1em] text-primary/50 border border-primary/10 rounded-full group-hover:border-accent/40 group-hover:text-accent/80 transition-all duration-700"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex md:col-span-2 justify-end">
                    <div className="w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-700">
                      <svg
                        className="w-5 h-5 text-charcoal/20 group-hover:text-cream -rotate-45 group-hover:rotate-0 transition-all duration-700"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="h-[1px] bg-charcoal/10" />
        </div>
      </div>
    </section>
  )
}
