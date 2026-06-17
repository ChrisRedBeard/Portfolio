import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display (titoli) — carattere distintivo
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

// Body (testo corrente) — sans leggibile
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

// Mono (accenti tecnici: label, numeri, tag)
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChrisDev",
  description: "ChrisDev portfolio",
};

// Garantisce che su mobile la pagina usi la larghezza reale del dispositivo
// (width=device-width) ed eviti il rendering "zoomato"/non a pieno schermo.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
