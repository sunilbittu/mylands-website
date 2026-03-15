import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const row1 = [
  'Sustainable Homes',
  'Farmhouses',
  'Eco Architecture',
  'Green Living',
  'Luxury Villas',
  'Land Development',
  'Modern Design',
  'Heritage Craft',
]

const row2 = [
  'Solar Integration',
  'Rainwater Harvesting',
  'Biophilic Design',
  'Organic Gardens',
  'Net Zero Homes',
  'Local Materials',
  'Passive Cooling',
  'Smart Homes',
]

export default function Marquee() {
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Skew on scroll velocity
      ScrollTrigger.create({
        trigger: track1Ref.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const skew = self.getVelocity() / -300
          gsap.to([track1Ref.current, track2Ref.current], {
            skewX: Math.max(-5, Math.min(5, skew)),
            duration: 0.3,
            ease: 'power2.out',
          })
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="py-10 sm:py-16 md:py-20 overflow-hidden bg-cream relative">
      {/* Row 1 */}
      <div ref={track1Ref} className="mb-4 sm:mb-6">
        <div className="marquee-track">
          {[...row1, ...row1].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 px-4 sm:px-6 md:px-8 text-charcoal/[0.08] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading whitespace-nowrap flex items-center gap-4 sm:gap-6 md:gap-8 select-none"
            >
              {item}
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-accent/30 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 - reverse */}
      <div ref={track2Ref}>
        <div className="marquee-track marquee-reverse">
          {[...row2, ...row2].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 px-4 sm:px-6 md:px-8 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading whitespace-nowrap flex items-center gap-4 sm:gap-6 md:gap-8 select-none italic text-accent/[0.08]"
            >
              {item}
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent/20 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
