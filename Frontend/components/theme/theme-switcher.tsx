"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Palette } from "lucide-react"
import { useTheme } from "./theme-provider"

const themes = [
  { name: "Default", value: "default", color: "bg-green-500" },
  { name: "Ocean Blue", value: "blue", color: "bg-blue-500" },
  { name: "Royal Purple", value: "purple", color: "bg-purple-500" },
  { name: "Forest Green", value: "green", color: "bg-emerald-500" },
  { name: "Sunset Orange", value: "orange", color: "bg-orange-500" },
  { name: "Cherry Pink", value: "pink", color: "bg-pink-500" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value as any)}
            className="flex items-center space-x-2"
          >
            <div className={`w-4 h-4 rounded-full ${themeOption.color}`} />
            <span>{themeOption.name}</span>
            {theme === themeOption.value && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
