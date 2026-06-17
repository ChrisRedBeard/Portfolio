"use client";
// ============================================
// components/About.tsx
// ============================================

import { motion,Variants } from "framer-motion";
import { StatCard } from "@/types";


const STATS: StatCard[] = [
  { value: "2°", label: "Anno universitario",   sub: "Informatica e tecnologie per la produzione del software"        },
  { value: "7+", label: "Anni di esperienza",   sub: "nel campo dell'informatica e correlati"         },
  { value: "5+", label: "Linguaggi",  sub: "padroneggiati"      },
  { value: "∞",  label: "Curiosità",  sub: "verso il codice"    },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  return (
    <section id="about" className="py-28 bg-canvas">
      <div className="max-w-6xl mx-auto px-6">

        {/* Divider */}
      
      
        <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-16" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
         
      
  <h2 className="relative font-display text-3xl sm:text-4xl md:text-5xl text-white">
      
       <span className=" bg-gradient-to-r from-primary to-cyan-300 bg-clip-text text-transparent">
       01/
    </span>About Me
 
  </h2> 
            </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* Testo */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="md:col-span-3 space-y-5"
          >
            {[
              <>Sono uno studente che frequenta il corso di Laurea di <span className="text-white font-medium">Informatica e Tecnologie per la Produzione del Software</span> all&apos; Università degli studi di Bari , con una forte passione per lo sviluppo software e la risoluzione di problemi complessi attraverso il codice.</>,
              <>La passione e la grinta con cui svolgo i miei lavori e progetti parte da me in primis, ma con un intero team si costruiscono i veri capolavori ! </>,
              <>Fuori dall&apos;università, mi diverto a costruire progetti personali, contribuire a repository open-source e seguire le ultime novità del mondo tech: AI,Digital Health, Robotics.</>,
              <>Sono una persona <span className="text-white font-medium">curiosa, metodica e orientata ai risultati</span>.<br></br>Se non mi trovi al pc sono in palestra.</>,
              
            ].map((text, i) => (
              <motion.p key={i}  className="text-muted text-base md:text-lg leading-relaxed">
                {text}
              </motion.p>
            ))}

            <motion.div  className="flex flex-wrap gap-2 pt-2">
              {["Università", "Interessi","Curiosità"].map((tag) => (
                <span key={tag} className="font-mono text-xs px-3 py-1 rounded-md bg-primary/5 border border-primary/15 text-primary/80">
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-2 grid grid-cols-2 gap-4"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-line bg-surface p-5 flex flex-col gap-1 hover:border-primary/20 transition-colors"
              >
                <span className="font-bold text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="font-medium text-white text-sm">{stat.label}</span>
                <span className="text-faint text-xs">{stat.sub}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
