// app/(site)/page.tsx
import HeroCarousel from "@/components/HeroCarousel";
import About from "@/components/about/About";
// import ProjectsSectors from "@/components/sectors/SectorsSection";
import CapabilitySection from "@/components/capability/CapabilitySection";
import LibraryTeaser from "@/components/library/LibraryTeaser";
import ClientsBelt from "@/components/clients/ClientsBelt";
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
      <LibraryTeaser />
      <CollabTeaser />

<section
  id="connect"
  aria-labelledby="connect-cta"
  className="py-20 text-center bg-gradient-to-b from-white to-gray-50"
>
  <h2 id="connect-cta" className="text-3xl font-semibold mb-3">
    Let’s Connect
  </h2>
  <p className="text-gray-600 max-w-2xl mx-auto">
    Ready to bring your vision to life? Share your brief and we’ll follow up with
    samples, timelines, and next steps.
  </p>

  <div className="mt-6 flex justify-center">
    <Link
      href="/connect"
      className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 transition"
    >
      Start a conversation
    </Link>
  </div>
</section>
    </>
  ); // 👈 this closing parenthesis and semicolon were missing
}
