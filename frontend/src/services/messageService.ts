// CoreChat/frontend/src/services/messageService.ts

import { Message, SendMessagePayload } from '@/types';
import { DELETE, GET, POST } from './api';

export const sendMessage = async (payload: SendMessagePayload, token: string): Promise<Message> => {
  return POST<Message>('/api/messages', payload, token);
};

export const getMessagesByConversation = async (conversationId: string, token: string): Promise<Message[]> => {
  return GET<Message[]>(`/api/messages/${conversationId}`, token);
}

export const deleteMessage = async (messageId: string, token: string): Promise<{ message: string }> => {
  return DELETE<{ message: string }>(`/api/messages/${messageId}`, token);
};
