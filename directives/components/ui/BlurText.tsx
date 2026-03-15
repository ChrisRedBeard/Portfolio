"use client";
// ============================================
// components/ui/BlurText.tsx
// ============================================
// React Bits — rivela il testo parola per parola con effetto blur → nitido.

import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function BlurText({
  text = "",
  className = "",
  delay = 80,
  duration = 0.7,
}: BlurTextProps) {
  const words = text.split(" ");

  return (
    <p
      className={`flex flex-wrap gap-x-[0.3em] ${className}`}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
          animate={{ opacity: 1, filter: "blur(0px)",  y: 0 }}
          transition={{ duration, delay: i * (delay / 1000), ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
