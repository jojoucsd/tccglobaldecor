import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TCC Carpets",
  description: "Crafting bespoke carpets for world-class interiors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
