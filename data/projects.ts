// ============================================
// data/projects.ts
// ============================================
// Per aggiungere un progetto: copia un oggetto e modificalo.
// featured: true  → card grande nella griglia principale
// featured: false → riga compatta nella sezione secondaria

import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "software engineering project",
    description:
      "Progetto software collaborativo sviluppato secondo metodologia Scrum.",
    tech: ["Python", "Click", "JSON", "pytest"],
    github: "https://github.com/ChrisRedBeard/software_engineering_project",
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: "Progammi in C",
    description:
      "Qui trovi una serie di programmi in C, sviluppati durante il corso di Programmazione 1. Include esercizi su array, stringhe, strutture dati e algoritmi base.",
    tech: ["C","Visual Studio Code"],
    github: "https://github.com/ChrisRedBeard/Programmi_Uni",
    demo: null,
    featured: true,
  },
    {
    id: 3,
    title: "Sistema di gestione di un centro di spedizione",
    description:
      "Realizzazione di un sistema software per la gestione di un centro di spedizione, sviluppato in C.",
    tech: ["C","Doxygen","Code::Blocks"],
    github: "https://github.com/ChrisRedBeard/Programmi_Uni",
    demo: null,
    featured: true,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "Questo sito! Costruito con React, Next.js e Tailwind CSS. Integra componenti animati da React Bits per un'esperienza visiva unica.",
    tech: ["React", "Next.js", "Tailwind", "Framer Motion"],
    github: "https://github.com/tuousername/portfolio",
    demo: "https://tuousername.vercel.app",
    featured: true,
  },
  {
    id: 5,
    title: "Algoritmi & Strutture Dati",
    description:
      "Repository con implementazioni in Python e Java dei principali algoritmi di ordinamento, ricerca e strutture dati studiate all'università.",
    tech: ["Python", "Java", "Algorithms"],
    github: "https://github.com/tuousername/algorithms",
    demo: null,
    featured: false,
  },
];
