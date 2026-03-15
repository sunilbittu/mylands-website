import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Serenity Farmhouse',
    location: 'Shamshabad',
    category: 'Farmhouse',
    area: '4,500 sq ft',
    year: '2024',
    description: 'A sprawling farmhouse estate with organic gardens, rainwater harvesting, and solar-powered living spaces.',
    gradient: 'from-[#2d4a37] via-[#1a3025] to-[#0f1d16]',
  },
  {
    title: 'Horizon Villa',
    location: 'Mokila',
    category: 'Luxury Home',
    area: '3,200 sq ft',
    year: '2023',
    description: 'Contemporary sustainable villa with passive cooling, green roof, and locally sourced stone facades.',
    gradient: 'from-[#5a4630] via-[#8b6f47] to-[#3d2f1e]',
  },
  {
    title: 'Terra Green',
    location: 'Shankarpally',
    category: 'Community',
    area: '25 Acres',
    year: '2024',
    description: 'A gated community of 40 eco-homes with shared organic farms, EV charging, and community solar.',
    gradient: 'from-[#1a2f23] via-[#2d4a37] to-[#0d1f15]',
  },
  {
    title: 'Vana Retreat',
    location: 'Chevella',
    category: 'Weekend Home',
    area: '6,000 sq ft',
    year: '2023',
    description: 'A weekend retreat blending Deccan architecture with modern amenities surrounded by restored forest.',
    gradient: 'from-[#3d5a3d] via-[#4a6741] to-[#2d4a37]',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      // Horizontal scroll
      const totalWidth = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="bg-charcoal overflow-hidden">
      <div ref={trackRef} className="horizontal-scroll-track h-screen items-center">
        {/* Header panel */}
        <div className="flex-shrink-0 w-screen h-screen flex items-center px-6 sm:px-12 md:px-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-accent font-heading text-lg">02</span>
              <span className="w-12 h-[1px] bg-accent/40" />
              <span className="text-cream/30 text-xs uppercase tracking-[0.4em]">Featured Work</span>
            </motion.div>

            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-cream leading-[0.95] mb-8">
              Spaces
              <br />
              that
              <br />
              <span className="italic text-accent">breathe</span>
              <br />
              life.
            </h2>

            <p className="text-cream/30 text-sm sm:text-base max-w-sm font-light leading-relaxed mb-10">
              Each project is a unique dialogue between architecture and nature. Scroll to explore.
            </p>

            <div className="flex items-center gap-3 text-accent/40">
              <span className="text-xs uppercase tracking-[0.3em]">Drag</span>
              <svg className="w-20 h-[1px]" viewBox="0 0 80 1">
                <line x1="0" y1="0.5" x2="80" y2="0.5" stroke="currentColor" strokeWidth="1" />
              </svg>
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Project cards */}
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[55vw] lg:w-[45vw] h-screen flex items-center px-4 sm:px-6"
          >
            <div
              className="group relative w-full h-[70vh] sm:h-[75vh] rounded-2xl sm:rounded-3xl overflow-hidden"
              data-hover
              data-cursor-text="View"
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 group-hover:scale-105`}>
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(200,169,110,0.6) 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />
              </div>

              {/* Large background number */}
              <span className="absolute top-6 right-6 sm:top-8 sm:right-8 font-heading text-[8rem] sm:text-[12rem] md:text-[16rem] leading-none text-cream/[0.02] select-none font-bold">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Content */}
              <div className="absolute inset-0 p-6 sm:p-8 md:p-12 flex flex-col justify-between">
                {/* Top */}
                <div className="flex items-start justify-between">
                  <span className="px-3 py-1.5 bg-cream/10 backdrop-blur-sm text-cream/70 text-[10px] sm:text-xs uppercase tracking-[0.2em] rounded-full border border-cream/10">
                    {project.category}
                  </span>
                  <span className="text-cream/20 font-heading text-sm">{project.year}</span>
                </div>

                {/* Bottom */}
                <div>
                  <div className="transform group-hover:-translate-y-6 transition-transform duration-700 ease-out">
                    <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl text-cream mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                      <span className="text-cream/40 text-xs sm:text-sm">{project.location}</span>
                      <span className="w-1 h-1 rounded-full bg-accent/60" />
                      <span className="text-cream/40 text-xs sm:text-sm">{project.area}</span>
                    </div>
                  </div>

                  <p className="text-cream/0 group-hover:text-cream/50 text-sm font-light leading-relaxed max-w-sm transition-all duration-700 transform translate-y-6 group-hover:translate-y-0">
                    {project.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-accent via-accent to-transparent transition-all duration-1000" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* End panel */}
        <div className="flex-shrink-0 w-[50vw] sm:w-[40vw] h-screen flex items-center justify-center">
          <a
            href="#contact"
            className="flex flex-col items-center gap-4 group"
            data-hover
            data-cursor-text="Let's Talk"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-cream/10 flex items-center justify-center group-hover:border-accent/40 group-hover:scale-110 transition-all duration-500">
              <svg className="w-6 h-6 text-cream/30 group-hover:text-accent transition-colors duration-500 -rotate-45 group-hover:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <span className="text-cream/20 text-xs uppercase tracking-[0.3em] group-hover:text-cream/40 transition-colors">
              Start a Project
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
