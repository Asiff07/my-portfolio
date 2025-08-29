"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

let lenisSingleton: Lenis | null = null

export function getLenis() {
  return lenisSingleton
}

export function getStickyOffset(): number {
  // Try header height; fall back to 72px
  const header = typeof document !== "undefined" ? (document.querySelector("header") as HTMLElement | null) : null
  return header?.offsetHeight ?? 72
}

export default function LenisProvider() {
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    if (!lenisSingleton) {
      lenisSingleton = new Lenis({
        duration: 1.05,
        easing: (t: number) => 1 - Math.pow(1 - t, 3), // cubic out
        smoothWheel: true,
        smoothTouch: false,
        lerp: 0.1,
      })
    }
    const lenis = lenisSingleton

    const raf = (time: number) => {
      lenis?.raf(time)
      rafId.current = requestAnimationFrame(raf)
    }
    rafId.current = requestAnimationFrame(raf)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return null
}
