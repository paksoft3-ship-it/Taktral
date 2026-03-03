import type { Metadata } from "next";
import "../globals.css";
import AdminSidebar from "@/components/layout/AdminSidebar";

export const metadata: Metadata = {
  title: "Taktral Admin",
  description: "Taktral internal administration panel",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AdminSidebar>{children}</AdminSidebar>
      </body>
    </html>
  );
}
