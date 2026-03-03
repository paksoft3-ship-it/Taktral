/**
 * Merge class names (simple implementation without clsx/twMerge).
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
    .join(" ");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function formatNumber(
  value: number,
  locale: string = "de-DE",
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit).trimEnd() + "…";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/--+/g, "-");
}

export function isRTL(locale: string): boolean {
  return locale === "ar";
}

export function getDir(locale: string): "ltr" | "rtl" {
  return isRTL(locale) ? "rtl" : "ltr";
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
