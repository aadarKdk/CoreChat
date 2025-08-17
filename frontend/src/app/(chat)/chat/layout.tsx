// CoreChat/frontend/src/app/(chat)/chat/layout.tsx
import type { PropsWithChildren } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ChatLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen w-full">
        {children}
      </div>
    </SidebarProvider>
  );
}
