// CoreChat/frontend/src/app/(chat)/chat/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ChatSidebar } from "./components/sidebar";
import { ChatWindow } from "./components/chatWindow";
import { useAuthStore } from "@/store/authStore";
import { useChatStore } from "@/store/chatStore";

export default function ChatPage() {
    const { currentUser, token, isLoadingAuth } = useAuthStore();
    const {
        conversations,
        fetchConversations,
        activeConversation,
        fetchMessages,
        setActiveConversationId,
        isLoadingChat,
    } = useChatStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeConversationIdFromUrl = searchParams.get('convoId');

    // 1. Redirect if not authenticated
    useEffect(() => {
        if (!isLoadingAuth && !currentUser) {
            router.push('/login');
        }
    }, [isLoadingAuth, currentUser, router]);

    // 2. Fetch conversations when the user becomes available
    useEffect(() => {
        if (token && !isLoadingAuth) {
            fetchConversations(token);
        }
    }, [token, isLoadingAuth, fetchConversations]);

    // 3. Set active conversation from URL and fetch messages
    useEffect(() => {
        if (conversations.length > 0) {
            if (activeConversationIdFromUrl) {
                setActiveConversationId(activeConversationIdFromUrl, conversations);
            } else if (!activeConversation) {
                // Set the first conversation as active if no ID is in the URL
                setActiveConversationId(conversations[0]._id, conversations);
            }
        }
    }, [conversations, activeConversationIdFromUrl, activeConversation, setActiveConversationId]);

    // 4. Fetch messages for the currently active conversation
    useEffect(() => {
        if (activeConversation && token) {
            fetchMessages(activeConversation._id, token);
        }
    }, [activeConversation, token, fetchMessages]);

    // Show a global loading spinner while authentication and chat data is being checked
    if (isLoadingAuth || isLoadingChat || !currentUser) {
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