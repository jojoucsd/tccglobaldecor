// app/(site)/page.tsx
import HeroCarousel from "@/components/HeroCarousel";
import AboutA from "@/components/about/AboutA";
import AboutB from "@/components/about/AboutB";
import AboutC from "@/components/about/AboutC";
import ProjectsSectors from "@/components/sectors/SectorsSection";
import CapabilitySection from "@/components/capability/CapabilitySection";
import LibraryTeaser from "@/components/library/LibraryTeaser";
import ClientsBelt from "@/components/clients/ClientsBelt";
import CollabTeaser from "@/components/collab/CollabTeaser";
import Link from "next/link";


const CLIENTS_1 = [
  { src: "/img/clients/hyatt.svg", alt: "Hyatt" },
  { src: "/img/clients/mgm.svg", alt: "MGM" },
  { src: "/img/clients/wynn.svg", alt: "Wynn" },
  { src: "/img/clients/galaxy.svg", alt: "Galaxy Macau" },
  { src: "/img/clients/marina-bay-sands.svg", alt: "Marina Bay Sands" },
  { src: "/img/clients/venetian.svg", alt: "Venetian" },
];

const CLIENTS_2 = [
  { src: "/img/clients/rosewood.svg", alt: "Rosewood" },
  { src: "/img/clients/langham.svg", alt: "Langham" },
  { src: "/img/clients/parkhyatt.svg", alt: "Park Hyatt" },
  { src: "/img/clients/okura.svg", alt: "Hotel Okura" },
  { src: "/img/clients/four-seasons.svg", alt: "Four Seasons" },
  { src: "/img/clients/ritz-carlton.svg", alt: "Ritz-Carlton" },
];

const CLIENTS_3 = [
  { src: "/img/clients/mandarin.svg", alt: "Mandarin Oriental" },
  { src: "/img/clients/sheraton.svg", alt: "Sheraton" },
  { src: "/img/clients/intercontinental.svg", alt: "InterContinental" },
  { src: "/img/clients/hilton.svg", alt: "Hilton" },
  { src: "/img/clients/conrad.svg", alt: "Conrad" },
  { src: "/img/clients/waldorf.svg", alt: "Waldorf Astoria" },
];

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <AboutA />
      <AboutB />
      <ClientsBelt logos={CLIENTS_1} />
      <AboutC />

      <ProjectsSectors />
      <ClientsBelt logos={CLIENTS_2} className="bg-gray-50" />

      <CapabilitySection />

      {/* Client belt #3 — after library teaser */}
      <ClientsBelt
        logos={CLIENTS_3}
        title="Our Global Partners"
        className="bg-white"
      />
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
