// CoreChat/frontend/src/services/conversationService.ts

import { Conversation, CreateConversationPayload, UpdateGroupDetailsPayload, UpdateParticipantsPayload } from '@/types';
import { GET, POST, PUT } from './api';

export const getUserConversations = async (token: string): Promise<Conversation[]> => {
  return GET<Conversation[]>('/api/conversations/me', token);
};

export const createConversation = async (payload: CreateConversationPayload, token: string): Promise<Conversation> => {
  return POST<Conversation>('/api/conversations', payload, token);
};

export const getConversationById = async (conversationId: string, token: string): Promise<Conversation> => {
  return GET<Conversation>(`/api/conversations/${conversationId}`, token);
};

export const addParticipantsToGroup = async (
  conversationId: string,
  payload: UpdateParticipantsPayload,
  token: string
): Promise<{ message: string; conversation: Conversation }> => {
  return PUT<{ message: string; conversation: Conversation }>(`/api/conversations/${conversationId}/add-participants`, payload, token);
};

export const removeParticipantsFromGroup = async (
  conversationId: string,
  payload: UpdateParticipantsPayload,
  token: string
): Promise<{ message: string; conversation: Conversation }> => {
  return PUT<{ message: string; conversation: Conversation }>(`/api/conversations/${conversationId}/remove-participants`, payload, token);
};

export const updateGroupConversation = async (
  conversationId: string,
  payload: UpdateGroupDetailsPayload,
  token: string
): Promise<{ message: string; conversation: Conversation }> => {
  return PUT<{ message: string; conversation: Conversation }>(`/api/conversations/${conversationId}/update-group`, payload, token);
};
