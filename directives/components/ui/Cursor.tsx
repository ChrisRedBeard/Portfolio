"use client";
// ============================================
// components/Cursor.tsx
// ============================================
// Monta in app/layout.tsx:  <Cursor />
// Aggiungi in globals.css:  body { cursor: none; }
// Aggiungi data-cursor-hover su link/bottoni.
// ============================================

import { useEffect, useRef, useState } from "react";

type State = "default" | "hovering" | "clicking";

// ─── Freccia SVG ─────────────────────────────────────────────────────────────
function Arrow({ state }: { state: State }) {
  const fill  = state === "hovering" ? "#00e5ff" : "#ffffff";
  const scale = state === "clicking" ? 0.88 : 1;

  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `scale(${scale})`, transition: "transform .12s ease", overflow: "visible" }}
    >
      <defs>
        <filter id="arrow-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5"
            floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>
      <path
        d="M2.5 2 L2.5 18.5 L6.5 14.5 L9.5 21 L11.8 20 L8.8 13.5 L14.5 13.5 Z"
        fill={fill}
        stroke="#111111"
        strokeWidth="0.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#arrow-shadow)"
        style={{ transition: "fill .15s ease" }}
      />
    </svg>
  );
}

// ─── Cursore ─────────────────────────────────────────────────────────────────
export default function Cursor() {
  const mouse    = useRef({ x: -200, y: -200 });
  const spotPos  = useRef({ x: -200, y: -200 });
  const stateRef = useRef<State>("default");

  const [arrowXY,  setArrowXY]  = useState({ x: -200, y: -200 });
  const [spotXY,   setSpotXY]   = useState({ x: -200, y: -200 });
  const [curState, setCurState] = useState<State>("default");

  useEffect(() => {
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setArrowXY({ x: e.clientX, y: e.clientY });
    };
    const onDown = () => { stateRef.current = "clicking"; setCurState("clicking"); };
    const onUp   = () => {
      stateRef.current = stateRef.current === "clicking" ? "default" : stateRef.current;
      setCurState(s => s === "clicking" ? "default" : s);
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-cursor-hover]")) {
        if (stateRef.current !== "clicking") { stateRef.current = "hovering"; setCurState("hovering"); }
      }
    };
    const onOut  = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-cursor-hover]")) {
        if (stateRef.current !== "clicking") { stateRef.current = "default"; setCurState("default"); }
      }
    };

    const loop = () => {
      spotPos.current.x += (mouse.current.x - spotPos.current.x) * 0.09;
      spotPos.current.y += (mouse.current.y - spotPos.current.y) * 0.09;
      setSpotXY({ x: spotPos.current.x, y: spotPos.current.y });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout",  onOut);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
    };
  }, []);

  // dimensioni e colore spotlight in base allo stato
  const spotSize =
    curState === "hovering" ? 220 :
    curState === "clicking" ? 70  : 120;

  const spotColor =
    curState === "hovering"
      ? "radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(0,229,255,0.06) 40%, transparent 70%)"
      : "radial-gradient(circle, rgba(0,229,255,0.13) 0%, rgba(0,229,255,0.04) 40%, transparent 70%)";

  const dotColor =
    curState === "hovering" || curState === "clicking"
      ? "rgba(0,229,255,0.9)"
      : "rgba(0,229,255,0.65)";

  const base: React.CSSProperties = {
    position:      "fixed",
    pointerEvents: "none",
  };

  return (
    <>
      {/* alone radiale che segue con inerzia */}
      <div
        style={{
          ...base,
          zIndex:     9990,
          left:       spotXY.x,
          top:        spotXY.y,
          width:      spotSize,
          height:     spotSize,
          borderRadius: "50%",
          background: spotColor,
          transform:  "translate(-50%, -50%)",
          transition: "width .35s ease, height .35s ease, background .3s ease",
        }}
      />

      {/* puntino sotto la punta */}
      <div
        style={{
          ...base,
          zIndex:       9998,
          left:         arrowXY.x,
          top:          arrowXY.y,
          width:        5,
          height:       5,
          borderRadius: "50%",
          background:   dotColor,
          transform:    "translate(-50%, -50%)",
          transition:   "background .2s ease",
        }}
      />
    </>
  );
}