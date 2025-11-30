// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TCCarpets",
  description: "Crafting bespoke carpets for world-class interiors",
};

// Toggle mourning mode here
const mourning =
  process.env.NEXT_PUBLIC_MOURNING_MODE === "1" || true;
//            ↑ remove `|| true` later if you want env-only control

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={mourning ? "mourning" : ""}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
