import Craftsmanship from "./Craftsmanship";
import Specialization from "./Specialization";
import Markets from "./Markets";

export default function CapabilitySection() {
  return (
    <section id="capability" aria-label="Capabilities, Specialization, Markets" className="text-brand-ink scroll-mt-24">
      <Craftsmanship />
      <Specialization />
      <Markets />
    </section>
  );
}
