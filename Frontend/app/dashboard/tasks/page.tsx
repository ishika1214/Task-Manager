"use client"

import { Separator } from "@/components/ui/separator"
import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Plus,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  FolderPlus,
  Columns,
  Copy,
  Archive,
  Paperclip,
  ImageIcon,
  FileText,
  File,
  X,
  MessageSquare,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface TaskAttachment {
  id: string
  name: string
  type: string
  url: string
  size: number
  uploadedAt: string
}

interface TaskComment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: string
}

interface TaskStage {
  id: string
  name: string
  color: string
  order: number
}

interface Task {
  id: string
  title: string
  description: string
  stageId: string
  priority: string
  assignees: {
    id: string
    name: string
    avatar: string
  }[]
  project: string
  dueDate: string
  estimatedHours: number
  boardId: string
  attachments?: TaskAttachment[]
  comments?: TaskComment[]
}

interface Board {
  id: string
  name: string
  description: string
  color: string
  stages: TaskStage[]
  createdAt: string
  isActive: boolean
}

const defaultStages: TaskStage[] = [
  { id: "todo", name: "To Do", color: "bg-gray-100 dark:bg-gray-800", order: 1 },
  { id: "in-progress", name: "In Progress", color: "bg-blue-50 dark:bg-blue-900/20", order: 2 },
  { id: "done", name: "Done", color: "bg-green-50 dark:bg-green-900/20", order: 3 },
]

const mockBoards: Board[] = [
  {
    id: "board-1",
    name: "Website Redesign",
    description: "Complete website overhaul project",
    color: "bg-blue-500",
    stages: defaultStages,
    createdAt: "2024-01-01",
    isActive: true,
  },
  {
    id: "board-2",
    name: "Mobile App Development",
    description: "iOS and Android app development",
    color: "bg-green-500",
    stages: defaultStages,
    createdAt: "2024-01-05",
    isActive: true,
  },
  {
    id: "board-3",
    name: "Marketing Campaign",
    description: "Q1 marketing initiatives",
    color: "bg-purple-500",
    stages: [
      { id: "planning", name: "Planning", color: "bg-yellow-50 dark:bg-yellow-900/20", order: 1 },
      { id: "design", name: "Design", color: "bg-orange-50 dark:bg-orange-900/20", order: 2 },
      { id: "review", name: "Review", color: "bg-blue-50 dark:bg-blue-900/20", order: 3 },
      { id: "live", name: "Live", color: "bg-green-50 dark:bg-green-900/20", order: 4 },
    ],
    createdAt: "2024-01-10",
    isActive: true,
  },
]

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design Homepage Layout",
    description: "Create wireframes and mockups for the new homepage design",
    stageId: "todo",
    priority: "high",
    assignees: [{ id: "2", name: "Bob Smith", avatar: "/placeholder.svg?height=24&width=24" }],
    project: "Website Redesign",
    dueDate: "2024-01-20",
    estimatedHours: 16,
    boardId: "board-1",
    attachments: [
      {
        id: "att-1",
        name: "homepage-wireframe.png",
        type: "image/png",
        url: "/placeholder.svg?height=200&width=300",
        size: 1024000,
        uploadedAt: "2024-01-15",
      },
    ],
    comments: [
      {
        id: "com-1",
        userId: "2",
        userName: "Bob Smith",
        userAvatar: "/placeholder.svg?height=24&width=24",
        content: "I've started working on the wireframes. Will share the first draft soon.",
        createdAt: "2024-01-16T10:30:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "Implement User Authentication",
    description: "Set up login/logout functionality with JWT tokens",
    stageId: "in-progress",
    priority: "high",
    assignees: [
      { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg?height=24&width=24" },
      { id: "4", name: "David Wilson", avatar: "/placeholder.svg?height=24&width=24" },
    ],
    project: "Website Redesign",
    dueDate: "2024-01-25",
    estimatedHours: 24,
    boardId: "board-1",
  },
  {
    id: "3",
    title: "Responsive Design Implementation",
    description: "Make the website responsive for mobile and tablet devices",
    stageId: "in-progress",
    priority: "medium",
    assignees: [{ id: "3", name: "Carol Davis", avatar: "/placeholder.svg?height=24&width=24" }],
    project: "Mobile App Development",
    dueDate: "2024-01-30",
    estimatedHours: 20,
    boardId: "board-2",
  },
  {
    id: "4",
    title: "Performance Optimization",
    description: "Optimize website loading speed and performance metrics",
    stageId: "done",
    priority: "medium",
    assignees: [{ id: "1", name: "Alice Johnson", avatar: "/placeholder.svg?height=24&width=24" }],
    project: "Website Redesign",
    dueDate: "2024-01-18",
    estimatedHours: 12,
    boardId: "board-1",
  },
  {
    id: "5",
    title: "Content Migration",
    description: "Migrate existing content to the new website structure",
    stageId: "todo",
    priority: "low",
    assignees: [
      { id: "3", name: "Carol Davis", avatar: "/placeholder.svg?height=24&width=24" },
      { id: "2", name: "Bob Smith", avatar: "/placeholder.svg?height=24&width=24" },
    ],
    project: "Website Redesign",
    dueDate: "2024-02-10",
    estimatedHours: 8,
    boardId: "board-1",
  },
]

const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@taskflow.com",
  role: "admin" as const,
  avatar: "/placeholder.svg?height=32&width=32",
}

export default function TasksPage() {
  const [boards, setBoards] = useState<Board[]>(mockBoards)
  const [currentBoard, setCurrentBoard] = useState<Board>(mockBoards[0])
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [isAddTaskDrawerOpen, setIsAddTaskDrawerOpen] = useState(false)
  const [isAddBoardDialogOpen, setIsAddBoardDialogOpen] = useState(false)
  const [isManageStagesDialogOpen, setIsManageStagesDialogOpen] = useState(false)
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [newBoardName, setNewBoardName] = useState("")
  const [newBoardDescription, setNewBoardDescription] = useState("")
  const [newBoardColor, setNewBoardColor] = useState("#3b82f6")
  const [newStageName, setNewStageName] = useState("")
  const [newStageColor, setNewStageColor] = useState("#e5e7eb")
  const [editingStage, setEditingStage] = useState<TaskStage | null>(null)
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignee: "",
    project: "",
    stageId: "",
    dueDate: "",
    estimatedHours: 0,
  })
  const [newComment, setNewComment] = useState("")
  const [attachments, setAttachments] = useState<TaskAttachment[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, newStageId: string) => {
    e.preventDefault()
    if (draggedTask) {
      setTasks((prev) => prev.map((task) => (task.id === draggedTask ? { ...task, stageId: newStageId } : task)))
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

  const getTasksByStage = (stageId: string) => {
    return tasks.filter((task) => task.stageId === stageId && task.boardId === currentBoard.id)
  }

  const addNewBoard = () => {
    if (!newBoardName.trim()) {
      toast({ title: "Error", description: "Board name cannot be empty", variant: "destructive" })
      return
    }

    const newBoard: Board = {
      id: `board-${Date.now()}`,
      name: newBoardName,
      description: newBoardDescription,
      color: `bg-[${newBoardColor}]`,
      stages: [...defaultStages],
      createdAt: new Date().toISOString(),
      isActive: true,
    }

    setBoards([...boards, newBoard])
    setNewBoardName("")
    setNewBoardDescription("")
    setNewBoardColor("#3b82f6")
    setIsAddBoardDialogOpen(false)

    toast({ title: "Success", description: `Board "${newBoardName}" has been created` })
  }

  const addNewStage = () => {
    if (!newStageName.trim()) {
      toast({ title: "Error", description: "Stage name cannot be empty", variant: "destructive" })
      return
    }

    const stageId = newStageName.toLowerCase().replace(/\s+/g, "-")
    if (currentBoard.stages.some((stage) => stage.id === stageId)) {
      toast({ title: "Error", description: "A stage with this name already exists", variant: "destructive" })
      return
    }

    const newStage: TaskStage = {
      id: stageId,
      name: newStageName,
      color: `bg-[${newStageColor}]`,
      order: currentBoard.stages.length + 1,
    }

    const updatedBoard = { ...currentBoard, stages: [...currentBoard.stages, newStage] }
    setCurrentBoard(updatedBoard)
    setBoards(boards.map((board) => (board.id === currentBoard.id ? updatedBoard : board)))
    setNewStageName("")
    setNewStageColor("#e5e7eb")

    toast({ title: "Success", description: `Stage "${newStageName}" has been added` })
  }

  const updateStage = () => {
    if (!editingStage || !newStageName.trim()) {
      toast({ title: "Error", description: "Stage name cannot be empty", variant: "destructive" })
      return
    }

    const updatedStages = currentBoard.stages.map((stage) =>
      stage.id === editingStage.id ? { ...stage, name: newStageName, color: `bg-[${newStageColor}]` } : stage,
    )

    const updatedBoard = { ...currentBoard, stages: updatedStages }
    setCurrentBoard(updatedBoard)
    setBoards(boards.map((board) => (board.id === currentBoard.id ? updatedBoard : board)))
    setEditingStage(null)
    setNewStageName("")
    setNewStageColor("#e5e7eb")

    toast({ title: "Success", description: "Stage has been updated" })
  }

  const deleteStage = (stageId: string) => {
    const tasksInStage = tasks.filter((task) => task.stageId === stageId && task.boardId === currentBoard.id)
    if (tasksInStage.length > 0) {
      toast({
        title: "Cannot Delete",
        description: `There are ${tasksInStage.length} tasks in this stage. Move them first.`,
        variant: "destructive",
      })
      return
    }

    const updatedStages = currentBoard.stages.filter((stage) => stage.id !== stageId)
    const updatedBoard = { ...currentBoard, stages: updatedStages }
    setCurrentBoard(updatedBoard)
    setBoards(boards.map((board) => (board.id === currentBoard.id ? updatedBoard : board)))

    toast({ title: "Success", description: "Stage has been deleted" })
  }

  const startEditStage = (stage: TaskStage) => {
    setEditingStage(stage)
    setNewStageName(stage.name)
    setNewStageColor(stage.color.replace("bg-[", "").replace("]", ""))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newAttachments: TaskAttachment[] = []

    Array.from(files).forEach((file) => {
      // In a real app, you would upload the file to a server and get a URL
      const attachment: TaskAttachment = {
        id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file), // This is temporary and will be revoked when the page refreshes
        size: file.size,
        uploadedAt: new Date().toISOString(),
      }
      newAttachments.push(attachment)
    })

    setAttachments([...attachments, ...newAttachments])

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter((att) => att.id !== id))
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (type.includes("pdf")) return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const addNewTask = () => {
    if (!newTaskData.title.trim()) {
      toast({ title: "Error", description: "Task title cannot be empty", variant: "destructive" })
      return
    }

    const comments: TaskComment[] = []

    if (newComment.trim()) {
      comments.push({
        id: `com-${Date.now()}`,
        userId: mockUser.id,
        userName: mockUser.name,
        userAvatar: mockUser.avatar,
        content: newComment,
        createdAt: new Date().toISOString(),
      })
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskData.title,
      description: newTaskData.description,
      stageId: newTaskData.stageId || currentBoard.stages[0].id,
      priority: newTaskData.priority || "medium",
      assignees: newTaskData.assignee ? [{ id: newTaskData.assignee, name: "User", avatar: "/placeholder.svg" }] : [],
      project: newTaskData.project || currentBoard.name,
      dueDate: newTaskData.dueDate,
      estimatedHours: newTaskData.estimatedHours || 0,
      boardId: currentBoard.id,
      attachments: attachments.length > 0 ? [...attachments] : undefined,
      comments: comments.length > 0 ? [...comments] : undefined,
    }

    setTasks([...tasks, newTask])
    resetTaskForm()
    setIsAddTaskDrawerOpen(false)

    toast({ title: "Success", description: `Task "${newTaskData.title}" has been created` })
  }

  const resetTaskForm = () => {
    setNewTaskData({
      title: "",
      description: "",
      priority: "medium",
      assignee: "",
      project: "",
      stageId: "",
      dueDate: "",
      estimatedHours: 0,
    })
    setNewComment("")
    setAttachments([])
  }

  const duplicateBoard = (board: Board) => {
    const duplicatedBoard: Board = {
      ...board,
      id: `board-${Date.now()}`,
      name: `${board.name} (Copy)`,
      createdAt: new Date().toISOString(),
    }

    setBoards([...boards, duplicatedBoard])
    toast({ title: "Success", description: `Board "${board.name}" has been duplicated` })
  }

  const archiveBoard = (boardId: string) => {
    setBoards(boards.map((board) => (board.id === boardId ? { ...board, isActive: false } : board)))
    if (currentBoard.id === boardId) {
      const activeBoards = boards.filter((b) => b.isActive && b.id !== boardId)
      if (activeBoards.length > 0) {
        setCurrentBoard(activeBoards[0])
      }
    }
    toast({ title: "Success", description: "Board has been archived" })
  }

  const isAdminOrManager = mockUser.role === "admin" || mockUser.role === "manager"
  const activeBoards = boards.filter((b) => b.isActive)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Boards</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage project tasks with drag-and-drop</p>
        </div>

        <div className="flex items-center space-x-2">
          {/* User Profile Link */}
          <Link href="/dashboard/profile">
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">{mockUser.name}</span>
            </Button>
          </Link>

          {/* Add Board Button */}
          <Dialog open={isAddBoardDialogOpen} onOpenChange={setIsAddBoardDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="h-4 w-4 mr-2" />
                Add Board
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Board</DialogTitle>
                <DialogDescription>Create a new task board for your project or team.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="boardName" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="boardName"
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    placeholder="Board name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="boardDescription" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="boardDescription"
                    value={newBoardDescription}
                    onChange={(e) => setNewBoardDescription(e.target.value)}
                    placeholder="Board description"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="boardColor" className="text-right">
                    Color
                  </Label>
                  <div className="col-span-3 flex items-center space-x-2">
                    <Input
                      id="boardColor"
                      type="color"
                      value={newBoardColor}
                      onChange={(e) => setNewBoardColor(e.target.value)}
                      className="w-12 h-8 p-1"
                    />
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: newBoardColor }}></div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddBoardDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addNewBoard}>Create Board</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Manage Stages Button */}
          {isAdminOrManager && (
            <Dialog open={isManageStagesDialogOpen} onOpenChange={setIsManageStagesDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Columns className="h-4 w-4 mr-2" />
                  Manage Stages
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Manage Stages - {currentBoard.name}</DialogTitle>
                  <DialogDescription>Add, edit, or remove stages for this board's workflow.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  {/* Current Stages */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Current Stages</h4>
                    <div className="space-y-2">
                      {currentBoard.stages.map((stage) => (
                        <div key={stage.id} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded-full ${stage.color}`}></div>
                            <span>{stage.name}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => startEditStage(stage)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => deleteStage(stage.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Add/Edit Stage Form */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">
                      {editingStage ? `Edit Stage: ${editingStage.name}` : "Add New Stage"}
                    </h4>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="stageName" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="stageName"
                        value={newStageName}
                        onChange={(e) => setNewStageName(e.target.value)}
                        placeholder="Enter stage name"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="stageColor" className="text-right">
                        Color
                      </Label>
                      <div className="col-span-3 flex items-center space-x-2">
                        <Input
                          id="stageColor"
                          type="color"
                          value={newStageColor}
                          onChange={(e) => setNewStageColor(e.target.value)}
                          className="w-12 h-8 p-1"
                        />
                        <div className="w-8 h-8 rounded-full" style={{ backgroundColor: newStageColor }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  {editingStage ? (
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => setEditingStage(null)}>
                        Cancel
                      </Button>
                      <Button onClick={updateStage}>Update Stage</Button>
                    </div>
                  ) : (
                    <Button onClick={addNewStage}>Add Stage</Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {/* Add Task Button with Side Drawer */}
          <Sheet
            open={isAddTaskDrawerOpen}
            onOpenChange={(open) => {
              if (!open) resetTaskForm()
              setIsAddTaskDrawerOpen(open)
            }}
          >
            <SheetTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Create New Task</SheetTitle>
                <SheetDescription>Add a new task to {currentBoard.name} board.</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Task Details */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="taskTitle">Title</Label>
                    <Input
                      id="taskTitle"
                      value={newTaskData.title}
                      onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })}
                      placeholder="Task title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taskDescription">Description</Label>
                    <Textarea
                      id="taskDescription"
                      value={newTaskData.description}
                      onChange={(e) => setNewTaskData({ ...newTaskData, description: e.target.value })}
                      placeholder="Task description"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="taskStage">Stage</Label>
                      <Select
                        value={newTaskData.stageId}
                        onValueChange={(value) => setNewTaskData({ ...newTaskData, stageId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentBoard.stages.map((stage) => (
                            <SelectItem key={stage.id} value={stage.id}>
                              {stage.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="taskPriority">Priority</Label>
                      <Select
                        value={newTaskData.priority}
                        onValueChange={(value) => setNewTaskData({ ...newTaskData, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="taskDueDate">Due Date</Label>
                      <Input
                        id="taskDueDate"
                        type="date"
                        value={newTaskData.dueDate}
                        onChange={(e) => setNewTaskData({ ...newTaskData, dueDate: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="taskHours">Est. Hours</Label>
                      <Input
                        id="taskHours"
                        type="number"
                        value={newTaskData.estimatedHours}
                        onChange={(e) =>
                          setNewTaskData({ ...newTaskData, estimatedHours: Number.parseInt(e.target.value) || 0 })
                        }
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Attachments Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Attachments</h3>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                      <Paperclip className="h-4 w-4 mr-2" />
                      Attach Files
                    </Button>
                  </div>

                  {attachments.length > 0 ? (
                    <div className="space-y-2 max-h-[200px] overflow-y-auto border rounded-md p-2">
                      {attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
                        >
                          <div className="flex items-center space-x-2 overflow-hidden">
                            {getFileIcon(attachment.type)}
                            <div className="truncate">
                              <p className="text-sm font-medium truncate">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(attachment.size)}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => removeAttachment(attachment.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 border border-dashed rounded-md">
                      <Paperclip className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No attachments yet</p>
                      <p className="text-xs text-muted-foreground">Click 'Attach Files' to add documents or images</p>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Comments Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Add Initial Comment</h3>

                  <div className="flex items-start space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                      <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[80px]"
                      />

                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                          onClick={() => setNewComment("")}
                          disabled={!newComment.trim()}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <SheetFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsAddTaskDrawerOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addNewTask}>Create Task</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Board Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => duplicateBoard(currentBoard)}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate Board
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => archiveBoard(currentBoard.id)} className="text-red-600">
                <Archive className="h-4 w-4 mr-2" />
                Archive Board
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Board Tabs */}
      <Tabs
        defaultValue={currentBoard.id}
        onValueChange={(value) => {
          const selectedBoard = boards.find((b) => b.id === value)
          if (selectedBoard) setCurrentBoard(selectedBoard)
        }}
        className="w-full"
      >
        <TabsList className="mb-4 w-full flex overflow-x-auto pb-1 no-scrollbar">
          {activeBoards.map((board) => (
            <TabsTrigger key={board.id} value={board.id} className="flex items-center space-x-2 min-w-fit">
              <div className={`w-2 h-2 rounded-full ${board.color}`}></div>
              <span>{board.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {activeBoards.map((board) => (
          <TabsContent key={board.id} value={board.id} className="mt-0">
            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {board.stages.map((stage) => (
                <div
                  key={stage.id}
                  className={`${stage.color} rounded-lg p-4 min-h-[600px]`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{stage.name}</h3>
                    <Badge variant="secondary">{getTasksByStage(stage.id).length}</Badge>
                  </div>

                  <div className="space-y-3">
                    {getTasksByStage(stage.id).map((task) => (
                      <Card
                        key={task.id}
                        className="kanban-card cursor-move hover:shadow-md transition-shadow"
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
                            <span className="text-xs text-gray-500">{task.estimatedHours}h</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <div className="flex -space-x-2">
                                {task.assignees.slice(0, 3).map((assignee) => (
                                  <Avatar
                                    key={assignee.id}
                                    className="h-6 w-6 border-2 border-white dark:border-gray-800"
                                  >
                                    <AvatarImage src={assignee.avatar || "/placeholder.svg"} alt={assignee.name} />
                                    <AvatarFallback className="text-xs">
                                      {assignee.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                                {task.assignees.length > 3 && (
                                  <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                                    <span className="text-xs">+{task.assignees.length - 3}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
                            </div>
                          </div>

                          {/* Show attachment and comment indicators if they exist */}
                          {(task.attachments?.length || task.comments?.length) && (
                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                              {task.attachments?.length ? (
                                <div className="flex items-center">
                                  <Paperclip className="h-3 w-3 mr-1" />
                                  {task.attachments.length}
                                </div>
                              ) : null}

                              {task.comments?.length ? (
                                <div className="flex items-center">
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  {task.comments.length}
                                </div>
                              ) : null}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
