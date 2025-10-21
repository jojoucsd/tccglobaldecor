
      // <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 xl:gap-8 items-start">
      //   {/* LEFT — main content */}
      //   <div className="flex flex-col">
      //     <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
      //       From design to delivery — <span className="whitespace-nowrap">fast, precise, human.</span>
      //     </h2>

      //     <p className="mt-5 text-lg text-neutral-700">
      //       TCC crafts bespoke carpets for luxury hospitality, casinos, and residences — where design and
      //       performance meet. With in-house production, agile timelines, and people who care, we turn creative
      //       vision into carpets that define the space.
      //     </p>

      //     {/* 3 Pillars */}
      //     <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
      //       {[
      //         { title: "Speed", body: "Agile production built for tight hospitality timelines." },
      //         { title: "Craft", body: "Tufted & woven carpets crafted with precision and care." },
      //         { title: "Service", body: "Communication and partnership at every step." },
      //       ].map((f) => (
      //         <div key={f.title} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      //           <div className="font-semibold">{f.title}</div>
      //           <p className="mt-2 text-sm text-neutral-600">{f.body}</p>
      //         </div>
      //       ))}
      //     </div>

      //     {/* TRIANGLE + floating notes */}
      //     <div className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_minmax(320px,560px)_1fr] gap-6 md:gap-8 items-center">
      //       <ul className="hidden md:flex flex-col justify-between gap-6 text-sm text-neutral-700">
      //         <li>• 20+ years of global hospitality experience</li>
      //         <li>• Owned factories with 500+ skilled artisans</li>
      //       </ul>

      //       <figure className="relative">
      //         <TccTriangle
      //           top="Speed / Efficiency"
      //           left="Human Service / Partnership"
      //           right="Craftsmanship / Quality"
      //           center="TCC Promise"
      //           className="w-full h-[260px] md:h-[320px] lg:h-[360px]"
      //         />
      //         <figcaption className="mt-2 text-center text-xs text-neutral-500">
      //           Speed • Craft • Human Service → <span className="font-medium">Precision Delivered</span>
      //         </figcaption>
      //       </figure>

      //       <ul className="hidden md:flex flex-col justify-between gap-6 text-sm text-neutral-700">
      //         <li>• Projects spanning Macau, Las Vegas, and beyond</li>
      //         <li>• Sustain: responsible materials and long-life performance</li>
      //       </ul>
      //     </div>

      //     {/* Mobile notes */}
      //     <ul className="md:hidden mt-6 space-y-2 text-neutral-700 text-sm">
      //       <li>• 20+ years of global hospitality experience</li>
      //       <li>• Owned factories with 500+ skilled artisans</li>
      //       <li>• Projects spanning Macau, Las Vegas, and beyond</li>
      //       <li>• Sustain: responsible materials and long-life performance</li>
      //     </ul>

      //     {/* CTAs */}
      //     <div className="mt-6 flex gap-3">
      //       <Link
      //         className="inline-flex items-center rounded-full bg-black text-white px-5 py-2.5 text-sm font-semibold hover:bg-black/90"
      //         href="/projects"
      //       >
      //         View Projects
      //       </Link>
      //       <Link
      //         href="/#about-b"
      //         className="inline-flex items-center rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold hover:bg-neutral-50"
      //       >
      //         Our Process
      //       </Link>
      //     </div>
      //   </div>

      //   {/* RIGHT — compact, full-height collage with tight spacing */}
      //   <aside className="hidden lg:flex md:sticky md:top-24 justify-end">
      //     <div className="w-full h-[calc(100vh-6rem)] grid grid-cols-2 grid-rows-3 gap-[6px]">
      //       {[1, 2, 3, 4, 5, 6].map((n) => (
      //         <div key={n} className="relative overflow-hidden rounded-xl">
      //           <Image
      //             src={`${bp}/images/about/about${n}.avif`}
      //             alt={`About TCC image ${n}`}
      //             fill
      //             className="object-cover"
      //             sizes="(min-width:1280px) 40vw, (min-width:1024px) 40vw, 100vw"
      //           />
      //         </div>
      //       ))}
      //     </div>
      //   </aside>
      // </div>