import Link from "next/link";

export default function ConnectCTA() {
  return (
    <section
      id="connect"
      aria-labelledby="connect-cta"
      className="
        bg-gradient-to-b from-white to-neutral-50
        text-center text-brand-ink
        py-12 sm:py-16 md:py-20
        px-4
      "
    >
      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <div className="flex justify-center mb-3">
        </div>
        <h2
          id="connect-cta"
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight"
        >
          Let’s Connect
        </h2>

        <p className="mt-3 text-[14px] sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Ready to bring your vision to life? Share your brief and we’ll follow up with
          samples, timelines, and next steps.
        </p>
      </header>

      {/* CTA Button */}
      <div className="mt-5 sm:mt-6 flex justify-center">
        <Link
          href="/connect"
          className="
            inline-flex items-center justify-center
            rounded-full
            bg-brand-gold hover:bg-brand-gold-deep
            px-5 sm:px-6 py-2.5
            text-sm sm:text-base font-semibold text-brand-ink
            shadow-sm transition-colors
            focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2
          "
        >
          Start a conversation
        </Link>
      </div>
    </section>
  );
}
