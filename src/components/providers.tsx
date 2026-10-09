"use client";

import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Motion defaults + Lenis smooth scrolling wired directly into GSAP ticker and ScrollTrigger:
 * lenis.on('scroll', ScrollTrigger.update);
 * gsap.ticker.add(t => lenis.raf(t * 1000));
 * gsap.ticker.lagSmoothing(0);
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

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

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
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
