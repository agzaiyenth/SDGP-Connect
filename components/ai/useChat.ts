/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

import { useState } from "react";

export interface ChatMessage {
  id: number;
  content: string;
  sender: "user" | "ai";
}

const sanitizeInput = (input: string): { isValid: boolean; sanitized: string } => {
  const sanitized = input
    .replace(/<[^>]*>/g, '')         // Remove HTML tags
    .replace(/javascript:/gi, '')    // Block JS URLs
    .trim();

  if (sanitized.length === 0) {
    return {
      isValid: false,
      sanitized: "Invalid input detected. For assistance, please contact support@sdgp.lk",
    };
  }

  return { isValid: true, sanitized };
};

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      content: "👋 Hi! I'm the SDGP AI assistant. How can I help you today?",
      sender: "ai",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showThink, setShowThink] = useState(false);

  const sendMessage = async (input: string) => {
    setIsLoading(true);
    
    // Sanitize the input first
    const { isValid, sanitized } = sanitizeInput(input);
    
    setMessages((prev) => {
      // Find the max id and increment for unique keys
      const maxId = prev.length > 0 ? Math.max(...prev.map((m) => m.id)) : 0;
      return [
        ...prev,
        { id: maxId + 1, content: input, sender: "user" },
      ];
    });

    // If input is suspicious, respond immediately without calling API
    if (!isValid) {
      setMessages((prev) => {
        const maxId = prev.length > 0 ? Math.max(...prev.map((m) => m.id)) : 0;
        return [
          ...prev,
          { id: maxId + 1, content: sanitized, sender: "ai" },
        ];
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(process.env.NEXT_PUBLIC_AI_API_KEY && { "x-api-key": process.env.NEXT_PUBLIC_AI_API_KEY }),
        },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ 
              role: m.sender === "user" ? "user" : "assistant", 
              content: m.content 
            })),
            { role: "user", content: sanitized }, 
          ],
        }),
      });

      const data = await res.json();
      
      // Validate and sanitize AI response
      const rawResponse = data.choices?.[0]?.message?.content || "(No response)";
      const validatedResponse = rawResponse;

      setMessages((prev) => {
        // Always increment max id for AI message
        const maxId = prev.length > 0 ? Math.max(...prev.map((m) => m.id)) : 0;
        return [
          ...prev,
          { id: maxId + 1, content: validatedResponse, sender: "ai" },
        ];
      });
    } catch (e) {
      setMessages((prev) => {
        const maxId = prev.length > 0 ? Math.max(...prev.map((m) => m.id)) : 0;
        return [
          ...prev,
          { id: maxId + 1, content: "Error: Could not get response.", sender: "ai" },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage, showThink, setShowThink };
}