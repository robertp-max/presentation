import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  durationMs?: number
  className?: string
}

export const AnimatedCounter = ({ value, suffix = '', durationMs = 1200, className }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!inView) {
      return
    }

    let frameId = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(value * eased))
      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [durationMs, inView, value])

  return (
    <span ref={ref} className={`counter-pop ${className ?? ''}`}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}