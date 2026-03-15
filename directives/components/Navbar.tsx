"use client";

// ============================================
// components/Navbar.tsx
// ============================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "@/types";

const NAV_LINKS: NavLink[] = [
  { label: "Chi Sono",       href: "#about"          },
  { label: "Skills",         href: "#skills"         },
  { label: "Progetti",       href: "#projects"       },
  { label: "Collaborazioni", href: "#collaborations" },
  { label: "Contatti",       href: "#contact"        },
];

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity:1 }}
      transition={{ duration: 0.8, ease: "circInOut", delay: 0.9 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4"
    >

      {/* Glass container */}
      <div
      className="
      flex items-center justify-between
      px-8 py-3
      rounded-full
      backdrop-blur-2xl
      bg-white/10
      border border-[#00FFFF]/40
    shadow-[0_0_30px_rgba(139,92,246,0.3)]
      "
    >

        {/* Logo */}
        <a href="#hero" className="font-bold text-xl text-white hover:text-yellow-400 transition-colors">
  <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">&lt;</span>
  ChrisDev
  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">/&gt;</span>
</a>


        {/* Desktop Links */}
        <nav className=" font-mono hidden md:flex items-center gap-8">

          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
              text-sm
              text-gray-300
              hover:text-cyan-300
              transition-colors
              relative
              group
              "
            >
              {link.label}

              {/* underline animation */}
              <span
                className="
                absolute
                left-0
                -bottom-1
                w-0
                h-px
                bg-white
                transition-all
                duration-300
                group-hover:w-full
                "
              />
            </a>
          ))}

          {/* CV Button */}
          

        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 hover:text-white transition-colors p-2"
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className={`h-px bg-current transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-px bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px bg-current transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>

      </div>


      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.30 }}
            className="
            md:hidden
            mt-3
            rounded-2xl
            backdrop-blur-xl
            bg-white/10
            border border-white/20
            overflow-hidden
            "
          >
            <div className="px-6 py-4 flex flex-col gap-4">

              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="
                  text-gray-300
                  hover:text-cyan-300
                  transition-colors
                  py-1
                  "
                >
                  {link.label}
                </a>
              ))}


            </div>
          </motion.nav>
        )}
      </AnimatePresence>

    </motion.header>
  );
}




