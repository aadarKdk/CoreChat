// CoreChat/frontend/src/app/(chat)/chat/layout.tsx

import type { PropsWithChildren } from "react";
import { AuthProvider } from "@/hooks/useAuth";
//import { ChatProvider } from "@/hooks/useChat"; // Import the new ChatProvider
import { ChatSidebar } from "./components/sidebar";
import { ChatWindow } from "./components/chatWindow";
import { ChatProvider } from "@/hooks/useChat";

export default function ChatLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <ChatProvider>
        <div className="flex h-screen w-full">
            {children}
        </div>
      </ChatProvider>
    </AuthProvider>
  );
}

