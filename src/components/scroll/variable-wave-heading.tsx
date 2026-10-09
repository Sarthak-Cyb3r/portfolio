"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface VariableWaveHeadingProps {
  text: string;
  className?: string;
  trigger?: boolean;
}

export function VariableWaveHeading({
  text,
  className = "",
  trigger = false,
}: VariableWaveHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const startWave = () => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".char-wave");
    if (!chars.length) return;

    gsap.fromTo(
      chars,
      {
        fontVariationSettings: "'wght' 400, 'wdth' 100",
      },
      {
        fontVariationSettings: "'wght' 900, 'wdth' 135",
        duration: 0.35,
        stagger: {
          each: 0.04,
          yoyo: true,
          repeat: 1,
        },
        ease: "power2.inOut",
      }
    );
  };

  useEffect(() => {
    if (trigger) {
      startWave();
    }
  }, [trigger]);

  const chars = text.split("");

  return (
    <h2
      ref={containerRef}
      onMouseEnter={startWave}
      aria-label={text}
      className={`font-display cursor-default transition-all ${className}`}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="char-wave inline-block transition-transform hover:scale-105"
          style={{
            fontVariationSettings: "'wght' 600, 'wdth' 105",
          }}
        >
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </h2>
  );
}
