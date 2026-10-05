import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "quiet";

const variants: Record<Variant, string> = {
  primary:
    "text-[#08080C] bg-[linear-gradient(105deg,#7C5CFF_0%,#38E1FF_55%,#C6FF4A_100%)] bg-[length:160%_160%] bg-[position:0%_50%] hover:bg-[position:100%_50%] transition-[background-position,transform] duration-500 font-semibold shadow-[0_16px_40px_-24px_rgba(124,92,255,0.9)]",
  outline:
    "border border-[var(--c-line-strong)] text-[var(--c-text)] hover:border-[var(--color-accent-2)] hover:text-[var(--color-accent-2)] transition-colors duration-200",
  ghost:
    "text-[var(--c-muted)] hover:text-[var(--c-text)] transition-colors duration-200",
  quiet:
    "bg-[var(--c-surface-2)] border border-[var(--c-line)] text-[var(--c-text)] hover:border-[var(--c-line-strong)] transition-colors duration-200",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm min-h-11 select-none disabled:opacity-45 disabled:pointer-events-none";

export function Button({
  children,
  className,
  variant = "primary",
  href,
  external,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  href?: string;
  external?: boolean;
} & ComponentPropsWithoutRef<"button">) {
  const classes = cn(base, variants[variant], className);

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
