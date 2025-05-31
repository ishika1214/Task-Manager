"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create particles
    const numberOfParticles = Math.min(
      window.innerWidth < 768 ? 30 : window.innerWidth < 1024 ? 60 : 100,
      Math.floor(window.innerWidth / 20),
    )
    const particlesArray: Particle[] = []

    // Get theme-based colors
    const isDark = theme === "dark"
    const baseColor = isDark ? "rgba(255, 255, 255," : "rgba(0, 128, 0,"

    // Initialize particles
    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * 5 + 1
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const speedX = Math.random() * 1 - 0.5
      const speedY = Math.random() * 1 - 0.5
      const opacity = Math.random() * 0.5 + 0.1

      particlesArray.push({
        x,
        y,
        size,
        speedX,
        speedY,
        color: `${baseColor} ${opacity})`,
      })
    }

    // Connect particles with lines if they're close enough
    function connect() {
      const maxDistance = window.innerWidth < 768 ? 80 : window.innerWidth < 1024 ? 120 : 150
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `${baseColor} ${opacity * 0.4})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    let animationId: number
    let lastTime = 0
    const targetFPS = window.innerWidth < 768 ? 30 : 60
    const interval = 1000 / targetFPS

    function animate(currentTime: number) {
      animationId = requestAnimationFrame(animate)

      if (currentTime - lastTime < interval) return
      lastTime = currentTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesArray.forEach((particle) => {
        // Draw particle
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY
        }
      })

      connect()
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" aria-hidden="true" />
}
