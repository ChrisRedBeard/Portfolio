"use client";
// ============================================
// components/ui/TiltCard.tsx
// ============================================
// Componente React Bits — TiltCard (3D Tilt Effect)
// (reactbits.dev/components/tilt-card)
//
// La card ruota in 3D seguendo la posizione del cursore usando
// CSS perspective + rotateX/rotateY via framer-motion springs.
// Lo spring garantisce un movimento fluido e naturale.
//
// PROPS:
//   children      {ReactNode}  — contenuto della card
//   className     {string}     — classi Tailwind extra
//   maxTilt       {number}     — gradi massimi di rotazione (default 12)
//   glareOpacity  {number}     — opacità del riflesso 0-1 (default 0.15)
//   scale         {number}     — scala al hover (default 1.04)

import { useRef, ReactNode, MouseEvent } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  scale?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  glareOpacity = 0.15,
  scale = 1.04,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values per la rotazione
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring per ammorbidire il movimento
  const springConfig = { stiffness: 200, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  // Glare: segue il cursore come un riflesso luminoso
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Normalizza la posizione del mouse tra -0.5 e 0.5
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    // Ritorna alla posizione neutra con lo spring
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      }}
      className={`relative cursor-default ${className}`}
    >
      {children}

      {/* Layer glare: riflesso che segue il cursore */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255,255,255,${glareOpacity}), transparent 60%)`,
          "--glare-x": glareX,
          "--glare-y": glareY,
        } as React.CSSProperties}
        aria-hidden="true"
      />
    </motion.div>
  );
}
