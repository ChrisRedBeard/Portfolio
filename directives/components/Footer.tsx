"use client";
// ============================================
// components/Footer.tsx
// ============================================

import { motion } from "framer-motion";

// ─── Dati ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "01/About Me",      href: "#about"      },
  { label: "02/Skills",     href: "#skills"     },
  { label: "03/Progetti",   href: "#projects"   },
  { label: "04/Collaborazioni", href: "#experience" },
  { label: "Contatti",    href: "#contact"    },
];


const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href:  "https://github.com/tuousername",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href:  "https://linkedin.com/in/tuoprofilo",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href:  "https://instagram.com/chrix_pookielifter",
    icon: (
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
    ),
  },
];

// ─── Componenti interni ───────────────────────────────────────────────────────

/** Pallino verde animato "open to work" */
function StatusDot() {
  return (
    <span className="relative inline-flex h-[7px] w-[7px]">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
      <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-green-400" />
    </span>
  );
}

/** Social icon button con hover 3D sottile */
function SocialBtn({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        w-[38px] h-[38px] rounded-lg border border-[#1a2332] bg-[#060810]
        flex items-center justify-center text-[#8b949e]
        hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-cyan-400
        transition-all duration-200
      "
    >
      {icon}
    </a>
  );
}

// ─── Footer principale ────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d1117] pt-16 pb-8 font-mono">
      {/* divider coerente con Skills */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent mb-14" />
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* ── Grid 3 colonne ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-12 mb-14"
        >

          {/* Brand */}
          <div>
            <h2 className="text-white text-2xl md:text-3xl tracking-tight mb-3">
              <span className="text-cyan-400">&lt;</span>ChrisDev
              <span className="text-cyan-400">/&gt;</span>
            </h2>

          
            <p className="text-[#8b949e] text-xs leading-relaxed max-w-[260px]">
              Full-stack developer appassionato di interfacce performanti e codice pulito.
              Disponibile per collaborazioni e nuovi progetti.
            </p>
          </div>

          {/* Navigazione */}
          <div>
            <p className="text-[10px] text-cyan-400 tracking-[1.5px] uppercase mb-5">
              navigazione
            </p>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-[#8b949e] hover:text-cyan-400 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contatti + Social */}
          <div>
            <p className="text-[10px] text-cyan-400 tracking-[1.5px] uppercase mb-5">
              contatti
            </p>
            <p className="text-[13px] text-[#8b949e] mb-1">chrisredbeard21@gmail.com</p>
            <p className="text-[13px] text-[#8b949e] mb-5">Bari, Italia</p>


            {/* Social icons */}
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map((s) => (
                <SocialBtn key={s.label} href={s.href} label={s.label} icon={s.icon} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Bottom bar ── */}
        <div className="h-px bg-[#1a2332] mb-6" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-[#3d4a5c]">
          <span>
            © {year} <span className="text-cyan-400">&lt;Chrisdev/&gt;</span> — tutti i diritti riservati
          </span>
          <span className="flex items-center gap-1.5">
            fatto con <span className="text-green-400">♥</span>,caffè e ghisa — Bari
          </span>
        </div>

      </div>
    </footer>
  );
}