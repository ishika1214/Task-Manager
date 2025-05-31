"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "default" | "blue" | "purple" | "green" | "orange" | "pink"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "default",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "default",
  storageKey = "taskflow-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [isClient, setIsClient] = useState(false)

  // Only run on client side
  useEffect(() => {
    setIsClient(true)

    // Get theme from localStorage only on client
    try {
      const storedTheme = localStorage.getItem(storageKey) as Theme
      if (storedTheme && ["default", "blue", "purple", "green", "orange", "pink"].includes(storedTheme)) {
        setTheme(storedTheme)
      }
    } catch (error) {
      // Fallback if localStorage is not available
      console.warn("localStorage not available:", error)
    }
  }, [storageKey])

  // Apply theme to document
  useEffect(() => {
    if (!isClient) return

    const root = document.documentElement

    // Remove all theme classes
    root.classList.remove("theme-default", "theme-blue", "theme-purple", "theme-green", "theme-orange", "theme-pink")

    // Add current theme class
    root.classList.add(`theme-${theme}`)
  }, [theme, isClient])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme)

      if (isClient) {
        try {
          localStorage.setItem(storageKey, newTheme)
        } catch (error) {
          console.warn("Could not save theme to localStorage:", error)
        }
      }
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
