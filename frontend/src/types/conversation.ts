// CoreChat/frontend/src/types/conversation.ts

import { BaseUser } from './user'; 
import { Message } from './message';

export interface Conversation {
  _id: string;
  participants: BaseUser[];
  type: "dm" | "group";
  name?: string;
  groupAdmin?: BaseUser;
  avatar?: string;
  lastMessage?: Message;
  unreadCounts: { user: string; count: number }[];
  createdAt: string;
  updatedAt: string;
  // Note: 'unreadCount' (single number) will be a derived frontend value, not directly part of this interface from the API response.
}

export interface CreateConversationPayload {
  participants: string[]; 
  type: "dm" | "group";
  name?: string;
}

export interface UpdateParticipantsPayload {
  newParticipantIds?: string[]; 
  participantIdsToRemove?: string[];
}

export interface UpdateGroupDetailsPayload {
  name?: string;
  avatar?: string;
}
