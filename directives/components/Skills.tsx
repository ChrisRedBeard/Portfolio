"use client";
// ============================================
// components/Skills.tsx
// ============================================

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { hardSkills, softSkills } from "@/data/skills";
import { HardSkill, SoftSkill } from "@/types";

type Category = HardSkill["category"];

const CATEGORY_LABEL: Record<Category, string> = {
  Linguaggio: "Linguaggio",
  Framework:  "Framework",
  Database:   "Database",
  Tool:       "Strumento",
};

// ─── Indicatore livello (5 tacche) ──────────────────────────────────────────
function SkillBar({ level, inView }: { level: number; inView: boolean }) {
  return (
    <div className="flex gap-1" aria-label={`Livello ${level} su 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          className={`h-1 w-3.5 rounded-full ${i <= level ? "bg-primary" : "bg-line"}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 0.35, delay: inView ? i * 0.05 : 0 }}
          style={{ transformOrigin: "left" }}
        />
      ))}
    </div>
  );
}

// ─── Card hard skill (con logo del brand) ───────────────────────────────────
function HardSkillCard({ skill, delay, inView }: { skill: HardSkill; delay: number; inView: boolean }) {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col items-center text-center gap-3 p-5 rounded-xl
                 border border-line bg-canvas overflow-hidden transition-colors hover:border-primary/30"
    >
      {/* glow nel colore del brand all'hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at 50% 0%, ${skill.color}1f, transparent 70%)` }}
        aria-hidden="true"
      />
      <Icon
        className="relative text-4xl transition-transform duration-300 group-hover:scale-110"
        style={{ color: skill.color }}
      />
      <div className="relative">
        <p className="text-sm font-medium text-white">{skill.name}</p>
        <p className="font-mono text-[10px] uppercase tracking-[1px] text-faint mt-0.5">
          {CATEGORY_LABEL[skill.category]}
        </p>
      </div>
      <SkillBar level={skill.level} inView={inView} />
    </motion.div>
  );
}

// ─── Card soft skill ────────────────────────────────────────────────────────
function SoftSkillCard({ skill, delay, inView }: { skill: SoftSkill; delay: number; inView: boolean }) {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay }}
      className="flex items-center gap-3 p-3.5 rounded-xl border border-line
                 bg-canvas cursor-default hover:border-secondary/30 transition-colors"
    >
      <Icon className="w-4 h-4 text-secondary shrink-0" strokeWidth={1.75} />
      <span className="text-sm text-muted">{skill.name}</span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-28 bg-surface">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>

        {/* top divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-16" />

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white">
            <span className="bg-gradient-to-r from-primary to-cyan-300 bg-clip-text text-transparent">
              02/
            </span>
            Skills
          </h2>
          <p className="text-muted text-base max-w-lg mt-4">
            Lo stack con cui progetto, scrivo e mantengo software — più le competenze
            trasversali che uso ogni giorno in team.
          </p>
        </motion.div>

        {/* ── Hard skills: griglia di card con logo ── */}
        <div className="mb-14">
          <h3 className="text-xs font-mono uppercase tracking-[2px] text-faint mb-6">
            Stack tecnico
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {hardSkills.map((skill, i) => (
              <HardSkillCard key={skill.name} skill={skill} inView={inView} delay={i * 0.06} />
            ))}
          </div>
        </div>

        {/* ── Soft skills ── */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-[2px] text-faint mb-6">
            Competenze trasversali
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {softSkills.map((skill, i) => (
              <SoftSkillCard key={skill.name} skill={skill} inView={inView} delay={i * 0.04} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
