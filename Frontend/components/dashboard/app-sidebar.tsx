"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  CheckSquare,
  MessageSquare,
  Clock,
  Settings,
  Building2,
  ChevronUp,
  LogOut,
  UserIcon,
  CheckCircle,
  Bot,
  Megaphone,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface UserType {
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

interface AppSidebarProps {
  user: UserType
}

const getMenuItems = (role: UserType["role"]) => {
  const baseItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "AI Insights",
      url: "/dashboard/ai-insights",
      icon: Bot,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: FolderOpen,
    },
    {
      title: "Tasks",
      url: "/dashboard/tasks",
      icon: CheckSquare,
    },
    {
      title: "Messages",
      url: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      title: "Bulletin Board",
      url: "/dashboard/bulletin",
      icon: Megaphone,
    },
    {
      title: "Attendance",
      url: "/dashboard/attendance",
      icon: Clock,
    },
  ]

  const managementItems = [
    {
      title: "Employees",
      url: "/dashboard/employees",
      icon: Users,
    },
  ]

  const adminItems = [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Organization",
      url: "/dashboard/organization",
      icon: Building2,
    },
  ]

  switch (role) {
    case "owner":
      return [...baseItems, ...managementItems, ...adminItems]
    case "admin":
      return [...baseItems, ...managementItems, ...adminItems]
    case "manager":
      return [...baseItems, ...managementItems]
    case "employee":
      return baseItems
    default:
      return baseItems
  }
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname()
  const menuItems = getMenuItems(user.role)

  return (
    <Sidebar className="border-r bg-white dark:bg-gray-800">
      <SidebarHeader className="border-b p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-white">
                <CheckCircle className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">TaskFlow</span>
                <span className="text-xs text-muted-foreground">{user.organization.name}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="w-full justify-start px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Link href={item.url} className="flex items-center">
                      <item.icon className="h-4 w-4 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground capitalize">{user.role}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
