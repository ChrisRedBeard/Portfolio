"use client";
// ============================================
// components/Skills.tsx
// ============================================

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Brain } from "lucide-react";
import { hardSkills, softSkills } from "@/data/skills";
import { HardSkill } from "@/types";

type Category = HardSkill["category"];

const CATEGORY_COLORS: Record<Category, { bg: string; border: string; color: string }> = {
  Linguaggio: { bg: "rgba(0,229,255,0.06)",   border: "rgba(0,229,255,0.2)",   color: "#00e5ff" },
  Framework:  { bg: "rgba(0,255,136,0.06)",   border: "rgba(0,255,136,0.2)",   color: "#00ff88" },
  Database:   { bg: "rgba(167,139,250,0.06)", border: "rgba(167,139,250,0.2)", color: "#a78bfa" },
  Tool:       { bg: "rgba(251,146,60,0.06)",  border: "rgba(251,146,60,0.2)",  color: "#fb923c" },
};

function SkillBar({ level, inView }: { level: number; inView: boolean }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className={`h-1.5 w-5 rounded-full ${i <= level ? "bg-cyan-400" : "bg-[#1a2332]"}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 0.35, delay: inView ? i * 0.07 : 0 }}
          style={{ transformOrigin: "left" }}
        />
      ))}
    </div>
  );
}

function HardSkillRow({ skill, delay }: { skill: HardSkill; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const colors = CATEGORY_COLORS[skill.category];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex items-center justify-between p-4 rounded-xl border border-[#1a2332]
                 bg-[#060810] hover:border-cyan-400/20 transition-colors group cursor-default mb-2"
    >
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-[10px] px-2 py-0.5 rounded border"
          style={{ background: colors.bg, borderColor: colors.border, color: colors.color }}
        >
          {skill.category}
        </span>
        <span className="font-medium text-white group-hover:text-cyan-400 transition-colors text-sm font-mono">
          {skill.name}
        </span>
      </div>
      <SkillBar level={skill.level} inView={isInView} />
    </motion.div>
  );
}

function SoftSkillCard({ skill, delay }: { skill: { name: string; icon: string }; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03 }}
      className="flex items-center gap-3 p-4 rounded-xl border border-[#1a2332]
                 bg-[#060810] cursor-default hover:border-green-400/30 transition-colors"
    >
      <span className="text-xl leading-none">{skill.icon}</span>
      <span className="text-sm text-[#8b949e] font-mono">{skill.name}</span>
    </motion.div>
  );
}

export default function Skills() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="skills" className="py-28 bg-[#060810]">
      <div className="max-w-5xl mx-auto px-6">

        {/* top divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent mb-16" />

        {/* Section title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2 className="font-mono text-4xl md:text-5xl text-white">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              02/
            </span>
            Skills
          </h2>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-14 items-start">

          {/* Hard Skills */}
          <div>
            <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2 font-mono">
              <span className="text-cyan-400">//</span> Hard Skills
            </h3>
            {hardSkills.map((skill, i) => (
              <HardSkillRow key={skill.name} skill={skill} delay={i * 0.05} />
            ))}
          </div>

          {/* Brain icon — center pivot */}
          <div className="hidden lg:flex flex-col items-center justify-start pt-50">
            <div className="relative flex items-center justify-center w-40 h-40">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(34,211,238,0.15), transparent 70%)" }}
              />
              <div className="absolute inset-[-4px] rounded-full border border-cyan-400/20" />
              <Brain size={70} strokeWidth={1.25} className="text-cyan-400 relative z-10" />
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            {/* Brain icon on mobile */}
            <div className="flex lg:hidden justify-center py-6">
              <div className="relative flex items-center justify-center w-20 h-20">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%)" }}
                />
                <Brain size={70} strokeWidth={1.25} className="text-cyan-400 relative z-10" />
              </div>
            </div>

            <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2 font-mono">
              <span className="text-green-400">//</span> Soft & Additional Skills
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {softSkills.map((skill, i) => (
                <SoftSkillCard key={skill.name} skill={skill} delay={i * 0.04} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}