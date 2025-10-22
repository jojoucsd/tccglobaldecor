// app/(site)/page.tsx
import HeroCarousel from "@/components/HeroCarousel";
import About from "@/components/about/About";
// import ProjectsSectors from "@/components/sectors/SectorsSection";
import CapabilitySection from "@/components/capability/CapabilitySection";
import AwardsTeaser from "@/components/awards/AwardsTeaser";
import ClientsBelt from "@/components/clients/ClientsBelt";
import ConnectCTA from "@/components/connect/ConnectSection";
import CollabTeaser from "@/components/collab/CollabTeaser";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <About />
      <ClientsBelt seed={1} />
      {/* <ProjectsSectors /> */}
      {/* <ClientsBelt seed={2} className="bg-gray-50" /> */}

      <CapabilitySection />

      {/* Client belt #3 — after library teaser */}
      <ClientsBelt seed={3} title="Our Global Partners" />
      <AwardsTeaser />
      <CollabTeaser />
      <ConnectCTA />
    </>
  ); // 👈 this closing parenthesis and semicolon were missing
}
