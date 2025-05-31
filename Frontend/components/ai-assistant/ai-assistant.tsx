"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import {
  Bot,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Zap,
  X,
  Maximize2,
  Minimize2,
  ChevronRight,
  Send,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AIInsight {
  id: string
  type: "warning" | "suggestion" | "optimization" | "prediction"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  actionable: boolean
  action?: string
  data?: any
}

interface AIMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  insights?: AIInsight[]
}

const mockInsights: AIInsight[] = [
  {
    id: "1",
    type: "warning",
    title: "Project Deadline Risk",
    description: "Website Redesign project is 15% behind schedule. 3 critical tasks are overdue.",
    impact: "high",
    actionable: true,
    action: "Reassign tasks or extend deadline",
    data: { projectId: "1", overdueTasks: 3, delayDays: 5 },
  },
  {
    id: "2",
    type: "optimization",
    title: "Team Workload Imbalance",
    description: "Alice Johnson has 8 active tasks while Bob Smith has only 2. Consider redistributing workload.",
    impact: "medium",
    actionable: true,
    action: "Rebalance task assignments",
    data: { overloadedMember: "Alice Johnson", underutilizedMember: "Bob Smith" },
  },
  {
    id: "3",
    type: "prediction",
    title: "Sprint Completion Forecast",
    description: "Based on current velocity, the team will complete 85% of planned tasks this sprint.",
    impact: "medium",
    actionable: false,
    data: { completionRate: 85, confidence: 92 },
  },
  {
    id: "4",
    type: "suggestion",
    title: "Productivity Pattern Detected",
    description: "Team productivity peaks on Tuesdays and Wednesdays. Schedule important meetings accordingly.",
    impact: "low",
    actionable: true,
    action: "Optimize meeting schedule",
    data: { peakDays: ["Tuesday", "Wednesday"], productivityIncrease: "23%" },
  },
]

const aiSuggestions = [
  "Analyze team performance this month",
  "Suggest task prioritization for next sprint",
  "Identify potential project risks",
  "Optimize team workload distribution",
  "Predict project completion dates",
  "Generate productivity insights",
]

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI assistant. I've analyzed your projects and found some insights that might help optimize your team's performance. How can I assist you today?",
      timestamp: new Date(),
      insights: mockInsights.slice(0, 2),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [insights] = useState(mockInsights)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "suggestion":
        return <Lightbulb className="h-4 w-4 text-yellow-500" />
      case "optimization":
        return <Zap className="h-4 w-4 text-blue-500" />
      case "prediction":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      default:
        return <Bot className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
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

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: "user",
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(newMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("performance") || input.includes("analyze")) {
      return "Based on your team's data, I've identified that productivity has increased by 18% this month. Alice Johnson is your top performer with 95% task completion rate. However, I notice some bottlenecks in the design review process that could be optimized."
    }

    if (input.includes("risk") || input.includes("deadline")) {
      return "I've detected 2 high-risk projects: Website Redesign (15% behind schedule) and Mobile App Development (resource constraints). I recommend reassigning 2 tasks from Alice to Bob and extending the Website Redesign deadline by 1 week."
    }

    if (input.includes("workload") || input.includes("balance")) {
      return "Current workload analysis shows Alice Johnson at 120% capacity while Bob Smith is at 60%. I suggest moving the 'Content Migration' and 'Performance Testing' tasks from Alice to Bob to achieve better balance."
    }

    return "I understand you're looking for insights. Let me analyze your current projects and team performance to provide specific recommendations. Would you like me to focus on any particular area like deadlines, team performance, or resource allocation?"
  }

  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion)
  }

  const handleInsightAction = (insight: AIInsight) => {
    // In a real app, this would trigger actual actions
    console.log("Executing action for insight:", insight)

    // Simulate action execution
    const actionMessage: AIMessage = {
      id: Date.now().toString(),
      type: "ai",
      content: `I've initiated the action: "${insight.action}". This should help address the ${insight.title.toLowerCase()}. I'll monitor the results and update you on the progress.`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, actionMessage])
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
    if (isExpanded) setIsExpanded(false)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
    if (isMinimized) setIsMinimized(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Bot className="h-6 w-6" />
        </Button>
        {insights.filter((i) => i.impact === "high").length > 0 && (
          <div className="absolute -top-2 -right-2">
            <Badge variant="destructive" className="animate-pulse">
              {insights.filter((i) => i.impact === "high").length}
            </Badge>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-300 shadow-2xl ${
        isMinimized
          ? "bottom-6 right-6 w-80 h-14 rounded-full"
          : isExpanded
            ? "bottom-0 right-0 w-full h-[80vh] rounded-none"
            : "bottom-6 right-6 w-96 h-[600px] rounded-xl"
      }`}
    >
      <div
        className={`flex flex-col h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden ${
          isMinimized ? "rounded-full" : isExpanded ? "rounded-none" : "rounded-xl"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white ${
            isMinimized ? "rounded-full" : isExpanded ? "rounded-none" : "rounded-t-xl"
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            {!isMinimized && (
              <div>
                <h3 className="font-semibold flex items-center">
                  AI Assistant
                  <Badge variant="outline" className="ml-2 text-white border-white/30 bg-white/10">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Smart
                  </Badge>
                </h3>
                <p className="text-xs text-white/80">Your intelligent project management companion</p>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {!isMinimized && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-white/20"
                onClick={toggleExpand}
              >
                {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full hover:bg-white/20"
              onClick={toggleMinimize}
            >
              {isMinimized ? <ChevronRight className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <div className="border-b border-gray-200 dark:border-gray-800">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                  <TabsTrigger
                    value="chat"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                  >
                    Chat
                  </TabsTrigger>
                  <TabsTrigger
                    value="insights"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
                  >
                    Insights
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0 overflow-hidden">
                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : ""}`}>
                          <div
                            className={`flex items-start space-x-2 ${
                              message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                            }`}
                          >
                            <Avatar className="h-8 w-8">
                              {message.type === "ai" ? (
                                <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                                  <Bot className="h-4 w-4 text-white" />
                                </div>
                              ) : (
                                <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
                              )}
                            </Avatar>
                            <div
                              className={`rounded-lg p-3 ${
                                message.type === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-gray-100 dark:bg-gray-800"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                            </div>
                          </div>

                          {/* AI Insights in message */}
                          {message.insights && message.insights.length > 0 && (
                            <div className="mt-3 space-y-2 pl-10">
                              {message.insights.map((insight) => (
                                <Card key={insight.id} className="border-l-4 border-l-indigo-500">
                                  <CardContent className="p-3">
                                    <div className="flex items-start justify-between">
                                      <div className="flex items-start space-x-2">
                                        {getInsightIcon(insight.type)}
                                        <div>
                                          <p className="text-sm font-medium">{insight.title}</p>
                                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                            {insight.description}
                                          </p>
                                          {insight.actionable && (
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              className="mt-2 text-xs"
                                              onClick={() => handleInsightAction(insight)}
                                            >
                                              <Zap className="h-3 w-3 mr-1" />
                                              {insight.action}
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                      <Badge variant={getImpactColor(insight.impact) as any} className="text-xs">
                                        {insight.impact}
                                      </Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          </Avatar>
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              />
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Quick Suggestions */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about your projects..."
                      className="flex-1"
                    />
                    <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="flex-1 p-0 m-0 overflow-hidden">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {insights.map((insight) => (
                      <Card key={insight.id} className="border-l-4 border-l-indigo-500">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {getInsightIcon(insight.type)}
                              <h3 className="font-medium">{insight.title}</h3>
                            </div>
                            <Badge variant={getImpactColor(insight.impact) as any}>{insight.impact} impact</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{insight.description}</p>
                          {insight.actionable && (
                            <Button size="sm" variant="outline" onClick={() => handleInsightAction(insight)}>
                              <Zap className="h-4 w-4 mr-2" />
                              {insight.action}
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}
