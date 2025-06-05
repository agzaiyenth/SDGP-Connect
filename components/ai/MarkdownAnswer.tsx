
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
            {mainContent}
        </div>
    );
}
