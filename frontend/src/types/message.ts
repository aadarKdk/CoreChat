// CoreChat/frontend/src/types/message.ts

import { BaseUser } from './user';

export interface Message {
  _id: string;
  sender: BaseUser; 
  conversation: string;
  content: string;
  messageType: "text" | "image" | "file";
  fileUrl?: string;
  readBy: string[]; 
  createdAt: string;
  updatedAt: string;
}

export interface SendMessagePayload {
  conversationId: string;
  content: string;
  messageType?: "text" | "image" | "file";
  fileUrl?: string;
}
