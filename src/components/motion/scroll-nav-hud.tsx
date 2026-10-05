"use client";

import { useSyncExternalStore } from "react";
import { sound } from "@/lib/sound";

const SECTIONS = [
  { id: "hero", label: "01 // HERO" },
  { id: "stats", label: "02 // METRICS" },
  { id: "work", label: "03 // SHOWCASE" },
  { id: "console", label: "04 // CLI TERMINAL" },
  { id: "about", label: "05 // ABOUT" },
  { id: "process", label: "06 // WORKFLOW" },
];

function subscribeScroll(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getActiveSectionSnapshot(): string {
  if (typeof window === "undefined") return "hero";
  const scrollPos = window.scrollY + window.innerHeight * 0.35;
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    const el = document.getElementById(SECTIONS[i].id);
    if (el && el.offsetTop <= scrollPos) {
      return SECTIONS[i].id;
    }
  }
  return "hero";
}

export function ScrollNavHud() {
  const activeSection = useSyncExternalStore(
    subscribeScroll,
    getActiveSectionSnapshot,
    () => "hero"
  );

  const scrollTo = (id: string) => {
    sound.playClick(1200);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Section navigation"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 select-none pointer-events-auto"
    >
      <div className="rounded-2xl border border-line bg-surface/75 p-2 backdrop-blur-md shadow-xl flex flex-col gap-1.5 font-mono text-[0.65rem]">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollTo(sec.id)}
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-all text-left ${
                isActive
                  ? "bg-surface-2 text-accent-2 border border-line-strong font-semibold shadow-sm"
                  : "text-muted hover:text-text hover:bg-surface-2/50 border border-transparent"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all ${
                  isActive ? "bg-accent-2 scale-125 animate-pulse" : "bg-faint"
                }`}
              />
              <span className="tracking-wider">{sec.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
