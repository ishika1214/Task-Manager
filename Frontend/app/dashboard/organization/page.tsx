"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Building2,
  Upload,
  Mail,
  Phone,
  MapPin,
  Globe,
  Users,
  Calendar,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react"

// Mock organization data
const mockOrganization = {
  id: "1",
  name: "Acme Corporation",
  logo: "/placeholder.svg?height=128&width=128",
  description: "A leading technology company focused on innovative solutions for modern businesses.",
  industry: "Technology",
  founded: "2015",
  size: "50-200 employees",
  website: "https://acme-corp.com",
  email: "contact@acme-corp.com",
  phone: "+1 (555) 123-4567",
  address: "123 Business Ave, Tech City, TC 12345",
  departments: [
    { id: "1", name: "Engineering", employeeCount: 45, head: "Alice Johnson" },
    { id: "2", name: "Design", employeeCount: 12, head: "Bob Smith" },
    { id: "3", name: "Marketing", employeeCount: 8, head: "Carol Davis" },
    { id: "4", name: "Sales", employeeCount: 15, head: "David Wilson" },
    { id: "5", name: "HR", employeeCount: 5, head: "Emma Thompson" },
  ],
  settings: {
    workingHours: "9:00 AM - 6:00 PM",
    timezone: "EST (UTC-5)",
    workingDays: "Monday - Friday",
    holidays: ["New Year's Day", "Independence Day", "Thanksgiving", "Christmas"],
  },
  stats: {
    totalEmployees: 85,
    activeProjects: 18,
    completedProjects: 142,
    departments: 5,
  },
}

// Mock user for role checking
const mockUser = {
  role: "admin", // admin, manager, employee
}

export default function OrganizationPage() {
  const [organization, setOrganization] = useState(mockOrganization)
  const [isEditing, setIsEditing] = useState(false)
  const [editedOrg, setEditedOrg] = useState(mockOrganization)
  const [activeTab, setActiveTab] = useState("details")
  const { toast } = useToast()

  const isAdminOrManager = mockUser.role === "admin" || mockUser.role === "manager"

  const handleSave = () => {
    setOrganization(editedOrg)
    setIsEditing(false)
    toast({
      title: "Organization updated",
      description: "Organization details have been updated successfully.",
    })
  }

  const handleCancel = () => {
    setEditedOrg(organization)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Organization</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your organization details and settings</p>
        </div>
        {isAdminOrManager && (
          <div className="flex space-x-2">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Organization
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Organization Overview */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="h-5 w-5 mr-2 text-primary" />
            Organization Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={organization.logo || "/placeholder.svg"} alt={organization.name} />
                <AvatarFallback className="text-4xl">
                  {organization.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="sm" className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Change Logo
                </Button>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  {isEditing ? (
                    <Input
                      id="orgName"
                      value={editedOrg.name}
                      onChange={(e) => setEditedOrg({ ...editedOrg, name: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span>{organization.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  {isEditing ? (
                    <Input
                      id="industry"
                      value={editedOrg.industry}
                      onChange={(e) => setEditedOrg({ ...editedOrg, industry: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <span>{organization.industry}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="founded">Founded</Label>
                  {isEditing ? (
                    <Input
                      id="founded"
                      value={editedOrg.founded}
                      onChange={(e) => setEditedOrg({ ...editedOrg, founded: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{organization.founded}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  {isEditing ? (
                    <Input
                      id="size"
                      value={editedOrg.size}
                      onChange={(e) => setEditedOrg({ ...editedOrg, size: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{organization.size}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                {isEditing ? (
                  <Textarea
                    id="description"
                    value={editedOrg.description}
                    onChange={(e) => setEditedOrg({ ...editedOrg, description: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <div className="border rounded-md p-3 text-sm">{organization.description}</div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Contact Details</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Organization contact details and location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  {isEditing ? (
                    <Input
                      id="website"
                      value={editedOrg.website}
                      onChange={(e) => setEditedOrg({ ...editedOrg, website: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span>{organization.website}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedOrg.email}
                      onChange={(e) => setEditedOrg({ ...editedOrg, email: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{organization.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editedOrg.phone}
                      onChange={(e) => setEditedOrg({ ...editedOrg, phone: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{organization.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                {isEditing ? (
                  <Textarea
                    id="address"
                    value={editedOrg.address}
                    onChange={(e) => setEditedOrg({ ...editedOrg, address: e.target.value })}
                    rows={2}
                  />
                ) : (
                  <div className="flex items-start space-x-2 border rounded-md p-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span>{organization.address}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Departments</CardTitle>
                  <CardDescription>Manage organization departments and their heads</CardDescription>
                </div>
                {isAdminOrManager && (
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Department
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {organization.departments.map((department) => (
                  <div
                    key={department.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{department.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Head: {department.head} • {department.employeeCount} employees
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{department.employeeCount}</Badge>
                      {isAdminOrManager && (
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>Configure working hours, holidays, and other settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Working Hours</Label>
                  <div className="border rounded-md p-2">
                    <span>{organization.settings.workingHours}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <div className="border rounded-md p-2">
                    <span>{organization.settings.timezone}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Working Days</Label>
                  <div className="border rounded-md p-2">
                    <span>{organization.settings.workingDays}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Company Holidays</Label>
                <div className="flex flex-wrap gap-2">
                  {organization.settings.holidays.map((holiday, index) => (
                    <Badge key={index} variant="outline">
                      {holiday}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{organization.stats.totalEmployees}</div>
                <p className="text-xs text-muted-foreground">Active team members</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{organization.stats.activeProjects}</div>
                <p className="text-xs text-muted-foreground">Currently running</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{organization.stats.completedProjects}</div>
                <p className="text-xs text-muted-foreground">Successfully delivered</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Departments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{organization.stats.departments}</div>
                <p className="text-xs text-muted-foreground">Organizational units</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
