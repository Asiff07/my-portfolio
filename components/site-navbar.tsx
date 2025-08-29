"use client"

import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { User, Briefcase, Wrench, GraduationCap, Boxes, Mail, Menu } from "lucide-react"
import { getLenis, getStickyOffset } from "@/components/lenis-provider"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  { href: "#about", label: "About", Icon: User },
  { href: "#experience", label: "Experience", Icon: Briefcase },
  { href: "#education", label: "Education", Icon: GraduationCap },
  { href: "#skills", label: "Skills", Icon: Wrench },
  { href: "#projects", label: "Projects", Icon: Boxes },
  { href: "#contact", label: "Contact", Icon: Mail },
]

function handleAnchorClick(e: React.MouseEvent, href: string) {
  if (!href.startsWith("#")) return
  const id = href.slice(1)
  const el = document.getElementById(id)
  if (!el) return
  e.preventDefault()
  const offset = getStickyOffset()
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(el, { offset: -offset })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: "smooth" })
  }
  // Optional: keep URL hash in sync
  history.replaceState(null, "", href)
}

export function SiteNavbar({ className }: { className?: string }) {
  return (
    <header
      role="banner"
      aria-label="Primary"
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "border-border",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16">
        {/* Brand */}
        <Link
          href="#home"
          onClick={(e) => handleAnchorClick(e, "#home")}
          className="flex items-center gap-2"
          aria-label="Go to home"
        >
          <span className="font-semibold tracking-tight text-foreground">Sk Asif Ahmed</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex sm:items-center sm:gap-6">
          <nav className="flex items-center gap-4 sm:gap-6" aria-label="Main navigation">
            {NAV_ITEMS.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleAnchorClick(e, href)}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>


        {/* Mobile nav */}
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>
                  <nav className="flex flex-col items-start gap-4 pt-4">
                    {NAV_ITEMS.map(({ href, label, Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={(e) => handleAnchorClick(e, href)}
                        className="inline-flex items-center gap-2 text-lg text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        <span>{label}</span>
                      </Link>
                    ))}
                  </nav>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}