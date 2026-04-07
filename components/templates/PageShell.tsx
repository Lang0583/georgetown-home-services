import type { ReactNode } from "react";
import Container from "../Container";

export default function PageShell({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "white";
}) {
  const bg = variant === "white" ? "bg-white" : "bg-gray-50";
  return (
    <div className={bg}>
      <Container>{children}</Container>
    </div>
  );
}

