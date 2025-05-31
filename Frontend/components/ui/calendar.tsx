"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface CalendarProps {
  className?: string
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  mode?: "single" | "multiple" | "range"
  showOutsideDays?: boolean
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function Calendar({
  className,
  selected,
  onSelect,
  disabled,
  mode = "single",
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(year, month, day)
    if (disabled && disabled(clickedDate)) return
    onSelect?.(clickedDate)
  }

  const isSelected = (day: number) => {
    if (!selected) return false
    const date = new Date(year, month, day)
    return selected.toDateString() === date.toDateString()
  }

  const isToday = (day: number) => {
    const today = new Date()
    const date = new Date(year, month, day)
    return today.toDateString() === date.toDateString()
  }

  const isDisabled = (day: number) => {
    if (!disabled) return false
    const date = new Date(year, month, day)
    return disabled(date)
  }

  const renderCalendarDays = () => {
    const days = []

    // Previous month's days
    if (showOutsideDays) {
      const prevMonth = new Date(year, month - 1, 0)
      const prevMonthDays = prevMonth.getDate()
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = prevMonthDays - i
        days.push(
          <button
            key={`prev-${day}`}
            className="h-9 w-9 p-0 font-normal text-muted-foreground opacity-50 hover:bg-accent hover:text-accent-foreground"
            onClick={() => {
              setCurrentDate(new Date(year, month - 1, day))
              onSelect?.(new Date(year, month - 1, day))
            }}
          >
            {day}
          </button>,
        )
      }
    } else {
      for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(<div key={`empty-${i}`} className="h-9 w-9" />)
      }
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <button
          key={day}
          className={cn(
            "h-9 w-9 p-0 font-normal hover:bg-accent hover:text-accent-foreground",
            isSelected(day) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            isToday(day) && !isSelected(day) && "bg-accent text-accent-foreground",
            isDisabled(day) && "text-muted-foreground opacity-50 cursor-not-allowed",
          )}
          onClick={() => handleDateClick(day)}
          disabled={isDisabled(day)}
        >
          {day}
        </button>,
      )
    }

    // Next month's days
    if (showOutsideDays) {
      const remainingCells = 42 - days.length // 6 rows × 7 days
      for (let day = 1; day <= remainingCells; day++) {
        days.push(
          <button
            key={`next-${day}`}
            className="h-9 w-9 p-0 font-normal text-muted-foreground opacity-50 hover:bg-accent hover:text-accent-foreground"
            onClick={() => {
              setCurrentDate(new Date(year, month + 1, day))
              onSelect?.(new Date(year, month + 1, day))
            }}
          >
            {day}
          </button>,
        )
      }
    }

    return days
  }

  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center pt-1 relative items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
            onClick={previousMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">
            {MONTHS[month]} {year}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
            onClick={nextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="w-full border-collapse space-y-1">
          <div className="flex">
            {DAYS.map((day) => (
              <div key={day} className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 mt-2">{renderCalendarDays()}</div>
        </div>
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
