"use client";
// ============================================
// components/Hero.tsx
// ============================================
// React Bits usati: Aurora, SplitText, BlurText, Magnet, ProfileCard

import { motion } from "framer-motion";
import SplitText  from "@/directives/components/ui/SplitText";
import BlurText   from "@/directives/components/ui/BlurText";
import Magnet     from "@/directives/components/ui/Magnet";
import LetterGlitch from "@/directives/components/ui/LetterGlitch";


export default function Hero() {
  return (
    <section
      id="hero"
      className=" min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Sfondo */}
   
    
      {/* Background glitch */}
  <div className="absolute inset-0 -z-10">
    <LetterGlitch
      glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
      glitchSpeed={15}
      centerVignette={true}
      outerVignette={false}
      smooth
      characters="'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
    />
  </div>
      

      <div className="mx-auto px-6">
        <div className="items-center">


          {/* ── Colonna sinistra: testo ── */}
          <div className="lg:items-start text-center lg:text">

            {/* Badge disponibilità */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-400/30 bg-green-400/5 text-green-400 font-mono text-xs mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Disponibile per stage e progetti
            </motion.div>

            {/* Saluto */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-mono text-cyan-400 text-sm md:text-base mb-3 tracking-widest"
            >
              Ciao, sono
            </motion.p>

            {/* Nome */}
            <h1 className="font-bold text-3xl md:text-4xl lg:text-7xl text-white mb-4 leading-none tracking-tight">
              <SplitText
                text="Christian Barbarossa"
                delay={40}
                duration={0.7}
                from={{ opacity: 0, y: 60, filter: "blur(12px)" }}
                to={{   opacity: 1, y: 0,  filter: "blur(0px)"  }}
              />
            </h1>

            {/* Qualifica */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-6"
            >
             Student & Developer
            </motion.h2>

            {/* Descrizione */}
            <BlurText
              text="Appassionato di Web developement , sviluppo software e tanto altro. Alla ricerca di sfide che mi facciano crescere."
              delay={60}
              duration={0.6}
              className="text-[#8b949e] text-base md:text-lg max-w-2xl mb-10 justify-center lg:justify-start"
            />

            {/* CTA */}
            <motion.div>

            </motion.div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Magnet strength={0.3}
                    className="px-8 py-3.5 rounded-xl bg-cyan-400 text-[#060810] font-bold text-sm hover:bg-cyan-300 transition-all duration-200 shadow-lg shadow-cyan-400/25 block">
                  <a href="#projects">
               
                  Vedi i Progetti
                </a>
              </Magnet>
              <Magnet strength={0.3}
                 className="px-8 py-3.5 rounded-xl border border-[#1a2332] text-white font-bold text-sm hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-200 block">
                 
                    <a href="#contact">
               
                  Contattami
                </a>
              </Magnet>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}