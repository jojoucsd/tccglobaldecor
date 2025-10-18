import { cn } from "@/lib/cn";

type Props = React.PropsWithChildren<{
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  // aria-* passthrough if you need it
  ariaLabel?: string;
}>;

export default function Section({
  id,
  className,
  style,
  ariaLabel,
  children,
}: Props) {
  return (
    <section
      id={id}
      className={cn("py-16", className)}
      style={style}
      aria-label={ariaLabel}
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}


