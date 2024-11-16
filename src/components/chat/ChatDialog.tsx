'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/chat/ChatMessage';
import useSessionStorage from '@/hooks/use-session-storage';
import chatBotSystemPrompt from '@/prompts/chatBot';
import { generateChatResponse } from '@/services/chatBot';
import { useTranslations } from 'next-intl';

interface Message {
  role: 'assistant' | 'user' | 'system';
  content: string;
}

interface ChatDialogProps {
  menuItem: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatDialog({ menuItem, isOpen, onClose }: ChatDialogProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInputReady, setIsInputReady] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);
  const [userId] = useSessionStorage('userId');
  const [menuData] = useSessionStorage('menuData');
  const t = useTranslations('Chat');

  // Validate message content
  const isValidMessage = (content: string): boolean => {
    return typeof content === 'string' && content.trim().length > 0;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content:
        chatBotSystemPrompt +
        `\n ${JSON.stringify(menuData)}` +
        (menuItem ? `\n Note: Now user asking question about ${menuItem}` : ``),
    },
  ]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport && isAtBottomRef.current) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;
    const isAtBottom =
      Math.abs(viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight) < 10;
    isAtBottomRef.current = isAtBottom;
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsInputReady(true);
      }, 400);

      return () => {
        clearTimeout(timer);
        setIsInputReady(false);
      };
    } else {
      setIsInputReady(false);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        isAtBottomRef.current = true;
        scrollToBottom();
      }, 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    try {
      const trimmedInput = input.trim();

      // Enhanced validation
      if (!isValidMessage(trimmedInput) || isLoading) {
        console.warn('Invalid message or loading state:', { trimmedInput, isLoading });
        return;
      }

      setInput('');

      // Create new message object with validated content
      const newUserMessage: Message = {
        role: 'user',
        content: trimmedInput,
      };

      setMessages((prev) => [...prev, newUserMessage]);
      setIsLoading(true);

      // Create validated messages array for API call
      const validatedMessages = [...messages, newUserMessage].filter((msg) =>
        isValidMessage(msg.content),
      );

      const data = await generateChatResponse(validatedMessages, userId);

      if (data.error) {
        throw new Error(data.error);
      }

      // Validate response message
      if (!isValidMessage(data.message)) {
        throw new Error('Invalid response from server');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `${t('assistantError')}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitDisabled = !input.trim() || isLoading || !isValidMessage(input);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex h-[80vh] max-h-[600px] flex-col gap-0 p-0 sm:max-w-[440px]">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">In-flight Menu Helper</h2>
          <p className="text-sm text-muted-foreground">
            {menuItem ? `${t('helpItem', { menuItem })}` : `${t('help')}`}
          </p>
        </div>

        <ScrollArea ref={scrollAreaRef} className="flex-1 px-2">
          <div className="flex flex-col py-4" onScroll={handleScroll}>
            {messages.slice(1).map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            {isLoading && <ChatMessage role="assistant" content="" isLoading={true} />}
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
              placeholder={`${t('typeMessage')}`}
              className="flex-1"
              autoFocus={false}
              autoComplete="off"
              inputMode={isInputReady ? 'text' : 'none'}
              tabIndex={isInputReady ? 0 : -1}
            />
            <Button type="submit" size="icon" disabled={isSubmitDisabled}>
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
