"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Bot, TrendingUp, Zap, Target, Clock, Users, ArrowRight } from "lucide-react"

interface SmartRecommendation {
  id: string
  type: "productivity" | "deadline" | "resource" | "quality"
  title: string
  description: string
  impact: number
  confidence: number
  action: string
}

const mockRecommendations: SmartRecommendation[] = [
  {
    id: "1",
    type: "deadline",
    title: "Accelerate Website Redesign",
    description: "Move 2 tasks to parallel execution to meet deadline",
    impact: 85,
    confidence: 92,
    action: "Optimize task dependencies",
  },
  {
    id: "2",
    type: "resource",
    title: "Balance Team Workload",
    description: "Redistribute 3 tasks from Alice to Bob for optimal efficiency",
    impact: 73,
    confidence: 88,
    action: "Rebalance assignments",
  },
  {
    id: "3",
    type: "productivity",
    title: "Schedule Optimization",
    description: "Move critical meetings to Tuesday-Wednesday for 23% productivity boost",
    impact: 67,
    confidence: 95,
    action: "Reschedule meetings",
  },
]

export function SmartDashboardWidget() {
  const [recommendations] = useState(mockRecommendations)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recommendations.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [recommendations.length])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "productivity":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "deadline":
        return <Clock className="h-4 w-4 text-red-500" />
      case "resource":
        return <Users className="h-4 w-4 text-blue-500" />
      case "quality":
        return <Target className="h-4 w-4 text-purple-500" />
      default:
        return <Bot className="h-4 w-4" />
    }
  }

  const currentRec = recommendations[currentIndex]

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
            <Bot className="h-4 w-4 text-white" />
          </div>
          AI Smart Insights
          <Badge variant="secondary" className="ml-2">
            <Zap className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </CardTitle>
        <CardDescription>AI-powered recommendations to optimize your team's performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            {getTypeIcon(currentRec.type)}
            <div className="flex-1">
              <h4 className="font-medium text-sm">{currentRec.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{currentRec.description}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Potential Impact</span>
              <span className="font-medium">{currentRec.impact}%</span>
            </div>
            <Progress value={currentRec.impact} className="h-2" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {currentRec.confidence}% confidence
              </Badge>
              <Badge variant="secondary" className="text-xs capitalize">
                {currentRec.type}
              </Badge>
            </div>
            <Button size="sm" variant="outline" className="text-xs">
              {currentRec.action}
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>

        {/* Recommendation indicators */}
        <div className="flex justify-center space-x-1">
          {recommendations.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-purple-500" : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">+18%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Productivity</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">3</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Optimizations</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">92%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
