"use client";
// ============================================
// components/ui/Magnet.tsx
// ============================================
// React Bits — attrae l'elemento verso il cursore con spring physics.

import { useRef, ReactNode, MouseEvent } from "react";
import { motion, useSpring } from "framer-motion";

interface MagnetProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnet({
  children,
  strength = 0.4,
  className = "",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width  / 2) * strength);
    y.set((e.clientY - rect.top  - rect.height / 2) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
