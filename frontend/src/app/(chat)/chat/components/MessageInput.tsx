// src/app/chat/components/MessageInput.tsx

'use client';

// components/MessageInput.tsx
import { useState } from "react";
import { Send } from "lucide-react";

export default function MessageInput() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Send message:", message);
    setMessage("");
  };

  return (
    <div className="flex items-center px-6 py-4 border-t border-gray-700 bg-slate-900/80 backdrop-blur-sm">
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 rounded-l-md bg-gray-800 text-white px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 p-2 rounded-r-md hover:from-blue-700 hover:to-indigo-800 transition-colors"
        aria-label="Send message"
      >
        <Send className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
