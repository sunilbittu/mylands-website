import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCounter } from '../hooks/useCounter'

gsap.registerPlugin(ScrollTrigger)

function StatCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { ref, display } = useCounter(end, 2, suffix)
  return (
    <div className="text-center lg:text-left">
      <span ref={ref} className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary font-bold block tabular-nums">
        {display}
      </span>
      <span className="block text-[10px] sm:text-xs uppercase tracking-[0.2em] text-warm-gray mt-2">
        {label}
      </span>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const imageInnerRef = useRef<HTMLDivElement>(null)
  const textRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image clip reveal + parallax
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 75%',
        },
      })

      tl.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut' }
      )
      .fromTo(
        imageInnerRef.current,
        { scale: 1.4 },
        { scale: 1, duration: 1.4, ease: 'power4.inOut' },
        0
      )

      // Parallax on image inner
      gsap.to(imageInnerRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Text reveals
      textRefs.current.forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el)
    }
  }

  return (
    <section ref={sectionRef} id="about" className="py-20 sm:py-32 md:py-44 px-4 sm:px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12 sm:mb-20"
        >
          <span className="text-accent font-heading text-lg">01</span>
          <span className="w-12 h-[1px] bg-accent/40" />
          <span className="text-warm-gray text-xs uppercase tracking-[0.4em]">About Us</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start">
          {/* Text content */}
          <div>
            <div ref={addToRefs}>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl text-charcoal leading-[1.08] mb-8 sm:mb-10">
                We don't just
                <br />
                build homes.
                <br />
                <span className="italic text-accent">We cultivate</span>
                <br />
                living spaces.
              </h2>
            </div>

            <div ref={addToRefs}>
              <p className="text-warm-gray text-sm sm:text-base md:text-lg leading-[1.8] mb-6 font-light">
                At My Lands Construction, every brick tells a story of sustainability.
                Based in Hyderabad, we specialize in creating homes and farmhouses that
                exist in harmony with nature — using locally sourced materials,
                energy-efficient designs, and traditional craftsmanship passed down
                through generations.
              </p>
            </div>

            <div ref={addToRefs}>
              <p className="text-warm-gray text-sm sm:text-base md:text-lg leading-[1.8] mb-12 sm:mb-16 font-light">
                Our philosophy is simple: the land gives us everything — we owe it
                respect in return. From rainwater harvesting to solar integration,
                from organic gardens to biophilic design, every My Lands home is a
                testament to conscious living.
              </p>
            </div>

            {/* Animated Stats */}
            <div ref={addToRefs} className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <StatCounter end={150} suffix="+" label="Homes Built" />
              <StatCounter end={50} suffix="+" label="Farmhouses" />
              <StatCounter end={12} suffix="+" label="Years Exp" />
              <StatCounter end={98} suffix="%" label="Satisfaction" />
            </div>
          </div>

          {/* Image with reveal */}
          <div className="relative lg:mt-20">
            <div
              ref={imageRef}
              className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <div ref={imageInnerRef} className="w-full h-[120%] -mt-[10%]">
                <div className="w-full h-full bg-gradient-to-br from-[#2d4a37] via-[#1a3025] to-[#0d1f15]" />
                {/* Pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8a96e' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                {/* Text overlay on image */}
                <div className="absolute inset-0 flex items-end p-6 sm:p-10">
                  <div>
                    <span className="text-cream/40 text-xs uppercase tracking-[0.3em] block mb-2">Our Mission</span>
                    <span className="font-heading text-cream/80 text-xl sm:text-2xl italic">
                      "Respect the land,<br />build with purpose."
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 -left-2 sm:-bottom-8 sm:-left-8 bg-accent text-primary px-6 py-5 sm:px-8 sm:py-6 rounded-2xl shadow-xl"
            >
              <span className="font-heading text-xl sm:text-2xl font-semibold block leading-tight">Since</span>
              <span className="font-heading text-3xl sm:text-4xl font-bold">2012</span>
            </motion.div>

            {/* Side decorative line */}
            <div className="hidden lg:block absolute -right-8 top-12 bottom-12 w-[1px] bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
