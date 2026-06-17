// ============================================
// types/index.ts
// ============================================
// Tutti i tipi TypeScript del portfolio.
// Importa da qui in tutti i componenti.

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string | null;
  demo: string | null;
  featured: boolean;
}

export interface HardSkill {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  category: "Linguaggio" | "Framework" | "Database" | "Tool";
  icon: import("react-icons").IconType;
  color: string;
}

export interface SoftSkill {
  name: string;
  icon: import("lucide-react").LucideIcon;
}

export interface StatCard {
  value: string;
  label: string;
  sub: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  color: string;
  icon: React.ReactNode;
}
