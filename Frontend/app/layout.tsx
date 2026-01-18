import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TaskFlow - Modern Task Management",
  description: "Multi-organization task management dashboard with role-based access control",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"  className="theme-default" suppressHydrationWarning>
      <body className={`${inter.className}`} suppressHydrationWarning>
        <ThemeProvider defaultTheme="default" storageKey="taskflow-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
