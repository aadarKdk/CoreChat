// CoreChat/frontend/src/app/(chat)/chat/page.tsx

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ChatSidebar } from "./components/sidebar";
import { ChatWindow } from "./components/chatWindow";
import { useAuth } from "@/hooks/useAuth"; // Import useAuth hook

export default function ChatPage() {
    const { currentUser, isLoadingAuth } = useAuth();
    const router = useRouter();
    
    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoadingAuth && !currentUser) {
            router.push('/login');
        }
    }, [isLoadingAuth, currentUser, router]);

    // Show a global loading spinner while authentication state is being checked
    if (isLoadingAuth || !currentUser) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white font-inter">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                <p className="ml-3 text-lg">Loading chat...</p>
            </div>
        );
    }
    
    return (
        <div className="flex w-full min-h-screen bg-slate-800 text-white font-inter antialiased">
            <ChatSidebar />
            <div className="flex-1 flex flex-col">
                <ChatWindow />
            </div>
        </div>
    );
}

