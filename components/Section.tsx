// components/Section.tsx
export default function Section({
  children, className = "", id,
}: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 scroll-mt-[calc(var(--header-h)+var(--banner-h)+12px)] ${className}`}
    >
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

