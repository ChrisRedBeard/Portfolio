"use client";
// ============================================
// components/Collaborations.tsx
// ============================================
//
// STRUTTURA DELLA SEZIONE:
//
//   ① Header (numero sezione + titolo)
//   ② Marquee strip (React Bits) — scorrimento infinito dei badge collaborazione
//      ↳ Riga 1: scorre verso sinistra  (collaborazioni attive)
//      ↳ Riga 2: scorre verso destra    (tutte le collaborazioni, invertito)
//   ③ Griglia TiltCard (React Bits) — 3 card per riga, max 6 card
//      ↳ Ogni card: emoji/logo · nome · tipo · ruolo · descrizione · link
//
// COMPONENTI REACT BITS USATI:
//   • Marquee    → components/ui/Marquee.tsx
//   • TiltCard   → components/ui/TiltCard.tsx

import { motion } from "framer-motion";
import { collaborations, CollaborationType } from "@/data/collaborations";
import Marquee   from "@/directives/components/ui/Marquee";
import TiltCard  from "@/directives/components/ui/TiltCard";

// ── Colori per tipo di collaborazione ─────────────────────────────
// Modifica qui per cambiare i colori dei badge
const TYPE_STYLES: Record<
  CollaborationType,
  { bg: string; border: string; color: string; label: string }
> = {
  Research:    { bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)", color: "#a78bfa", label: "Ricerca"       },
  OpenSource:  { bg: "rgba(0,229,255,0.08)",   border: "rgba(0,229,255,0.25)",   color: "#00e5ff", label: "Open Source"   },
  Team:        { bg: "rgba(0,255,136,0.08)",   border: "rgba(0,255,136,0.25)",   color: "#00ff88", label: "Team"          },
  Association: { bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.25)",  color: "#fb923c", label: "Associazione"  },
};

// ── Icona link esterno ─────────────────────────────────────────────
function  LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ── Indicatore "Attivo" ────────────────────────────────────────────
function ActiveBadge({ active }: { active: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-full border"
      style={{
        background: active ? "rgba(0,255,136,0.08)" : "rgba(100,100,100,0.08)",
        borderColor: active ? "rgba(0,255,136,0.25)" : "rgba(100,100,100,0.2)",
        color: active ? "#00ff88" : "#6b7280",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: active ? "#00ff88" : "#6b7280",
          animation: active ? "pulse 2s infinite" : "none",
        }}
      />
      {active ? "In corso" : "Concluso"}
    </span>
  );
}

// ── Varianti animazione griglia ────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ── Componente principale ──────────────────────────────────────────
export default function Collaborations() {
  const activeCollab = collaborations.filter((c) => c.active);

  return (
    <section id="collaborations" className="py-28 bg-[#060810] relative overflow-hidden">

      {/* Sfondo decorativo: griglia punteggiata sottile */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #00e5ff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Divider + Header ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent mb-16" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >

  <h2 className="relative font-mono text-4xl md:text-5xl text-white">
      
       <span className=" bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
       04/
    </span>Collaborazioni
 
  </h2>
          <p className="text-[#8b949e] text-base max-w-lg">
            Team, community open-source e gruppi di ricerca con cui lavoro
            o ho collaborato. Ogni esperienza mi ha reso uno sviluppatore migliore.
          </p>
        </motion.div>
      </div>

     

      {/* ═══════════════════════════════════════════════════════════
          ③ REACT BITS — TILTCARD LISTA
          Colonna singola: ogni riga è divisa in due zone.
          SINISTRA (1/3): emoji · nome · tipo · stato
          DESTRA  (2/3): ruolo · descrizione · link
          TiltCard avvolge l'intera riga per il 3D tilt.
          ═══════════════════════════════════════════════════════════ */}
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-4"
        >
          {collaborations.map((collab, index) => {
            const style = TYPE_STYLES[collab.type];

            return (
              <motion.div key={collab.id}>
                {/* Numero riga decorativo */}
                <div className="flex items-center gap-3 mb-2 pl-1">
                  <span className="font-mono text-[10px] text-[#3d444d]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-[#1a2332]" />
                </div>

                {/* ── TiltCard wrapper (React Bits) ── */}
                <TiltCard maxTilt={6} glareOpacity={0.1} scale={1.015}>
                  <div
                    className="rounded-2xl border flex flex-col md:flex-row overflow-hidden transition-all duration-300"
                    style={{ background: "#0a0e1a", borderColor: "#1a2332" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#0b98e4";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "#1a2332";
                    }}
                  >
                    {/* ── COLONNA SINISTRA: identità ── */}
                    <div
                      className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4 p-5 md:p-6 md:w-56 shrink-0 border-b md:border-b-0 md:border-r"
                      style={{ borderColor: "#1a2332" }}
                    >
                      {/* Emoji / Logo */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border shrink-0"
                        style={{ background: style.bg, borderColor: style.border }}
                      >
                        {collab.emoji}
                      </div>

                      <div className="flex-1 md:flex-none">
                        {/* Nome organizzazione */}
                        <h3 className="font-bold text-white text-sm leading-snug mb-2">
                          {collab.name}
                        </h3>

                        {/* Badge tipo */}
                        <span
                          className="font-mono text-[10px] px-2 py-0.5 rounded border inline-block"
                          style={{
                            background: style.bg,
                            borderColor: style.border,
                            color: style.color,
                          }}
                        >
                          {style.label}
                        </span>
                      </div>

                      {/* Stato attivo — allineato a destra su mobile, in basso su desktop */}
                      <div className="shrink-0 md:mt-auto">
                        <ActiveBadge active={collab.active} />
                      </div>
                    </div>

                    {/* ── COLONNA DESTRA: dettagli ── */}
                    <div className="flex flex-col gap-3 p-5 md:p-6 flex-1 justify-center">
                      {/* Ruolo */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[10px] text-[#3d444d] uppercase tracking-widest">
                          ruolo
                        </span>
                        <span
                          className="font-semibold text-sm text-cyan-400"
                         
                        >
                          {collab.role}
                        </span>
                      </div>

                      {/* Descrizione */}
                      <p className="text-[#8b949e] text-sm leading-relaxed">
                        {collab.description}
                      </p>

                      {/* Link esterno */}
                      {collab.url && (
                        <a
                          href={collab.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-[#3d444d] hover:text-cyan-400 transition-colors w-fit"
                        >
                          <LinkIcon />
                          <u>Visita il progetto</u>
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contatore */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center font-mono text-xs text-[#3d444d]"
        >
          {collaborations.filter((c) => c.active).length} collaborazioni attive ·{" "}
          {collaborations.length} totali
        </motion.p>
      </div>

      {/* Pulse keyframe per ActiveBadge */}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </section>
  );
}