import type { ReactNode } from "react";

export default function TwoColumnPage({
  main,
  aside,
  gapClassName = "gap-10 lg:gap-12",
  alignStart = true,
}: {
  main: ReactNode;
  aside?: ReactNode;
  gapClassName?: string;
  alignStart?: boolean;
}) {
  return (
    <div className={["grid grid-cols-1 md:grid-cols-3", alignStart ? "md:items-start" : "", gapClassName].filter(Boolean).join(" ")}>
      <div className="min-w-0 md:col-span-2">{main}</div>
      {aside ? <aside className="min-w-0 md:col-span-1">{aside}</aside> : null}
    </div>
  );
}

