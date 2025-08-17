// CoreChat/frontend/src/app/(chat)/chat/components/ChatHeader.tsx

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Info, MoreVertical, Users, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface User {
  id: string
  name: string
  avatar: string
  status?: "online" | "offline"
  lastSeen?: string
}

interface ChatHeaderProps {
  chatName: string
  chatId?: string
  chatAvatar?: string
  chatType: "dm" | "group"
  participant?: User
  onToggleInfoPanel: () => void
}

export function ChatHeader({
  chatName,
  chatId,
  chatAvatar,
  chatType,
  participant,
  onToggleInfoPanel,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center p-4 border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
      <div className="relative">
        <Avatar className="h-12 w-12 mr-4 border-2 border-slate-600">
          <AvatarImage src={chatAvatar || "/placeholder.svg"} alt={chatName} />
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold">
            {chatType === "group" ? <Users className="h-6 w-6" /> : chatName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {participant && (
          <div
            className={cn(
              "absolute -bottom-0.5 -right-2 w-4 h-4 rounded-full border-2 border-slate-800",
              participant.status === "online" ? "bg-green-500" : "bg-slate-500",
            )}
          />
        )}
      </div>

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-white">{chatName}</h2>
        {participant && (
          <p className="text-sm text-slate-400">
            {participant.status === "online" ? "Active now" : participant.lastSeen}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-700 hover:text-white">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-700 hover:text-white">
          <Search className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:bg-slate-700 hover:text-white"
          onClick={onToggleInfoPanel}
        >
          <Info className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-700 hover:text-white">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
