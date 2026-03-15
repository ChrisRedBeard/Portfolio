"use client";
// ============================================
// components/ui/Aurora.tsx
// ============================================
// React Bits — sfondo aurora boreale animato su <canvas>.
// Usa CSS blend mode "screen" su sfondo scuro per l'effetto luminoso.

import { useEffect, useRef } from "react";

interface AuroraProps {
  colorStops?: string[];
  speed?: number;
  className?: string;
}

export default function Aurora({
  colorStops = ["#00e5ff", "#7c3aed", "#00ff88"],
  speed = 0.6,
  className = "",
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const blobs = colorStops.map((color, i) => ({
      color,
      x: (i + 0.5) / colorStops.length,
      y: 0.3 + Math.random() * 0.4,
      radius: 0.25 + Math.random() * 0.2,
      vx: (Math.random() - 0.5) * 0.0003 * speed,
      vy: (Math.random() - 0.5) * 0.0002 * speed,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (ts: number) => {
      const w = canvas.width;
      const h = canvas.height;
      const t = ts * 0.001 * speed;

      ctx.clearRect(0, 0, w, h);

      blobs.forEach((blob) => {
        blob.x += blob.vx + Math.sin(t + blob.phase) * 0.0002 * speed;
        blob.y += blob.vy + Math.cos(t * 0.7 + blob.phase) * 0.00015 * speed;
        if (blob.x < 0 || blob.x > 1) blob.vx *= -1;
        if (blob.y < 0.1 || blob.y > 0.9) blob.vy *= -1;

        const grd = ctx.createRadialGradient(
          blob.x * w, blob.y * h, 0,
          blob.x * w, blob.y * h, blob.radius * w
        );
        grd.addColorStop(0, blob.color + "55");
        grd.addColorStop(0.5, blob.color + "22");
        grd.addColorStop(1, "transparent");

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, [colorStops, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ mixBlendMode: "screen" }}
    />
  );
}
