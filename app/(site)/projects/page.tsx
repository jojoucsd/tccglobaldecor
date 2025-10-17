import Link from "next/link";
import Image from "next/image";
import { getAllProjects } from "../lib/getProjects";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function ProjectsIndex() {
  const projects = getAllProjects(); // scanned at build
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-4xl font-bold text-amber-600">Projects</h1>
      <p className="mt-3 text-lg text-gray-700">Selected hospitality case studies.</p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group rounded-2xl border bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={`${bp}/images/projects/${p.slug}/${p.cover}`}
                alt={p.title}
                fill
                sizes="(min-width:1024px)33vw,(min-width:640px)50vw,100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold group-hover:text-amber-700">{p.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
