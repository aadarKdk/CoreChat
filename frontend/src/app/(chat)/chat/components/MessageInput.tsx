// CoreChat/frontend/src/app/(chat)/chat/components/MessageInput.tsx

"use client"

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Smile, Plus } from "lucide-react";



export function MessageInput() {
  const [messageInput, setMessageInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [messageInput])

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending message:", messageInput)
      setMessageInput("")
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="p-4 border-t border-slate-700 bg-slate-800/50 backdrop-blur-sm">
      <div className="flex items-end space-x-3">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-700 hover:text-white mb-2">
          <Plus className="h-5 w-5" />
        </Button>

        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            placeholder="Type a message..."
            className="min-h-[44px] max-h-[120px] resize-none bg-slate-700/50 border-slate-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-slate-400 pr-20"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />

          <div className="absolute right-2 bottom-2 flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:bg-slate-600 hover:text-white">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:bg-slate-600 hover:text-white">
              <Smile className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white mb-2"
          onClick={handleSendMessage}
          disabled={!messageInput.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
