import type { ReactNode } from "react";
import type { ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Status is never conveyed by colour alone — the label is always present. */
export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const completed = status === "completed";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em]",
        completed
          ? "border-[var(--c-ok)]/40 bg-[var(--c-ok-soft)] text-[var(--c-ok)]"
          : "border-[var(--c-warn)]/40 bg-[var(--c-warn-soft)] text-[var(--c-warn)]",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          completed ? "bg-[var(--c-ok)]" : "bg-[var(--c-warn)]",
        )}
      />
      {completed ? "Completed" : "Under development"}
    </span>
  );
}

export function Chip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("chip", className)}>{children}</span>;
}

export function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  className,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker ? <p className="kicker mb-4">{kicker}</p> : null}
      <h2 className="text-[clamp(1.9rem,1.1rem+3vw,3.4rem)]">{title}</h2>
      {lead ? (
        <p className="mt-4 text-base leading-relaxed text-[var(--c-muted)] sm:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
