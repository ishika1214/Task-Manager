import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, Calendar, MessageSquare, BarChart3, Shield } from "lucide-react"
import Link from "next/link"
import FeatureShowcase from "@/components/home/feature-showcase"
import HeroAnimation from "@/components/home/hero-animation"
import './globals.css';

export default function LandingPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Team Management",
      description: "Organize your teams and manage employee roles efficiently",
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Project Tracking",
      description: "Track project progress with detailed timelines and milestones",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Task Management",
      description: "Kanban-style task boards with drag-and-drop functionality",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Team Communication",
      description: "Built-in messaging and project-based chat rooms",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Attendance Tracking",
      description: "Clock in/out system with detailed attendance reports",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Role-Based Access",
      description: "Secure access control with customizable permissions",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">TaskFlow</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-gray-700 dark:text-gray-300">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 lg:mb-8">
            Streamline Your
            <span className="block bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Team Management
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto leading-relaxed">
            A comprehensive task management platform with role-based access control, project tracking, team
            communication, and AI-powered insights.
          </p>

          {/* Hero Animation */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <HeroAnimation />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureShowcase />

      {/* Features Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Everything you need to manage your team
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From project planning to team communication, TaskFlow provides all the tools your organization needs to stay
            productive and organized.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="text-center">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <CardTitle className="text-xl sm:text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base sm:text-lg text-center">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Card className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 text-white border-0 overflow-hidden">
          <CardContent className="text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
              Ready to transform your team management?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of teams already using TaskFlow to streamline their workflow and boost productivity.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                Get Started Today
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 TaskFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
