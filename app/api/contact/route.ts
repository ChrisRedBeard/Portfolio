import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ── Rate limiting ─────────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now        = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(t => now - t < 60_000);
  if (timestamps.length >= 3) return true;
  rateLimitMap.set(ip, [...timestamps, now]);
  return false;
}

// ── Analisi spam con Groq ─────────────────────────────────────────────────────
interface Verdict {
  spam:     boolean;
  reason:   string;
  priority: "high" | "medium" | "low";
  summary:  string;
}

async function analyzeWithGroq(
  name: string, email: string,
  subject: string, message: string
): Promise<Verdict> {
  const chat = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",   // modello gratuito
    messages: [
      {
        role: "system",
        content: `Sei un filtro spam per il portfolio di un developer.
Rispondi SOLO con JSON valido, nessun testo aggiuntivo.

Formato:
{
  "spam": boolean,
  "reason": "motivazione breve in italiano",
  "priority": "high" | "medium" | "low",
  "summary": "max 8 parole"
}

È SPAM se: promozioni, crypto, casino, SEO, backlink, bot, richieste di soldi.
NON è spam se: collaborazioni genuine, proposte progetto, domande tecniche.`,
      },
      {
        role: "user",
        content: `Nome: ${name}\nEmail: ${email}\nArgomento: ${subject}\nMessaggio: ${message}`,
      },
    ],
    temperature:      0.1,   // bassa per risposte consistenti
    max_tokens:       150,
    response_format:  { type: "json_object" },  // forza JSON puro
  });

  const text = chat.choices[0].message.content ?? "{}";
  return JSON.parse(text) as Verdict;
}

// ── Telegram ──────────────────────────────────────────────────────────────────
const EMOJI: Record<Verdict["priority"], string> = {
  high: "🔴", medium: "🟡", low: "🟢",
};

async function sendToTelegram(
  name: string, email: string,
  subject: string, message: string,
  v: Verdict
) {
  const text = `
${EMOJI[v.priority]} <b>Nuovo messaggio</b> · <i>${v.summary}</i>

👤 <b>Nome:</b> ${name}
📧 <b>Email:</b> ${email}
📌 <b>Argomento:</b> ${subject}
📊 <b>Priorità:</b> ${v.priority.toUpperCase()}

💬 <b>Messaggio:</b>
${message}
  `.trim();

  await fetch(
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

  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Campi mancanti." }, { status: 400 });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: "Email non valida." }, { status: 400 });
  }

  const verdict = await analyzeWithGroq(name, email, subject, message);

  if (verdict.spam) {
    console.log(`[SPAM] ${email} — ${verdict.reason}`);
    return NextResponse.json({ ok: true }); // silenzioso
  }

  await sendToTelegram(name, email, subject, message, verdict);
  return NextResponse.json({ ok: true });
}