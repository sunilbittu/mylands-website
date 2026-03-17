import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { FormEvent } from 'react'
import { useMagnetic } from '../hooks/useMagnetic'

gsap.registerPlugin(ScrollTrigger)

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useMagnetic(0.25)
  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const bigTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big text parallax
      gsap.to(bigTextRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <section ref={sectionRef} id="contact" className="py-20 sm:py-32 md:py-44 px-4 sm:px-6 md:px-12 bg-cream relative overflow-hidden">
      {/* Giant background text */}
      <div ref={bigTextRef} className="absolute -top-20 left-0 w-full pointer-events-none select-none overflow-hidden">
        <span className="font-heading text-[8rem] sm:text-[12rem] md:text-[18rem] lg:text-[22rem] text-charcoal/[0.015] block whitespace-nowrap leading-none tracking-tight">
          Let's Talk
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-accent font-heading text-lg">06</span>
          <span className="w-12 h-[1px] bg-accent/40" />
          <span className="text-warm-gray text-xs uppercase tracking-[0.4em]">Get in Touch</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal leading-[1.08] mb-6 sm:mb-8"
            >
              Let's build
              <br />
              your <span className="italic text-accent">dream</span>
              <br />
              together.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-warm-gray text-sm sm:text-base font-light leading-relaxed mb-10 sm:mb-14 max-w-md"
            >
              Whether you're envisioning a sustainable family home or a sprawling
              farmhouse retreat, we'd love to hear your story.
            </motion.p>

            {/* Contact Info */}
            <div className="space-y-6">
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
                  icon2: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
                  label: 'Office',
                  value: 'Street No. 2, Flat No. 102, SBI Bank Building, CZECH Colony, Opp. Gokul Theatre, Erragadda, Sanathnagar, Hyderabad - 500018',
                  link: 'https://maps.app.goo.gl/X7T3NT75JjPo8mhx6',
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                  label: 'Email',
                  value: 'hello@mylandsconstruction.com',
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                  label: 'Phone',
                  value: '+91 95534 99994',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 group"
                  data-hover
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {item.icon}
                      {item.icon2}
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-warm-gray block mb-1">{item.label}</span>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-charcoal text-sm sm:text-base hover:text-accent transition-colors duration-300">{item.value}</a>
                    ) : (
                      <span className="text-charcoal text-sm sm:text-base">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="group">
                <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-warm-gray block mb-3">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-charcoal/15 py-3 text-charcoal placeholder:text-charcoal/25 focus:border-accent focus:outline-none transition-colors duration-500 text-sm sm:text-base"
                  placeholder="Your name"
                />
              </div>
              <div className="group">
                <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-warm-gray block mb-3">Phone</label>
                <input
                  type="tel"
                  className="w-full bg-transparent border-b border-charcoal/15 py-3 text-charcoal placeholder:text-charcoal/25 focus:border-accent focus:outline-none transition-colors duration-500 text-sm sm:text-base"
                  placeholder="+91"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-warm-gray block mb-3">Email</label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-charcoal/15 py-3 text-charcoal placeholder:text-charcoal/25 focus:border-accent focus:outline-none transition-colors duration-500 text-sm sm:text-base"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-warm-gray block mb-3">Project Type</label>
              <select className="w-full bg-transparent border-b border-charcoal/15 py-3 text-charcoal focus:border-accent focus:outline-none transition-colors duration-500 appearance-none cursor-pointer text-sm sm:text-base">
                <option value="">Select a project type</option>
                <option value="home">Sustainable Home</option>
                <option value="farmhouse">Farmhouse</option>
                <option value="community">Residential Community</option>
                <option value="renovation">Green Renovation</option>
                <option value="land">Land Development</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-warm-gray block mb-3">Your Vision</label>
              <textarea
                rows={3}
                className="w-full bg-transparent border-b border-charcoal/15 py-3 text-charcoal placeholder:text-charcoal/25 focus:border-accent focus:outline-none transition-colors duration-500 resize-none text-sm sm:text-base"
                placeholder="Describe your dream project..."
              />
            </div>

            <MagneticButton>
              <button
                type="submit"
                className="group relative w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-5 bg-primary text-cream text-[13px] uppercase tracking-[0.2em] rounded-full overflow-hidden min-h-[52px]"
                data-hover
                data-cursor-text="Send"
              >
                <span className="relative z-10">Start Your Journey</span>
                <div className="absolute inset-0 bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-out" />
              </button>
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
