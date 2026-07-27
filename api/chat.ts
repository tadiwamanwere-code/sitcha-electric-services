import {GoogleGenAI} from '@google/genai';
/*
 * NOTE the explicit `.js` extension. Vercel compiles this file to an ESM
 * `api/chat.js` serverless function, and Node's ESM resolver requires a real
 * file extension — an extensionless `./_prompt` import builds fine but throws
 * ERR_MODULE_NOT_FOUND at runtime in production. TypeScript ("bundler"
 * resolution) and esbuild both map `./_prompt.js` back to `_prompt.ts`, so
 * local dev and the bundled Node server are unaffected.
 */
import {SYSTEM_INSTRUCTION, fallbackReply} from './_prompt.js';

/**
 * POST /api/chat  →  { text: string }
 * Body: { message: string, history: Array<{role:'user'|'model', text:string}> }
 *
 * Deployed automatically as a Vercel serverless function. server.ts mounts the
 * same logic for local dev / self-hosted Node.
 *
 * The API key is read from process.env here on the server only — it is never in
 * the client bundle and never in a VITE_-prefixed variable.
 *
 * Any provider failure returns 200 with a fallback reply rather than a 5xx, so a
 * visitor always gets something useful. See references/ai-assistant.md.
 */

/** Keep costs and context bounded. */
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_TURNS = 10;
/** Sits under Vercel's 10s Hobby limit so the fallback runs in-request, not a 504. */
const TIMEOUT_MS = 9000;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({error: 'Method not allowed'});
    return;
  }

  try {
    const {message, history} = req.body || {};
    if (!message || typeof message !== 'string') {
      res.status(400).json({error: 'Message is required'});
      return;
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      res.status(400).json({error: 'Message is too long'});
      return;
    }

    const rawApiKey = process.env.GEMINI_API_KEY;
    const apiKey = rawApiKey ? rawApiKey.trim() : '';
    const isPlaceholder =
      !apiKey || apiKey === 'undefined' || apiKey === 'null' || apiKey === 'YOUR_API_KEY';

    if (isPlaceholder) {
      res.status(200).json({text: fallbackReply(message)});
      return;
    }

    const ai = new GoogleGenAI({apiKey});

    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const turn of history.slice(-MAX_HISTORY_TURNS)) {
        contents.push({
          role: turn.role === 'user' ? 'user' : 'model',
          parts: [{text: String(turn.text || '')}],
        });
      }
    }
    contents.push({role: 'user', parts: [{text: message}]});

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), TIMEOUT_MS),
    );

    const response: any = await Promise.race([
      ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          maxOutputTokens: 512,
        },
      }),
      timeoutPromise,
    ]);

    res.status(200).json({
      text: response.text || fallbackReply(message),
    });
  } catch (err: any) {
    console.error('Chat provider error:', err?.message || err);
    res.status(200).json({text: fallbackReply(req.body?.message || '')});
  }
}
