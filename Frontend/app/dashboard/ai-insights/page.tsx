"use client"

import { PredictiveAnalytics } from "@/components/ai-assistant/predictive-analytics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, Sparkles, TrendingUp, Zap, Target, Clock, Users } from "lucide-react"

export default function AIInsightsPage() {
  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
              <Bot className="h-5 w-5 text-white" />
            </div>
            AI Insights & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Advanced AI-powered insights to optimize your team's performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="flex items-center">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
            <Zap className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* AI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
              Productivity Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2 text-blue-500" />
              Goal Achievement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">94%</div>
            <p className="text-xs text-muted-foreground">Above target by 4%</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-purple-500" />
              Time Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">91%</div>
            <p className="text-xs text-muted-foreground">Optimal performance</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-yellow-500" />
              Team Synergy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">89%</div>
            <p className="text-xs text-muted-foreground">Excellent collaboration</p>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Analytics */}
      <PredictiveAnalytics />

      {/* AI Recommendations */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2 text-purple-500" />
            AI Recommendations
          </CardTitle>
          <CardDescription>Personalized suggestions to improve team performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Optimize Sprint Planning</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                Based on team velocity, reduce sprint scope by 15% to improve completion rate
              </p>
              <Button size="sm" variant="outline">
                Apply Suggestion
              </Button>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Schedule Team Sync</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                Tuesday 2 PM is optimal for team meetings based on productivity patterns
              </p>
              <Button size="sm" variant="outline">
                Schedule Meeting
              </Button>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Skill Development</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                Recommend React training for Carol to improve frontend development speed
              </p>
              <Button size="sm" variant="outline">
                Create Training Plan
              </Button>
            </div>

            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Resource Allocation</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                Move 2 tasks from Alice to Bob to balance workload and prevent burnout
              </p>
              <Button size="sm" variant="outline">
                Rebalance Tasks
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
