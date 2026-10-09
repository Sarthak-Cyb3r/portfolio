import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "relative overflow-hidden bg-primary text-white hover:bg-blue-600 active:bg-blue-700 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 border border-primary/20",
  secondary:
    "bg-card/90 backdrop-blur-sm border border-border text-fg hover:border-border-hover hover:bg-muted/70 hover:-translate-y-[1px] active:translate-y-0 shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
  outline:
    "bg-transparent border border-border text-fg hover:bg-muted/60 active:bg-muted",
  ghost:
    "bg-transparent text-muted-fg hover:text-fg hover:bg-muted/70 active:bg-muted",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-[38px] px-3.5 py-1.5 text-xs rounded-[10px] gap-1.5",
  md: "min-h-[44px] px-5 py-2.5 text-sm rounded-[12px] gap-2",
  lg: "min-h-[48px] px-6 py-3 text-base rounded-[14px] gap-2.5",
};

const base =
  "inline-flex items-center justify-center font-medium select-none cursor-pointer transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none disabled:opacity-50 disabled:pointer-events-none";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  shimmer?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  external,
  shimmer = false,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const shimmerContent = shimmer ? (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Animated light beam sweep */}
      <span
        className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
        aria-hidden
      />
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {shimmerContent}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {shimmerContent}
    </button>
  );
}
