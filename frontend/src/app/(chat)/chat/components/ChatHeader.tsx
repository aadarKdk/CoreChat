// components/ChatHeader.tsx


import { User, MoreHorizontal } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-slate-900/80 backdrop-blur-sm">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
          M
        </div>
        <div>
          <h2 className="text-lg font-semibold">Max</h2>
          <p className="text-sm text-green-400">Online</p>
        </div>
      </div>
      <button
        aria-label="More options"
        className="p-2 rounded-md hover:bg-gray-700 transition-colors"
      >
        <MoreHorizontal className="w-5 h-5 text-gray-300" />
      </button>
    </header>
  );
}
