import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind CSS classes and intelligently merges conflicts.
 * Example: cn("p-2", "p-4") → "p-4"
 */
export function cn(...inputs: (string | false | null | undefined)[]) {
  return twMerge(clsx(inputs));
}
