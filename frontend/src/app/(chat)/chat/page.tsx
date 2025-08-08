// src/app/chat/page.tsx


import ChatHeader from "./components/ChatHeader";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

export default function ChatPage() {
  return (
    <div className="flex flex-col flex-1">
      <ChatHeader />
      <ChatWindow />
      <MessageInput />
    </div>
  );
}
