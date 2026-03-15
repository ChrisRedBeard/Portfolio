// ============================================
// data/collaborations.ts
// ============================================
// ✏️ MODIFICA QUESTO FILE per aggiornare le collaborazioni.
//
// CAMPI OBBLIGATORI:
//   id          → numero univoco crescente
//   name        → nome dell'ente / team / organizzazione
//   role        → il tuo ruolo specifico
//   description → 1-2 righe che descrivono cosa fai
//   emoji       → emoji che rappresenta il tipo di collaborazione
//                 (sostituibile con un <img> al logo reale — vedi nota sotto)
//   type        → categoria: "Research" | "OpenSource" | "Team" | "Association"
//   url         → link al sito/repo (null se non disponibile)
//   active      → true = collaborazione in corso, false = conclusa
//
// PER USARE UN LOGO REALE al posto dell'emoji:
//   1. Metti il file immagine in /public/logos/nome-logo.svg
//   2. Sostituisci il campo "emoji" con "logo: '/logos/nome-logo.svg'"
//   3. Nel componente Collaborations.jsx, usa <img src={c.logo} /> invece di <span>{c.emoji}</span>

export type CollaborationType = "Research" | "OpenSource" | "Team" | "Association";

export interface Collaboration {
  id: number;
  name: string;
  role: string;
  description: string;
  emoji: string;
  type: CollaborationType;
  url: string | null;
  active: boolean;
}

export const collaborations: Collaboration[] = [
  {
    id: 1,
    name: "ALETHEIA Wellbeing Research Group",
    role: "Developer",
    description:
      "Supporto al gruppo di ricerca universitario ALETHEIA, focalizzato su wellbeing e tecnologie digitali. Sviluppo di prototipi software per esperimenti e analisi dati.",
    emoji: "🔬",
    type: "Team",
    url: "https://aletheialab.it/#hero",
    active: true,
  },

  /*{
    id: 6,
    name: "HackTheCode",
    role: "Team Lead",
    description:
      "Team di 4 persone con cui partecipo agli hackathon nazionali. Finalisti al DevHack 2024 con un progetto di civic tech.",
    emoji: "💡",
    type: "Team",
    url: "https://github.com/hackthecode-team",
    active: true,
  }*/
];
