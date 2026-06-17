// ============================================
// data/skills.ts
// ============================================
// Modifica questi array per aggiornare le tue skill.
// level: 1=Base | 2=In crescita | 3=Competente | 4=Avanzato | 5=Expert

import { HardSkill, SoftSkill } from "@/types";
import { Puzzle, Users, Zap, MessageSquare, Clock, Lightbulb, Repeat, Globe } from "lucide-react";
import { SiC, SiJavascript, SiPython, SiReact, SiMysql, SiGithub, SiDocker } from "react-icons/si";
import { DiJava } from "react-icons/di";

export const hardSkills: HardSkill[] = [
  { name: "C",            level: 5, category: "Linguaggio", icon: SiC,          color: "#A8B9CC" },
  { name: "Java",         level: 4, category: "Linguaggio", icon: DiJava,       color: "#E76F00" },
  { name: "JavaScript",   level: 3, category: "Linguaggio", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python",       level: 2, category: "Linguaggio", icon: SiPython,     color: "#3776AB" },
  { name: "React",        level: 2, category: "Framework",  icon: SiReact,      color: "#61DAFB" },
  { name: "MySQL",        level: 5, category: "Database",   icon: SiMysql,      color: "#4479A1" },
  { name: "Git & GitHub", level: 3, category: "Tool",       icon: SiGithub,     color: "#f0f6fc" },
  { name: "Docker",       level: 2, category: "Tool",       icon: SiDocker,     color: "#2496ED" },
];

export const softSkills: SoftSkill[] = [
  { name: "Problem Solving",      icon: Puzzle        },
  { name: "Team Working",         icon: Users         },
  { name: "Apprendimento rapido", icon: Zap           },
  { name: "Comunicazione",        icon: MessageSquare },
  { name: "Gestione del tempo",   icon: Clock         },
  { name: "Pensiero critico",     icon: Lightbulb     },
  { name: "Adattabilità",         icon: Repeat        },
  { name: "Inglese (B2)",         icon: Globe         },
];
