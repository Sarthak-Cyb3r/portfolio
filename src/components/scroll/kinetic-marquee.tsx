"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface KineticMarqueeProps {
  velocity?: number;
  text?: string;
  className?: string;
}

export function KineticMarquee({
  velocity = 0,
  text = "Android · iOS · Linux · Web · Flutter · Next.js · Offline-First · Local Intelligence",
  className = "",
}: KineticMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Apply velocity skew (max 4deg) and speed offset
  useEffect(() => {
    if (!trackRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const clampedSkew = Math.max(-4, Math.min(4, velocity * 0.003));
    gsap.to(trackRef.current, {
      skewX: clampedSkew,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [velocity]);

  const items = [text, text, text];

  return (
    <div
      ref={containerRef}
      className={`group relative w-full overflow-hidden select-none py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        ref={trackRef}
        className="flex gap-8 w-max will-change-transform animate-[marquee_24s_linear_infinite] group-hover:[animation-play-state:paused] hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((item, idx) => (
          <span
            key={idx}
            aria-hidden={idx > 0 ? "true" : undefined}
            className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-fg/15 dark:text-fg/10 hover:text-primary transition-colors cursor-default whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
