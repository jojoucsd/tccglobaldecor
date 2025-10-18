// components/TccTriangle.tsx
import React from "react";
type Props = {
  top?: string;
  left?: string;
  right?: string;
  center?: string;
  className?: string;
};

export default function TccTriangle({
  top = "Speed / Efficiency",
  left = "Human Service / Partnership",
  right = "Craftsmanship / Quality",
  center = "TCC Promise",
  className = "",
}: Props) {
  return (
    <svg
      viewBox="0 0 600 520"
      preserveAspectRatio="xMidYMid meet"   // keeps proportions while filling height
      role="img"
      className={className}
      aria-label="Triangle showing Speed, Craft, and Human Service converging into the TCC Promise"
    >
      {/* triangle */}
      <polygon points="300,40 60,480 540,480" fill="none" stroke="currentColor" strokeWidth="2.5" />
      {/* inner connectors */}
      <line x1="300" y1="40" x2="300" y2="320" stroke="currentColor" strokeWidth="1.5" />
      <line x1="60" y1="480" x2="300" y2="320" stroke="currentColor" strokeWidth="1.5" />
      <line x1="540" y1="480" x2="300" y2="320" stroke="currentColor" strokeWidth="1.5" />

      {/* center badge */}
      <circle cx="300" cy="340" r="70" fill="white" stroke="currentColor" strokeWidth="2" />
      <text x="300" y="340" textAnchor="middle" dominantBaseline="middle" fontSize="16" fontWeight={600}>
        {center}
      </text>
      <text x="300" y="360" textAnchor="middle" dominantBaseline="hanging" fontSize="11" fill="currentColor">
        Design → Delivery
      </text>

      {/* corner labels (larger, multiline-friendly) */}
      <text x="300" y="22" textAnchor="middle" fontSize="18" fontWeight={600}>{top}</text>
      <text x="40" y="500" textAnchor="start" fontSize="16" fontWeight={600}>{left}</text>
      <text x="560" y="500" textAnchor="end" fontSize="16" fontWeight={600}>{right}</text>

      {/* motion hints to imply speed */}
      <path d="M120 450 C 220 430, 380 430, 480 450" fill="none" stroke="currentColor" strokeDasharray="4 6" />
      <path d="M285 70 L 300 40 L 315 70" fill="none" stroke="currentColor" />
    </svg>
  );
}
