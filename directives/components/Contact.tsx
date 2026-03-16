"use client";
// ============================================
// components/Contact.tsx
// ============================================

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Variants } from "framer-motion";

// ─── Typewriter ───────────────────────────────────────────────────────────────
const SEGMENTS = [
  { text: "// parliamoci", color: "text-cyan-400" },
  { text: ".",              color: "text-white"    },
] as const;

const FULL_TEXT = SEGMENTS.map(s => s.text).join("");

function useTypewriter(speed = 110) {
  const [len, setLen] = useState(0);
  useEffect(() => {
    if (len >= FULL_TEXT.length) return;
    const t = setTimeout(() => setLen(l => l + 1), speed + Math.random() * 60);
    return () => clearTimeout(t);
  }, [len, speed]);
  return len;
}

function TypewriterHeading() {
  const len = useTypewriter();
  let pos = 0;
  const spans = SEGMENTS.map(({ text, color }) => {
    const visible = Math.max(0, Math.min(text.length, len - pos));
    pos += text.length;
    return visible > 0
      ? <span key={text} className={color}>{text.slice(0, visible)}</span>
      : null;
  });
  return (
    <h2 className="font-mono text-3xl md:text-4xl text-white tracking-tight leading-tight min-h-[48px] mb-4">
      {spans}
      <span className="text-cyan-400 animate-[blink_.7s_step-end_infinite]">▮</span>
    </h2>
  );
}

// ─── Info row ─────────────────────────────────────────────────────────────────
function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | React.ReactNode; }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-md border border-[#1a2332] bg-[#060810] flex items-center justify-center flex-shrink-0 text-cyan-400">
        {icon}
      </div>
      <div>
        <p className="font-mono text-[9px] text-[#3d4a5c] tracking-[1px] uppercase mb-0.5">{label}</p>
        <p className="font-mono text-xs text-[#8b949e]">{value}</p>
      </div>
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────
const SUBJECTS = ["Progetto", "Collaborazione", "Consulenza", "Altro"] as const;
type Subject = typeof SUBJECTS[number];

interface FormState {
  name: string; email: string; subject: Subject; message: string;
}
const INIT: FormState = { name: "", email: "", subject: "Progetto", message: "" };

export default function Contact() {
  const [form,    setForm]    = useState<FormState>(INIT);
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState<Partial<Record<keyof FormState, string>>>({});

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }));

  function validate() {
    const e: typeof errors = {};
    if (!form.name.trim())                      e.name    = "campo obbligatorio";
    if (!form.email.trim())                     e.email   = "campo obbligatorio";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email   = "email non valida";
    if (!form.message.trim())                   e.message = "campo obbligatorio";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

// DOPO
async function handleSubmit() {
  if (!validate()) return;
  setLoading(true);

  try {
    const res = await fetch("/api/contact/", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors({ message: data.error ?? "Errore durante l'invio." });
      return;
    }

    setSent(true);

  } catch {
    setErrors({ message: "Errore di rete. Riprova più tardi." });
  } finally {
    setLoading(false);
  }
}

  const inputBase =
    "w-full bg-[#060810] border border-[#1a2332] rounded-lg px-3.5 py-2.5 text-white font-mono text-xs placeholder:text-[#3d4a5c] outline-none transition-colors focus:border-cyan-400/40";

  const fieldErr = (k: keyof FormState) =>
    errors[k] ? <span className="font-mono text-[10px] text-red-400">{errors[k]}</span> : null;

  const containerVariants: Variants = {
    hidden:   {},
    visible:  { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants: Variants = {
    hidden:   { opacity: 0, y: 16 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="contact" className="py-28 bg-[#0d1117]">
      <div className="max-w-6xl mx-auto px-6">

        {/* divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent mb-14" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── LEFT: descrizione ────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >

            <motion.div variants={itemVariants}>
              <TypewriterHeading />
            </motion.div>

            <motion.p variants={itemVariants}
              className="font-mono text-sm text-[#8b949e] leading-relaxed mb-10 max-w-sm"
            >
              Hai un progetto in mente o vuoi semplicemente fare due chiacchiere?
              Scrivimi — rispondo sempre entro 24h.
            </motion.p>

            {/* info links */}
            <motion.div variants={containerVariants} className="flex flex-col gap-4 mb-8">
              <motion.div variants={itemVariants}>
          <InfoRow
        label="Instagram"
        value={
          <a
            href="https://instagram.com/chrix_pookielifter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            @chrix_pookielifter
          </a>
  }
  icon={
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-3.37-3.37 4 4 0 0 1 3.37 3.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  }
/>
              </motion.div>
              <motion.div variants={itemVariants}>
                <InfoRow
                  label="github" value={
                        <a
                        href="https://github.com/ChrisRedBeard"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline">
                      ChrisRedBeard
                      </a>
                  }
                  icon={
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.57v-2.23c-3.01.55-3.8-.73-4.04-1.41-.14-.35-.72-1.41-1.23-1.7-.42-.22-1.02-.78-.01-.79.94-.02 1.62.87 1.84 1.23 1.08 1.81 2.81 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.67-.3-5.46-1.34-5.46-5.93 0-1.3.47-2.38 1.23-3.22-.12-.3-.54-1.53.12-3.18 0 0 1-.31 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.76.84 1.23 1.9 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.44.38.81 1.1.81 2.22v3.3c0 .32.22.69.83.57A12.02 12.02 0 0 0 24 12C24 5.37 18.63 0 12 0z"/>
                    </svg>
                  }


                />
              </motion.div>
                  <motion.div variants={itemVariants}>
                  <InfoRow
                    label="linkedin"
                    value={
                      <a
                        href="https://www.linkedin.com/in/christian-barbarossa-447625245/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline">

                        Christian Barbarossa
                      </a>
                    }
                    icon={
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    }
                  />
                </motion.div>

              
            </motion.div>
            
            

            {/* status */}
            <motion.div variants={itemVariants}
              className="flex items-center gap-2 font-mono text-[11px] text-green-400"
            >
              <span className="relative flex h-[7px] w-[7px]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-green-400" />
              </span>
              open to work
            </motion.div>
          </motion.div>

          {/* ── RIGHT: form ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="flex flex-col gap-4"
                >
                  {/* nome + email */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[9px] text-cyan-400 tracking-[1.5px] uppercase">nome</label>
                      <input type="text" placeholder="Mario Rossi" value={form.name} onChange={set("name")} className={inputBase} />
                      {fieldErr("name")}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[9px] text-cyan-400 tracking-[1.5px] uppercase">email</label>
                      <input type="email" placeholder="mario@email.com" value={form.email} onChange={set("email")} className={inputBase} />
                      {fieldErr("email")}
                    </div>
                  </div>

                  {/* argomento */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] text-cyan-400 tracking-[1.5px] uppercase">argomento</label>
                    <div className="flex flex-wrap gap-2">
                      {SUBJECTS.map(s => (
                        <button
                          key={s} type="button"
                          onClick={() => setForm(f => ({ ...f, subject: s }))}
                          className={`
                            font-mono text-[10px] px-3 py-1 rounded border transition-all
                            ${form.subject === s
                              ? "border-cyan-400/35 bg-cyan-400/5 text-cyan-400"
                              : "border-[#1a2332] bg-[#060810] text-[#8b949e] hover:border-cyan-400/20 hover:text-cyan-400/70"}
                          `}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* messaggio */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] text-cyan-400 tracking-[1.5px] uppercase">messaggio</label>
                    <textarea rows={5} placeholder="Ciao Chris, ho un'idea..." value={form.message} onChange={set("message")} className={inputBase} />
                    {fieldErr("message")}
                  </div>

                  {/* submit */}
                     {/* errore generico API */}
                    {errors.message && (
                      <p className="font-mono text-[11px] text-red-400 text-center">
                        {errors.message}
                      </p>
                    )}
                  <button
                    type="button" onClick={handleSubmit} disabled={loading}
                    className="flex items-center justify-between bg-[#060810] border border-[#1a2332] rounded-lg px-4 py-3 hover:border-cyan-400/30 hover:bg-cyan-400/4 transition-all group disabled:opacity-50"
                  >
                    <span className="font-mono text-sm text-white">
                      {loading ? "invio in corso..." : "invia messaggio"}
                    </span>
                    <span className="w-7 h-7 rounded-md border border-cyan-400/30 flex items-center justify-center group-hover:border-cyan-400/60 transition-colors">
                      {loading ? (
                        <svg className="w-3 h-3 animate-spin text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        </svg>
                      ) : (
                        <svg className="w-3 h-3 stroke-cyan-400" viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"/>
                          <polyline points="12 5 19 12 12 19"/>
                        </svg>
                      )}
                    </span>
                  </button>
                </motion.div>

              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center gap-4 py-20 text-center"
                >
                  <div className="w-12 h-12 rounded-full border border-green-400/40 flex items-center justify-center">
                    <svg className="w-5 h-5 stroke-green-400" viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <span className="font-mono text-sm text-green-400">Messaggio inviato!</span>
                  <p className="font-mono text-xs text-[#8b949e]">Ti rispondo al più presto. Grazie per avermi scritto.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}