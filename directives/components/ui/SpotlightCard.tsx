"use client";
// ============================================
// components/ui/SpotlightCard.tsx
// ============================================
// React Bits — card con spotlight radiale che segue il cursore.

import { useRef, ReactNode, MouseEvent } from "react";
import ElectricBorder from "@/directives/components/ui/ElectricBorder";
interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);


  return (
    <ElectricBorder>
    <div
      ref={cardRef}
       >
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0 z-10 transition-all duration-150"
        aria-hidden="true"
      />
      <div className="relative z-20">{children}</div>
    </div>
    </ElectricBorder>
  );
}
