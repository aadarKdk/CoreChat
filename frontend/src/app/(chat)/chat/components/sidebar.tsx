// CoreChat/frontend/src/app/(chat)/chat/components/sidebar.tsx

"use client";

import React, { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useChatStore } from "@/store/chatStore";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, MessageCircle, PlusCircle, User, LogOut } from "lucide-react";

export function ChatSidebar() {
  const { currentUser, logout, isLoadingAuth } = useAuthStore();
  const { conversations, activeConversation, isLoadingChat } = useChatStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = useCallback(async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await logout();
      router.push("/login");
    }
  }, [logout, router]);

  // Determine the title for a conversation
  const getConversationTitle = (convo: any, user: any) => {
    if (convo.groupAdmin) {
      return convo.name;
    }
    const otherParticipant = convo.participants.find(
      (p: any) => p._id !== user._id
    );
    return otherParticipant?.name || "New Chat";
  };

  const handleNewChat = () => {
    router.push("/chat/new");
  };

  if (isLoadingAuth || isLoadingChat || !currentUser) {
    return (
      <aside className="w-[280px] flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <p className="mt-4 text-slate-400">Loading...</p>
      </aside>
    );
  }

  return (
    <Sidebar className="w-[280px] flex-shrink-0 bg-slate-900 border-r border-slate-800 text-slate-200">
      {/* Header with Branding and User */}
      <SidebarHeader className="flex flex-col items-start p-4 border-b border-slate-800 bg-slate-900">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <MessageCircle className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full animate-pulse delay-300"></div>
            </div>
            <span className="text-xl font-bold text-white">CoreChat</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10 border-2 border-blue-500">
            <AvatarImage
              src={currentUser.profilePicture}
              alt={currentUser.username}
            />
            <AvatarFallback className="bg-blue-600 text-white font-semibold">
              {currentUser.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {currentUser.name}
            </h3>
            <p className="text-sm text-slate-400">@{currentUser.username}</p>
          </div>
        </div>
      </SidebarHeader>

      {/* Conversations */}
      <SidebarContent className="flex-1 overflow-y-auto bg-slate-900">
        <SidebarGroup className="px-3 py-2">
          <SidebarGroupLabel className="text-slate-400 font-semibold px-3 py-2 mb-2">
            Conversations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {/* New Chat Button */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleNewChat}
                  className="text-slate-200 hover:bg-blue-600/40 hover:text-white rounded-lg transition-all duration-200"
                >
                  <PlusCircle className="h-5 w-5 mr-3" />
                  <span className="font-medium">New Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarSeparator className="bg-slate-800" />

              {/* Conversation List */}
              {conversations.length > 0 ? (
                conversations.map((convo) => (
                  <SidebarMenuItem key={convo._id}>
                    <SidebarMenuButton
                      asChild
                      isActive={activeConversation?._id === convo._id}
                      className="text-slate-300 hover:text-white hover:bg-slate-800/50 data-[active=true]:bg-blue-600/40 data-[active=true]:text-white rounded-lg transition-all duration-200"
                    >
                      <Link
                        href={`/chat?convoId=${convo._id}`}
                        className="flex items-center space-x-3 p-2"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span className="font-medium truncate">
                          {getConversationTitle(convo, currentUser)}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <p className="text-sm text-slate-500 mt-4 text-center px-4">
                  No chats yet.
                </p>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer Menu */}
      <SidebarMenu className="p-3 border-t border-slate-800 bg-slate-900">
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="text-slate-300 hover:bg-slate-800/50 hover:text-white rounded-lg transition-all duration-200"
          >
            <Link href="/chat/profile" className="flex items-center space-x-3 p-2">
              <User className="h-5 w-5" />
              <span className="font-medium">Profile</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={handleLogout}
            className="text-slate-300 hover:bg-red-600/30 hover:text-red-400 rounded-lg transition-all duration-200"
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-medium">Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </Sidebar>
  );
}
