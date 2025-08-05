// src/app/chat/layout.tsx

import Sidebar from "./components/Sidebar";


export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-1/4 bg-white border-r overflow-y-auto">
        <Sidebar />
      </aside>
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
