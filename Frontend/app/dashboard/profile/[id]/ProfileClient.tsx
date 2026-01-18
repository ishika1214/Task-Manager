"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Building,
  Calendar,
  Star,
  Award,
  TrendingUp,
  Clock,
  Coffee,
  Home,
  Laptop,
  UserCheck,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

// Mock user data
const mockUsers = {
  "1": {
    id: "1",
    name: "John Doe",
    email: "john@taskflow.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=128&width=128",
    role: "Project Manager",
    department: "Engineering",
    location: "New York, NY",
    joinDate: "2022-05-15",
    bio: "Experienced project manager with a passion for delivering high-quality software products on time and within budget.",
    skills: [
      "Project Management",
      "Agile",
      "Scrum",
      "Team Leadership",
      "Risk Management",
    ],
    status: "available",
    workingFrom: "office",
    currentActivity: "",
    praiseBadges: [
      { type: "excellence", count: 3, lastReceived: "2024-01-10" },
      { type: "leadership", count: 2, lastReceived: "2024-01-05" },
      { type: "teamwork", count: 4, lastReceived: "2023-12-20" },
    ],
    recentPraise: [
      {
        id: "1",
        badge: "excellence",
        reason: "Outstanding project delivery on Website Redesign",
        givenBy: "Alice Johnson",
        date: "2024-01-10",
      },
      {
        id: "2",
        badge: "leadership",
        reason: "Excellent team coordination during sprint planning",
        givenBy: "Bob Smith",
        date: "2024-01-05",
      },
    ],
    stats: {
      projectsCompleted: 12,
      tasksCompleted: 89,
      teamCollaborations: 15,
      avgRating: 4.8,
    },
  },
  "2": {
    id: "2",
    name: "Alice Johnson",
    email: "alice@taskflow.com",
    phone: "+1 (555) 234-5678",
    avatar: "/placeholder.svg?height=128&width=128",
    role: "Senior Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    joinDate: "2021-03-10",
    bio: "Full-stack developer with expertise in React, Node.js, and cloud technologies. Passionate about clean code and user experience.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
    status: "busy",
    workingFrom: "remote",
    currentActivity: "meeting",
    praiseBadges: [
      { type: "innovation", count: 5, lastReceived: "2024-01-12" },
      { type: "excellence", count: 3, lastReceived: "2024-01-08" },
      { type: "teamwork", count: 2, lastReceived: "2023-12-15" },
    ],
    recentPraise: [
      {
        id: "1",
        badge: "innovation",
        reason: "Innovative solution for API optimization",
        givenBy: "John Doe",
        date: "2024-01-12",
      },
    ],
    stats: {
      projectsCompleted: 18,
      tasksCompleted: 156,
      teamCollaborations: 22,
      avgRating: 4.9,
    },
  },
};

const statusOptions = [
  {
    value: "available",
    label: "Available",
    icon: UserCheck,
    color: "bg-green-500",
  },
  { value: "busy", label: "Busy", icon: Clock, color: "bg-red-500" },
  { value: "away", label: "Away", icon: Coffee, color: "bg-yellow-500" },
  { value: "offline", label: "Offline", icon: User, color: "bg-gray-500" },
];

const workingFromOptions = [
  { value: "office", label: "In Office", icon: Building },
  { value: "remote", label: "Remote", icon: Home },
  { value: "hybrid", label: "Hybrid", icon: Laptop },
];

const praiseBadgeTypes = {
  excellence: { label: "Excellence", color: "bg-yellow-500", icon: Star },
  teamwork: { label: "Teamwork", color: "bg-blue-500", icon: User },
  innovation: { label: "Innovation", color: "bg-purple-500", icon: TrendingUp },
  leadership: { label: "Leadership", color: "bg-green-500", icon: Award },
  dedication: { label: "Dedication", color: "bg-red-500", icon: Clock },
};
interface ProfileClientProps {
  params: {
    id: string;
  };
}
export default function ProfileClient({ params }: ProfileClientProps) {
  const userId = params.id;
  const user = mockUsers[userId as keyof typeof mockUsers];

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            The user profile you're looking for doesn't exist.
          </p>
          <Link href="/dashboard/employees">
            <Button className="mt-4">Back to Employees</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    const status = statusOptions.find((s) => s.value === user.status);
    if (!status) return null;
    const Icon = status.icon;
    return <Icon className="h-4 w-4" />;
  };

  const getWorkingFromIcon = () => {
    const workingFrom = workingFromOptions.find(
      (w) => w.value === user.workingFrom,
    );
    if (!workingFrom) return null;
    const Icon = workingFrom.icon;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/employees">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {user.name}'s Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View team member profile and achievements
            </p>
          </div>
        </div>
      </div>

      {/* Status Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <Badge
                variant="outline"
                className="flex items-center space-x-2 px-3 py-1"
              >
                <div
                  className={`w-2 h-2 rounded-full ${statusOptions.find((s) => s.value === user.status)?.color}`}
                ></div>
                {getStatusIcon()}
                <span>
                  {statusOptions.find((s) => s.value === user.status)?.label}
                </span>
              </Badge>

              <Badge
                variant="outline"
                className="flex items-center space-x-2 px-3 py-1"
              >
                {getWorkingFromIcon()}
                <span>
                  {
                    workingFromOptions.find((w) => w.value === user.workingFrom)
                      ?.label
                  }
                </span>
              </Badge>

              {user.currentActivity && (
                <Badge variant="outline" className="px-3 py-1">
                  {user.currentActivity === "meeting" && "In a meeting"}
                  {user.currentActivity === "lunch" && "At lunch"}
                  {user.currentActivity === "focus" && "Focus time"}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Info */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback className="text-4xl">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 border rounded-md p-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{user.name}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 border rounded-md p-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{user.email}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 border rounded-md p-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{user.phone}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 border rounded-md p-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{user.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="border rounded-md p-3 text-sm">
                      {user.bio}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Info */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 border rounded-md p-2">
                    <Briefcase className="h-4 w-4 text-gray-500" />
                    <span>{user.role}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 border rounded-md p-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span>{user.department}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 border rounded-md p-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      Joined {new Date(user.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          {/* Praise Badges */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Praise Badges
              </CardTitle>
              <CardDescription>
                Recognition received from team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {user.praiseBadges.map((badge) => {
                  const badgeType =
                    praiseBadgeTypes[
                      badge.type as keyof typeof praiseBadgeTypes
                    ];
                  const Icon = badgeType.icon;
                  return (
                    <div
                      key={badge.type}
                      className="text-center p-4 border rounded-lg"
                    >
                      <div
                        className={`w-12 h-12 ${badgeType.color} rounded-full flex items-center justify-center mx-auto mb-2`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-medium">{badgeType.label}</h4>
                      <p className="text-2xl font-bold text-primary">
                        {badge.count}
                      </p>
                      <p className="text-xs text-gray-500">
                        Last:{" "}
                        {new Date(badge.lastReceived).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Recent Praise</h4>
                {user.recentPraise.map((praise) => {
                  const badgeType =
                    praiseBadgeTypes[
                      praise.badge as keyof typeof praiseBadgeTypes
                    ];
                  return (
                    <div
                      key={praise.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div
                        className={`w-8 h-8 ${badgeType.color} rounded-full flex items-center justify-center`}
                      >
                        <Star className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className={`praise-badge ${praise.badge}`}>
                            {badgeType.label}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            from {praise.givenBy}
                          </span>
                        </div>
                        <p className="text-sm">{praise.reason}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(praise.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          {/* Performance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Projects Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {user.stats.projectsCompleted}
                </div>
                <p className="text-xs text-muted-foreground">Total projects</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Tasks Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {user.stats.tasksCompleted}
                </div>
                <p className="text-xs text-muted-foreground">Total tasks</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Team Collaborations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {user.stats.teamCollaborations}
                </div>
                <p className="text-xs text-muted-foreground">
                  Cross-team projects
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {user.stats.avgRating}
                </div>
                <p className="text-xs text-muted-foreground">Out of 5.0</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
