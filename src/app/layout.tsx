import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taktral – Digitale Systemarchitektur für Ihr Unternehmen",
  description:
    "Taktral baut präzise digitale Systeme für Unternehmen weltweit. Web-Infrastruktur, E-Commerce, Automatisierung, Performance Marketing.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
