"use client"

import { useEffect, useState, type RefObject } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0, root = null, rootMargin = "0%", triggerOnce = true }: UseIntersectionObserverProps = {},
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting
        if (!triggerOnce || !isIntersecting) {
          setIsIntersecting(isElementIntersecting)
        }
      },
      { threshold, root, rootMargin },
    )

    observer.observe(element)

    return () => observer.unobserve(element)
  }, [elementRef, threshold, root, rootMargin, triggerOnce, isIntersecting])

  return isIntersecting
}
