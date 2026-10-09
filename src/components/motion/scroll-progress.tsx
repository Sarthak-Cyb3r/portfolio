"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin 2px accent scroll progress bar at the very top */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.3,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_8px_rgba(37,99,235,0.4)] pointer-events-none"
    />
  );
}
