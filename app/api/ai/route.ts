// Copyright (c) 2025, Psycode Lab's (https://www.psycodelabs.lk). All Rights Reserved.
//
// This software is the property of Psycode Lab's. and its suppliers, if any.
// Dissemination of any information or reproduction of any material contained
// herein in any form is strictly forbidden, unless permitted by Psycode Lab's expressly.
// You may not alter or remove any copyright or other notice from copies of this content.
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
  return NextResponse.json(data);
}
