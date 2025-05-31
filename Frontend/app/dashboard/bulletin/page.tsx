"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Megaphone,
  Star,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Pin,
  PinOff,
  Award,
  Newspaper,
  AlertCircle,
  Bold,
  Italic,
  Underline,
  Link,
  ImageIcon,
  Video,
  Upload,
  X,
} from "lucide-react"

interface Announcement {
  id: string
  title: string
  content: string
  type: "news" | "announcement" | "praise" | "alert"
  author: {
    id: string
    name: string
    avatar: string
    role: string
  }
  createdAt: string
  isPinned: boolean
  praiseTarget?: {
    id: string
    name: string
    avatar: string
  }
  praiseBadge?: string
  attachments?: {
    id: string
    name: string
    type: "image" | "document" | "video"
    url: string
    size: string
  }[]
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Q1 Company All-Hands Meeting",
    content:
      "Join us for our quarterly all-hands meeting on Friday, January 26th at 2:00 PM. We'll be discussing our achievements, upcoming projects, and team updates.",
    type: "announcement",
    author: {
      id: "1",
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Project Manager",
    },
    createdAt: "2024-01-15T10:00:00Z",
    isPinned: true,
  },
  {
    id: "2",
    title: "Outstanding Performance - Bob Smith",
    content:
      "Congratulations to Bob Smith for his exceptional work on the Website Redesign project! His innovative design solutions and attention to detail have significantly improved our user experience.",
    type: "praise",
    author: {
      id: "1",
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Project Manager",
    },
    createdAt: "2024-01-14T15:30:00Z",
    isPinned: false,
    praiseTarget: {
      id: "2",
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    praiseBadge: "innovation",
    attachments: [
      {
        id: "1",
        name: "achievement-certificate.pdf",
        type: "document",
        url: "#",
        size: "2.4 MB",
      },
    ],
  },
  {
    id: "3",
    title: "New Office Hours Policy",
    content:
      "Starting February 1st, we're implementing flexible office hours. Core hours will be 10 AM - 3 PM, with flexible start and end times. Please coordinate with your team leads.",
    type: "news",
    author: {
      id: "3",
      name: "HR Department",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Human Resources",
    },
    createdAt: "2024-01-13T09:00:00Z",
    isPinned: false,
  },
  {
    id: "4",
    title: "System Maintenance Scheduled",
    content:
      "Our project management system will undergo maintenance on Saturday, January 20th from 2:00 AM - 6:00 AM EST. Please save your work before this time.",
    type: "alert",
    author: {
      id: "4",
      name: "IT Department",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "IT Support",
    },
    createdAt: "2024-01-12T14:00:00Z",
    isPinned: true,
  },
]

const announcementTypes = [
  { value: "news", label: "News", icon: Newspaper, color: "bg-blue-500" },
  { value: "announcement", label: "Announcement", icon: Megaphone, color: "bg-green-500" },
  { value: "praise", label: "Employee Praise", icon: Award, color: "bg-yellow-500" },
  { value: "alert", label: "Alert", icon: AlertCircle, color: "bg-red-500" },
]

const praiseBadges = [
  { value: "excellence", label: "Excellence", color: "bg-yellow-500" },
  { value: "teamwork", label: "Teamwork", color: "bg-blue-500" },
  { value: "innovation", label: "Innovation", color: "bg-purple-500" },
  { value: "leadership", label: "Leadership", color: "bg-green-500" },
  { value: "dedication", label: "Dedication", color: "bg-red-500" },
]

// Mock employees for praise selection
const mockEmployees = [
  { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "2", name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "3", name: "Carol Davis", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "4", name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32" },
]

// Mock current user
const mockUser = {
  id: "1",
  name: "John Doe",
  role: "admin",
}

export default function BulletinPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [filterType, setFilterType] = useState<string>("all")
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    type: "news" as const,
    praiseTarget: "",
    praiseBadge: "",
  })
  const [attachments, setAttachments] = useState<File[]>([])
  const [isFormatting, setIsFormatting] = useState(false)
  const { toast } = useToast()

  const filteredAnnouncements = announcements
    .filter((announcement) => filterType === "all" || announcement.type === filterType)
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  const getTypeIcon = (type: string) => {
    const typeConfig = announcementTypes.find((t) => t.value === type)
    if (!typeConfig) return null
    const Icon = typeConfig.icon
    return <Icon className="h-4 w-4" />
  }

  const getTypeColor = (type: string) => {
    const typeConfig = announcementTypes.find((t) => t.value === type)
    return typeConfig?.color || "bg-gray-500"
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachments((prev) => [...prev, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const formatText = (format: string) => {
    // In a real implementation, this would apply formatting to the selected text
    console.log(`Applying ${format} formatting`)
  }

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (newAnnouncement.type === "praise" && (!newAnnouncement.praiseTarget || !newAnnouncement.praiseBadge)) {
      toast({
        title: "Error",
        description: "Please select an employee and praise badge",
        variant: "destructive",
      })
      return
    }

    const announcement: Announcement = {
      id: Date.now().toString(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      type: newAnnouncement.type,
      author: {
        id: mockUser.id,
        name: mockUser.name,
        avatar: "/placeholder.svg?height=40&width=40",
        role: mockUser.role,
      },
      createdAt: new Date().toISOString(),
      isPinned: false,
      ...(newAnnouncement.type === "praise" && {
        praiseTarget: mockEmployees.find((emp) => emp.id === newAnnouncement.praiseTarget),
        praiseBadge: newAnnouncement.praiseBadge,
      }),
      ...(attachments.length > 0 && {
        attachments: attachments.map((file, index) => ({
          id: index.toString(),
          name: file.name,
          type: file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "document",
          url: URL.createObjectURL(file),
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        })),
      }),
    }

    setAnnouncements([announcement, ...announcements])
    setNewAnnouncement({
      title: "",
      content: "",
      type: "news",
      praiseTarget: "",
      praiseBadge: "",
    })
    setAttachments([])
    setIsAddSheetOpen(false)

    toast({
      title: "Success",
      description: "Announcement has been posted",
    })
  }

  const togglePin = (id: string) => {
    setAnnouncements(
      announcements.map((announcement) =>
        announcement.id === id ? { ...announcement, isPinned: !announcement.isPinned } : announcement,
      ),
    )
  }

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== id))
    toast({
      title: "Success",
      description: "Announcement has been deleted",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bulletin Board</h1>
          <p className="text-gray-600 dark:text-gray-400">Company news, announcements, and employee recognition</p>
        </div>
        <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <SheetTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[600px] sm:max-w-[600px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Create New Post</SheetTitle>
              <SheetDescription>Share news, announcements, or recognize team members.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-6 py-6">
              {/* Post Type */}
              <div className="space-y-2">
                <Label htmlFor="postType">Post Type</Label>
                <Select
                  value={newAnnouncement.type}
                  onValueChange={(value: any) => setNewAnnouncement({ ...newAnnouncement, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select post type" />
                  </SelectTrigger>
                  <SelectContent>
                    {announcementTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <type.icon className="h-4 w-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Praise-specific fields */}
              {newAnnouncement.type === "praise" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="praiseTarget">Employee</Label>
                    <Select
                      value={newAnnouncement.praiseTarget}
                      onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, praiseTarget: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee to praise" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockEmployees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                                <AvatarFallback className="text-xs">
                                  {employee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{employee.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="praiseBadge">Badge</Label>
                    <Select
                      value={newAnnouncement.praiseBadge}
                      onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, praiseBadge: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select praise badge" />
                      </SelectTrigger>
                      <SelectContent>
                        {praiseBadges.map((badge) => (
                          <SelectItem key={badge.value} value={badge.value}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${badge.color}`}></div>
                              <span>{badge.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="postTitle">Title</Label>
                <Input
                  id="postTitle"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  placeholder="Enter post title"
                />
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-2">
                <Label htmlFor="postContent">Content</Label>

                {/* Formatting Toolbar */}
                <div className="flex items-center space-x-1 p-2 border rounded-t-md bg-gray-50 dark:bg-gray-800">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("bold")}
                    className="h-8 w-8 p-0"
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("italic")}
                    className="h-8 w-8 p-0"
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("underline")}
                    className="h-8 w-8 p-0"
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-6 bg-gray-300 mx-1" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("link")}
                    className="h-8 w-8 p-0"
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => document.getElementById("image-upload")?.click()}
                    className="h-8 w-8 p-0"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    className="h-8 w-8 p-0"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>

                <Textarea
                  id="postContent"
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                  placeholder="Enter post content"
                  rows={6}
                  className="rounded-t-none"
                />

                {/* Hidden file inputs */}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <input id="file-upload" type="file" multiple onChange={handleFileUpload} className="hidden" />
              </div>

              {/* Attachments */}
              {attachments.length > 0 && (
                <div className="space-y-2">
                  <Label>Attachments</Label>
                  <div className="space-y-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center space-x-2">
                          {file.type.startsWith("image/") ? (
                            <ImageIcon className="h-4 w-4 text-blue-500" />
                          ) : file.type.startsWith("video/") ? (
                            <Video className="h-4 w-4 text-purple-500" />
                          ) : (
                            <Upload className="h-4 w-4 text-gray-500" />
                          )}
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddSheetOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAnnouncement}>Post</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Filter Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
            >
              All Posts
            </Button>
            {announcementTypes.map((type) => (
              <Button
                key={type.value}
                variant={filterType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType(type.value)}
                className="flex items-center space-x-1"
              >
                <type.icon className="h-3 w-3" />
                <span>{type.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Announcements */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <Card
            key={announcement.id}
            className={`border-0 shadow-lg hover:shadow-xl transition-shadow ${announcement.isPinned ? "ring-2 ring-primary/20" : ""}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={announcement.author.avatar || "/placeholder.svg"}
                      alt={announcement.author.name}
                    />
                    <AvatarFallback>
                      {announcement.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold">{announcement.title}</h3>
                      {announcement.isPinned && <Pin className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{announcement.author.name}</span>
                      <span>•</span>
                      <span>{announcement.author.role}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${getTypeColor(announcement.type)}`}></div>
                    <span className="capitalize">{announcement.type}</span>
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => togglePin(announcement.id)}>
                        {announcement.isPinned ? (
                          <>
                            <PinOff className="h-4 w-4 mr-2" />
                            Unpin
                          </>
                        ) : (
                          <>
                            <Pin className="h-4 w-4 mr-2" />
                            Pin
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => deleteAnnouncement(announcement.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{announcement.content}</p>

              {/* Attachments */}
              {announcement.attachments && announcement.attachments.length > 0 && (
                <div className="mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {announcement.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                      >
                        {attachment.type === "image" ? (
                          <ImageIcon className="h-4 w-4 text-blue-500" />
                        ) : attachment.type === "video" ? (
                          <Video className="h-4 w-4 text-purple-500" />
                        ) : (
                          <Upload className="h-4 w-4 text-gray-500" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{attachment.name}</p>
                          <p className="text-xs text-gray-500">{attachment.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {announcement.type === "praise" && announcement.praiseTarget && announcement.praiseBadge && (
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={announcement.praiseTarget.avatar || "/placeholder.svg"}
                        alt={announcement.praiseTarget.name}
                      />
                      <AvatarFallback className="text-xs">
                        {announcement.praiseTarget.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{announcement.praiseTarget.name}</span>
                    <span className="text-gray-500">received a</span>
                    <Badge className={`praise-badge ${announcement.praiseBadge}`}>
                      <Star className="h-3 w-3 mr-1" />
                      {praiseBadges.find((b) => b.value === announcement.praiseBadge)?.label}
                    </Badge>
                    <span className="text-gray-500">badge!</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="text-center py-12">
            <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No posts found matching your filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
