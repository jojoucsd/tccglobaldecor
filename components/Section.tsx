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
  /** Wrap inner content in a centered container */
  container?: boolean;
  /** Container max width */
  maxWidth?: Max;
  /** Vertical padding scale */
  pad?: Pad;
  /** Let background bleed to edges (still centers inner content if container=true) */
  bleed?: boolean;
};

type SectionProps<T extends React.ElementType> = BaseProps &
  Omit<React.ComponentPropsWithoutRef<T>, "as" | "children"> & {
    as?: T;
    children?: React.ReactNode;
  };

const PAD_MAP: Record<Pad, string> = {
  none: "py-0",
  sm: "py-10",
  md: "py-16",
  lg: "py-24",
};

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
  bleed = false,
  children,
  ...rest
}: SectionProps<T>) {
  const Comp = (as || "section") as React.ElementType;

  const outer = cn(
    bleed ? "w-full" : "",
    PAD_MAP[pad],
    className
  );

  const inner = cn(
    container && "mx-auto w-full",
    container && MAX_MAP[maxWidth],
    container && "px-4 md:px-6 lg:px-8"
  );

  return (
    <Comp id={id} className={outer} style={style} aria-label={ariaLabel} {...rest}>
      {container ? <div className={inner}>{children}</div> : children}
    </Comp>
  );
}
