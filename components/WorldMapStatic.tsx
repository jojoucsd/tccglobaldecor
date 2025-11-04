/* ----------------------------- WorldMapStatic ----------------------------- */
"use client";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Pin = {
  name: string;
  left: number;   // % from left
  top: number;    // % from top
  label?: string; // fallback text
  code?: string;  // optional IATA code (e.g., LAS, HKG)
  dx?: number;    // label offset X in %
  dy?: number;    // label offset Y in %
};

// % positions you already validated + IATA codes + optional per-pin offsets
const PINS: Pin[] = [
  { name: "Macau",       left: 81.54, top: 37.67, code: "MFM", dy: 1.2 },
  { name: "Dubai (UAE)", left: 65.35, top: 36.0,  code: "DXB" },
  { name: "Japan",       left: 87.5,  top: 31.0,  code: "HND" },
  { name: "Jeju Island", left: 84.3,  top: 34.8,  code: "CJU" },
  { name: "Malta",       left: 54.03, top: 30.06, code: "MLA" },
  { name: "London",      left: 49.96, top: 21.38, code: "LHR" },
  { name: "Las Vegas",   left: 21.9,  top: 34.5,  code: "LAS" },
  { name: "New York",    left: 26.8,  top: 29.7,  code: "NYC" },
  { name: "Miami",       left: 27.72, top: 35.69, code: "MIA" },
  { name: "Singapore",   left: 79.0,  top: 57.0,  code: "SIN" },
  { name: "Philippines", left: 83.3,  top: 55.5,  code: "MNL" },

  // --- Newly added locations ---
  { name: "Russia (Moscow)", left: 70.2, top: 19.5, code: "SVO" },
  { name: "Germany (Frankfurt)", left: 54.8, top: 22.8, code: "FRA" },
  { name: "India (Delhi)", left: 72.2, top: 41.2, code: "DEL" },
  { name: "Thailand (Bangkok)", left: 78.1, top: 49.8, code: "BKK" },
  { name: "Almaty (Kazakhstan)", left: 73.8, top: 32.8, code: "ALA" },
  { name: "Australia (Sydney)", left: 86.6, top: 75.5, code: "SYD" },
  { name: "Perth (Australia)", left: 80.4, top: 73.9, code: "PER" },
];

export default function WorldMapStatic({
  className = "",
  showLabels = true,         // toggle labels on/off
  labelOffsetX = 1.2,        // default pill offset (X)
  labelOffsetY = -1.2,       // default pill offset (Y)
  labelUseCodes = true,      // show IATA codes if available
}: {
  className?: string;
  showLabels?: boolean;
  labelOffsetX?: number;
  labelOffsetY?: number;
  labelUseCodes?: boolean;
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
        {PINS.map((p) => {
          const ox = p.dx ?? labelOffsetX;
          const oy = p.dy ?? labelOffsetY;
          const text = labelUseCodes && p.code ? p.code : (p.label ?? p.name);
          return (
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
                aria-hidden
              />
              {/* gold dot with white ring */}
              <span
                className="block -mt-3 h-2.5 w-2.5 rounded-full ring-2 ring-white"
                style={{ backgroundColor: "#EE9629" }}
                aria-label={p.name}
              />

              {/* label pill */}
              {showLabels && (
                <span
                  className="absolute px-1.5 py-[2px] rounded-full text-[10px] leading-none bg-white text-brand-ink border border-neutral-200 shadow-sm whitespace-nowrap"
                  style={{ left: `${ox}%`, top: `${oy}%` }}
                >
                  {text}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
