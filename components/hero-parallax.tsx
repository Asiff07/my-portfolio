"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { FileDown, Github, Linkedin, Mail, Twitter } from "lucide-react"

type Props = {
  name: string
  role: string
  summary: string
}

export default function HeroParallax({ name, role, summary }: Props) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 400], [0, -40]) // background
  const y2 = useTransform(scrollY, [0, 400], [0, -20]) // mid layer
  const y3 = useTransform(scrollY, [0, 400], [0, -8]) // foreground accents

  const socialColors = {
    github: "#F5F5F5",
    linkedin: "#0A66C2",
    email: "#D1D5DB",
    twitter: "#1DA1F2",
  }

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background texture with lightweight parallax */}
      <motion.div style={{ y: y1 }} aria-hidden className="parallax-bg absolute inset-0 -z-10" />
      {/* Soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_10%,_rgba(59,130,246,0.12),_rgba(0,0,0,0)_60%)]"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-14 md:grid-cols-[1fr_360px] md:py-20">
        <motion.div style={{ y: y2 }} className="space-y-5">
          <p className="text-sm uppercase tracking-widest text-muted-foreground/80">Portfolio</p>
          <h1 className="text-pretty text-3xl font-semibold leading-tight text-foreground md:text-5xl">{name}</h1>
          <p className="text-lg text-muted-foreground">{role}</p>
          <p className="max-w-prose text-pretty text-muted-foreground">{summary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/resume.pdf"
              download
              className="hover-elevate inline-flex items-center gap-2 rounded-md border border-border bg-primary/15 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
            >
              <FileDown className="h-4 w-4" aria-hidden />
              Download Resume
            </a>
            <a
              href="https://github.com/Asiff07"
              target="_blank"
              rel="noreferrer"
              className="hover-elevate inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" aria-hidden style={{ color: socialColors.github }} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/skasifahmed"
              target="_blank"
              rel="noreferrer"
              className="hover-elevate inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" aria-hidden style={{ color: socialColors.linkedin }} />
              LinkedIn
            </a>
            <a
              href="mailto:skasifahmedofficial@gmail.com"
              className="hover-elevate inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" aria-hidden style={{ color: socialColors.email }} />
              Email
            </a>
            <a
              href="https://x.com/skasif_ahmed1"
              target="_blank"
              rel="noreferrer"
              className="hover-elevate inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
              aria-label="X (Twitter)"
            >
              <Twitter className="h-4 w-4" aria-hidden style={{ color: socialColors.twitter }} />X
            </a>
          </div>
        </motion.div>

        <motion.div style={{ y: y3 }} className="mx-auto">
          <div className="relative aspect-square w-56 overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-lg md:w-72">
            <Image
              src="/images/profile.png"
              alt="Portrait of Sk Asif Ahmed"
              fill
              sizes="(max-width: 768px) 224px, 288px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
