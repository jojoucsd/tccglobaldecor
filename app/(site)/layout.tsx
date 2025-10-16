// app/(site)/layout.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}


