/* ----------------------------- WorldMapStatic ----------------------------- */
"use client";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Pin = { name: string; left: number; top: number; label?: string };

// % positions you already validated
const PINS: Pin[] = [
  { name: "Hong Kong",   left: 81.2,  top: 36.7,  label: "Hong Kong" },
  { name: "Macau",       left: 81.54, top: 37.67, label: "Macau" },
  { name: "Dubai (UAE)", left: 65.35, top: 36.0,  label: "Dubai" },
  { name: "Japan",       left: 87.5,  top: 31.0,  label: "Japan" },
  { name: "Jeju Island", left: 84.3,  top: 34.8,  label: "Jeju" },
  { name: "Malta",       left: 54.03, top: 30.06, label: "Malta" },
  { name: "London",      left: 49.96, top: 21.38, label: "London" },
  { name: "Italy",       left: 52.8,  top: 28.6,  label: "Italy" },
  { name: "Las Vegas",   left: 21.9,  top: 34.5,  label: "Las Vegas" },
  { name: "New York",    left: 26.8,  top: 29.7,  label: "New York" },
  { name: "Miami",       left: 27.72, top: 35.69, label: "Miami" },
];

export default function WorldMapStatic({
  className = "",
  showLabels = true,        // toggle labels on/off
  labelOffsetX = 1.2,       // tweak if any pill overlaps
  labelOffsetY = -1.2,
}: {
  className?: string;
  showLabels?: boolean;
  labelOffsetX?: number;
  labelOffsetY?: number;
}) {
  return (
    <div
      className={[
        "relative w-full overflow-hidden rounded-xl ring-1 ring-neutral-200 bg-white",
        "aspect-[2/1]", // stable height
        className,
      ].join(" ")}
    >
      {/* Background world map (served from /public) */}
      <img
        src={`${bp}/images/map-light.svg`}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-contain pointer-events-none select-none opacity-70"
      />

      {/* Pins + labels (HTML so they always render consistently) */}
      <div className="absolute inset-0">
        {PINS.map((p) => (
          <div
            key={p.name}
            title={p.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
          >
            {/* soft glow */}
            <span
              className="block h-4 w-4 rounded-full"
              style={{ backgroundColor: "rgba(238,150,41,0.22)" }}
            />
            {/* gold dot with white ring */}
            <span
              className="block -mt-3 h-2.5 w-2.5 rounded-full ring-2 ring-white"
              style={{ backgroundColor: "#EE9629" }}
            />

            {/* label pill */}
            {showLabels && (
              <span
                className="absolute px-1.5 py-[2px] rounded-full text-[10px] leading-none bg-white text-brand-ink border border-neutral-200 shadow-sm whitespace-nowrap"
                style={{
                  left: `${labelOffsetX}%`,
                  top: `${labelOffsetY}%`,
                }}
              >
                {p.label ?? p.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
