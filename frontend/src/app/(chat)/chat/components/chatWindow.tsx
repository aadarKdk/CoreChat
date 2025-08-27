// CoreChat/frontend/src/app/(chat)/chat/components/chatWindow.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from '@/types'; // Import User type

// Placeholder for a Chat type, you will define this later
// This helps prevent TypeScript errors for now
interface Chat {
    messages: any[];
    participants: User[];
}

export function ChatWindow() {
    const { currentUser, isLoadingAuth } = useAuth();
    // Use a state for the chat object, initialized to null or undefined
    const [chat, setChat] = useState<Chat | undefined>(undefined);
    const [inputMessage, setInputMessage] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Placeholder data for initial render, replace with real data fetching later
    useEffect(() => {
        // Simulate a data fetch
        const fetchChatData = () => {
            if (!currentUser) return;

            setChat({
                messages: [
                    { id: "1", senderId: "ai-id", content: "Hello! Welcome to CoreChat. How can I help you?", timestamp: new Date(), type: "text" },
                    { id: "2", senderId: currentUser.id, content: "Hi, I'm just testing the chat.", timestamp: new Date(), type: "text" },
                ],
                participants: [
                    { id: currentUser.id, name: currentUser.name, username: currentUser.username, email: currentUser.email, gender: currentUser.gender, profilePicture: currentUser.profilePicture },
                    { id: "ai-id", name: "AI Assistant", username: "corechat-ai", email: "ai@corechat.com", gender: "other", profilePicture: "https://placehold.co/400x400/2f3a47/ffffff?text=AI" },
                ]
            });
        };

        if (currentUser) {
            fetchChatData();
        }
    }, [currentUser]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (chat && chat.messages) {
            scrollToBottom();
        }
    }, [chat]);

    const getSenderDetails = (senderId: string) => {
        return chat?.participants.find(p => p.id === senderId);
    };

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputMessage.trim() === '' || !currentUser || !chat) {
            return;
        }

        const newMessage = {
            id: Date.now().toString(),
            senderId: currentUser.id,
            content: inputMessage,
            timestamp: new Date(),
            type: "text"
        };

        // Simulate sending a message by adding it to the chat state
        setChat({
            ...chat,
            messages: [...chat.messages, newMessage]
        });

        setInputMessage(''); // Clear the input field
    };


    // Show a loading spinner if authentication is still in progress or no user is found
    if (isLoadingAuth || !currentUser || !chat) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center bg-slate-800">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                <p className="ml-3 mt-4 text-lg text-slate-400">Loading chat...</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-slate-800">
            {/* Header */}
            <div className="flex items-center p-4 border-b border-slate-700 bg-slate-900">
                <h2 className="text-xl font-semibold text-white">CoreChat AI Assistant</h2>
            </div>

            {/* Message List Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chat.messages.map((message) => {
                    const sender = getSenderDetails(message.senderId);
                    const isCurrentUser = message.senderId === currentUser.id;

                    return (
                        <div
                            key={message.id}
                            className={cn(
                                "flex items-start gap-4",
                                isCurrentUser ? "justify-end" : "justify-start"
                            )}
                        >
                            {!isCurrentUser && (
                                <div className="flex-shrink-0">
                                    <img
                                        src={sender?.profilePicture}
                                        alt={sender?.name}
                                        className="h-8 w-8 rounded-full"
                                    />
                                </div>
                            )}
                            <div
                                className={cn(
                                    "p-3 rounded-lg max-w-sm",
                                    isCurrentUser
                                        ? "bg-blue-600 text-white rounded-br-none"
                                        : "bg-slate-700 text-slate-200 rounded-bl-none"
                                )}
                            >
                                <p>{message.content}</p>
                            </div>
                            {isCurrentUser && (
                                <div className="flex-shrink-0">
                                    <img
                                        src={sender?.profilePicture}
                                        alt={sender?.name}
                                        className="h-8 w-8 rounded-full"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input Form */}
            <div className="p-4 border-t border-slate-700 bg-slate-900">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                    <button
                        type="submit"
                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}
