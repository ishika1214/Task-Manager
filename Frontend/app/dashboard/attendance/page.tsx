"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Download, CalendarIcon, CheckCircle, XCircle, Clock3 } from "lucide-react"
import { format } from "date-fns"

const mockAttendanceData = [
  {
    date: "2024-01-15",
    clockIn: "09:00 AM",
    clockOut: "06:00 PM",
    totalHours: "9h 0m",
    status: "present",
    breaks: "1h 0m",
  },
  {
    date: "2024-01-14",
    clockIn: "09:15 AM",
    clockOut: "06:30 PM",
    totalHours: "9h 15m",
    status: "present",
    breaks: "1h 0m",
  },
  {
    date: "2024-01-13",
    clockIn: "09:30 AM",
    clockOut: "05:45 PM",
    totalHours: "8h 15m",
    status: "present",
    breaks: "1h 0m",
  },
  {
    date: "2024-01-12",
    clockIn: "-",
    clockOut: "-",
    totalHours: "0h 0m",
    status: "absent",
    breaks: "-",
  },
  {
    date: "2024-01-11",
    clockIn: "10:00 AM",
    clockOut: "06:00 PM",
    totalHours: "8h 0m",
    status: "late",
    breaks: "1h 0m",
  },
]

const mockCurrentStatus = {
  isClocked: true,
  clockInTime: "09:00 AM",
  currentTime: "02:30 PM",
  totalHours: "5h 30m",
  onBreak: false,
}

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [currentStatus, setCurrentStatus] = useState(mockCurrentStatus)

  const handleClockIn = () => {
    setCurrentStatus((prev) => ({
      ...prev,
      isClocked: true,
      clockInTime: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }))
  }

  const handleClockOut = () => {
    setCurrentStatus((prev) => ({
      ...prev,
      isClocked: false,
      clockInTime: "",
      totalHours: "8h 30m",
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "default"
      case "absent":
        return "destructive"
      case "late":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "absent":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "late":
        return <Clock3 className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const exportToCSV = () => {
    const csvContent = [
      ["Date", "Clock In", "Clock Out", "Total Hours", "Status", "Breaks"],
      ...mockAttendanceData.map((record) => [
        record.date,
        record.clockIn,
        record.clockOut,
        record.totalHours,
        record.status,
        record.breaks,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `attendance-${selectedMonth + 1}-${selectedYear}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Attendance</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your work hours and attendance</p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Current Status & Clock In/Out */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <p className="text-gray-600 dark:text-gray-400">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
            </div>

            {currentStatus.isClocked ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Clock In Time:</span>
                  <span className="font-medium">{currentStatus.clockInTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Hours Worked:</span>
                  <span className="font-medium">{currentStatus.totalHours}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                  <Badge variant="default">Clocked In</Badge>
                </div>
                <Button onClick={handleClockOut} className="w-full bg-red-500 hover:bg-red-600">
                  Clock Out
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-center py-4">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">You are currently clocked out</p>
                  <Button onClick={handleClockIn} className="w-full bg-primary hover:bg-primary/90">
                    Clock In
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
          <CardDescription>View and filter your attendance records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Select
              value={selectedMonth.toString()}
              onValueChange={(value) => setSelectedMonth(Number.parseInt(value))}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {new Date(2024, i).toLocaleString("default", { month: "long" })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(Number.parseInt(value))}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Clock In</th>
                  <th className="text-left py-3 px-4">Clock Out</th>
                  <th className="text-left py-3 px-4">Total Hours</th>
                  <th className="text-left py-3 px-4">Breaks</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockAttendanceData.map((record, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">{format(new Date(record.date), "MMM d, yyyy")}</td>
                    <td className="py-3 px-4">{record.clockIn}</td>
                    <td className="py-3 px-4">{record.clockOut}</td>
                    <td className="py-3 px-4">{record.totalHours}</td>
                    <td className="py-3 px-4">{record.breaks}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(record.status)}
                        <Badge variant={getStatusColor(record.status)}>{record.status}</Badge>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Days Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">18</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Days Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Late Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">156h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
