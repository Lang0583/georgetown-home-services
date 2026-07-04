import type { ReactNode } from "react";
import Container from "../Container";

export default function PageShell({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "white" | "service" | "best";
}) {
  const bg =
    variant === "white" || variant === "service" || variant === "best"
      ? "bg-surface"
      : "bg-surface-alt";
  const typeClass = variant === "service" || variant === "best" ? "type-service-best" : "";
  return (
    <div className={[bg, typeClass, "prose-site"].filter(Boolean).join(" ")}>
      <Container>{children}</Container>
    </div>
  );
}
