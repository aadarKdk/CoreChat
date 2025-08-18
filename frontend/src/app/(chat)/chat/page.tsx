"use client";

import { useState, useMemo } from "react";
import { ChatSidebar } from "@/app/(chat)/chat/components/Sidebar";
import { ChatWindow } from "@/app/(chat)/chat/components/ChatWindow";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useResizable } from "@/app/(chat)/chat/hooks/useResizable";

/* ------------------------------ Types ------------------------------ */
interface User {
  id: string;
  name: string;
  profile: string;
  status: "online" | "offline";
  lastSeen: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  type: "dm" | "group";
  participantIds: string[];
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isUnread: boolean;
  messages: Message[];
}

/* ------------------------------ Mock Data ------------------------------ */
// Ideally, move to `data/mockChats.ts` for cleanliness
const MOCK_USERS: User[] = [
  { id: "user1", name: "Jonas Kahnwald", profile: "/placeholder.svg?height=40&width=40&text=JK", status: "online", lastSeen: "Active now" },
  { id: "user2", name: "Charlotte Doppler", profile: "/placeholder.svg?height=40&width=40&text=CD", status: "online", lastSeen: "Active now" },
  { id: "user3", name: "Mikkel Nielsen", profile: "/placeholder.svg?height=40&width=40&text=MN", status: "offline", lastSeen: "Last seen 2 hours ago" },
];

// Example mock chats (shortened for brevity)
const MOCK_CHATS: Chat[] = [
  {
    id: "chat1",
    type: "dm",
    participantIds: ["user1"],
    name: "Jonas Kahnwald",
    avatar: "/placeholder.svg?height=40&width=40&text=JK",
    lastMessage: "Hey! How are you doing today?",
    timestamp: "8:40 PM",
    unreadCount: 2,
    isUnread: true,
    messages: [
      { id: "msg1", senderId: "user1", content: "Hello! How are you doing today?", timestamp: "18 Dec 2022, 9:56 AM" },
      { id: "msg2", senderId: "me", content: "Hello Jonas! I'm doing great, thanks for asking. How about you?", timestamp: "18 Dec 2022, 9:57 AM" },
    ],
  },
  {
    id: "chat2",
    type: "dm",
    participantIds: ["user2"],
    name: "Charlotte Doppler",
    avatar: "/placeholder.svg?height=40&width=40&text=CD",
    lastMessage: "Thanks for your help with the project!",
    timestamp: "3:17 PM",
    unreadCount: 1,
    isUnread: true,
    messages: [{ id: "msg7", senderId: "user2", content: "Thanks for your help with the project!", timestamp: "3:17 PM" }],
  },
  {
    id: "chat3",
    type: "dm",
    participantIds: ["user3"],
    name: "Mikkel Nielsen",
    avatar: "/placeholder.svg?height=40&width=40&text=MN",
    lastMessage: "See you tomorrow at the meeting",
    timestamp: "11:49 AM",
    unreadCount: 0,
    isUnread: false,
    messages: [{ id: "msg8", senderId: "user3", content: "See you tomorrow at the meeting", timestamp: "11:49 AM" }],
  },
];

// Shall we explore how to convert the mock data to real API data?


/* ------------------------------ Main Page ------------------------------ */

export default function ChatDashboardPage() {

  const [selectedChatId, setSelectedChatId] = useState<string | null>(MOCK_CHATS[0]?.id ?? null);

  const selectedChat = useMemo(
    () => MOCK_CHATS.find((chat) => chat.id === selectedChatId) ?? null,
    [selectedChatId]
  );

  const chatListPanel = useResizable(350, 280, 500, false);
  const infoPanelWidth = useResizable(320, 280, 450, true);

  const unreadChats = useMemo(() => MOCK_CHATS.filter((chat) => chat.isUnread), []);
  const readChats = useMemo(() => MOCK_CHATS.filter((chat) => !chat.isUnread), []);

  return (
    <div className="flex min-h-screen w-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
      {/* Left Sidebar */}
      <ChatSidebar />

      {/* Main Content Area */}
      <SidebarInset className="flex flex-1">
        <div className="flex flex-1 bg-slate-900">
          {/* Middle Chat List Panel */}
          <div
            className="border-r border-slate-700 bg-slate-800/50 backdrop-blur-sm flex flex-col relative"
            style={{ width: `${chatListPanel.width}px` }}
          >
            {/* Search */}
            <div className="p-4 border-b border-slate-700">
              <div className="relative">
                <Input
                  id="chat-list-search"
                  aria-label="Search Conversations"
                  placeholder="Search conversations..."
                  className="pl-8 bg-slate-700/50 border-slate-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-slate-400"
                />
                <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50 text-slate-400" />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {unreadChats.length > 0 && (
                <>
                  <div className="px-4 py-2 text-sm font-semibold text-slate-400">Unread</div>
                  {unreadChats.map((chat) => (
                    <ChatItem
                      key={chat.id}
                      chat={chat}
                      users={MOCK_USERS}
                      isSelected={chat.id === selectedChatId}
                      onClick={() => setSelectedChatId(chat.id)}
                    />
                  ))}
                </>
              )}

              <div className="px-4 py-2 text-sm font-semibold text-slate-400">All Messages</div>
              {readChats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  users={MOCK_USERS}
                  isSelected={chat.id === selectedChatId}
                  onClick={() => setSelectedChatId(chat.id)}
                />
              ))}
            </div>

            {/* Resize Handle */}
            <div
              className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-blue-500/50 transition-colors"
              onMouseDown={chatListPanel.handleMouseDown}
            />
          </div>

          {/* Right Chat Window */}
          <div className="flex-1 flex bg-slate-900">
            {selectedChat ? (
              <ChatWindow
                chat={selectedChat}
                currentUser={{
                  id: "me",
                  name: "You",
                  avatar: "/placeholder.svg?height=40&width=40&text=You",
                  status: "online",
                  lastSeen: "Active now",
                }}
                users={MOCK_USERS}
                infoPanelWidth={infoPanelWidth}
              />
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
                    <Search className="w-12 h-12 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Select a chat</h3>
                  <p className="text-slate-400">Choose a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}

/* ------------------------------ ChatItem ------------------------------ */
interface ChatItemProps {
  chat: Chat;
  users: User[];
  isSelected: boolean;
  onClick: () => void;
}

function ChatItem({ chat, users, isSelected, onClick }: ChatItemProps) {
  const participant = users.find((user) => user.id === chat.participantIds[0]);
  const status = participant?.status || "offline";

  return (
    <div
      className={cn(
        "flex items-center p-4 cursor-pointer transition-all duration-200 border-l-4",
        isSelected
          ? "bg-blue-600/20 border-l-blue-500 backdrop-blur-sm"
          : "hover:bg-slate-700/50 border-l-transparent"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-12 w-12 mr-3 border-2 border-slate-600">
          <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold">
            {chat.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {/* Online/Offline Status Indicator */}
        <div
          className={cn(
            "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-slate-800",
            status === "online" ? "bg-green-500" : "bg-slate-500"
          )}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold text-white truncate">{chat.name}</span>
          <span className="text-xs text-slate-400">{chat.timestamp}</span>
        </div>
        <p className="text-sm text-slate-300 truncate">{chat.lastMessage}</p>
      </div>

      {chat.unreadCount > 0 && (
        <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
          {chat.unreadCount}
        </span>
      )}
    </div>
  );
}
