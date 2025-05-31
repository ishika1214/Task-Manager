"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Users, FolderOpen } from "lucide-react"

const tasks = [
  {
    title: "Design Homepage Layout",
    status: "done",
    priority: "high",
    assignees: 2,
    progress: 100,
  },
  {
    title: "Implement User Authentication",
    status: "in-progress",
    priority: "high",
    assignees: 3,
    progress: 75,
  },
  {
    title: "Responsive Design Implementation",
    status: "in-progress",
    priority: "medium",
    assignees: 1,
    progress: 50,
  },
  {
    title: "Performance Optimization",
    status: "todo",
    priority: "medium",
    assignees: 1,
    progress: 0,
  },
]

const stats = {
  projects: 18,
  tasks: 342,
  team: 124,
  response: "2.4h",
}

const HeroAnimation = () => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaskIndex((prev) => (prev + 1) % tasks.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const currentTask = tasks[currentTaskIndex]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          <FolderOpen className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.projects}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+3</span> new this week
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.tasks}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+18%</span> from last week
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.team}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+12%</span> from last month
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          <Clock className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.response}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">-15%</span> improvement
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default HeroAnimation
