"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Calendar,
  Users,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  UserMinus,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock project data - in real app, this would be fetched based on the ID
const mockProject = {
  id: "1",
  name: "Website Redesign",
  description:
    "Complete overhaul of the company website with modern design and improved UX. This project includes redesigning all major pages, implementing responsive design, and improving site performance.",
  status: "in-progress",
  priority: "high",
  progress: 75,
  startDate: "2024-01-01",
  endDate: "2024-02-15",
  budget: "$50,000",
  manager: {
    id: "1",
    name: "Alice Johnson",
    email: "alice@taskflow.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Project Manager",
  },
  team: [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@taskflow.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Project Manager",
      department: "Engineering",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@taskflow.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "UI/UX Designer",
      department: "Design",
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol@taskflow.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Frontend Developer",
      department: "Engineering",
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david@taskflow.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Backend Developer",
      department: "Engineering",
    },
  ],
  tasks: [
    {
      id: "1",
      title: "Design Homepage Layout",
      description: "Create wireframes and mockups for the new homepage design",
      status: "todo",
      priority: "high",
      assignees: [
        {
          id: "2",
          name: "Bob Smith",
          avatar: "/placeholder.svg?height=24&width=24",
        },
      ],
      dueDate: "2024-01-20",
      estimatedHours: 16,
    },
    {
      id: "2",
      title: "Implement User Authentication",
      description: "Set up login/logout functionality with JWT tokens",
      status: "in-progress",
      priority: "high",
      assignees: [
        {
          id: "1",
          name: "Alice Johnson",
          avatar: "/placeholder.svg?height=24&width=24",
        },
        {
          id: "4",
          name: "David Wilson",
          avatar: "/placeholder.svg?height=24&width=24",
        },
      ],
      dueDate: "2024-01-25",
      estimatedHours: 24,
    },
    {
      id: "3",
      title: "Responsive Design Implementation",
      description: "Make the website responsive for mobile and tablet devices",
      status: "in-progress",
      priority: "medium",
      assignees: [
        {
          id: "3",
          name: "Carol Davis",
          avatar: "/placeholder.svg?height=24&width=24",
        },
      ],
      dueDate: "2024-01-30",
      estimatedHours: 20,
    },
    {
      id: "4",
      title: "Performance Optimization",
      description: "Optimize website loading speed and performance metrics",
      status: "done",
      priority: "medium",
      assignees: [
        {
          id: "1",
          name: "Alice Johnson",
          avatar: "/placeholder.svg?height=24&width=24",
        },
      ],
      dueDate: "2024-01-18",
      estimatedHours: 12,
    },
    {
      id: "5",
      title: "Content Migration",
      description: "Migrate existing content to the new website structure",
      status: "todo",
      priority: "low",
      assignees: [
        {
          id: "3",
          name: "Carol Davis",
          avatar: "/placeholder.svg?height=24&width=24",
        },
        {
          id: "2",
          name: "Bob Smith",
          avatar: "/placeholder.svg?height=24&width=24",
        },
      ],
      dueDate: "2024-02-10",
      estimatedHours: 8,
    },
  ],
}

const columns = [
  { id: "todo", title: "To Do", color: "bg-gray-100 dark:bg-gray-800" },
  { id: "in-progress", title: "In Progress", color: "bg-blue-50 dark:bg-blue-900/20" },
  { id: "done", title: "Done", color: "bg-green-50 dark:bg-green-900/20" },
]

const allEmployees = [
  {
    id: "5",
    name: "Emma Thompson",
    email: "emma@taskflow.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "QA Engineer",
    department: "Engineering",
  },
  {
    id: "6",
    name: "Frank Miller",
    email: "frank@taskflow.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "DevOps Engineer",
    department: "Engineering",
  },
]

export default function ProjectDetailsPage() {
  const params = useParams()
  const [project, setProject] = useState(mockProject)
  const [tasks, setTasks] = useState(mockProject.tasks)
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault()
    if (draggedTask) {
      setTasks((prev) => prev.map((task) => (task.id === draggedTask ? { ...task, status: newStatus } : task)))
      setDraggedTask(null)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "planning":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status)
  }

  const addTeamMember = (employeeId: string) => {
    const employee = allEmployees.find((emp) => emp.id === employeeId)
    if (employee && !project.team.find((member) => member.id === employeeId)) {
      setProject((prev) => ({
        ...prev,
        team: [...prev.team, employee],
      }))
    }
    setIsAddMemberDialogOpen(false)
  }

  const removeTeamMember = (employeeId: string) => {
    setProject((prev) => ({
      ...prev,
      team: prev.team.filter((member) => member.id !== employeeId),
    }))
  }

  const completedTasks = tasks.filter((task) => task.status === "done").length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">Project Details & Task Management</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Project
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">{project.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                    <span className="capitalize">{project.status.replace("-", " ")}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <Badge variant={getPriorityColor(project.priority)} className="mt-1">
                    {project.priority}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="mt-1">{new Date(project.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="mt-1">{new Date(project.endDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="text-xs text-gray-500">
                  {completedTasks} of {totalTasks} tasks completed
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Project Manager
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={project.manager.avatar || "/placeholder.svg"} alt={project.manager.name} />
                  <AvatarFallback>
                    {project.manager.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{project.manager.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.manager.role}</p>
                  <p className="text-sm text-gray-500">{project.manager.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tasks">Task Board</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          {/* Task Board Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Task Board</h2>
              <p className="text-gray-600 dark:text-gray-400">Manage project tasks with drag-and-drop</p>
            </div>
            <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>Add a new task to this project.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="taskTitle" className="text-right">
                      Title
                    </Label>
                    <Input id="taskTitle" placeholder="Task title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="taskDescription" className="text-right">
                      Description
                    </Label>
                    <Textarea id="taskDescription" placeholder="Task description" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="taskAssignee" className="text-right">
                      Assignee
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        {project.team.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="taskPriority" className="text-right">
                      Priority
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="taskDueDate" className="text-right">
                      Due Date
                    </Label>
                    <Input id="taskDueDate" type="date" className="col-span-3" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddTaskDialogOpen(false)}>
                    Create Task
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((column) => (
              <div
                key={column.id}
                className={`${column.color} rounded-lg p-4 min-h-[600px]`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">{column.title}</h3>
                  <Badge variant="secondary">{getTasksByStatus(column.id).length}</Badge>
                </div>

                <div className="space-y-3">
                  {getTasksByStatus(column.id).map((task) => (
                    <Card
                      key={task.id}
                      className="kanban-card cursor-move"
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardDescription className="text-xs">{task.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                            {task.priority}
                          </Badge>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {task.estimatedHours}h
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3 text-gray-500" />
                            <span className="text-xs text-gray-500">{task.assignees.length}</span>
                            <div className="flex -space-x-1">
                              {task.assignees.slice(0, 2).map((assignee) => (
                                <Avatar key={assignee.id} className="h-5 w-5 border border-white dark:border-gray-800">
                                  <AvatarImage src={assignee.avatar || "/placeholder.svg"} alt={assignee.name} />
                                  <AvatarFallback className="text-xs">
                                    {assignee.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {task.assignees.length > 2 && (
                                <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 border border-white dark:border-gray-800 flex items-center justify-center">
                                  <span className="text-xs">+{task.assignees.length - 2}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          {/* Team Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Team Members</h2>
              <p className="text-gray-600 dark:text-gray-400">Manage project team and assignments</p>
            </div>
            <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Team Member</DialogTitle>
                  <DialogDescription>Add an employee to this project team.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-4">
                    {allEmployees
                      .filter((emp) => !project.team.find((member) => member.id === emp.id))
                      .map((employee) => (
                        <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                              <AvatarFallback>
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{employee.role}</p>
                            </div>
                          </div>
                          <Button size="sm" onClick={() => addTeamMember(employee.id)}>
                            Add
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Team List */}
          <div className="grid gap-4">
            {project.team.map((member) => (
              <Card key={member.id} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <Badge variant="outline">{member.department}</Badge>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Tasks:{" "}
                            {
                              tasks.filter((task) => task.assignees.some((assignee) => assignee.id === member.id))
                                .length
                            }
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => removeTeamMember(member.id)}>
                            <UserMinus className="h-4 w-4 mr-2" />
                            Remove from Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              Completed Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">Out of {totalTasks} total</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-blue-500" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{getTasksByStatus("in-progress").length}</div>
            <p className="text-xs text-muted-foreground">Active tasks</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-primary" />
              Team Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{project.team.length}</div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{getTasksByStatus("todo").length}</div>
            <p className="text-xs text-muted-foreground">To be started</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
