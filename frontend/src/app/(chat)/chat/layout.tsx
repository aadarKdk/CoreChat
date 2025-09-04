// CoreChat/frontend/src/app/(chat)/chat/layout.tsx

import type { PropsWithChildren } from "react";
// No need to import AuthProvider or ChatProvider as Zustand handles state globally.
import { ChatSidebar } from "./components/sidebar";
import { ChatWindow } from "./components/chatWindow";

export default function ChatLayout({ children }: PropsWithChildren) {
  // The global state from Zustand is now available to all child components without wrappers.
  return (
    <div className="flex h-screen w-full">
      {children}
    </div>
  );
}