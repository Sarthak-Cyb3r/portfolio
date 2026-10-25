"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";

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
        /* ignore */
      }
      setDismissed(true);
    }, 700);
    return () => clearTimeout(timer);
  }, [initialShow]);

  const show = initialShow && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0.95 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-bg text-fg select-none"
          aria-hidden
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 text-2xl font-bold tracking-tight"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span>SARTHAK</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
