// src/app/chat/components/Sidebar.tsx
'use client';

export default function Sidebar() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Chats</h2>
      {/* Replace with dynamic user chat list */}
      <ul className="space-y-2">
        <li className="p-2 rounded hover:bg-gray-100 cursor-pointer">John Doe</li>
        <li className="p-2 rounded hover:bg-gray-100 cursor-pointer">Jane Smith</li>
      </ul>

      <div className="absolute bottom-4 left-4">
        <button className="text-sm text-blue-600 hover:underline">Logout</button>
      </div>
    </div>
  );
}
