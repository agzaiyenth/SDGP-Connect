import { systemPrompt } from '@/components/ai/SystemPrompt';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GROQ_API_KEY ;
const model = process.env.GROQ_MODEL || 'deepseek-r1-distill-llama-70b';


export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  if (!apiKey) {
    return NextResponse.json({ error: 'GROQ_API_KEY not set' }, { status: 500 });
  }

  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      stream: false,
      
    }),
  });

  if (!groqRes.ok) {
    const error = await groqRes.text();
    return NextResponse.json({ error }, { status: groqRes.status });
  }

  const data = await groqRes.json();
  // For debugging: log the full response
  console.log('GROQ API response:', JSON.stringify(data, null, 2));
  return NextResponse.json(data);
}
