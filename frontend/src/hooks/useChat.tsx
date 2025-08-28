// CoreChat/frontend/src/hooks/useChat.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './useAuth';
import { Conversation, Message } from '@/types';
import * as conversationService from '@/services/conversationService';
import * as messageService from '@/services/messageService';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface ChatContextType {
    conversations: Conversation[];
    activeConversation: Conversation | null;
    messages: Message[];
    isLoadingChat: boolean;
    setActiveConversationId: (id: string) => void;
    addMessage: (message: Message) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
    children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
    const { token, currentUser, isLoadingAuth } = useAuth();
    const searchParams = useSearchParams();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoadingChat, setIsLoadingChat] = useState(true);

    const activeConversationIdFromUrl = searchParams.get('convoId');

    // 1. Fetch conversations when the token is available
    useEffect(() => {
        const fetchConversations = async () => {
            if (!token || isLoadingAuth) {
                return;
            }
            setIsLoadingChat(true);
            try {
                const fetchedConversations = await conversationService.getUserConversations(token);
                setConversations(fetchedConversations);

                // Set initial active conversation based on URL or the first one
                if (activeConversationIdFromUrl) {
                    const convoFromUrl = fetchedConversations.find(c => c._id === activeConversationIdFromUrl);
                    if (convoFromUrl) {
                        setActiveConversation(convoFromUrl);
                    }
                } else if (fetchedConversations.length > 0) {
                    setActiveConversation(fetchedConversations[0]);
                }
            } catch (error) {
                console.error("Failed to fetch conversations:", error);
            } finally {
                setIsLoadingChat(false);
            }
        };

        fetchConversations();
    }, [token, isLoadingAuth, activeConversationIdFromUrl]);

    // 2. Fetch messages for the active conversation
    useEffect(() => {
        const fetchMessages = async () => {
            if (!activeConversation || !token) {
                setMessages([]);
                return;
            }
            setIsLoadingChat(true);
            try {
                const fetchedMessages = await messageService.getMessagesByConversation(activeConversation._id, token);
                setMessages(fetchedMessages);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
                setMessages([]);
            } finally {
                setIsLoadingChat(false);
            }
        };

        fetchMessages();
    }, [activeConversation, token]);
    
    // 3. Update active conversation when URL changes
    useEffect(() => {
      if (conversations.length > 0 && activeConversationIdFromUrl) {
        const convoFromUrl = conversations.find(c => c._id === activeConversationIdFromUrl);
        if (convoFromUrl) {
          setActiveConversation(convoFromUrl);
        }
      }
    }, [activeConversationIdFromUrl, conversations]);


    // Function to set the active conversation via ID
    const setActiveConversationId = (id: string) => {
        const convo = conversations.find(c => c._id === id);
        if (convo) {
            setActiveConversation(convo);
        }
    };

    // Function to add a new message to the state
    const addMessage = (message: Message) => {
        setMessages(prevMessages => [...prevMessages, message]);
    };

    const value = {
        conversations,
        activeConversation,
        messages,
        isLoadingChat,
        setActiveConversationId,
        addMessage
    };

    // The loading state now reflects both auth and chat loading
    if (isLoadingAuth || isLoadingChat) {
        return (
            <div className="flex min-h-screen w-screen items-center justify-center bg-slate-900 text-white font-inter">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                <p className="ml-3 text-lg">Loading chat...</p>
            </div>
        );
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
