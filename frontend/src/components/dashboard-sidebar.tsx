"use client"

import * as React from 'react'
import { usePathname } from 'next/navigation'
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
  SidebarRail,
} from '@/components/ui/sidebar'
import { MessageCircle, Users, BarChart, Bell, FileText, Settings, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

// Define your navigation items
const navItems = [
  {
    label: 'CoreChat',
    items: [
      { title: 'Chats', href: '/admin/chats', icon: MessageCircle },
      { title: 'Users', href: '/admin/users', icon: Users },
      { title: 'Broadcast', href: '/admin/broadcast', icon: Bell },
    ],
  },
  {
    label: 'Analytics & Reports',
    items: [
      { title: 'Metrics', href: '/admin/metrics', icon: BarChart },
      { title: 'Reports', href: '/admin/reports', icon: FileText },
    ],
  },
  {
    label: 'Settings',
    items: [
      { title: 'General Settings', href: '/admin/settings', icon: Settings },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="relative">
          <Input
            id="search"
            placeholder="Search dashboard..."
            className="pl-8"
          />
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
