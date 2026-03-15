"use client";
// ============================================
// components/ui/SplitText.tsx
// ============================================
// React Bits — anima ogni carattere del testo in entrata.

import { motion, Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  from?: Record<string, unknown>;
  to?: Record<string, unknown>;
  onAnimationComplete?: () => void;
}

export default function SplitText({
  text = "",
  className = "",
  delay = 50,
  duration = 0.6,
  from = { opacity: 0, y: 40, filter: "blur(8px)" },
  to   = { opacity: 1, y: 0,  filter: "blur(0px)" },
  onAnimationComplete,
}: SplitTextProps) {
  const words = text.split(" ");

  const tokens = words
    .flatMap((word, wi) => [
      ...word.split("").map((char, ci) => ({
        text: char,
        key: `${wi}-${ci}`,
        isSpace: false,
      })),
      wi < words.length - 1
        ? { text: "\u00A0", key: `space-${wi}`, isSpace: true }
        : null,
    ])
    .filter(Boolean) as { text: string; key: string; isSpace: boolean }[];

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {tokens.map((token, i) => {
        if (token.isSpace) return <span key={token.key}>&nbsp;</span>;
        return (
          <motion.span
            key={token.key}
            className="inline-block"
            initial={from as Variants}
            animate={to as Variants}
            transition={{
              duration,
              delay: i * (delay / 1000),
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={
              i === tokens.length - 1 ? onAnimationComplete : undefined
            }
          >
            {token.text}
          </motion.span>
        );
      })}
    </span>
  );
}
