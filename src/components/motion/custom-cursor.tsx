"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const m1 = window.matchMedia("(pointer: fine)");
  const m2 = window.matchMedia("(prefers-reduced-motion: reduce)");
  m1.addEventListener("change", callback);
  m2.addEventListener("change", callback);
  return () => {
    m1.removeEventListener("change", callback);
    m2.removeEventListener("change", callback);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer halo has organic trailing spring
  const haloX = useSpring(mouseX, { damping: 26, stiffness: 300, mass: 0.5 });
  const haloY = useSpring(mouseY, { damping: 26, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest('a, button, [role="button"], input, textarea, select, [data-interactive]')
      );
      setHovered(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handlePointerOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handlePointerOver);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      {/* Precision Inner Dot */}
      <motion.div
        aria-hidden
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 z-[999] pointer-events-none w-1.5 h-1.5 rounded-full bg-primary"
      />

      {/* Trailing Fluid Halo */}
      <motion.div
        aria-hidden
        style={{
          x: haloX,
          y: haloY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 1.6 : 1,
          borderColor: hovered ? "var(--c-primary)" : "rgba(148, 163, 184, 0.3)",
          backgroundColor: hovered ? "rgba(59, 130, 246, 0.08)" : "transparent",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="fixed top-0 left-0 z-[998] pointer-events-none w-8 h-8 rounded-full border border-slate-400/30 backdrop-blur-[1px]"
      />
    </>
  );
}
