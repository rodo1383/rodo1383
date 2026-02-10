import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JuriSN Pro - Gestion de Cabinet d'Avocats",
  description: "Prototype complet de gestion de cabinet d'avocats au Sénégal avec Supabase"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
