"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Upload,
  Building,
  Clock,
  Coffee,
  Home,
  Laptop,
  UserCheck,
  Star,
  Award,
  Calendar,
  Edit,
} from "lucide-react"

// Mock user data
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@taskflow.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=128&width=128",
  role: "Project Manager",
  department: "Engineering",
  location: "New York, NY",
  joinDate: "2022-05-15",
  bio: "Experienced project manager with a passion for delivering high-quality software products on time and within budget.",
  skills: ["Project Management", "Agile", "Scrum", "Team Leadership", "Risk Management"],
  status: "available", // available, busy, away, offline
  workingFrom: "office", // office, remote, hybrid
  currentActivity: "none", // meeting, lunch, focus
  customStatus: "",
  statusEmoji: "💼",
  praiseBadges: [
    { type: "excellence", count: 3, lastReceived: "2024-01-10" },
    { type: "leadership", count: 2, lastReceived: "2024-01-05" },
    { type: "teamwork", count: 4, lastReceived: "2023-12-20" },
  ],
  recentPraise: [
    {
      id: "1",
      badge: "excellence",
      reason: "Outstanding project delivery on Website Redesign",
      givenBy: "Alice Johnson",
      date: "2024-01-10",
    },
    {
      id: "2",
      badge: "leadership",
      reason: "Excellent team coordination during sprint planning",
      givenBy: "Bob Smith",
      date: "2024-01-05",
    },
  ],
}

const statusOptions = [
  { value: "available", label: "Available", icon: UserCheck, color: "bg-green-500" },
  { value: "busy", label: "Busy", icon: Clock, color: "bg-red-500" },
  { value: "away", label: "Away", icon: Coffee, color: "bg-yellow-500" },
  { value: "offline", label: "Offline", icon: User, color: "bg-gray-500" },
]

const workingFromOptions = [
  { value: "office", label: "In Office", icon: Building },
  { value: "remote", label: "Remote", icon: Home },
  { value: "hybrid", label: "Hybrid", icon: Laptop },
]

const activityOptions = [
  { value: "none", label: "No specific activity" },
  { value: "meeting", label: "In a meeting" },
  { value: "lunch", label: "At lunch" },
  { value: "focus", label: "Focus time" },
  { value: "traveling", label: "Traveling" },
  { value: "custom", label: "Custom status" },
]

const emojiOptions = [
  "💼",
  "🚀",
  "☕",
  "🎯",
  "💡",
  "🔥",
  "⚡",
  "🌟",
  "🎉",
  "🏆",
  "📝",
  "💻",
  "📞",
  "🍕",
  "🎵",
  "🏃",
  "🧠",
  "💪",
  "🎨",
  "🔧",
]

const praiseBadgeTypes = {
  excellence: { label: "Excellence", color: "bg-yellow-500", icon: Star },
  teamwork: { label: "Teamwork", color: "bg-blue-500", icon: User },
  innovation: { label: "Innovation", color: "bg-purple-500", icon: Award },
  leadership: { label: "Leadership", color: "bg-green-500", icon: Award },
  dedication: { label: "Dedication", color: "bg-red-500", icon: Clock },
}

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(mockUser)
  const [activeTab, setActiveTab] = useState("profile")
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [tempStatus, setTempStatus] = useState({
    status: user.status,
    workingFrom: user.workingFrom,
    currentActivity: user.currentActivity || "none",
    customStatus: user.customStatus,
    statusEmoji: user.statusEmoji,
  })
  const { toast } = useToast()

  const [isEditingSkills, setIsEditingSkills] = useState(false)
  const [newSkill, setNewSkill] = useState("")

  const handleSaveProfile = () => {
    setUser(editedUser)
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleSaveStatus = () => {
    setUser({
      ...user,
      status: tempStatus.status,
      workingFrom: tempStatus.workingFrom,
      currentActivity: tempStatus.currentActivity,
      customStatus: tempStatus.customStatus,
      statusEmoji: tempStatus.statusEmoji,
    })
    setIsStatusDialogOpen(false)
    toast({
      title: "Status updated",
      description: "Your status and availability have been updated successfully.",
    })
  }

  const getStatusIcon = () => {
    const status = statusOptions.find((s) => s.value === user.status)
    if (!status) return null
    const Icon = status.icon
    return <Icon className="h-4 w-4" />
  }

  const getWorkingFromIcon = () => {
    const workingFrom = workingFromOptions.find((w) => w.value === user.workingFrom)
    if (!workingFrom) return null
    const Icon = workingFrom.icon
    return <Icon className="h-4 w-4" />
  }

  const getDisplayStatus = () => {
    if (user.currentActivity === "custom" && user.customStatus) {
      return `${user.statusEmoji} ${user.customStatus}`
    }
    if (user.currentActivity && user.currentActivity !== "none") {
      return activityOptions.find((a) => a.value === user.currentActivity)?.label || ""
    }
    return statusOptions.find((s) => s.value === user.status)?.label || ""
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">View and manage your profile information</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </div>
        )}
      </div>

      {/* Status Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Current Status</CardTitle>
              <CardDescription>Let your team know your availability and working location</CardDescription>
            </div>
            <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Status
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Update Your Status</DialogTitle>
                  <DialogDescription>
                    Set your availability, working location, and current activity to keep your team informed.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  {/* Availability Status */}
                  <div className="space-y-2">
                    <Label>Availability</Label>
                    <Select
                      value={tempStatus.status}
                      onValueChange={(value) => setTempStatus({ ...tempStatus, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your status">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${statusOptions.find((s) => s.value === tempStatus.status)?.color}`}
                            ></div>
                            <span>{statusOptions.find((s) => s.value === tempStatus.status)?.label}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${status.color}`}></div>
                              <span>{status.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Working From */}
                  <div className="space-y-2">
                    <Label>Working From</Label>
                    <Select
                      value={tempStatus.workingFrom}
                      onValueChange={(value) => setTempStatus({ ...tempStatus, workingFrom: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location">
                          <div className="flex items-center space-x-2">
                            {workingFromOptions.find((w) => w.value === tempStatus.workingFrom)?.icon && (
                              <div className="flex items-center">
                                {(() => {
                                  const Icon = workingFromOptions.find((w) => w.value === tempStatus.workingFrom)?.icon!
                                  return <Icon className="h-4 w-4" />
                                })()}
                              </div>
                            )}
                            <span>{workingFromOptions.find((w) => w.value === tempStatus.workingFrom)?.label}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {workingFromOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center space-x-2">
                              <option.icon className="h-4 w-4" />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Current Activity */}
                  <div className="space-y-2">
                    <Label>Current Activity</Label>
                    <Select
                      value={tempStatus.currentActivity}
                      onValueChange={(value) => setTempStatus({ ...tempStatus, currentActivity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="What are you doing?">
                          {activityOptions.find((a) => a.value === tempStatus.currentActivity)?.label ||
                            "No specific activity"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {activityOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Custom Status */}
                  {tempStatus.currentActivity === "custom" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Custom Status Message</Label>
                        <Input
                          placeholder="What's your current status?"
                          value={tempStatus.customStatus}
                          onChange={(e) => setTempStatus({ ...tempStatus, customStatus: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Status Emoji</Label>
                        <div className="grid grid-cols-10 gap-2">
                          {emojiOptions.map((emoji) => (
                            <Button
                              key={emoji}
                              variant={tempStatus.statusEmoji === emoji ? "default" : "outline"}
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setTempStatus({ ...tempStatus, statusEmoji: emoji })}
                            >
                              {emoji}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Preview */}
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div
                        className={`w-3 h-3 rounded-full ${statusOptions.find((s) => s.value === tempStatus.status)?.color}`}
                      ></div>
                      <span className="font-medium">
                        {tempStatus.currentActivity === "custom" && tempStatus.customStatus
                          ? `${tempStatus.statusEmoji} ${tempStatus.customStatus}`
                          : tempStatus.currentActivity && tempStatus.currentActivity !== "none"
                            ? activityOptions.find((a) => a.value === tempStatus.currentActivity)?.label
                            : statusOptions.find((s) => s.value === tempStatus.status)?.label}
                      </span>
                      <span className="text-sm text-gray-500">
                        • {workingFromOptions.find((w) => w.value === tempStatus.workingFrom)?.label}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveStatus}>Save Status</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${statusOptions.find((s) => s.value === user.status)?.color}`}
              ></div>
              <span className="font-medium">{getDisplayStatus()}</span>
            </div>

            <Badge variant="outline" className="flex items-center space-x-1 px-3 py-1">
              {getWorkingFromIcon()}
              <span>{workingFromOptions.find((w) => w.value === user.workingFrom)?.label}</span>
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Info */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="text-4xl">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editedUser.name}
                          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center space-x-2 border rounded-md p-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span>{user.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editedUser.email}
                          onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center space-x-2 border rounded-md p-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{user.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editedUser.phone}
                          onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center space-x-2 border rounded-md p-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      {isEditing ? (
                        <Input
                          id="location"
                          value={editedUser.location}
                          onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center space-x-2 border rounded-md p-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{user.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={editedUser.bio}
                        onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                        rows={4}
                      />
                    ) : (
                      <div className="border rounded-md p-3 text-sm">{user.bio}</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Info */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Your role and professional details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  {isEditing ? (
                    <Input
                      id="role"
                      value={editedUser.role}
                      onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      <span>{user.role}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  {isEditing ? (
                    <Input
                      id="department"
                      value={editedUser.department}
                      onChange={(e) => setEditedUser({ ...editedUser, department: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span>{user.department}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Join Date</Label>
                  <div className="flex items-center space-x-2 border rounded-md p-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Skills</Label>
                  <Button variant="outline" size="sm" onClick={() => setIsEditingSkills(!isEditingSkills)}>
                    {isEditingSkills ? "Done" : "Edit Skills"}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="relative group">
                      {skill}
                      {isEditingSkills && (
                        <button
                          onClick={() => {
                            const updatedSkills = user.skills.filter((_, i) => i !== index)
                            setUser({ ...user, skills: updatedSkills })
                            setEditedUser({ ...editedUser, skills: updatedSkills })
                          }}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditingSkills && (
                  <div className="flex space-x-2 mt-2">
                    <Input
                      placeholder="Add new skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && newSkill.trim()) {
                          const updatedSkills = [...user.skills, newSkill.trim()]
                          setUser({ ...user, skills: updatedSkills })
                          setEditedUser({ ...editedUser, skills: updatedSkills })
                          setNewSkill("")
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        if (newSkill.trim()) {
                          const updatedSkills = [...user.skills, newSkill.trim()]
                          setUser({ ...user, skills: updatedSkills })
                          setEditedUser({ ...editedUser, skills: updatedSkills })
                          setNewSkill("")
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          {/* Praise Badges */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Praise Badges
              </CardTitle>
              <CardDescription>Recognition received from team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {user.praiseBadges.map((badge) => {
                  const badgeType = praiseBadgeTypes[badge.type as keyof typeof praiseBadgeTypes]
                  const Icon = badgeType.icon
                  return (
                    <div key={badge.type} className="text-center p-4 border rounded-lg">
                      <div
                        className={`w-12 h-12 ${badgeType.color} rounded-full flex items-center justify-center mx-auto mb-2`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-medium">{badgeType.label}</h4>
                      <p className="text-2xl font-bold text-primary">{badge.count}</p>
                      <p className="text-xs text-gray-500">Last: {new Date(badge.lastReceived).toLocaleDateString()}</p>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Recent Praise</h4>
                {user.recentPraise.map((praise) => {
                  const badgeType = praiseBadgeTypes[praise.badge as keyof typeof praiseBadgeTypes]
                  return (
                    <div
                      key={praise.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className={`w-8 h-8 ${badgeType.color} rounded-full flex items-center justify-center`}>
                        <Star className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className={`praise-badge ${praise.badge}`}>{badgeType.label}</Badge>
                          <span className="text-sm text-gray-500">
                            {praise.givenBy} • {new Date(praise.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">{praise.reason}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and password</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Security settings content here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
