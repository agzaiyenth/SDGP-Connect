import { useState } from "react";

export interface ChatMessage {
  id: number;
  content: string;
  sender: "user" | "ai";
}

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
    setMessages((prev) => {
      // Find the max id and increment for unique keys
      const maxId = prev.length > 0 ? Math.max(...prev.map((m) => m.id)) : 0;
      return [
        ...prev,
        { id: maxId + 1, content: input, sender: "user" },
      ];
    });
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.sender === "user" ? "user" : "assistant", content: m.content })),
            { role: "user", content: input },
          ],
        }),
      });
      const data = await res.json();
      setMessages((prev) => {
        // Always increment max id for AI message
        const maxId = prev.length > 0 ? Math.max(...prev.map((m) => m.id)) : 0;
        return [
          ...prev,
          { id: maxId + 1, content: data.choices?.[0]?.message?.content || "(No response)", sender: "ai" },
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
