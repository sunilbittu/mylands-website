import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const bigTextRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bigTextRef.current,
        { xPercent: 10, opacity: 0 },
        {
          xPercent: -5,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: bigTextRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer className="bg-charcoal relative overflow-hidden">
      {/* Big scrolling text */}
      <div className="pt-16 sm:pt-24 pb-12 sm:pb-16 overflow-hidden border-b border-cream/5">
        <h2
          ref={bigTextRef}
          className="font-heading text-5xl sm:text-7xl md:text-[8rem] lg:text-[12rem] text-cream/[0.03] leading-none whitespace-nowrap tracking-tight select-none"
        >
          My Lands Construction — Building Futures
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 mb-16 sm:mb-20">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-accent font-heading text-lg font-bold">M</span>
              </div>
              <div>
                <span className="font-heading text-lg font-semibold text-cream">My Lands</span>
                <span className="block text-[10px] uppercase tracking-[0.3em] text-cream/20 -mt-1">Construction</span>
              </div>
            </div>
            <p className="text-cream/25 text-sm font-light leading-relaxed max-w-xs mb-8">
              Building sustainable homes and farmhouses that honor the land
              and define modern luxury in Hyderabad.
            </p>
            {/* Social icons as circles */}
            <div className="flex gap-3">
              {['Ig', 'Li', 'Yt', 'Fb'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 rounded-full border border-cream/10 flex items-center justify-center text-cream/20 hover:border-accent/40 hover:text-accent text-xs transition-all duration-300 hover:scale-110"
                  data-hover
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="lg:col-span-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent/60 block mb-4 sm:mb-6">Navigate</span>
            <ul className="space-y-3">
              {['About', 'Projects', 'Services', 'Process', 'Contact'].map(link => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-cream/30 hover:text-cream text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                    data-hover
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent/60 block mb-4 sm:mb-6">Services</span>
            <ul className="space-y-3">
              {['Sustainable Homes', 'Farmhouse Development', 'Land Planning', 'Green Renovation', 'Interior Design'].map(item => (
                <li key={item}>
                  <span className="text-cream/30 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-3">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-accent/60 block mb-4 sm:mb-6">Stay Updated</span>
            <p className="text-cream/25 text-sm font-light mb-4">Get insights on sustainable living and new project updates.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-cream/5 border border-cream/10 rounded-l-full px-4 py-3 text-cream text-sm placeholder:text-cream/20 focus:outline-none focus:border-accent/30 transition-colors flex-1 min-w-0"
              />
              <button
                className="px-5 py-3 bg-accent text-primary text-xs uppercase tracking-wider rounded-r-full hover:bg-accent-light transition-colors"
                data-hover
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-cream/15 text-xs">
            &copy; 2024 My Lands Construction. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <a href="#" className="text-cream/15 hover:text-cream/30 text-xs transition-colors" data-hover>Privacy</a>
            <a href="#" className="text-cream/15 hover:text-cream/30 text-xs transition-colors" data-hover>Terms</a>
            <a href="#" className="text-cream/15 hover:text-cream/30 text-xs transition-colors" data-hover>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
