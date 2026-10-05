"use client";

import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  withCrosshairs?: boolean;
  as?: "div" | "article" | "section";
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(56, 225, 255, 0.12)",
  withCrosshairs = true,
  as: Component = "article",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (!cardRef.current || e.touches.length === 0) return;
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    handleTouchMove(e);
    setOpacity(1);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setOpacity(0), 800);
  };

  const handleFocus = () => setOpacity(1);
  const handleBlur = () => setOpacity(0);
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <Component
      ref={cardRef as React.Ref<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={cn(
        "card group relative overflow-hidden transition-all duration-300 hover:border-line-strong",
        className,
      )}
      {...props}
    >
      {/* Dynamic spotlight gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Decorative HUD crosshairs in corners */}
      {withCrosshairs ? (
        <>
          <span className="hud-crosshair -left-[4px] -top-[4px] opacity-40 group-hover:opacity-100 transition-opacity" />
          <span className="hud-crosshair -right-[4px] -top-[4px] opacity-40 group-hover:opacity-100 transition-opacity" />
          <span className="hud-crosshair -left-[4px] -bottom-[4px] opacity-40 group-hover:opacity-100 transition-opacity" />
          <span className="hud-crosshair -right-[4px] -bottom-[4px] opacity-40 group-hover:opacity-100 transition-opacity" />
        </>
      ) : null}

      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </Component>
  );
}
