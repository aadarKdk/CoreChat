// src/app/chat/components/ChatWindow.tsx
'use client';

import MessageInput from './MessageInput';

export default function ChatWindow() {
  return (
    <div className="flex flex-col justify-between h-full p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {/* Replace with dynamic messages */}
        <div className="bg-white p-2 rounded shadow w-fit">Hello!</div>
        <div className="bg-blue-100 p-2 rounded shadow w-fit self-end">Hi there!</div>
      </div>

      <MessageInput />
    </div>
  );
}
