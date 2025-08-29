"use client"

import Image from "next/image"
import { motion, useTransform, useScroll } from "framer-motion"
import { useRef } from "react"

type Props = {
  src: string
  alt: string
  size?: number // px square
}

export function HeroPortrait({ src, alt, size = 160 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 16]) // subtle vertical drift

  return (
    <div ref={ref} className="relative inline-block">
      {/* background layers */}
      <motion.div aria-hidden style={{ y }} className="pointer-events-none absolute inset-[-14%] rounded-[28px]">
        {/* subtle blue glow as accent within the 4-color palette */}
        <div
          className="absolute inset-0 rounded-[28px] opacity-70"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 40%, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0.06) 45%, rgba(59,130,246,0.0) 70%)",
          }}
        />
        {/* fine grid mask for modern feel */}
        <div
          className="absolute inset-0 rounded-[28px] opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(156,163,175,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(156,163,175,0.22) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
            maskImage:
              "radial-gradient(70% 70% at 50% 40%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 75%)",
            WebkitMaskImage:
              "radial-gradient(70% 70% at 50% 40%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 75%)",
          }}
        />
      </motion.div>

      {/* portrait with neutral grey ring per your outline request */}
      <div
        className="relative rounded-3xl border bg-background/60"
        style={{ width: size, height: size, borderColor: "rgba(148,163,184,0.35)" }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={size}
          height={size}
          className="rounded-3xl object-cover"
          priority
        />
        {/* subtle inner ring */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(148,163,184,0.25)",
          }}
        />
      </div>
    </div>
  )
}
