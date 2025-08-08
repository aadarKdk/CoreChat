// src/app/chat/components/Sidebar.tsx
'use client';

import Image from 'next/image';

export default function Sidebar() {
  const currentUser = {
    name: 'Aadarsha',
    profilePic: '/user1.png',
  };

  const friends = [
    {
      id: 1,
      name: 'John Doe',
      profilePic: '/john.png', // Place test image in public/
    },
    {
      id: 2,
      name: 'Jane Smith',
      profilePic: '/jane.png', // Place test image in public/
    },
  ];

  return (
    <div className="p-4 flex flex-col h-full">
      {/* Current User Profile */}
      <div className="flex items-center space-x-3 mb-6">
        <Image
          src={currentUser.profilePic}
          alt="Profile Picture"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <span className="font-medium text-gray-800">{currentUser.name}</span>
      </div>

      {/* Friends / Chat List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        <h2 className="text-lg font-bold mb-2">Chats</h2>
        <ul className="space-y-2">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="flex items-center space-x-3 p-2 rounded hover:bg-gray-100 cursor-pointer"
            >
              <Image
                src={friend.profilePic}
                alt={friend.name}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <span className="text-gray-800">{friend.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <div className="mt-6">
        <button className="text-sm text-blue-600 hover:underline">Logout</button>
      </div>
    </div>
  );
}
