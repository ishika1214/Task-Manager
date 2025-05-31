"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Calendar, AlertCircle, CheckCircle2, Clock } from "lucide-react"

const productivityTrend = [
  { day: "Mon", productivity: 75, predicted: 78 },
  { day: "Tue", productivity: 88, predicted: 90 },
  { day: "Wed", productivity: 92, predicted: 94 },
  { day: "Thu", productivity: 85, predicted: 87 },
  { day: "Fri", productivity: 70, predicted: 72 },
]

const projectCompletionForecast = [
  { name: "On Track", value: 65, color: "#10b981" },
  { name: "At Risk", value: 25, color: "#f59e0b" },
  { name: "Delayed", value: 10, color: "#ef4444" },
]

const upcomingPredictions = [
  {
    id: "1",
    type: "completion",
    title: "Website Redesign Completion",
    prediction: "February 18, 2024",
    confidence: 87,
    status: "on-track",
    daysFromNow: 3,
  },
  {
    id: "2",
    type: "risk",
    title: "Mobile App Deadline Risk",
    prediction: "May delay by 1 week",
    confidence: 73,
    status: "at-risk",
    daysFromNow: 45,
  },
  {
    id: "3",
    type: "optimization",
    title: "Team Velocity Peak",
    prediction: "Next Tuesday",
    confidence: 94,
    status: "opportunity",
    daysFromNow: 5,
  },
]

export function PredictiveAnalytics() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "at-risk":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "opportunity":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "default"
      case "at-risk":
        return "destructive"
      case "opportunity":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Productivity Trend Prediction */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
            Productivity Forecast
          </CardTitle>
          <CardDescription>AI-predicted team productivity based on historical patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={productivityTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="productivity" stroke="#6b7280" strokeWidth={2} name="Actual" />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Completion Forecast */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-500" />
              Project Health Forecast
            </CardTitle>
            <CardDescription>Predicted project completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={projectCompletionForecast}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectCompletionForecast.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {projectCompletionForecast.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                  <span className="text-sm">
                    {entry.name}: {entry.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Predictions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Smart Predictions</CardTitle>
            <CardDescription>AI-generated forecasts and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPredictions.map((prediction) => (
                <div
                  key={prediction.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  {getStatusIcon(prediction.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{prediction.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{prediction.prediction}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Progress value={prediction.confidence} className="h-1 flex-1" />
                      <span className="text-xs text-gray-500">{prediction.confidence}%</span>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(prediction.status)} className="text-xs">
                    {prediction.daysFromNow}d
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
