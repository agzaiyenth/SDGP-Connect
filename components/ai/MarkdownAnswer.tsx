import React from "react";
import ReactMarkdown from "react-markdown";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

interface MarkdownAnswerProps {
  content: string;
}

export function MarkdownAnswer({ content }: MarkdownAnswerProps) {
  // Extract <think>...</think> section
  const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/);
  const think = thinkMatch ? thinkMatch[1].trim() : null;
  const mainContent = thinkMatch ? content.replace(thinkMatch[0], "") : content;

  return (
    <div className="prose max-w-none">
      <TextGenerateEffect words={mainContent} />
    </div>
  );
}
