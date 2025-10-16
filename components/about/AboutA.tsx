import Section from "@/components/Section";

export default function AboutA() {
  return (
    <Section id="about" className="bg-gray-50">
      {/* 30 / 70 split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">About TCC</h2>
          <p className="mt-4 text-gray-600">
            Crafting bespoke carpets where artistry meets precision. Built for hospitality spaces
            where performance and design are equally critical.
          </p>
        </div>
        <div className="md:col-span-8">
          {/* placeholder media area; swap with <Image/> later */}
          <div className="aspect-[16/9] w-full rounded-2xl bg-gray-200" />
        </div>
      </div>
    </Section>
  );
}
