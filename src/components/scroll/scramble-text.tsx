"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
  chars?: string;
  duration?: number;
}

export function ScrambleText({
  text,
  className = "",
  trigger = true,
  chars = "0123456789ABCDEF!@#$%^&*",
  duration = 0.8,
}: ScrambleTextProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!trigger || !elRef.current || animatedRef.current) return;
    animatedRef.current = true;

    gsap.to(elRef.current, {
      duration,
      scrambleText: {
        text,
        chars,
        revealDelay: 0.2,
        speed: 0.3,
      },
      ease: "power2.out",
    });
  }, [trigger, text, chars, duration]);

  return (
    <span
      ref={elRef}
      className={`font-mono select-none ${className}`}
      aria-label={text}
    >
      {text}
    </span>
  );
}
