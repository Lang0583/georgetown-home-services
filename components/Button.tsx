import Link from "next/link";
import type { ComponentProps } from "react";

const accentBtn =
  [
    "btn-accent inline-flex items-center justify-center rounded-lg",
    "bg-accent px-6 py-3 font-semibold text-white",
    "shadow-sm transition-colors",
    "hover:bg-accent-hover",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" ");

const styles = {
  primary: accentBtn,
  secondary: accentBtn,
} as const;

type Variant = keyof typeof styles;

export function ButtonLink({
  className,
  variant = "primary",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={[styles[variant], className].filter(Boolean).join(" ")} />;
}

export function Button({
  className,
  variant = "primary",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button {...props} className={[styles[variant], className].filter(Boolean).join(" ")} />;
}
