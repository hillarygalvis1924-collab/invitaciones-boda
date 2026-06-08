import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Great_Vibes, Euphoria_Script, Parisienne } from "next/font/google";
import "./globals.css";
import AudioProvider from "@/components/AudioProvider";
import MusicButton from "@/components/MusicButton";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const euphoriaScript = Euphoria_Script({
  variable: "--font-ampersand",
  subsets: ["latin"],
  weight: "400",
});

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
  title: "Hillary & Juan Pablo · 2027",
  description:
    "Nos casamos el 29, 30 y 31 de mayo de 2027 en Tolú, Sucre. Te invitamos a celebrar con nosotros.",
  openGraph: {
    title: "Hillary & Juan Pablo · 2027",
    description:
      "Nos casamos el 29, 30 y 31 de mayo de 2027 en Tolú, Sucre.",
    type: "website",
    locale: "es_CO",
    images: [
      {
        url: "/fotos/og-portada.jpg",
        width: 1200,
        height: 630,
        alt: "Hillary & Juan Pablo — Boda 2027",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${jost.variable} ${greatVibes.variable} ${euphoriaScript.variable} ${parisienne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-hueso text-carbon">
        <AudioProvider>
          {children}
          <MusicButton />
        </AudioProvider>
      </body>
    </html>
  );
}
