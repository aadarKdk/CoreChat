"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Main chat container.
 * This component wraps the entire chat window, providing a flexbox layout.
 */
export function ChatContainer({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn("flex-1 flex flex-col h-full bg-slate-800", className)}
            {...props}
        />
    );
}

/**
 * Chat header component.
 * Used to display the conversation title.
 */
export function ChatHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn("flex items-center p-4 border-b border-slate-700 bg-slate-900", className)}
            {...props}
        />
    );
}

/**
 * Message list container.
 * Manages the scrolling for the messages and provides spacing.
 */
export function ChatMessages({ className, ...props }: React.Component.PropsWithoutRef<'div'>) {
    return (
        <div
            className={cn("flex-1 p-4 overflow-y-auto space-y-4", className)}
            {...props}
        />
    );
}

/**
 * Individual message container.
 * Aligns the message bubble and avatar based on who sent the message.
 */
export function ChatMessage({ isSender, className, ...props }: React.ComponentProps<'div'> & { isSender?: boolean }) {
    return (
        <div
            className={cn(
                "flex items-end gap-2",
                isSender ? "justify-end flex-row-reverse" : "justify-start",
                className
            )}
            {...props}
        />
    );
}

/**
 * The message bubble itself.
 * Contains the message content and styling.
 */
export function ChatMessageBox({ isSender, className, ...props }: React.ComponentProps<'div'> & { isSender?: boolean }) {
    return (
        <div
            className={cn(
                "p-3 rounded-lg max-w-sm",
                isSender
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-slate-700 text-white rounded-bl-none",
                className
            )}
            {...props}
        />
    );
}

/**
 * Container for the message input and send button.
 */
export function ChatInput({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn("p-4 border-t border-slate-700 bg-slate-900", className)}
            {...props}
        />
    );
}

/**
 * Form for the message input.
 */
export function ChatInputForm({ className, ...props }: React.ComponentProps<'form'>) {
    return (
        <form
            className={cn("flex gap-2", className)}
            {...props}
        />
    );
}

/**
 * A placeholder component for message actions like reactions or attachments.
 */
export function ChatMessageActions({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn("flex gap-2 items-center", className)}
            {...props}
        />
    );
}
