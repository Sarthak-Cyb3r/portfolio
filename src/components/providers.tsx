"use client";

import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Motion defaults + Lenis smooth scrolling (lerp ~0.09).
 * Anchor links scroll smoothly with sticky-nav offset (72px).
 * Bypassed for prefers-reduced-motion users.
 */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    // Make lenis globally accessible for anchor navigation
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Smooth scroll for anchor clicks with sticky nav offset
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"], a[href^="/#"]');
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const id = href.slice(hashIndex + 1);
      if (!id) return;

      // Only handle if on same page
      const currentPath = window.location.pathname;
      const targetPath = href.slice(0, hashIndex);
      if (targetPath && targetPath !== currentPath && targetPath !== "/") return;

      const elem = document.getElementById(id);
      if (elem) {
        e.preventDefault();
        lenis.scrollTo(elem, { offset: -72, duration: 1 });
        window.history.pushState(null, "", `#${id}`);
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
