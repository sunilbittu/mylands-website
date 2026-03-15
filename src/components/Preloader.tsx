import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface Props {
  onComplete: () => void
}

export default function Preloader({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const word1Ref = useRef<HTMLSpanElement>(null)
  const word2Ref = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline()

    // Animate words in
    tl.fromTo(
      word1Ref.current,
      { y: 80, opacity: 0, rotateX: 90 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: 'power3.out' },
      0.3
    )
    .fromTo(
      word2Ref.current,
      { y: 80, opacity: 0, rotateX: 90 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: 'power3.out' },
      0.5
    )

    // Count up
    const counter = { val: 0 }
    tl.to(counter, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counter.val)),
    }, 0.2)

    // Progress line
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 2.5, ease: 'power2.inOut' },
      0.2
    )

    // Exit animation
    tl.to([word1Ref.current, word2Ref.current, counterRef.current, lineRef.current], {
      y: -40,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power3.in',
    }, '+=0.3')

    // Wipe out with columns
    tl.to(containerRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1,
      ease: 'power4.inOut',
      onComplete,
    })

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-primary z-[200] flex items-center justify-center"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(200,169,110,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative text-center" style={{ perspective: '800px' }}>
        <div className="overflow-hidden mb-2">
          <span
            ref={word1Ref}
            className="block font-heading text-5xl sm:text-7xl md:text-8xl text-cream tracking-tight"
            style={{ transformOrigin: 'bottom' }}
          >
            My Lands
          </span>
        </div>
        <div className="overflow-hidden">
          <span
            ref={word2Ref}
            className="block text-xs sm:text-sm uppercase tracking-[0.5em] sm:tracking-[0.7em] text-accent"
            style={{ transformOrigin: 'bottom' }}
          >
            Construction
          </span>
        </div>

        <div
          ref={lineRef}
          className="w-48 sm:w-64 h-[1px] bg-accent/40 mx-auto mt-10 origin-left"
        />

        <span
          ref={counterRef}
          className="block mt-6 font-heading text-6xl sm:text-7xl text-accent/20 tabular-nums"
        >
          {count}
        </span>
      </div>

      {/* Corner marks */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-accent/20" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-accent/20" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-accent/20" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-accent/20" />
    </div>
  )
}
