"use client";

import { useState } from "react";
import { ChatButton } from "./ChatButton";
import { ChatDialog } from "./ChatDialog";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <ChatDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}