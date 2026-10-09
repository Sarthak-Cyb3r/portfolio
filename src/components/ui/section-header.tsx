import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  align = "left",
  as = "h2",
}: SectionHeaderProps) {
  const HeadingTag = as;

  return (
    <div
      className={cn(
        "flex flex-col gap-3 mb-12 sm:mb-16",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        className
      )}
    >
      {label && (
        <span className="text-xs font-semibold tracking-wider uppercase text-accent">
          {label}
        </span>
      )}
      <HeadingTag className="text-3xl sm:text-4xl font-semibold tracking-tight text-fg leading-[1.15]">
        {title}
      </HeadingTag>
      {description && (
        <p className="text-[17px] leading-[1.6] text-muted-fg max-w-[65ch]">
          {description}
        </p>
      )}
    </div>
  );
}
