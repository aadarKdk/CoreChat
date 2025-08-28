// CoreChat/frontend/src/app/(chat)/chat/components/chatWindow.tsx

"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from '@/hooks/useChat';
import * as messageService from '@/services/messageService';
import { Conversation, Message } from '@/types';

export function ChatWindow() {
    const { currentUser, token } = useAuth();
    const { activeConversation, messages, isLoadingChat, addMessage, setActiveConversationId } = useChat();
    const [inputMessage, setInputMessage] = React.useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Auto-scroll to the bottom of the message list
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle sending a new message
    const handleSendMessage = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputMessage.trim() === '' || !currentUser || !activeConversation || !token) {
            return;
        }

        try {
            const payload = {
                content: inputMessage,
                conversationId: activeConversation._id,
                senderId: currentUser._id,
            };

            const newMessage = await messageService.sendMessage(payload, token);
            addMessage(newMessage); // Use the context function to add the new message
            setInputMessage('');
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    }, [inputMessage, currentUser, activeConversation, token, addMessage]);

    // Determine the chat title based on the conversation type
    const getChatTitle = (convo: Conversation, user: any) => {
      if (convo.groupAdmin) {
        return convo.name;
      }
      const otherParticipant = convo.participants.find(p => p._id !== user._id);
      return otherParticipant?.name || "Private Chat";
    };

    if (isLoadingChat || !currentUser) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center bg-slate-800">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                <p className="ml-3 mt-4 text-lg text-slate-400">Loading chat...</p>
            </div>
        );
    }

    if (!activeConversation) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center bg-slate-800 text-slate-400">
                <p>No active conversations found. Start a new chat!</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-slate-800">
            {/* Header */}
            <div className="flex items-center p-4 border-b border-slate-700 bg-slate-900">
                <h2 className="text-xl font-semibold text-white">
                    {getChatTitle(activeConversation, currentUser)}
                </h2>
            </div>

            {/* Message List Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => {
                    const sender = activeConversation.participants.find(p => p._id === message.sender._id);
                    const isCurrentUser = message.sender._id === currentUser._id;

                    return (
                        <div
                            key={message._id}
                            className={cn(
                                "flex items-end gap-2", // Changed from items-start gap-4
                                isCurrentUser ? "justify-end" : "justify-start"
                            )}
                        >
                            {!isCurrentUser && (
                                <div className="flex-shrink-0">
                                    <img
                                        src={sender?.profilePicture || "https://placehold.co/400x400/2f3a47/ffffff?text=U"}
                                        alt={sender?.name || "User"}
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
                                        src={currentUser.profilePicture}
                                        alt={currentUser.username}
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
                        disabled={!activeConversation}
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}
