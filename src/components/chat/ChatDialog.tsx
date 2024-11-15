"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import useSessionStorage from "@/hooks/useSessionStorage";
import chatBotSystemPrompt from "@/prompts/chatBot";

interface Message {
  role: "assistant" | "user" | "system";
  content: string;
}

interface ChatDialogProps {
  menuItem: string | null,
  isOpen: boolean;
  onClose: () => void;
}

export function ChatDialog({ menuItem, isOpen, onClose }: ChatDialogProps) {

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useSessionStorage('userId');
  const [menuData, setMenuData] = useSessionStorage('menuData');
  const [selectedLanguage, setSelectedLanguage] = useSessionStorage('language');


  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: chatBotSystemPrompt 
      + `\n ${JSON.stringify(menuData)}
      \n Your responses must be in ${selectedLanguage?.name} language`
      + (menuItem ? `\n Note: Now user asking question about ${menuItem}`: ``)
      ,
    },
  ]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
        console.log("chatttt", userId)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          userId
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[80vh] max-h-[600px] flex-col gap-0 p-0 sm:max-w-[440px]">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">In-flight Menu Helper</h2>
          <p className="text-sm text-muted-foreground">
            {
                (menuItem ? `How can I help you about ${menuItem}?`: `How can I help you today?`)
            }
            
          </p>
        </div>

        <ScrollArea
          ref={scrollAreaRef}
          className="flex-1 px-2"
        >
          <div className="flex flex-col py-4">
            {messages.slice(1).map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            {isLoading && (
              <ChatMessage
                role="assistant"
                content=""
                isLoading={true}
              />
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}