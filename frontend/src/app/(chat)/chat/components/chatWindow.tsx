// CoreChat/frontend/src/app/(chat)/chat/components/chatWindow.tsx

"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useChatStore } from "@/store/chatStore";
import { Loader2, Send, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import * as messageService from "@/services/messageService";
import { Conversation } from "@/types";

// UI components
import {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  ChatMessage,
  ChatInput,
  ChatInputForm,
  ChatMessageBox,
} from "@/components/ui/chat-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChatWindow() {
  const { currentUser, token } = useAuthStore();
  const { activeConversation, messages, addMessage, isLoadingChat } =
    useChatStore();
  const [inputMessage, setInputMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Send message
  const handleSendMessage = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        !inputMessage.trim() ||
        !currentUser ||
        !activeConversation ||
        !token
      )
        return;

      try {
        const payload = {
          content: inputMessage,
          conversationId: activeConversation._id,
          senderId: currentUser._id,
        };

        const newMessage = await messageService.sendMessage(payload, token);
        addMessage(newMessage);
        setInputMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    },
    [inputMessage, currentUser, activeConversation, token, addMessage]
  );

  // Chat title
  const getChatTitle = (convo: Conversation, user: any) => {
    if (convo.groupAdmin) return convo.name;
    const otherParticipant = convo.participants.find(
      (p) => p._id !== user._id
    );
    return otherParticipant?.name || "Private Chat";
  };

  if (!currentUser) return null;

  if (isLoadingChat) {
    return (
      <div className="flex-1 ml-64 flex flex-col justify-center items-center bg-slate-900 text-slate-400">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
        <p className="mt-4">Loading messages...</p>
      </div>
    );
  }

  if (!activeConversation) {
    return (
      <div className="flex-1 ml-64 flex flex-col justify-center items-center bg-slate-900 text-slate-400">
        <MessageCircle className="h-10 w-10 mb-2 text-slate-500" />
        <p>No active conversations. Start a new chat!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 ml-64 flex flex-col bg-slate-900">
      <ChatContainer>
        <ChatHeader>
          <h2 className="text-xl font-semibold text-white truncate">
            {getChatTitle(activeConversation, currentUser)}
          </h2>
        </ChatHeader>

        <ChatMessages>
          {messages.map((message) => {
            const sender = activeConversation.participants.find(
              (p) => p._id === message.sender._id
            );
            const isCurrentUser = message.sender._id === currentUser._id;
            const isGroupChat = !!activeConversation.groupAdmin;

            const senderName = sender?.name || "Unknown";
            const senderAvatar = isCurrentUser
              ? currentUser.profilePicture
              : sender?.profilePicture;
            const senderFallback = senderName.charAt(0).toUpperCase();

            return (
              <div
                key={message._id}
                className={cn(
                  "flex items-end gap-2 mb-3",
                  isCurrentUser ? "justify-end" : "justify-start"
                )}
              >
                {/* Avatar on left for others */}
                {!isCurrentUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={senderAvatar} alt={senderName} />
                    <AvatarFallback className="bg-slate-600 text-white text-sm">
                      {senderFallback}
                    </AvatarFallback>
                  </Avatar>
                )}

                {/* Message bubble */}
                <ChatMessage
                  isSender={isCurrentUser}
                  className={cn(isCurrentUser ? "items-end" : "items-start")}
                >
                  <ChatMessageBox
                    className={cn(
                      "px-3 py-2 rounded-lg text-white shadow-md max-w-xs md:max-w-md",
                      isCurrentUser
                        ? "bg-blue-600 rounded-br-none"
                        : "bg-slate-700 rounded-bl-none"
                    )}
                  >
                    {isGroupChat && !isCurrentUser && (
                      <p className="text-xs text-slate-400 mb-1">
                        {senderName}
                      </p>
                    )}
                    <p>{message.content}</p>
                  </ChatMessageBox>
                </ChatMessage>

                {/* Avatar on right for current user */}
                {isCurrentUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={senderAvatar} alt={senderName} />
                    <AvatarFallback className="bg-slate-600 text-white text-sm">
                      {senderFallback}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </ChatMessages>

        <ChatInput>
          <ChatInputForm onSubmit={handleSendMessage}>
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <Button
              type="submit"
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors"
              disabled={!activeConversation}
            >
              <Send size={20} />
            </Button>
          </ChatInputForm>
        </ChatInput>
      </ChatContainer>
    </div>
  );
}
