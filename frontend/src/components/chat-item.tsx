"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users } from "lucide-react"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
}

interface Chat {
  id: string
  type: "dm" | "group"
  participants: string[]
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  messages: Message[]
}

interface ChatItemProps {
  chat: Chat
  isSelected: boolean
  onClick: () => void
}

export function ChatItem({ chat, isSelected, onClick }: ChatItemProps) {
  return (
    <div
      className={`flex items-center p-4 cursor-pointer transition-colors duration-200 ${
        isSelected ? "bg-blue-700/30" : "hover:bg-gray-700"
      }`}
      onClick={onClick}
    >
      <Avatar className="h-10 w-10 mr-3">
        <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
        <AvatarFallback>{chat.type === "group" ? <Users className="h-5 w-5" /> : chat.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-white truncate">{chat.name}</span>
          <span className="text-xs text-gray-400">{chat.timestamp}</span>
        </div>
        <p className="text-sm text-gray-300 truncate">{chat.lastMessage}</p>
      </div>
    </div>
  )
}
