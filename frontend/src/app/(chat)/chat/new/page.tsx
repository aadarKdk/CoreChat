// CoreChat/frontend/src/app/(chat)/chat/new/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import * as userService from "@/services/userService";
import * as conversationService from "@/services/conversationService";
import { ArrowLeft, Loader2, UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat } from "@/hooks/useChat";
import { ChatSidebar } from "../components/sidebar";
import { cn } from "@/lib/utils";

export default function NewChatPage() {
    const { currentUser, token, isLoadingAuth } = useAuth();
    const router = useRouter();
    const { conversations } = useChat();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        const fetchUsers = async () => {
            try {
                const allUsers = await userService.getAllUsers(token);
                // Filter out the current user
                setUsers(allUsers.filter(user => user._id !== currentUser?._id));
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [token, currentUser]);

    const handleCreateChat = async (recipientId: string) => {
        if (!token || !currentUser) return; // Ensure currentUser is available

        // Check if a conversation with this user already exists
        const existingConvo = conversations.find(convo =>
            !convo.groupAdmin &&
            convo.participants.length === 2 && // Ensure it's a direct message
            convo.participants.some(p => p._id === recipientId) &&
            convo.participants.some(p => p._id === currentUser._id)
        );

        if (existingConvo) {
            router.push(`/chat?convoId=${existingConvo._id}`);
            return;
        }

        try {
            // CORRECTED: Include the 'type' property as "dm" for direct messages
            const newConvo = await conversationService.createConversation(
                {
                    participants: [currentUser._id, recipientId],
                    type: "dm" // Explicitly set type to 'dm'
                },
                token
            );
            router.push(`/chat?convoId=${newConvo._id}`);
        } catch (error: any) { // Catch error as 'any' for now to access .message
            console.error("Failed to create conversation:", error.message || error);
        }
    };

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoadingAuth && !currentUser) {
            router.push('/login');
        }
    }, [isLoadingAuth, currentUser, router]);

    if (isLoading || isLoadingAuth || !currentUser) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white font-inter">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                <p className="ml-3 text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex w-full min-h-screen bg-slate-800 text-white font-inter antialiased">
            <ChatSidebar />
            <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Button onClick={() => router.back()} variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-700 hover:text-white">
                        <ArrowLeft size={24} />
                    </Button>
                    <h1 className="text-2xl font-semibold">Start a New Chat</h1>
                </div>

                {/* User List */}
                <div className="space-y-4">
                    {users.length > 0 ? (
                        users.map(user => (
                            <div
                                key={user._id}
                                onClick={() => handleCreateChat(user._id)}
                                className="flex items-center gap-4 p-4 rounded-lg bg-slate-700 cursor-pointer transition-colors hover:bg-slate-600"
                            >
                                <Avatar className="h-12 w-12 border-2 border-blue-500">
                                    <AvatarImage src={user.profilePicture} alt={user.name} />
                                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold">
                                        {user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium">{user.name}</h3>
                                    <p className="text-sm text-slate-400">@{user.username}</p>
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-700">Chat</Button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-slate-400">No other users found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
