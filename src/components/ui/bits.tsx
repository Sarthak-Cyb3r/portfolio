import type { ReactNode } from "react";
import type { ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

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
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium select-none",
        completed
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400"
          : "border-border bg-muted/60 text-muted-fg",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          completed ? "bg-emerald-500" : "bg-slate-400",
        )}
      />
      {completed ? "Live" : "In Progress"}
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
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-fg",
        className,
      )}
    >
      {children}
    </span>
  );
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
        "max-w-2xl mb-12",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker ? (
        <p className="text-xs font-semibold tracking-wider uppercase text-accent mb-3">
          {kicker}
        </p>
      ) : null}
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-fg leading-[1.15]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-3 text-[17px] leading-[1.6] text-muted-fg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
