"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  content: string;
  role: "assistant" | "user" | "system";
  isLoading?: boolean;
}

export function ChatMessage({ content, role, isLoading }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full gap-3 p-4",
        role === "user" ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar
        className={cn(
          "h-8 w-8 rounded-full border",
          role === "assistant"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        {role === "assistant" ? (
          <Bot className="h-4 w-4" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </Avatar>
      <div
        className={cn(
          "relative max-w-[80%] rounded-lg px-4 py-3 shadow-sm",
          role === "assistant"
            ? "bg-muted text-muted-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        {isLoading ? (
          <div className="flex gap-1">
            <span className="animate-bounce">·</span>
            <span className="animate-bounce delay-100">·</span>
            <span className="animate-bounce delay-200">·</span>
          </div>
        ) : (
          <p className="text-sm">{content}</p>
        )}
      </div>
    </div>
  );
}