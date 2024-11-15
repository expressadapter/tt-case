'use client';

import { useState } from 'react';
import { ChatButton } from '@/components/chat/ChatButton';
import { ChatDialog } from '@/components/chat/ChatDialog';

interface ChatBotProps {
  menuItem: string | null;
}

export function Chatbot({ menuItem }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <ChatDialog menuItem={menuItem} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
