import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary hover:opacity-90 active:opacity-95 shadow-xs border border-primary/20",
  secondary:
    "bg-card border border-border text-fg hover:border-border-hover hover:bg-muted/60 active:bg-muted shadow-xs",
  outline:
    "bg-transparent border border-border text-fg hover:bg-muted/60 active:bg-muted",
  ghost:
    "bg-transparent text-muted-fg hover:text-fg hover:bg-muted/70 active:bg-muted",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-[36px] px-3.5 py-1.5 text-xs rounded-lg gap-1.5",
  md: "min-h-[42px] px-4.5 py-2 text-sm rounded-lg gap-2",
  lg: "min-h-[46px] px-5.5 py-2.5 text-sm font-semibold rounded-lg gap-2.5",
};

const base =
  "inline-flex items-center justify-center font-medium select-none cursor-pointer transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none disabled:opacity-50 disabled:pointer-events-none";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  shimmer?: boolean;
}

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    href,
    external,
    ...rest
  } = props;
  delete (rest as Record<string, unknown>).shimmer;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
