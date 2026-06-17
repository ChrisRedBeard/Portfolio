"use client";
// ============================================
// components/Collaborations.tsx
// ============================================
// Griglia di feature-card compatte (1-2 collaborazioni stabili).
// Ogni card: emoji · stato · nome · tipo · ruolo · descrizione · link.

import { motion, Variants } from "framer-motion";
import { collaborations, CollaborationType } from "@/data/collaborations";
import TiltCard from "@/directives/components/ui/TiltCard";

// ── Colori per tipo di collaborazione ─────────────────────────────
const TYPE_STYLES: Record<
  CollaborationType,
  { bg: string; border: string; color: string; label: string }
> = {
  Research:    { bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)", color: "#a78bfa", label: "Ricerca"       },
  OpenSource:  { bg: "rgba(0,229,255,0.08)",   border: "rgba(0,229,255,0.25)",   color: "#00e5ff", label: "Open Source"   },
  Team:        { bg: "rgba(0,255,136,0.08)",   border: "rgba(0,255,136,0.25)",   color: "#00ff88", label: "Team"          },
  Association: { bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.25)",  color: "#fb923c", label: "Associazione"  },
  Lab:         { bg: "rgba(45,212,191,0.08)",  border: "rgba(45,212,191,0.25)",  color: "#2dd4bf", label: "Lab didattico" },
};

// ── Icona link esterno ─────────────────────────────────────────────
function LinkIcon() {
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
      className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2 py-0.5 rounded-full border"
      style={{
        background:  active ? "rgba(0,255,136,0.08)" : "rgba(100,100,100,0.08)",
        borderColor: active ? "rgba(0,255,136,0.25)" : "rgba(100,100,100,0.2)",
        color:       active ? "#00ff88" : "#6b7280",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: active ? "#00ff88" : "#6b7280", animation: active ? "pulse 2s infinite" : "none" }}
      />
      {active ? "In corso" : "Concluso"}
    </span>
  );
}

// ── Varianti animazione ────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ── Componente principale ──────────────────────────────────────────
export default function Collaborations() {
  return (
    <section id="collaborations" className="py-28 bg-surface relative overflow-hidden">

      {/* Sfondo decorativo: griglia punteggiata sottile */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #00e5ff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* ── Divider + Header ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-16" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white break-words">
            <span className="bg-gradient-to-r from-primary to-cyan-300 bg-clip-text text-transparent">
              04/
            </span>
            Collaborazioni
          </h2>
          <p className="text-muted text-base max-w-lg mt-4">
            Team, lab e community con cui lavoro o ho collaborato.
            Ogni esperienza mi ha reso uno sviluppatore migliore.
          </p>
        </motion.div>

        {/* ── Griglia feature-card ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-wrap justify-center gap-6"
        >
          {collaborations.map((collab) => {
            const style = TYPE_STYLES[collab.type];

            return (
              <motion.div key={collab.id} variants={cardVariants} className="w-full sm:w-[380px]">
                <TiltCard maxTilt={5} glareOpacity={0.08} scale={1.02}>
                  <div className="relative flex flex-col gap-4 p-6 rounded-2xl border border-line bg-canvas h-full hover:border-primary/30 transition-colors">

                    {/* top: emoji + stato */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl border shrink-0"
                        style={{ background: style.bg, borderColor: style.border }}
                      >
                        {collab.emoji}
                      </div>
                      <ActiveBadge active={collab.active} />
                    </div>

                    {/* nome + tipo */}
                    <div>
                      <h3 className="font-semibold text-white text-lg leading-snug mb-2">
                        {collab.name}
                      </h3>
                      <span
                        className="font-mono text-[11px] px-2 py-0.5 rounded border inline-block"
                        style={{ background: style.bg, borderColor: style.border, color: style.color }}
                      >
                        {style.label}
                      </span>
                    </div>

                    {/* ruolo */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[11px] text-faint uppercase tracking-widest">
                        ruolo
                      </span>
                      <span className="font-semibold text-sm text-primary">{collab.role}</span>
                    </div>

                    {/* descrizione */}
                    <p className="text-muted text-sm leading-relaxed flex-1">
                      {collab.description}
                    </p>

                    {/* link */}
                    {collab.url && (
                      <a
                        href={collab.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-faint hover:text-primary transition-colors w-fit"
                      >
                        <LinkIcon />
                        Visita il progetto
                      </a>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Pulse keyframe per ActiveBadge */}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </section>
  );
}
