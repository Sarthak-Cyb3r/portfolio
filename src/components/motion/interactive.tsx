import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Passthrough component (magnetic buttons removed per design system) */
export function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  return <div className={cn("inline-block", className)}>{children}</div>;
}

/** Passthrough component (3D tilt removed per design system) */
export function Tilt({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  return <div className={cn("h-full", className)}>{children}</div>;
}
