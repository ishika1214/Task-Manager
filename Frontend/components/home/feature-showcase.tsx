"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "AI-Powered Task Suggestions",
    description: "Get smart task recommendations based on project history and timelines.",
    icon: "💡",
  },
  {
    title: "Smart Prioritization",
    description: "Automatically rank tasks by urgency and importance using AI scoring.",
    icon: "📊",
  },
  {
    title: "Time Prediction & Effort Estimation",
    description: "Estimate task durations and project completion dates with AI.",
    icon: "⏳",
  },
  {
    title: "Smart Messaging + Summarization",
    description: "Summarize chat rooms and meeting discussions with AI.",
    icon: "💬",
  },
  {
    title: "Daily Standup Automation",
    description: "Generate daily progress reports and identify blockers automatically.",
    icon: "🧾",
  },
  {
    title: "Intelligent Search",
    description: "Find tasks, messages, and files using semantic search.",
    icon: "🔎",
  },
]

const FeatureShowcase = () => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(Array(features.length).fill(false))
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  // Initialize refs array
  useEffect(() => {
    featureRefs.current = featureRefs.current.slice(0, features.length)
  }, [])

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = featureRefs.current.findIndex((ref) => ref === entry.target)
          if (index !== -1 && entry.isIntersecting) {
            setVisibleItems((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px" },
    )

    // Observe all feature refs
    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, []) // Empty dependency array means this runs once on mount

  return (
    <div className="space-y-4 py-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Discover the Power of AI</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
        Unlock the full potential of your team with our AI-powered task management features.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            ref={(el) => (featureRefs.current[index] = el)}
            className={`feature-card border-0 shadow-lg transition-all duration-500 ${
              visibleItems[index] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <span className="mr-2 text-2xl">{feature.icon}</span>
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default FeatureShowcase
