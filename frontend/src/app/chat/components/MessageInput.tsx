// src/app/chat/components/MessageInput.tsx

'use client';

import { useState } from 'react';

export default function MessageInput() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    console.log('Sending:', message);
    setMessage('');
  };

  const handleSubmit = async(values) => {
    
  }

  return (
    <div className="flex items-center gap-2 mt-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded px-4 py-2 focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}
