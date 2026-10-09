"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";

const LETTERS = ["S", "A", "R", "T", "H", "A", "K"];

function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  try {
    const visited = sessionStorage.getItem("portfolio_intro_seen");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return !visited && !reducedMotion;
  } catch {
    return false;
  }
}

export function Preloader() {
  const initialShow = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!initialShow) return;
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem("portfolio_intro_seen", "true");
      } catch {
        /* ignore storage failure */
      }
      setDismissed(true);
    }, 1600);
    return () => clearTimeout(timer);
  }, [initialShow]);

  const show = initialShow && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-bg text-fg select-none"
          aria-hidden
        >
          {/* Animated SVG Monogram */}
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="h-20 w-20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M 70 25 C 70 25, 30 20, 30 45 C 30 65, 70 65, 70 85 C 70 105, 30 95, 30 95"
                className="stroke-primary"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
          </div>

          {/* Letter by letter reveal */}
          <div className="flex items-center gap-1.5 overflow-hidden text-2xl font-bold tracking-[0.25em]">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.45,
                  delay: 0.2 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Progress bar line */}
          <div className="relative mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
