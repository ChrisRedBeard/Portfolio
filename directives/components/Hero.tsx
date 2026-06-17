"use client";
// ============================================
// components/Hero.tsx
// ============================================

import { motion } from "framer-motion";
import Image      from "next/image";
import SplitText  from "@/directives/components/ui/SplitText";
import BlurText   from "@/directives/components/ui/BlurText";
import Magnet     from "@/directives/components/ui/Magnet";
import LetterGlitch from "@/directives/components/ui/LetterGlitch";


export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-svh flex items-center justify-center overflow-hidden"
    >
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

      <div className="mx-auto px-6 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Testo ── */}
          <div className="order-2 lg:order-1 text-center lg:text-left">

            {/* Badge disponibilità */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 text-secondary font-mono text-xs mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Disponibile per stage e progetti
            </motion.div>

            {/* Saluto */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-mono text-primary text-sm md:text-base mb-3 tracking-widest"
            >
              Ciao, sono
            </motion.p>

            {/* Nome */}
            <h1 className="font-display font-bold text-[6vw] sm:text-3xl md:text-4xl lg:text-[2.5rem] text-white mb-4 leading-none tracking-tight whitespace-nowrap">
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
              className="font-display text-xl md:text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6"
            >
              Student &amp; Developer
            </motion.h2>

            {/* Descrizione */}
            <BlurText
              text="Appassionato di web development, sviluppo software e tanto altro. Alla ricerca di sfide che mi facciano crescere."
              delay={60}
              duration={0.6}
              className="text-muted text-base md:text-lg max-w-2xl mb-10 justify-center lg:justify-start"
            />

            {/* CTA */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Magnet strength={0.3}
                    className="px-8 py-3.5 rounded-xl bg-primary text-canvas font-bold text-sm hover:bg-cyan-300 transition-all duration-200 shadow-lg shadow-primary/25 block">
                <a href="#projects">Vedi i Progetti</a>
              </Magnet>
              <Magnet strength={0.3}
                 className="px-8 py-3.5 rounded-xl border border-line text-white font-bold text-sm hover:border-primary/50 hover:text-primary transition-all duration-200 block">
                <a href="#contact">Contattami</a>
              </Magnet>
            </div>
          </div>

          {/* ── Ritratto ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* glow dietro al ritratto */}
              <div
                className="absolute -inset-6 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/15 blur-3xl rounded-full -z-10"
                aria-hidden="true"
              />
              <div className="relative w-52 sm:w-64 lg:w-80 aspect-[4/5] rounded-2xl overflow-hidden border border-line shadow-2xl shadow-black/40">
                <Image
                  src="/avatar.png"
                  alt="Avatar di Christian Barbarossa"
                  fill
                  priority
                  sizes="(max-width: 1024px) 16rem, 20rem"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
