"use client"

import { SidebarContent } from "@/components/ui/sidebar"

import { SidebarHeader } from "@/components/ui/sidebar"

import { Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatWindow } from "@/components/chat-window"
import { ChatList } from "@/components/chat-list"
import { MessageCircle } from "lucide-react"

interface User {
  id: string
  name: string
  avatar: string
  status: "online" | "offline"
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

interface ChatLayoutProps {
  users: User[]
  chats: Chat[]
  selectedChat: Chat | undefined
  onSelectChat: (chatId: string) => void
}

export function ChatLayout({ users, chats, selectedChat, onSelectChat }: ChatLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Chat Sidebar */}
      <Sidebar collapsible="icon" side="left" className="bg-gray-800 border-r border-gray-700">
        <SidebarTrigger className="absolute top-4 right-4 z-20 md:hidden" /> {/* Mobile trigger */}
        <SidebarHeader className="flex items-center justify-center p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <div className="relative">
                <MessageCircle className="w-5 h-5 text-white" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full animate-pulse delay-300"></div>
              </div>
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" viewBox="0 0 40 40">
                  <path
                    d="M8 12 L20 8 L32 12 M12 28 L20 32 L28 28"
                    stroke="white"
                    strokeWidth="0.5"
                    fill="none"
                    className="animate-pulse"
                  />
                </svg>
              </div>
            </div>
            <span className="text-xl font-bold text-white group-data-[state=collapsed]:hidden">CoreChat</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="flex-1 overflow-y-auto">
          <ChatSidebar users={users} chats={chats} onSelectChat={onSelectChat} />
        </SidebarContent>
      </Sidebar>

      {/* Main Chat Area */}
      <SidebarInset className="flex flex-1">
        <div className="flex flex-col md:flex-row flex-1">
          {/* Chat List Panel (Left) */}
          <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-700 bg-gray-800 flex flex-col">
            <ChatList chats={chats} selectedChatId={selectedChat?.id} onSelectChat={onSelectChat} />
          </div>

          {/* Chat Window Panel (Right) */}
          <div className="flex-1 flex flex-col bg-gray-900">
            {selectedChat ? (
              <ChatWindow
                chat={selectedChat}
                currentUser={{ id: "me", name: "You", avatar: "/placeholder.svg?height=40&width=40" }}
              />
            ) : (
              <div className="flex flex-1 items-center justify-center text-gray-400">
                Select a chat to start messaging.
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </div>
  )
}
