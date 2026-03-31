import Link from "next/link";
import type { ComponentProps } from "react";

const styles = {
  primary:
    "inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700",
  secondary:
    "inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-50",
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

