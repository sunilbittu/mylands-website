import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: 'power2.out',
      })

      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    const grow = (text?: string) => {
      gsap.to(ring, {
        width: text ? 120 : 70,
        height: text ? 120 : 70,
        borderColor: 'rgba(200,169,110,0.6)',
        duration: 0.4,
        ease: 'power3.out',
      })
      gsap.to(dot, { scale: 0, duration: 0.3 })
      if (text) setLabel(text)
    }

    const shrink = () => {
      gsap.to(ring, {
        width: 40,
        height: 40,
        borderColor: 'rgba(200,169,110,0.3)',
        duration: 0.4,
        ease: 'power3.out',
      })
      gsap.to(dot, { scale: 1, duration: 0.3 })
      setLabel('')
    }

    document.addEventListener('mousemove', moveCursor)

    const observer = new MutationObserver(() => bindHovers())

    function bindHovers() {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => grow(el.getAttribute('data-cursor-text') || ''))
        el.addEventListener('mouseleave', shrink)
      })
      document.querySelectorAll('[data-cursor-text]').forEach(el => {
        el.addEventListener('mouseenter', () => grow(el.getAttribute('data-cursor-text') || 'View'))
        el.addEventListener('mouseleave', shrink)
      })
    }

    bindHovers()
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="hidden lg:block fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'difference' }}
      />
      <div
        ref={ringRef}
        className="hidden lg:flex fixed top-0 left-0 w-10 h-10 border border-accent/30 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ mixBlendMode: 'difference' }}
      >
        <span
          ref={textRef}
          className="text-cream text-[10px] uppercase tracking-[0.15em] font-medium transition-opacity duration-200"
          style={{ opacity: label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
    </>
  )
}
