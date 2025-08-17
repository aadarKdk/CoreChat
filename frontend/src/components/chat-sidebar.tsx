"use client"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface ChatSidebarProps {
  users: any[]
  chats: Chat[]
  onSelectChat: (chatId: string) => void
}

export function ChatSidebar({ users, chats, onSelectChat }: ChatSidebarProps) {
  // Mock current user for the sidebar profile
  const currentUser = {
    id: "me",
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
  }

  return (
    <>
      {/* Current User Profile */}
      <SidebarGroup className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="flex items-center gap-3 w-full text-left">
              <Avatar className="h-9 w-9 border-2 border-blue-500">
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col group-data-[state=collapsed]:hidden">
                <span className="font-semibold text-white">{currentUser.name}</span>
                <div className="flex items-center text-sm text-gray-400">
                  <span
                    className={`h-2 w-2 rounded-full mr-1 ${currentUser.status === "online" ? "bg-green-500" : "bg-gray-500"}`}
                  ></span>
                  {currentUser.status.charAt(0).toUpperCase() + currentUser.status.slice(1)}
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarSeparator />

      {/* Chat List Search (if needed in sidebar) */}
      <SidebarGroup className="p-2">
        <div className="relative group-data-[state=collapsed]:hidden">
          <Input
            id="chat-search"
            placeholder="Search chats..."
            className="pl-8 bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50 text-gray-400" />
        </div>
      </SidebarGroup>

      {/* Chat Categories */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-gray-400 group-data-[state=collapsed]:hidden">
          Direct Messages
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {chats
              .filter((chat) => chat.type === "dm")
              .map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton
                    onClick={() => onSelectChat(chat.id)}
                    className="flex items-center gap-3 w-full text-left"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col group-data-[state=collapsed]:hidden">
                      <span className="font-medium text-white">{chat.name}</span>
                      <span className="text-xs text-gray-400 truncate">{chat.lastMessage}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel className="text-gray-400 group-data-[state=collapsed]:hidden">Groups</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {chats
              .filter((chat) => chat.type === "group")
              .map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton
                    onClick={() => onSelectChat(chat.id)}
                    className="flex items-center gap-3 w-full text-left"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                      <AvatarFallback>
                        <Users className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col group-data-[state=collapsed]:hidden">
                      <span className="font-medium text-white">{chat.name}</span>
                      <span className="text-xs text-gray-400 truncate">{chat.lastMessage}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}
