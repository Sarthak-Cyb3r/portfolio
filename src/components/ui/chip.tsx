import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ChipProps {
  children: ReactNode;
  variant?: "default" | "accent" | "success" | "outline";
  size?: "sm" | "md";
  className?: string;
  icon?: ReactNode;
}

export function Chip({
  children,
  variant = "default",
  size = "md",
  className,
  icon,
}: ChipProps) {
  const variantStyles = {
    default: "bg-muted/70 text-muted-fg border-border",
    accent: "bg-blue-50 text-accent border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900",
    outline: "bg-transparent text-muted-fg border-border",
  };

  const sizeStyles = {
    sm: "h-6 px-2.5 text-[11px] gap-1",
    md: "h-7 px-3 text-xs gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium border rounded-full whitespace-nowrap select-none transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
