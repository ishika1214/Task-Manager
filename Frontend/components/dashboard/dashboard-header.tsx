"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, ChevronDown, Building2, Settings, LogOut } from "lucide-react"
import { useState } from "react"
import { LucideUser } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme/theme-switcher"
import Link from "next/link"

interface User {
  id: string
  name: string
  email: string
  role: "owner" | "admin" | "manager" | "employee"
  avatar: string
  organization: {
    id: string
    name: string
    logo: string
  }
}

interface DashboardHeaderProps {
  user: User
}

const mockNotifications = [
  {
    id: 1,
    title: "New task assigned",
    message: 'You have been assigned to "API Integration"',
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Project deadline approaching",
    message: "Website Redesign due in 2 days",
    time: "1 hour ago",
    unread: true,
  },
  { id: 3, title: "Team meeting scheduled", message: "Daily standup at 10:00 AM", time: "2 hours ago", unread: false },
]

const mockOrganizations = [
  { id: "1", name: "Acme Corp", logo: "/placeholder.svg?height=32&width=32" },
  { id: "2", name: "TechStart Inc", logo: "/placeholder.svg?height=32&width=32" },
  { id: "3", name: "Global Solutions", logo: "/placeholder.svg?height=32&width=32" },
]

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [selectedOrg, setSelectedOrg] = useState(user.organization)
  const unreadCount = mockNotifications.filter((n) => n.unread).length

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white dark:bg-gray-950 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Organization Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">{selectedOrg.name}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Switch Organization</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mockOrganizations.map((org) => (
                <DropdownMenuItem key={org.id} onClick={() => setSelectedOrg(org)} className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={org.logo || "/placeholder.svg"} alt={org.name} />
                    <AvatarFallback>{org.name[0]}</AvatarFallback>
                  </Avatar>
                  {org.name}
                  {org.id === selectedOrg.id && (
                    <Badge variant="secondary" className="ml-auto">
                      Current
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {mockNotifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4">
                  <div className="flex w-full items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                    {notification.unread && <div className="w-2 h-2 bg-primary rounded-full mt-1" />}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{user.role}</p>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                  <LucideUser className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
