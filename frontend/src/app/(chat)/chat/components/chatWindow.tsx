// CoreChat/frontend/src/app/(chat)/chat/components/ChatWindow.tsx

"use client"

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "@/app/(chat)/chat/components/ChatHeader";
import { MessageInput } from "@/app/(chat)/chat/components/MessageInput";
import { MessageBubble } from "@/components/message-bubble";
import { ChatInfoPanel } from "@/app/(chat)/chat/components/ChatInfoPanel";
import { cn } from "@/lib/utils";

// Note: These IDs will be MongoDB's _id (string)
interface BaseUser {
  _id: string;
  name: string;
  username: string;
  profilePicture: string;
  status?: "online" | "offline" | "away" | "do_not_disturb";
  lastSeen?: string; // This might be handled on backend or derived
}

interface User extends BaseUser {
  // Add other user-specific fields if needed, like email, gender etc.
}

interface Message {
  _id: string;
  sender: BaseUser; // Sender will be populated User object from backend
  conversation: string; // Will be the conversation _id
  content: string;
  messageType: "text" | "image" | "file";
  fileUrl?: string;
  readBy: string[]; // Array of user _ids
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

interface Conversation {
  _id: string;
  participants: BaseUser[]; // Participants will be populated User objects
  type: "dm" | "group";
  name?: string; // Optional for DMs
  groupAdmin?: BaseUser; // Populated User object for group admin
  avatar?: string; // For group chats
  lastMessage?: Message; // Populated Message object
  unreadCounts: { user: string; count: number }[]; // Track unread messages per user
  createdAt: string;
  updatedAt: string;
  unreadCount: number; // Frontend specific, derived from unreadCounts
}

interface ChatWindowProps {
  chat: Conversation; // Using Conversation interface
  currentUser: User;
  users: User[]; // All available users, primarily for getSenderDetails for now
  infoPanelWidth: {
    width: number;
    handleMouseDown: (e: React.MouseEvent) => void;
    isResizing: boolean;
  };
  onSendMessage: (conversationId: string, content: string, messageType?: "text" | "image" | "file", fileUrl?: string) => Promise<void>;
  messages: Message[]; // Explicitly pass messages as a separate prop - DEFINED HERE ONCE
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
