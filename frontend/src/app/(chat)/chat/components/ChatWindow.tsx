// src/app/chat/components/ChatWindow.tsx
'use client';

import React, { useEffect, useRef } from "react";

interface Message {
  _id: string;
  senderId: string;
  text: string;
  createdAt: string;
}

interface ChatWindowProps {
  messages?: Message[];  // optional, can be undefined
  currentUserId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages = [], currentUserId }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto bg-gray-400 p-4">
      {messages.map((message) => {
        const isSender = message.senderId === currentUserId;

        return (
          <div
            key={message._id}
            className={`flex mb-2 ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 text-sm max-w-[70%] break-words shadow-md ${
                isSender
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg rounded-br-none"
                  : "bg-gray-800 text-gray-100 rounded-lg rounded-bl-none"
              }`}
            >
              {message.text}
              <div className="text-[10px] opacity-60 mt-1 text-right select-none">
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatWindow;
