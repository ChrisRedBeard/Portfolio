// ============================================
// app/page.tsx
// ============================================
// Pagina principale (sostituisce App.jsx di Vite).
// NON serve "use client" qui — è solo composizione di componenti.
// I singoli componenti hanno già "use client" dove necessario.

import Navbar   from "@/directives/components/Navbar";
import Hero     from "@/directives/components/Hero";
import About    from "@/directives/components/About";
import Skills   from "@/directives/components/Skills";
import Projects from "@/directives/components/Projects";
import Contact  from "@/directives/components/Contact";
import Collaborations from "@/directives/components/Collaborations";
import Footer from "@/directives/components/Footer";
import Cursor from "@/directives/components/ui/Cursor";
export default function Home() {
  return (

    <main>
      <Cursor/>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Collaborations/>
      <Contact />
      <Footer/>
    </main>
  );
}