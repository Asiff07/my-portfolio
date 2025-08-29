"use client"

import { cn } from "@/lib/utils"
import type { IconType } from "react-icons"
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiDocker,
  SiKubernetes,
  SiMui,
  SiBootstrap,
  SiShadcnui,
  SiHeroku,
  SiNetlify,
  SiVercel,
} from "react-icons/si"
import { FaAws } from "react-icons/fa"

export type Tech =
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "TypeScript"
  | "React"
  | "Next.js"
  | "Tailwind CSS"
  | "Redux"
  | "Node.js"
  | "Express.js"
  | "MongoDB"
  | "PostgreSQL"
  | "Git"
  | "GitHub"
  | "Docker"
  | "Kubernetes"
  | "AWS"
  | "Material UI"
  | "Bootstrap"
  | "ShadCN"
  | "Vercel"
  | "Heroku"
  | "Netlify"

export const techIconMap: Record<Tech, { icon: IconType; color: string }> = {
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: SiCss3, color: "#1572B6" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38BDF8" },
  Redux: { icon: SiRedux, color: "#764ABC" },
  "Node.js": { icon: SiNodedotjs, color: "#3C873A" },
  "Express.js": { icon: SiExpress, color: "#FFFFFF" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  PostgreSQL: { icon: SiPostgresql, color: "#336791" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#FFFFFF" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Kubernetes: { icon: SiKubernetes, color: "#326CE5" },
  AWS: { icon: FaAws, color: "#FF9900" }, // using FaAws to avoid missing export
  "Material UI": { icon: SiMui, color: "#007FFF" },
  Bootstrap: { icon: SiBootstrap, color: "#7952B3" },
  ShadCN: { icon: SiShadcnui, color: "#FFFFFF" },
  Vercel: { icon: SiVercel, color: "#FFFFFF" },
  Heroku: { icon: SiHeroku, color: "#430098" },
  Netlify: { icon: SiNetlify, color: "#00C7B7" },
}

export function TechBadge({ name, className }: { name: Tech; className?: string }) {
  const data = techIconMap[name]
  if (!data) return null
  const Icon = data.icon
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/10 px-3 py-1 text-xs",
        "hover:border-border hover:bg-muted/20 transition-colors",
        className,
      )}
      aria-label={`${name} technology`}
      title={name}
    >
      <Icon style={{ color: data.color }} className="h-4 w-4" />
      <span className="text-foreground/90">{name}</span>
    </span>
  )
}
