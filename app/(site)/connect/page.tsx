import Section from "@/components/Section";
import ConnectForm from "@/components/connect/ConnectForm";

export default function ConnectPage() {
  return (
    <main className="min-h-screen bg-white text-brand-ink">
      <Section className="pt-20 pb-10">
        <header className="max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-brand-gold">
            Connect
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight">
            Let’s build something exceptional
          </h1>
          <p className="mt-4 text-lg text-neutral-800 leading-relaxed">
            Tell us about your project — we’ll follow up with samples, timelines,
            and next steps.
          </p>
        </header>
      </Section>

      <Section className="pb-24">
        <ConnectForm />
      </Section>
    </main>
  );
}
