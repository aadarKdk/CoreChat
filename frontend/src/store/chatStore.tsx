// CoreChat/frontend/src/store/chatStore.ts

import { create } from 'zustand';
import { Conversation, Message } from '@/types';
import * as conversationService from '@/services/conversationService';
import * as messageService from '@/services/messageService';

// Define the state shape
interface ChatState {
    conversations: Conversation[];
    activeConversation: Conversation | null;
    messages: Message[];
    isLoadingChat: boolean;
    setConversations: (conversations: Conversation[]) => void;
    setActiveConversationId: (id: string, conversations: Conversation[]) => void;
    addMessage: (message: Message) => void;
    fetchConversations: (token: string) => Promise<void>;
    fetchMessages: (conversationId: string, token: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
    // State
    conversations: [],
    activeConversation: null,
    messages: [],
    isLoadingChat: false,

    // Actions
    setConversations: (conversations) => set({ conversations }),

    setActiveConversationId: (id, conversations) => {
        const convo = conversations.find(c => c._id === id);
        if (convo) {
            set({ activeConversation: convo });
        }
    },

    addMessage: (message) => {
        set(state => ({ messages: [...state.messages, message] }));
    },

    fetchConversations: async (token) => {
        set({ isLoadingChat: true });
        try {
            const fetchedConversations = await conversationService.getUserConversations(token);
            set({ conversations: fetchedConversations });

            // Automatically set the first conversation as active if none is selected
            if (!get().activeConversation && fetchedConversations.length > 0) {
                set({ activeConversation: fetchedConversations[0] });
            }
        } catch (error) {
            console.error("Failed to fetch conversations:", error);
        } finally {
            set({ isLoadingChat: false });
        }
    },

    fetchMessages: async (conversationId, token) => {
        set({ isLoadingChat: true });
        try {
            const fetchedMessages = await messageService.getMessagesByConversation(conversationId, token);
            set({ messages: fetchedMessages });
        } catch (error) {
            console.error("Failed to fetch messages:", error);
            set({ messages: [] });
        } finally {
            set({ isLoadingChat: false });
        }
    },
}));