import Link from "next/link";
import type { ComponentProps } from "react";

export const buttonStyles = {
  primary:
    [
      "inline-flex items-center justify-center rounded-lg",
      "bg-primary px-6 py-3 font-semibold text-white",
      "shadow-sm transition-colors",
      "hover:bg-primary-hover",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-60",
    ].join(" "),
  secondary:
    [
      "inline-flex items-center justify-center rounded-lg",
      "border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900",
      "shadow-sm transition-colors",
      "hover:border-gray-400 hover:bg-gray-50",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-60",
    ].join(" "),
} as const;

type Variant = keyof typeof buttonStyles;

export function ButtonLink({
  className,
  variant = "primary",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={[buttonStyles[variant], className].filter(Boolean).join(" ")} />;
}

export function Button({
  className,
  variant = "primary",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button {...props} className={[buttonStyles[variant], className].filter(Boolean).join(" ")} />;
}

