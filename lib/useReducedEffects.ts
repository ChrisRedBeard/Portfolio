"use client";
import { useEffect, useState } from "react";

/**
 * Ritorna `true` quando gli effetti pesanti (canvas animati, cursore custom)
 * andrebbero disattivati o resi statici:
 *   • dispositivi touch        → (pointer: coarse)
 *   • utenti con motion ridotto → (prefers-reduced-motion: reduce)
 *
 * Default `false` in SSR/primo render per non rompere l'idratazione;
 * viene aggiornato al mount lato client.
 */
export function useReducedEffects(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setReduced(coarse.matches || motion.matches);
    update();

    coarse.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      coarse.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  return reduced;
}
