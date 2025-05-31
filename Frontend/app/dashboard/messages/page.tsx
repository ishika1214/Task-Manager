"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Search, Send, Plus, Users, Hash, MoreHorizontal, Trash2, UserPlus, UserMinus, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

const mockChats = [
  {
    id: "1",
    type: "direct",
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey, can you review the latest designs?",
    lastMessageTime: "2 min ago",
    unreadCount: 2,
    online: true,
  },
  {
    id: "2",
    type: "group",
    name: "Website Redesign Team",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Bob: The homepage mockup is ready",
    lastMessageTime: "15 min ago",
    unreadCount: 0,
    online: false,
    members: [
      { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "2", name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "3", name: "Carol Davis", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "4", name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "5", name: "Eva Martinez", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "3",
    type: "direct",
    name: "Carol Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the feedback!",
    lastMessageTime: "1 hour ago",
    unreadCount: 0,
    online: false,
  },
  {
    id: "4",
    type: "group",
    name: "Mobile App Development",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "David: API integration is complete",
    lastMessageTime: "2 hours ago",
    unreadCount: 1,
    online: false,
    members: [
      { id: "4", name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "5", name: "Eva Martinez", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "6", name: "Frank Thompson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
]

const mockMessages = [
  {
    id: "1",
    senderId: "2",
    senderName: "Alice Johnson",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    content: "Hey, can you review the latest designs?",
    timestamp: "2024-01-15T10:30:00Z",
    isOwn: false,
  },
  {
    id: "2",
    senderId: "1",
    senderName: "You",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    content: "I'll take a look at them now.",
    timestamp: "2024-01-15T10:32:00Z",
    isOwn: true,
  },
  {
    id: "3",
    senderId: "2",
    senderName: "Alice Johnson",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    content: "Great! I've uploaded them to the shared folder. Let me know if you have any questions.",
    timestamp: "2024-01-15T10:33:00Z",
    isOwn: false,
  },
  {
    id: "4",
    senderId: "1",
    senderName: "You",
    senderAvatar: "/placeholder.svg?height=32&width=32",
    content: "The designs look fantastic! I have a few minor suggestions that I'll add as comments.",
    timestamp: "2024-01-15T10:45:00Z",
    isOwn: true,
  },
]

const mockEmployees = [
  { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32", department: "Engineering" },
  { id: "2", name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32", department: "Design" },
  { id: "3", name: "Carol Davis", avatar: "/placeholder.svg?height=32&width=32", department: "Marketing" },
  { id: "4", name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32", department: "Engineering" },
  { id: "5", name: "Eva Martinez", avatar: "/placeholder.svg?height=32&width=32", department: "Product" },
  { id: "6", name: "Frank Thompson", avatar: "/placeholder.svg?height=32&width=32", department: "QA" },
]

export default function MessagesPage() {
  const [chats, setChats] = useState(mockChats)
  const [selectedChat, setSelectedChat] = useState(mockChats[0])
  const [messages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false)
  const [isGroupMembersDialogOpen, setIsGroupMembersDialogOpen] = useState(false)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [newChatType, setNewChatType] = useState<"direct" | "group">("direct")
  const [newChatName, setNewChatName] = useState("")
  const { toast } = useToast()

  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleDeleteChat = (chatId: string) => {
    setChats(chats.filter((chat) => chat.id !== chatId))
    if (selectedChat.id === chatId && chats.length > 1) {
      setSelectedChat(chats.find((chat) => chat.id !== chatId) || chats[0])
    }
    toast({
      title: "Chat deleted",
      description: "The conversation has been deleted successfully.",
    })
  }

  const handleCreateChat = () => {
    if (newChatType === "direct" && selectedEmployees.length !== 1) {
      toast({
        title: "Error",
        description: "Please select exactly one employee for direct message.",
        variant: "destructive",
      })
      return
    }

    if (newChatType === "group" && (selectedEmployees.length < 2 || !newChatName.trim())) {
      toast({
        title: "Error",
        description: "Please select at least 2 employees and provide a group name.",
        variant: "destructive",
      })
      return
    }

    const newChat = {
      id: Date.now().toString(),
      type: newChatType,
      name:
        newChatType === "direct"
          ? mockEmployees.find((emp) => emp.id === selectedEmployees[0])?.name || "Unknown"
          : newChatName,
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Chat created",
      lastMessageTime: "now",
      unreadCount: 0,
      online: false,
      ...(newChatType === "group" && {
        members: selectedEmployees.map((id) => mockEmployees.find((emp) => emp.id === id)!).filter(Boolean),
      }),
    }

    setChats([newChat, ...chats])
    setSelectedChat(newChat)
    setIsNewChatDialogOpen(false)
    setSelectedEmployees([])
    setNewChatName("")

    toast({
      title: "Chat created",
      description: `${newChatType === "direct" ? "Direct message" : "Group chat"} created successfully.`,
    })
  }

  const handleAddMemberToGroup = () => {
    if (selectedEmployees.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one employee to add.",
        variant: "destructive",
      })
      return
    }

    // Update the selected chat with new members
    const updatedChat = {
      ...selectedChat,
      members: [
        ...(selectedChat.members || []),
        ...selectedEmployees.map((id) => mockEmployees.find((emp) => emp.id === id)!).filter(Boolean),
      ],
    }

    setChats(chats.map((chat) => (chat.id === selectedChat.id ? updatedChat : chat)))
    setSelectedChat(updatedChat)
    setIsAddMemberDialogOpen(false)
    setSelectedEmployees([])

    toast({
      title: "Members added",
      description: "New members have been added to the group.",
    })
  }

  const handleRemoveMember = (memberId: string) => {
    if (selectedChat.type === "group" && selectedChat.members) {
      const updatedChat = {
        ...selectedChat,
        members: selectedChat.members.filter((member) => member.id !== memberId),
      }

      setChats(chats.map((chat) => (chat.id === selectedChat.id ? updatedChat : chat)))
      setSelectedChat(updatedChat)

      toast({
        title: "Member removed",
        description: "Member has been removed from the group.",
      })
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const availableEmployees = mockEmployees.filter(
    (emp) => !selectedChat.members?.some((member) => member.id === emp.id),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="text-gray-600 dark:text-gray-400">Communicate with your team members</p>
        </div>
        <Dialog open={isNewChatDialogOpen} onOpenChange={setIsNewChatDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Start New Conversation</DialogTitle>
              <DialogDescription>Create a new direct message or group chat.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Chat Type</Label>
                <Select value={newChatType} onValueChange={(value: "direct" | "group") => setNewChatType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direct">Direct Message</SelectItem>
                    <SelectItem value="group">Group Chat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newChatType === "group" && (
                <div className="space-y-2">
                  <Label>Group Name</Label>
                  <Input
                    placeholder="Enter group name"
                    value={newChatName}
                    onChange={(e) => setNewChatName(e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>{newChatType === "direct" ? "Select Employee" : "Select Members"}</Label>
                <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
                  {mockEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={employee.id}
                        checked={selectedEmployees.includes(employee.id)}
                        onCheckedChange={(checked) => {
                          if (newChatType === "direct") {
                            setSelectedEmployees(checked ? [employee.id] : [])
                          } else {
                            setSelectedEmployees(
                              checked
                                ? [...selectedEmployees, employee.id]
                                : selectedEmployees.filter((id) => id !== employee.id),
                            )
                          }
                        }}
                      />
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{employee.name}</p>
                        <p className="text-xs text-gray-500">{employee.department}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsNewChatDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateChat}>Create Chat</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Chat List */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-b relative group ${
                    selectedChat.id === chat.id ? "bg-primary/10" : ""
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                        <AvatarFallback>
                          {chat.type === "group" ? <Hash className="h-4 w-4" /> : chat.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      {chat.type === "direct" && chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{chat.name}</p>
                        <div className="flex items-center space-x-2">
                          {chat.type === "group" && (
                            <div className="flex items-center text-xs text-gray-500">
                              <Users className="h-3 w-3 mr-1" />
                              {chat.members?.length || 0}
                            </div>
                          )}
                          {chat.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                      <p className="text-xs text-gray-400">{chat.lastMessageTime}</p>
                    </div>
                  </div>

                  {/* Delete button - only visible on hover */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Chat</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this conversation? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteChat(chat.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg h-full flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
                    <AvatarFallback>
                      {selectedChat.type === "group" ? <Hash className="h-4 w-4" /> : selectedChat.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{selectedChat.name}</CardTitle>
                    <CardDescription>
                      {selectedChat.type === "group"
                        ? `${selectedChat.members?.length || 0} members`
                        : selectedChat.online
                          ? "Online"
                          : "Offline"}
                    </CardDescription>
                  </div>
                </div>

                {selectedChat.type === "group" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setIsGroupMembersDialogOpen(true)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Members
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsAddMemberDialogOpen(true)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`chat-message ${message.isOwn ? "own" : ""}`}>
                      <div className={`flex items-start space-x-2 ${message.isOwn ? "justify-end" : ""}`}>
                        {!message.isOwn && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
                            <AvatarFallback className="text-xs">{message.senderName[0]}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`max-w-xs lg:max-w-md ${message.isOwn ? "order-first" : ""}`}>
                          {!message.isOwn && <p className="text-xs text-gray-500 mb-1">{message.senderName}</p>}
                          <div className={`chat-bubble ${message.isOwn ? "own" : "other"}`}>
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{formatTime(message.timestamp)}</p>
                        </div>
                        {message.isOwn && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
                            <AvatarFallback className="text-xs">{message.senderName[0]}</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <Separator />

              {/* Message Input */}
              <div className="p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-primary hover:bg-primary/90"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Group Members Dialog */}
      <Dialog open={isGroupMembersDialogOpen} onOpenChange={setIsGroupMembersDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Group Members</DialogTitle>
            <DialogDescription>Members of {selectedChat.name}</DialogDescription>
          </DialogHeader>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {selectedChat.members?.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{member.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <UserMinus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Member Dialog */}
      <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Members</DialogTitle>
            <DialogDescription>Select employees to add to the group</DialogDescription>
          </DialogHeader>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {availableEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`add-${employee.id}`}
                  checked={selectedEmployees.includes(employee.id)}
                  onCheckedChange={(checked) => {
                    setSelectedEmployees(
                      checked
                        ? [...selectedEmployees, employee.id]
                        : selectedEmployees.filter((id) => id !== employee.id),
                    )
                  }}
                />
                <Avatar className="h-8 w-8">
                  <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                  <AvatarFallback>
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{employee.name}</p>
                  <p className="text-xs text-gray-500">{employee.department}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMemberToGroup}>Add Members</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
