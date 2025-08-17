"use client"

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, MoreVertical, Users } from "lucide-react";
import { MessageBubble } from "@/components/message-bubble";

interface User {
  id: string
  name: string
  avatar: string
  status?: "online" | "offline" // Status is optional for current user
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
  participants: string[]
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  messages: Message[]
}

interface ChatWindowProps {
  chat: Chat
  currentUser: User
}

export function ChatWindow({ chat, currentUser }: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chat.messages])

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, you'd send this to a backend
      console.log("Sending message:", messageInput)
      setMessageInput("")
      // For mock data, you'd update the chat.messages array here
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b border-gray-700 bg-gray-800">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
          <AvatarFallback>{chat.type === "group" ? <Users className="h-5 w-5" /> : chat.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-white">{chat.name}</h2>
          {chat.type === "dm" && (
            <p className="text-sm text-gray-400">
              {/* This would dynamically show online/offline status for DM */}
              {chat.participants.includes(currentUser.id) ? "Online" : "Offline"}
            </p>
          )}
          {chat.type === "group" && <p className="text-sm text-gray-400">{chat.participants.length} members</p>}
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-gray-700">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Message Display Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-900">
        {chat.messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={message.senderId === currentUser.id}
            senderAvatar={message.senderId === currentUser.id ? currentUser.avatar : chat.avatar} // Simplified for mock
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700 bg-gray-800 flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-gray-700">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          placeholder="Type a message..."
          className="flex-1 bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          onClick={handleSendMessage}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
