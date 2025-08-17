"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
}

interface MessageBubbleProps {
  message: Message
  isCurrentUser: boolean
  senderAvatar: string // Simplified for mock, in real app pass sender object
}

export function MessageBubble({ message, isCurrentUser, senderAvatar }: MessageBubbleProps) {
  return (
    <div className={`flex items-end gap-2 ${isCurrentUser ? "justify-end" : ""}`}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={senderAvatar || "/placeholder.svg"} alt="Sender Avatar" />
          <AvatarFallback>{message.senderId.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`p-3 rounded-lg max-w-[70%] ${
          isCurrentUser
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none"
            : "bg-gray-700 text-gray-100 rounded-bl-none"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <span className={`block text-xs mt-1 ${isCurrentUser ? "text-blue-200" : "text-gray-400"} text-right`}>
          {message.timestamp}
        </span>
      </div>
      {isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={senderAvatar || "/placeholder.svg"} alt="My Avatar" />
          <AvatarFallback>{message.senderId.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
