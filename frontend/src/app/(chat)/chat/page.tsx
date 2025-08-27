// CoreChat/frontend/src/app/(chat)/chat/page.tsx

import { ChatLayout } from "./components/chatLayout";
import { ChatWindow } from "./components/chatWindow";

//import { ChatLayout } from "./components/ChatLayout"; // Import the ChatLayout component
//import { ChatWindow } from "./components/ChatWindow"; // We will create this next

export default function ChatPage() {
  return (
    <ChatLayout>
      <ChatWindow   />
    </ChatLayout>
  );
}
