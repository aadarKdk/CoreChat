// CoreChat/frontend/src/app/(chat)/chat/components/sidebar.tsx

"use client";

import React from 'react';
import { useAuthStore } from '@/store/authStore'; // Import the new auth store
import { useChatStore } from '@/store/chatStore'; // Import the new chat store
import { Button } from '@/components/ui/button';
import { LogOut, Settings, UserCircle2, MessageCircle, Loader2, PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function ChatSidebar() {
    const { currentUser, logout, isLoadingAuth } = useAuthStore();
    const { conversations, activeConversation, isLoadingChat } = useChatStore();
    const router = useRouter();

    const handleLogout = async () => {
        if (confirm("Are you sure you want to log out?")) {
            await logout();
            router.push('/login');
        }
    };

    const handleNewChat = () => {
        console.log("Creating a new chat...");
        router.push('/chat/new');
    };

    if (isLoadingAuth || isLoadingChat || !currentUser) {
        return (
            <aside className="w-[80px] flex-shrink-0 bg-slate-900 border-r border-slate-700 flex flex-col items-center py-4 space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500 mt-4" />
            </aside>
        );
    }

    return (
        <aside className="w-[80px] flex-shrink-0 bg-slate-900 border-r border-slate-700 flex flex-col items-center py-4 space-y-4">
            {/* User Profile / Avatar */}
            <Link href="/profile" className="w-full flex justify-center">
                <Avatar className="h-12 w-12 border-2 border-blue-500 cursor-pointer transition-transform hover:scale-105">
                    <AvatarImage src={currentUser.profilePicture} alt={currentUser.username} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold">
                        {currentUser.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </Link>

            {/* New Chat Button */}
            <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full transition-colors text-slate-400 hover:bg-blue-600 hover:text-white"
                onClick={handleNewChat}
            >
                <PlusCircle className="h-6 w-6" />
            </Button>

            <div className="flex-1 w-full flex flex-col justify-start items-center space-y-2 overflow-y-auto">
                {/* Chat Links / Navigation */}
                {conversations.length > 0 ? (
                    conversations.map((convo) => (
                        <Link
                            key={convo._id}
                            href={`/chat?convoId=${convo._id}`} // Corrected to use convo._id
                            className={cn(
                                "w-12 h-12 flex items-center justify-center rounded-full transition-colors",
                                "text-slate-400 hover:bg-slate-700 hover:text-white",
                                activeConversation?._id === convo._id && 'bg-slate-700 text-blue-500' // Apply active styling
                            )}
                        >
                            <MessageCircle className="h-6 w-6" />
                        </Link>
                    ))
                ) : (
                    <p className="text-xs text-slate-500 mt-4 text-center">No chats yet.</p>
                )}
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