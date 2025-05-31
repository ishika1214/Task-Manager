"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function WaveAnimation() {
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

    // Wave properties
    const waves = [
      {
        frequency: 0.02,
        amplitude: 50,
        speed: 0.05,
        color: theme === "dark" ? "rgba(20, 184, 116, 0.2)" : "rgba(20, 184, 116, 0.1)",
        offset: 0,
      },
      {
        frequency: 0.03,
        amplitude: 30,
        speed: 0.07,
        color: theme === "dark" ? "rgba(20, 184, 116, 0.15)" : "rgba(20, 184, 116, 0.08)",
        offset: 2,
      },
      {
        frequency: 0.01,
        amplitude: 70,
        speed: 0.03,
        color: theme === "dark" ? "rgba(20, 184, 116, 0.1)" : "rgba(20, 184, 116, 0.05)",
        offset: 4,
      },
    ]

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      waves.forEach((wave) => {
        wave.offset += wave.speed
        drawWave(ctx, wave, canvas.width, canvas.height)
      })
    }

    function drawWave(
      ctx: CanvasRenderingContext2D,
      wave: {
        frequency: number
        amplitude: number
        color: string
        offset: number
      },
      width: number,
      height: number,
    ) {
      ctx.beginPath()
      ctx.moveTo(0, height)

      for (let x = 0; x < width; x++) {
        const y = Math.sin(x * wave.frequency + wave.offset) * wave.amplitude + height - 100
        ctx.lineTo(x, y)
      }

      ctx.lineTo(width, height)
      ctx.closePath()
      ctx.fillStyle = wave.color
      ctx.fill()
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed bottom-0 left-0 w-full h-full -z-10" aria-hidden="true" />
}
