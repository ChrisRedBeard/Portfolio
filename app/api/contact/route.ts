import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Rate limiting ─────────────────────────────────────────────────────────────
// NOTA: in-memory → su serverless (Vercel) è "best effort" perché ogni istanza
// ha la sua Map. Per un limite affidabile servirebbe uno store condiviso (es. Upstash Redis).
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now        = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(t => now - t < 60_000);
  if (timestamps.length >= 3) return true;
  rateLimitMap.set(ip, [...timestamps, now]);
  return false;
}

// ── Analisi spam con Claude ───────────────────────────────────────────────────
interface Verdict {
  spam:     boolean;
  reason:   string;
  priority: "high" | "medium" | "low";
  summary:  string;
}

// Schema per lo structured output (garantisce JSON valido)
const VERDICT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    spam:     { type: "boolean" },
    reason:   { type: "string" },
    priority: { type: "string", enum: ["high", "medium", "low"] },
    summary:  { type: "string" },
  },
  required: ["spam", "reason", "priority", "summary"],
} as const;

// Verdetto di riserva: se l'AI non risponde, il messaggio passa comunque (best effort).
const FALLBACK: Verdict = {
  spam:     false,
  reason:   "analisi AI non disponibile",
  priority: "medium",
  summary:  "nuovo messaggio",
};

async function analyzeWithClaude(
  name: string, email: string,
  subject: string, message: string
): Promise<Verdict> {
  try {
    // 👉 Per spendere molto meno usa "claude-haiku-4-5" al posto di "claude-opus-4-8".
    const res = await anthropic.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 200,
      system:
        `Sei un filtro spam per il portfolio di un developer.
È SPAM se: promozioni, crypto, casinò, SEO, backlink, bot, richieste di soldi.
NON è spam se: collaborazioni genuine, proposte progetto, domande tecniche.
Compila: spam (bool), reason (motivazione breve in italiano),
priority (high|medium|low), summary (max 8 parole).`,
      messages: [
        {
          role: "user",
          content: `Nome: ${name}\nEmail: ${email}\nArgomento: ${subject}\nMessaggio: ${message}`,
        },
      ],
      output_config: { format: { type: "json_schema", schema: VERDICT_SCHEMA } },
    });

    const block = res.content.find(b => b.type === "text");
    if (!block || block.type !== "text") return FALLBACK;
    return JSON.parse(block.text) as Verdict;
  } catch (err) {
    // Lo spam-filter è "best effort": se Claude fallisce, NON blocchiamo il messaggio.
    console.error("[contact] analisi Claude fallita:", err);
    return FALLBACK;
  }
}

// ── Telegram ──────────────────────────────────────────────────────────────────
const EMOJI: Record<Verdict["priority"], string> = {
  high: "🔴", medium: "🟡", low: "🟢",
};

async function sendToTelegram(
  name: string, email: string,
  subject: string, message: string,
  v: Verdict
): Promise<boolean> {
  const text = `
${EMOJI[v.priority]} <b>Nuovo messaggio</b> · <i>${v.summary}</i>

👤 <b>Nome:</b> ${name}
📧 <b>Email:</b> ${email}
📌 <b>Argomento:</b> ${subject}
📊 <b>Priorità:</b> ${v.priority.toUpperCase()}

💬 <b>Messaggio:</b>
${message}
  `.trim();

  try {
    const r = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          chat_id:    process.env.TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      }
    );
    if (!r.ok) {
      console.error("[contact] Telegram ha risposto", r.status, await r.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] invio Telegram fallito:", err);
    return false;
  }
}

// ── Handler ───────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Troppi invii. Riprova tra qualche minuto." },
      { status: 429 }
    );
  }

  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const name    = body.name?.trim()    ?? "";
  const email   = body.email?.trim()   ?? "";
  const subject = body.subject?.trim() || "—";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Campi mancanti." }, { status: 400 });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: "Email non valida." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Messaggio troppo lungo." }, { status: 400 });
  }

  const verdict = await analyzeWithClaude(name, email, subject, message);

  if (verdict.spam) {
    console.log(`[SPAM] ${email} — ${verdict.reason}`);
    return NextResponse.json({ ok: true }); // silenzioso
  }

  const delivered = await sendToTelegram(name, email, subject, message, verdict);
  if (!delivered) {
    return NextResponse.json(
      { error: "Invio non riuscito. Riprova o scrivimi via email." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
