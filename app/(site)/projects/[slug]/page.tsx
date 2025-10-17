import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "../../lib/getProjects";

export const dynamic = "force-static"; // ensure static in case of env drift

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

export async function generateStaticParams() {
  // Build-time scan → static export for each folder
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  // Static-safe: default to left-first alternating
  const startRight = false;

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <Link href="/projects" className="text-amber-600 hover:underline">← Back to Projects</Link>
      <h1 className="mt-4 text-4xl font-bold text-amber-600">{project.title}</h1>

      <div className="mt-10 space-y-14">
        {project.images.map((file, i) => {
          const flip = startRight ? i % 2 === 0 : i % 2 === 1; // defaults to text-left first
          const variant: "lg" | "sm" = i % 2 === 0 ? "lg" : "sm";
          const src = `${bp}/images/projects/${project.slug}/${file}`;
          return <Section key={file} flip={flip} variant={variant} src={src} alt={project.title} />;
        })}
      </div>
    </div>
  );
}

function Section({
  flip,
  variant,
  src,
  alt,
}: {
  flip: boolean;
  variant: "lg" | "sm";
  src: string;
  alt: string;
}) {
  const imageWrapper =
    variant === "lg"
      ? "relative w-full overflow-hidden rounded-2xl shadow aspect-[16/10]"
      : "relative w-full overflow-hidden rounded-2xl shadow aspect-[4/3]";
  const H = variant === "lg" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl";
  const P = variant === "lg" ? "mt-3 md:text-lg" : "mt-2";

  return (
    <section className="grid items-center gap-8 md:grid-cols-2">
      {/* Text column */}
      <div className={flip ? "order-2 md:order-2" : "order-1 md:order-1"}>
        {/* mobile image first */}
        <div className={imageWrapper + " md:hidden"}>
          <Image src={src} alt={alt} fill sizes="(min-width:768px)50vw,100vw" className="object-cover" priority />
        </div>
        <div className="mt-4 md:mt-0">
          <h2 className={`${H} font-semibold`}>Project Highlight</h2>
          <p className={`${P} text-base text-gray-700`}>
            Tailored Axminster / hand-tufted solutions for high-traffic hospitality spaces.
          </p>
        </div>
      </div>

      {/* Image column */}
      <div className={flip ? "order-1 md:order-1" : "order-2 md:order-2"}>
        <div className={imageWrapper + " hidden md:block"}>
          <Image src={src} alt={alt} fill sizes="(min-width:768px)50vw,100vw" className="object-cover" priority />
        </div>
      </div>
    </section>
  );
}
