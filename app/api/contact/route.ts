import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Destinatario dei messaggi (la tua casella). Override con CONTACT_TO_EMAIL.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "chrisredbeard21@gmail.com";

// Mittente: "onboarding@resend.dev" funziona senza dominio verificato
// (consegna solo all'email del tuo account Resend). Per un mittente tuo,
// verifica un dominio su Resend e cambia questo valore.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

// ── Rate limiting (in-memory, best effort su serverless) ──────────────────────
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now        = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(t => now - t < 60_000);
  if (timestamps.length >= 3) return true;
  rateLimitMap.set(ip, [...timestamps, now]);
  return false;
}

// ── Verifica Cloudflare Turnstile (anti-bot, lato server) ─────────────────────
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!token) return false;
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method:  "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:    new URLSearchParams({
          secret:   process.env.TURNSTILE_SECRET_KEY ?? "",
          response: token,
          remoteip: ip,
        }),
      }
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[contact] verifica Turnstile fallita:", err);
    return false;
  }
}

// ── Handler ───────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Troppi invii. Riprova tra qualche minuto." },
      { status: 429 }
    );
  }

  let body: {
    name?: string; email?: string; subject?: string; message?: string;
    turnstileToken?: string; website?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  // Honeypot: campo nascosto "website" — se compilato è un bot. Risposta finta-ok.
  if (body.website) {
    return NextResponse.json({ ok: true });
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

  // Verifica anti-bot: senza token valido la richiesta viene rifiutata.
  if (!(await verifyTurnstile(body.turnstileToken ?? "", ip))) {
    return NextResponse.json(
      { error: "Verifica anti-bot non superata. Ricarica la pagina e riprova." },
      { status: 400 }
    );
  }

  // Oggetto su una sola riga (niente header injection).
  const safeSubject = `[Portfolio] ${subject} — ${name}`.replace(/[\r\n]+/g, " ");

  // Client Resend istanziato qui (non a livello modulo) così il build non
  // fallisce quando la chiave non è ancora impostata.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY mancante");
    return NextResponse.json(
      { error: "Servizio email non configurato." },
      { status: 500 }
    );
  }
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from:    FROM_EMAIL,
      to:      TO_EMAIL,
      replyTo: email, // rispondi all'email → va direttamente al visitatore
      subject: safeSubject,
      text:
        `Nuovo messaggio dal portfolio\n\n` +
        `Nome: ${name}\n` +
        `Email: ${email}\n` +
        `Argomento: ${subject}\n\n` +
        `${message}\n`,
    });

    if (error) {
      console.error("[contact] Resend ha risposto errore:", error);
      return NextResponse.json(
        { error: "Invio non riuscito. Riprova o scrivimi via email." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[contact] invio email fallito:", err);
    return NextResponse.json(
      { error: "Invio non riuscito. Riprova o scrivimi via email." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
