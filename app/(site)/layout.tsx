// app/(site)/layout.tsx
import HeaderWrapper from "@/components/HeaderWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <HeaderWrapper
>      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      </HeaderWrapper>
    </div>
  );
}


