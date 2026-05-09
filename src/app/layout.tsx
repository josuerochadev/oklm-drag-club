import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import BackgroundGlows from "@/components/BackgroundGlows";

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
      <body className="min-h-full flex flex-col relative">
        <BackgroundGlows />
        <Nav />
        <main className="relative z-10 flex-1">{children}</main>

        {/* Footer */}
        <footer
          className="relative z-10 text-center py-12 px-6"
          style={{ borderTop: "0.5px solid rgba(180,150,150,0.15)" }}
        >
          <p
            style={{
              fontFamily: '"Italiana", serif',
              fontStyle: "normal",
              fontSize: "8px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#8A7080",
            }}
          >
            OKLM Drag Club ✦ Par Romain
          </p>
        </footer>
      </body>
    </html>
  );
}
