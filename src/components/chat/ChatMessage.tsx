'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  role: 'assistant' | 'user' | 'system';
  isLoading?: boolean;
}

export function ChatMessage({ content, role, isLoading }: ChatMessageProps) {
  return (
    <div className={cn('flex w-full gap-3 p-4', role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
      <Avatar
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full border',
          role === 'assistant' ? 'bg- text-primary-foreground' : 'bg-muted',
        )}
      >
        {role === 'assistant' ? (
          <>
            <AvatarImage src="/favicon.ico" alt="Assistant" className="p-1" />
            <AvatarFallback className="flex items-center justify-center">AI</AvatarFallback>
          </>
        ) : (
          <User className="h-4 w-4" />
        )}
      </Avatar>
      <div
        className={cn(
          'relative max-w-[80%] rounded-lg px-4 py-3 shadow-sm',
          role === 'assistant'
            ? 'bg-muted text-muted-foreground'
            : 'bg-primary text-primary-foreground',
        )}
      >
        {isLoading ? (
          <div className="flex gap-1">
            <span className="animate-bounce">·</span>
            <span className="animate-bounce delay-100">·</span>
            <span className="animate-bounce delay-200">·</span>
          </div>
        ) : (
          <>
            {role === 'assistant' ? (
              <ReactMarkdown className="prose prose-sm max-w-none">{content}</ReactMarkdown>
            ) : (
              <p className="text-sm">{content}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
