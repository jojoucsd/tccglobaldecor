// app/(site)/components/Section.tsx
import { cn } from "@/lib/cn";
import * as React from "react";

type Pad = "none" | "sm" | "md" | "lg";
type Max = "lg" | "xl" | "2xl" | "full";

type BaseProps = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;

  /** Wrap inner content in a centered container (adds maxWidth + gutters) */
  container?: boolean;
  /** Container max width */
  maxWidth?: Max;
  /** Vertical padding scale */
  pad?: Pad;
  /** Enable top padding (default true) */
  padTop?: boolean;
  /** Enable bottom padding (default true) */
  padBottom?: boolean;
  /** Add iOS safe-area top padding */
  safeTop?: boolean;
  /** Let background bleed to edges (still centers inner content if container=true) */
  bleed?: boolean;
  /** Toggle inner horizontal gutters when container=true (default true) */
  gutters?: boolean;
};

type SectionProps<T extends React.ElementType> = BaseProps &
  Omit<React.ComponentPropsWithoutRef<T>, "as" | "children"> & {
    as?: T;
    children?: React.ReactNode;
  };

/** Responsive padding map (compact on mobile, roomier on desktop) */
function padY(pad: Pad, top = true, bottom = true) {
  if (pad === "none" || (!top && !bottom)) return "py-0";

  // base (mobile) → sm → md breakpoints
  const base = {
    sm: top && bottom ? "py-8 sm:py-10"         : top ? "pt-8 sm:pt-10" : "pb-8 sm:pb-10",
    md: top && bottom ? "py-10 sm:py-16 md:py-20" : top ? "pt-10 sm:pt-16 md:pt-20" : "pb-10 sm:pb-16 md:pb-20",
    lg: top && bottom ? "py-12 sm:py-20 md:py-28" : top ? "pt-12 sm:pt-20 md:pt-28" : "pb-12 sm:pb-20 md:pb-28",
  } as const;

  return pad === "sm" ? base.sm : pad === "md" ? base.md : base.lg;
}

const MAX_MAP: Record<Max, string> = {
  lg: "max-w-[1200px]",
  xl: "max-w-[1400px]",
  "2xl": "max-w-[1600px]",
  full: "max-w-none",
};

export default function Section<T extends React.ElementType = "section">({
  as,
  id,
  className,
  style,
  ariaLabel,
  container = true,
  maxWidth = "2xl",
  pad = "md",
  padTop = true,
  padBottom = true,
  safeTop = false,
  bleed = false,
  gutters = true,
  children,
  ...rest
}: SectionProps<T>) {
  const Comp = (as || "section") as React.ElementType;

  const outer = cn(
    bleed && "w-full",
    safeTop && "pt-[env(safe-area-inset-top)]",
    padY(pad, padTop, padBottom),
    className
  );

  const inner = cn(
    container && "mx-auto w-full",
    container && MAX_MAP[maxWidth],
    container && gutters && "px-4 md:px-6 lg:px-8"
  );

  return (
    <Comp id={id} className={outer} style={style} aria-label={ariaLabel} {...rest}>
      {container ? <div className={inner}>{children}</div> : children}
    </Comp>
  );
}
