// CoreChat/frontend/src/app/(chat)/chat/components/ChatWindow.tsx

"use client"

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "@/app/(chat)/chat/components/ChatHeader";
import { MessageInput } from "@/app/(chat)/chat/components/MessageInput";
import { MessageBubble } from "@/components/message-bubble";
import { ChatInfoPanel } from "@/app/(chat)/chat/components/ChatInfoPanel";
import { cn } from "@/lib/utils";

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

interface ChatWindowProps {
  chat: Chat
  currentUser: User
  users: User[]
  infoPanelWidth: {
    width: number
    handleMouseDown: (e: React.MouseEvent) => void
    isResizing: boolean
  }
}

export function ChatWindow({ chat, currentUser, users, infoPanelWidth }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(true)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chat.messages, isInfoPanelOpen])

  const getSenderDetails = (senderId: string) => {
    if (senderId === currentUser.id) {
      return currentUser
    }
    return (
      users.find((user) => user.id === senderId) || {
        id: senderId,
        name: "Unknown",
        avatar: "/placeholder.svg",
        status: "offline" as const,
        lastSeen: "Unknown",
      }
    )
  }

  const chatParticipant = users.find((user) => user.id === chat.participantIds[0])

  return (
    <div className="flex flex-1">
      {/* Main Chat Area */}
      <div className={cn("flex flex-col flex-1 bg-slate-900", isInfoPanelOpen ? "border-r border-slate-700" : "")}>
        <ChatHeader
          chatName={chat.name}
          chatId={chat.id}
          chatAvatar={chat.avatar}
          chatType={chat.type}
          participant={chatParticipant}
          onToggleInfoPanel={() => setIsInfoPanelOpen(!isInfoPanelOpen)}
        />

        {/* Message Display Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-900">
          {chat.messages.map((message) => {
            const sender = getSenderDetails(message.senderId)
            return (
              <MessageBubble
                key={message.id}
                message={message}
                isCurrentUser={message.senderId === currentUser.id}
                senderAvatar={sender.avatar}
              />
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <MessageInput />
      </div>

      {/* Info Panel - Resizable */}
      {isInfoPanelOpen && (
        <div
          className="bg-slate-800/50 backdrop-blur-sm flex flex-col relative"
          style={{ width: `${infoPanelWidth.width}px` }}
        >
          <ChatInfoPanel chat={chat} users={users} />

          {/* Resize Handle */}
          <div
            className="absolute top-0 left-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-blue-500/50 transition-colors"
            onMouseDown={infoPanelWidth.handleMouseDown}
          />
        </div>
      )}
    </div>
  )
}
