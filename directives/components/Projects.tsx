"use client";
// ============================================
// components/Projects.tsx
// ============================================
// Usa SpotlightCard di React Bits per le card interattive.

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import SpotlightCard from "@/directives/components/ui/SpotlightCard";


function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest      = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-28 bg-[#060810]">
      <div className="max-w-6xl mx-auto px-6">

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
                03/
              </span>Progetti
          
          </h2>
             </motion.div>

        {/* Featured grid */}
  
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5"
        >
          {featured.map((project) => (
                  
            <motion.div key={project.id}>

              <SpotlightCard spotlightColor="rgba(0,229,255,0.1)" className="h-full">
                <div className="p-6 h-full flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[#3d444d] text-xs">
                      {String(project.id).padStart(2, "0")}
                    </span>
                    <div className="flex gap-3 text-[#8b949e]">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="hover:text-blue-400 transition-colors" aria-label="GitHub">
                          <GitHubIcon />
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer"
                          className="hover:text-blue-400 transition-colors" aria-label="Demo">
                          <ExternalLinkIcon />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-[#8b949e] leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-black-400/5 border border-white-400/15 text-cyan-400/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a href="https://github.com/ChrisRedBeard" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-[#8b949e] hover:text-cyan-400 transition-colors group">
            Vedi tutti i repository su GitHub
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
