"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  FolderOpen,
  CheckCircle2,
  Clock,
  TrendingUp,
  Calendar,
  AlertCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SmartDashboardWidget } from "@/components/ai-assistant/smart-dashboard-widget";
import { AIAssistant } from "@/components/ai-assistant/ai-assistant";

const projectData = [
  { id: 1, name: "Jan", completed: 12, inProgress: 8 },
  { id: 2, name: "Feb", completed: 15, inProgress: 6 },
  { id: 3, name: "Mar", completed: 18, inProgress: 9 },
  { id: 4, name: "Apr", completed: 22, inProgress: 7 },
  { id: 5, name: "May", completed: 25, inProgress: 11 },
  { id: 6, name: "Jun", completed: 28, inProgress: 5 },
];

const recentActivities = [
  {
    id: 1,
    user: "Alice Johnson",
    action: "completed task",
    target: "User Authentication",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Bob Smith",
    action: "created project",
    target: "Mobile App Redesign",
    time: "4 hours ago",
  },
  {
    id: 3,
    user: "Carol Davis",
    action: "joined team",
    target: "Frontend Development",
    time: "6 hours ago",
  },
  {
    id: 4,
    user: "David Wilson",
    action: "updated status",
    target: "API Integration",
    time: "8 hours ago",
  },
];

const upcomingDeadlines = [
  {
    id: 1,
    project: "Website Redesign",
    task: "Final Review",
    deadline: "2024-01-15",
    priority: "high",
  },
  {
    id: 2,
    project: "Mobile App",
    task: "Testing Phase",
    deadline: "2024-01-18",
    priority: "medium",
  },
  {
    id: 3,
    project: "API Development",
    task: "Documentation",
    deadline: "2024-01-22",
    priority: "low",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your team.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> new this week
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasks Completed
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-15%</span> improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and AI Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Project Completion Trends</CardTitle>
              <CardDescription>
                Monthly project completion vs in-progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                  <Bar dataKey="inProgress" fill="#f59e0b" name="In Progress" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <SmartDashboardWidget />
      </div>

      {/* Activity and Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest team activities and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium text-primary">
                        {activity.target}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-primary" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>Tasks and projects due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{deadline.task}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {deadline.project}
                    </p>
                    <p className="text-xs text-gray-500">{deadline.deadline}</p>
                  </div>
                  <Badge
                    variant={
                      deadline.priority === "high"
                        ? "destructive"
                        : deadline.priority === "medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {deadline.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}
