// CoreChat/frontend/src/app/(chat)/chat/components/ChatInfoPanel.tsx

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Phone, Mail, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface User {
  id: string
  name: string
  avatar: string
  status?: "online" | "offline"
  lastSeen?: string
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
}

interface Chat {
  id: string
  type: "dm" | "group"
  participantIds: string[]
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isUnread: boolean
  messages: Message[]
}

interface ChatInfoPanelProps {
  chat: Chat
  users: User[]
}

export function ChatInfoPanel({ chat, users }: ChatInfoPanelProps) {
  const otherParticipant = chat.type === "dm" ? users.find((user) => user.id === chat.participantIds[0]) : null

  const mockMedia = [
    "/placeholder.svg?height=100&width=100&text=IMG1",
    "/placeholder.svg?height=100&width=100&text=IMG2",
    "/placeholder.svg?height=100&width=100&text=IMG3",
    "/placeholder.svg?height=100&width=100&text=IMG4",
    "/placeholder.svg?height=100&width=100&text=IMG5",
    "/placeholder.svg?height=100&width=100&text=IMG6",
  ]

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">Contact Info</h3>
      </div>

      {/* User Profile Section */}
      <div className="flex flex-col items-center text-center p-6 border-b border-slate-700">
        <div className="relative">
          <Avatar className="h-24 w-24 mb-4 border-4 border-slate-600">
            <AvatarImage src={otherParticipant?.avatar || chat.avatar || "/placeholder.svg"} alt={chat.name} />
            <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold">
              {chat.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {otherParticipant && (
            <div
              className={cn(
                "absolute bottom-3 right-1 w-6 h-6 rounded-full border-4 border-slate-800",
                otherParticipant.status === "online" ? "bg-green-500" : "bg-slate-500",
              )}
            />
          )}
        </div>

        <h3 className="text-xl font-semibold text-white mb-1">{chat.name}</h3>
        {otherParticipant && (
          <p className="text-sm text-slate-400 mb-4">
            {otherParticipant.status === "online" ? "Active now" : otherParticipant.lastSeen}
          </p>
        )}

        <div className="flex space-x-2 mb-4">
          <Badge variant="outline" className="bg-blue-600/20 text-blue-400 border-blue-500/50">
            Friend
          </Badge>
          <Badge variant="outline" className="bg-green-600/20 text-green-400 border-green-500/50">
            {otherParticipant?.status === "online" ? "Online" : "Offline"}
          </Badge>
        </div>

        {/* Action Buttons - Removed Video */}
        <div className="flex space-x-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white bg-transparent"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white bg-transparent"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Media Section */}
      <div className="p-4">
        <Collapsible defaultOpen className="group/collapsible">
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-white font-semibold hover:text-blue-400 transition-colors">
            <span>Shared Media</span>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="grid grid-cols-3 gap-2 mt-3">
            {mockMedia.map((src, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden bg-slate-700 hover:bg-slate-600 transition-colors cursor-pointer"
              >
                <img
                  src={src || "/placeholder.svg"}
                  alt={`Media ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>

      <Separator className="bg-slate-700" />

      {/* Contact Details */}
      <div className="p-4">
        <Collapsible defaultOpen className="group/collapsible">
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-white font-semibold hover:text-blue-400 transition-colors">
            <span>Contact Details</span>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
              <Phone className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-sm text-white">+1 202 555 0156</p>
                <p className="text-xs text-slate-400">Mobile</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
              <Mail className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-sm text-white">{chat.name.toLowerCase().replace(" ", ".")}@email.com</p>
                <p className="text-xs text-slate-400">Email</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
