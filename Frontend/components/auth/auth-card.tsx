import type React from "react"

interface AuthCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const AuthCard: React.FC<AuthCardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && <p className="text-sm sm:text-base text-muted-foreground text-center mb-6 sm:mb-8">{subtitle}</p>}
        {children}
      </div>
    </div>
  )
}

export default AuthCard
