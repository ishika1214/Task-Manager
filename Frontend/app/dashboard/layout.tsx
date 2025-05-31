"use client"

import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { useState } from "react"

// Mock user data - in real app, this would come from authentication
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@taskflow.com",
  role: "owner" as const,
  avatar: "/placeholder.svg?height=32&width=32",
  organization: {
    id: "1",
    name: "Acme Corp",
    logo: "/placeholder.svg?height=32&width=32",
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user] = useState(mockUser)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900">
        <AppSidebar user={user} />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader user={user} />
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
