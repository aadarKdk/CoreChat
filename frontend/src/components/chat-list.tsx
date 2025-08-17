"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ChatItem } from "@/components/chat-item";

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

interface ChatListProps {
  chats: Chat[]
  selectedChatId: string | null
  onSelectChat: (chatId: string) => void
}

export function ChatList({ chats, selectedChatId, onSelectChat }: ChatListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <div className="relative">
          <Input
            id="chat-list-search"
            placeholder="Search chats..."
            className="pl-8 bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50 text-gray-400" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isSelected={chat.id === selectedChatId}
            onClick={() => onSelectChat(chat.id)}
          />
        ))}
      </div>
    </div>
  )
}
