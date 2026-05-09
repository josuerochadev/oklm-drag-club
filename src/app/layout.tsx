import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "OKLM Drag Club — Podcast drag & téléréalité",
  description:
    "Réactions calmes et bienveillantes sur la drag et la téléréalité — sans hurler dans vos oreilles. Drag Race France, Dragula, Les Traîtres FR, et plus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={{ background: "#F8F4F0" }}>
        <Nav />
        <main className="flex-1">{children}</main>

        <footer
          className="text-center py-10 px-6"
          style={{ borderTop: "1.5px solid rgba(30,30,230,0.10)" }}
        >
          <p
            style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#1E1EE6",
              opacity: 0.4,
            }}
          >
            OKLM Drag Club · Par Romain
          </p>
        </footer>
      </body>
    </html>
  );
}
