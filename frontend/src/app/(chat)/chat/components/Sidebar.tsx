// CoreChat/frontend/src/app/(chat)/chat/components/Sidebar.tsx

"use client"

import * as React from "react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, useSidebar,
} from "@/components/ui/sidebar";
import { MessageCircle, Users, Settings, LifeBuoy, ChevronDown, Phone, BellRing, User } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ChatSidebar() {
  const { toggleSidebar, state } = useSidebar()
  const pathname = usePathname()

  const navItems = [
    {
      label: "Main",
      items: [
        { title: "Chats", href: "/chat", icon: MessageCircle, isActive: pathname === "/chat" },
        { title: "Contacts", href: "/chat/contacts", icon: Users },
        { title: "Call", href: "/chat/call", icon: Phone },
        { title: "Notifications", href: "/chat/notifications", icon: BellRing },
      ],
    },
    {
      label: "Others",
      collapsible: true,
      defaultOpen: true,
      items: [
        { title: "Settings", href: "/chat/settings", icon: Settings },
        { title: "Help", href: "/chat/help", icon: LifeBuoy },
        { title: "Profile", href: "/chat/profile", icon: User },
      ],
    },
  ]

  return (
    <Sidebar collapsible="offcanvas" side="left" className="bg-slate-800/50 backdrop-blur-sm border-r-md border-slate-700">
      <SidebarHeader className="flex flex-col items-start p-4 border-b border-slate-700 bg-slate-800/30">
        <div className="flex items-center justify-between w-full mb-4">
          {/* CoreChat modern logo */}
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
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
            <span className="text-xl font-bold text-black">CoreChat</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto bg-slate-800/20">
        {navItems.map((group, index) => (
          <React.Fragment key={group.label}>
            {group.collapsible ? (
              <Collapsible defaultOpen={group.defaultOpen} className="group/collapsible">
                <SidebarGroup className="px-3 py-2">
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-slate-700/30 rounded-lg transition-all duration-200 group">
                      <span className="text-black font-semibold group-hover:text-black transition-colors">
                        {group.label}
                      </span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-all duration-200 group-data-[state=open]/collapsible:rotate-180 text-black group-hover:text-black" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent className="mt-2">
                      <SidebarMenu className="space-y-1">
                        {group.items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              isActive={item.isActive || pathname === item.href}
                              className="text-black hover:text-black hover:bg-slate-700/40 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-600/20 data-[active=true]:to-indigo-600/20 data-[active=true]:text-black data-[active=true]:border-l-2 data-[active=true]:border-blue-500 rounded-lg transition-all duration-200"
                            >
                              <Link href={item.href} className="flex items-center space-x-3 p-2">
                                <item.icon className="h-5 w-5" />
                                <span className="font-medium">{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ) : (
              <SidebarGroup className="px-3 py-2">
                <SidebarGroupLabel className="text-black font-semibold px-3 py-2 mb-2">{group.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.isActive || pathname === item.href}
                          className="text-black hover:text-black hover:bg-slate-700/40 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-600/20 data-[active=true]:to-indigo-600/20 data-[active=true]:text-black data-[active=true]:border-l-2 data-[active=true]:border-blue-500 rounded-lg transition-all duration-200"
                        >
                          <Link href={item.href} className="flex items-center space-x-3 p-2">
                            <item.icon className="h-5 w-5" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </React.Fragment>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
