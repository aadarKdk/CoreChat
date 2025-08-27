// CoreChat/frontend/src/app/(chat)/chat/components/sidebar.tsx

"use client";

import React from 'react';
import { useAuth } from '@/hooks/useAuth'; // Import useAuth hook
import { Button } from '@/components/ui/button';
import { LogOut, Settings, UserCircle2 } from 'lucide-react'; // Import icons
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter

export function ChatSidebar() {
  const { currentUser, logout, isLoadingAuth } = useAuth(); // Get currentUser and logout function
  const router = useRouter(); // Initialize the router instance

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) { // Using confirm for now, will replace with custom modal later
      await logout();
    }
  };

  // Show loading state for sidebar if auth is loading or no user
  if (isLoadingAuth || !currentUser) {
    return (
      <aside className="w-[80px] flex-shrink-0 bg-slate-900 border-r border-slate-700 flex flex-col items-center py-4 space-y-4">
        <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse" />
        <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse" />
      </aside>
    );
  }

  return (
    <aside className="w-[80px] flex-shrink-0 bg-slate-900 border-r border-slate-700 flex flex-col items-center py-4 space-y-4">
      {/* User Profile / Avatar */}
      <Link href="/profile" className="w-full flex justify-center"> {/* Assuming a profile page exists */}
        <Avatar className="h-12 w-12 border-2 border-blue-500 cursor-pointer transition-transform hover:scale-105">
          <AvatarImage src={currentUser.profilePicture} alt={currentUser.username} />
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold">
            {currentUser.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex-1 flex flex-col justify-center items-center space-y-4">
        {/* Chat Links / Navigation (Add more as needed) */}
        <Link href="/chat" className={cn("text-slate-400 hover:text-white transition-colors", router.pathname === '/chat' && 'text-blue-500')}>
          <UserCircle2 className="h-6 w-6" />
        </Link>
        {/* Example: A settings link */}
        <Link href="/settings" className="text-slate-400 hover:text-white transition-colors">
          <Settings className="h-6 w-6" />
        </Link>
      </div>

      {/* Logout Button */}
      <Button
        variant="ghost"
        size="icon"
        className="text-slate-400 hover:bg-slate-700 hover:text-red-400 transition-colors"
        onClick={handleLogout}
        disabled={isLoadingAuth}
      >
        <LogOut className="h-6 w-6" />
      </Button>
    </aside>
  );
}
