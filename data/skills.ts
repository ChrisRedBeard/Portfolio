// ============================================
// data/skills.ts
// ============================================
// Modifica questi array per aggiornare le tue skill.
// level: 1=Base | 2=In crescita | 3=Competente | 4=Avanzato | 5=Expert

import { HardSkill, SoftSkill } from "@/types";

export const hardSkills: HardSkill[] = [
  { name: "C",       level:5, category: "Linguaggio" },
  { name: "Java",   level: 4, category: "Linguaggio" },
  { name: "Javascript",         level: 3, category: "Linguaggio" },
  { name: "Python",      level: 2, category: "Linguaggio" },
  { name: "React",        level: 2, category: "Framework"  },
  { name: "MySQL",        level: 5, category: "Database"   },
  { name: "Git & GitHub", level: 3, category: "Tool"       },
  { name: "Docker",       level: 2, category: "Tool"       },
];

export const softSkills: SoftSkill[] = [
  { name: "Problem Solving",      icon: "🧩" },
  { name: "Team Working",         icon: "🤝" },
  { name: "Apprendimento rapido", icon: "⚡" },
  { name: "Comunicazione",        icon: "💬" },
  { name: "Gestione del tempo",   icon: "🗓️" },
  { name: "Pensiero critico",     icon: "🔍" },
  { name: "Adattabilità",         icon: "🔄" },
  { name: "Inglese (B2)",         icon: "🌍" },
];
