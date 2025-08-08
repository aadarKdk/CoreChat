// src/app/chat/components/Sidebar.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

const contacts = [
  { id: 1, name: "Max", status: "online", profilePic: "/max.png" },
  { id: 2, name: "Ivy", status: "offline", profilePic: "/ivy.png" },
  { id: 3, name: "Zoe", status: "online", profilePic: "/zoe.png" },
];

export default function Sidebar() {
  const [selected, setSelected] = useState<number>(1);

  return (
    <aside className="w-72 bg-gradient-to-br from-gray-600 via-slate-600 to-gray-500 text-white flex flex-col border-r border-gray-800">
      {/* Header - MATCHES LANDING PAGE LOGO (MessageCircle + dots + neural lines) */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative w-10 h-10 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            {/* Main chat bubble */}
            <div className="relative">
              <MessageCircle className="w-5 h-5 text-white" />
              {/* AI indicator dots */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full animate-pulse delay-300"></div>
            </div>
            {/* Neural network lines (decorative) */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 40 40" aria-hidden>
                <path
                  d="M8 12 L20 8 L32 12 M12 28 L20 32 L28 28"
                  stroke="white"
                  strokeWidth="0.5"
                  fill="none"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </div>

          <span className="text-xl font-bold text-white">CoreChat</span>
        </div>

        {/* optional small action / placeholder to keep spacing consistent */}
        <div className="text-sm text-gray-400 hidden md:block">Chats</div>
      </div>

      {/* Search */}
      <div className="px-6 py-3 border-b border-gray-800">
        <input
          type="search"
          placeholder="Search chats"
          className="w-full rounded-md bg-gray-800 placeholder-gray-400 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search chats"
        />
      </div>

      {/* Contacts */}
      <nav className="flex-1 overflow-y-auto">
        {contacts.map(({ id, name, status, profilePic }) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelected(id)}
            className={`w-full flex items-center gap-3 px-6 py-3 transition-colors text-left ${
              selected === id ? "bg-gradient-to-r from-blue-600 to-indigo-700" : "hover:bg-blue-600/20"
            } rounded-r-lg`}
            aria-pressed={selected === id}
          >
            {/* Avatar with gradient glow ring */}
            <div className="relative w-10 h-10 mr-1 flex-shrink-0">
              <div className={`absolute inset-0 rounded-full p-[2px] ${selected === id ? "bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500" : "bg-gradient-to-tr from-blue-400 to-indigo-600/60"}` } />
              <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-900">
                <Image
                  src={profilePic}
                  alt={`${name} profile`}
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
              </div>

              {/* online/offline dot overlay */}
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
                  status === "online" ? "bg-green-400" : "bg-gray-600"
                }`}
                aria-hidden
              />
            </div>

            {/* Name + small status text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="truncate font-medium text-white">{name}</p>
              </div>
              <p className={`text-xs mt-0.5 ${status === "online" ? "text-green-400" : "text-gray-400"}`}>
                {status === "online" ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
}
