import React from "react";
import ReactMarkdown from "react-markdown";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface MarkdownAnswerProps {
  content: string;
  showThink?: boolean;
}

export function MarkdownAnswer({ content, showThink }: MarkdownAnswerProps) {
  // Extract <think>...</think> section
  const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/);
  const think = thinkMatch ? thinkMatch[1].trim() : null;
  const mainContent = think ? content.replace(thinkMatch[0], "") : content;

  return (
    <div className="prose max-w-none">
      <ReactMarkdown>{mainContent}</ReactMarkdown>
      {think && showThink && (
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="think">
            <AccordionTrigger>Show Deep Thinking</AccordionTrigger>
            <AccordionContent>
              <ReactMarkdown>{think}</ReactMarkdown>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
