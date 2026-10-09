"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

export interface StatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  className?: string;
}

export function Stat({
  value,
  suffix = "",
  prefix = "",
  label,
  sublabel,
  className,
}: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    hasAnimated.current = true;
    const duration = 1200;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(easedProgress * value);

      setDisplayValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)}>
      <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-fg tabular-nums">
        <span>{prefix}</span>
        <span>{displayValue}</span>
        <span>{suffix}</span>
      </div>
      <div className="text-sm font-medium text-fg">{label}</div>
      {sublabel && (
        <div className="text-xs text-muted-fg leading-relaxed">{sublabel}</div>
      )}
    </div>
  );
}
