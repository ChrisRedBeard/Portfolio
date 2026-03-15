"use client";
// ============================================
// components/ui/Marquee.tsx
// ============================================
// Componente React Bits — Infinite Scroll Marquee
// (reactbits.dev/components/infinite-scroll)
//
// Implementazione CSS-first: anima il contenuto con @keyframes "marquee"
// iniettato inline. Framer-motion gestisce il pause-on-hover con
// useAnimationControls per un'esperienza fluida e senza scatti.
//
// PROPS:
//   children    {ReactNode}  — contenuto da scorrere
//   speed       {number}     — secondi per un ciclo completo (default 30)
//   direction   {"left"|"right"} — direzione scorrimento (default "left")
//   pauseOnHover {boolean}   — ferma al hover (default true)
//   gap         {number}     — gap in px tra gli elementi (default 48)
//   className   {string}     — classi extra sul container

import { useRef, ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  gap?: number;
  className?: string;
}

export default function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  gap = 48,
  className = "",
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // L'animazione CSS scorre il track di esattamente il 50% (perché duplichiamo
  // il contenuto). Questo crea il loop infinito seamless.
  const keyframes = `
    @keyframes marquee-left  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
    @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
  `;

  const animationName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <>
      {/* Inietta i keyframes una volta nel documento */}
      <style>{keyframes}</style>

      {/* Container con mask gradient sui bordi (effetto fade) */}
      <div
        className={`relative overflow-hidden ${className}`}
        style={{
          // Fade sui lati per sembrare che il contenuto svanisca
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        {/* Track: contiene il contenuto duplicato per il loop seamless */}
        <div
          ref={trackRef}
          className="flex w-max"
          style={{
            gap: `${gap}px`,
            animation: `${animationName} ${speed}s linear infinite`,
            // Pause on hover via CSS
            ...(pauseOnHover ? {} : {}),
          }}
          // Pause/resume tramite CSS animation-play-state
          onMouseEnter={() => {
            if (pauseOnHover && trackRef.current) {
              trackRef.current.style.animationPlayState = "paused";
            }
          }}
          onMouseLeave={() => {
            if (pauseOnHover && trackRef.current) {
              trackRef.current.style.animationPlayState = "running";
            }
          }}
        >
          {/* Contenuto originale */}
          <div className="flex items-center" style={{ gap: `${gap}px` }}>
            {children}
          </div>
          {/* Copia identica per creare il loop seamless */}
          <div className="flex items-center" style={{ gap: `${gap}px` }} aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
