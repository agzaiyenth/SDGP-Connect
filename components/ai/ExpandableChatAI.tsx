"use client";
import { useState, FormEvent } from "react";
import { Bot, Paperclip, Mic, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { useChat } from "@/components/ai/useChat";
import { MarkdownAnswer } from "@/components/ai/MarkdownAnswer";

export function ExpandableChatAI() {
  const { messages, isLoading, sendMessage, showThink, setShowThink } = useChat();
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleAttachFile = () => {};
  const handleMicrophoneClick = () => {};

  return (
    <ExpandableChat size="lg" position="bottom-right" icon={<Bot className="h-6 w-6" />}>
      <ExpandableChatHeader className="flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Chat with AI ✨</h1>
        <p className="text-sm text-muted-foreground">
          Ask me anything about the platform or components
        </p>
      </ExpandableChatHeader>
      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src={
                  message.sender === "user"
                    ? "/user.png"
                    : "/iconw.png"
                }
                fallback={message.sender === "user" ? "US" : "AI"}
              />
              <ChatBubbleMessage variant={message.sender === "user" ? "sent" : "received"}>
                {message.sender === "ai" ? (
                  <MarkdownAnswer content={message.content} />
                ) : (
                  message.content
                )}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar className="h-8 w-8 shrink-0" src="/iconw.png" fallback="AI" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter>
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0 justify-between">
            <div className="flex">
              <Button variant="ghost" size="icon" type="button" onClick={handleAttachFile}>
                <Paperclip className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" type="button" onClick={handleMicrophoneClick}>
                <Mic className="size-4" />
              </Button>
            </div>
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
        <div className="mt-2 text-center text-xs text-muted-foreground">
          Built by{" "}
          <a
            href="https://psycodelabs.lk"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            Psycode Labs
          </a>
        </div>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
