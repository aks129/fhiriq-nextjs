import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { CHAT_FALLBACK, CHAT_SYSTEM_PROMPT } from '@/lib/chat-prompt';
import { federatedClient } from '@/lib/anthropic-client';

/**
 * Site assistant.
 *
 * The system prompt is fixed on the server. The previous route accepted a
 * `systemPrompt` field from the browser, which made it an open Claude proxy
 * billed to this site's key. It also called a retired model and, on any
 * failure, answered from a keyword table that advertised archived products,
 * certifications and "10x faster" claims.
 */

const MAX_MESSAGE_CHARS = 2000;
// No API key: authenticates by workload identity federation (see
// src/lib/anthropic-client.ts). null outside production, so the route
// answers with CHAT_FALLBACK.
const client = federatedClient();

export async function POST(request: NextRequest) {
  let message: unknown;
  try {
    ({ message } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return NextResponse.json(
      { error: `Keep messages under ${MAX_MESSAGE_CHARS} characters.` },
      { status: 400 },
    );
  }

  if (!client) {
    return NextResponse.json({ message: CHAT_FALLBACK });
  }

  try {
    const response = await client.beta.messages.create({
      model: 'claude-opus-5-5',
      // A hard ceiling is deliberate: this endpoint is public. Thinking
      // tokens count against it, and effort "low" keeps chat replies short.
      max_tokens: 8192,
      output_config: { effort: 'low' },
      // On a safety decline, the API retries on a fallback model it chooses.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: CHAT_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: message }],
    });

    if (response.stop_reason === 'max_tokens') {
      console.error('Chat: reply hit max_tokens');
    }
    if (response.stop_reason === 'refusal') {
      return NextResponse.json({ message: CHAT_FALLBACK });
    }

    const text = response.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    return NextResponse.json({ message: text || CHAT_FALLBACK });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      console.error('Chat: rate limited');
    } else if (error instanceof Anthropic.APIError) {
      console.error(`Chat: API error ${error.status}`);
    } else {
      console.error('Chat: unexpected error', error);
    }
    return NextResponse.json({ message: CHAT_FALLBACK });
  }
}
