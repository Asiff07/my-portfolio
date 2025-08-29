"use client"

import { useEffect, useMemo, useState } from "react"

type Props = {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
  className?: string
  ariaLabel?: string
  loop?: boolean
}

export function Typewriter({
  words,
  typingSpeed = 60,
  deletingSpeed = 40,
  pauseMs = 1200,
  className,
  ariaLabel = "Rotating roles",
  loop = true,
}: Props) {
  const list = useMemo(() => (words?.length ? words : [""]), [words])
  const [i, setI] = useState(0)
  const [sub, setSub] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const current = list[i] ?? ""
    let t: number

    if (!del && sub === current.length) {
      t = window.setTimeout(() => setDel(true), pauseMs)
      return () => clearTimeout(t)
    }
    if (del && sub === 0) {
      if (i + 1 >= list.length && !loop) return
      setI((v) => (v + 1) % list.length)
      setDel(false)
    }

    t = window.setTimeout(() => setSub((v) => v + (del ? -1 : 1)), del ? deletingSpeed : typingSpeed)
    return () => clearTimeout(t)
  }, [del, sub, i, list, typingSpeed, deletingSpeed, pauseMs, loop])

  const text = (list[i] ?? "").slice(0, sub)

  return (
    <span className={className} aria-live="polite" aria-label={ariaLabel}>
      {text}
      <span className="ml-0.5 inline-block w-2 animate-pulse rounded-sm bg-foreground/80" style={{ height: "1em" }} />
    </span>
  )
}
