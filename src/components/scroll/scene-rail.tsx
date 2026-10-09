"use client";

import { motion } from "motion/react";
import { Monitor, Film } from "lucide-react";

export interface SceneMeta {
  id: string;
  label: string;
  hash: string;
}

export const SCENES_META: SceneMeta[] = [
  { id: "hero", label: "Hero", hash: "#hero" },
  { id: "stats", label: "Metrics", hash: "#stats" },
  { id: "work", label: "Work", hash: "#work" },
  { id: "ludo", label: "Ludo", hash: "#ludo" },
  { id: "studystack", label: "StudyStack", hash: "#studystack" },
  { id: "tech", label: "Toolchain", hash: "#tech" },
  { id: "how-i-build", label: "Process", hash: "#how-i-build" },
  { id: "terminal", label: "Terminal", hash: "#terminal" },
  { id: "about", label: "About", hash: "#about" },
  { id: "contact", label: "Contact", hash: "#contact" },
];

interface SceneRailProps {
  currentScene: number;
  totalScenes: number;
  scrollProgress: number;
  viewMode: "cinematic" | "classic";
  onToggleViewMode: () => void;
  onNavigateToScene: (index: number) => void;
}

export function SceneRail({
  currentScene,
  totalScenes,
  scrollProgress,
  viewMode,
  onToggleViewMode,
  onNavigateToScene,
}: SceneRailProps) {
  const currentFormatted = String(currentScene + 1).padStart(2, "0");
  const totalFormatted = String(totalScenes).padStart(2, "0");

  return (
    <>
      {/* Right-aligned Vertical Scene Rail */}
      <nav
        aria-label="Scene navigation rail"
        className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4 select-none"
      >
        {/* Animated Digit-Roll Scene Counter */}
        <div className="flex flex-col items-center py-2 px-2.5 rounded-full bg-card/80 dark:bg-card/60 backdrop-blur-md border border-border shadow-xs text-xs font-mono">
          <div className="h-5 overflow-hidden flex flex-col items-center font-bold text-fg">
            <motion.span
              key={currentFormatted}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentFormatted}
            </motion.span>
          </div>
          <span className="text-[10px] text-muted-fg/70 my-0.5">/</span>
          <span className="text-[10px] text-muted-fg tabular-nums">{totalFormatted}</span>
        </div>

        {/* Vertical Progress Rail & Interactive Dots */}
        <div className="relative py-2 flex flex-col items-center gap-3">
          {/* Progress Backline */}
          <div className="absolute top-0 bottom-0 w-[2px] bg-border rounded-full" />
          {/* Active Progress Fill */}
          <div
            className="absolute top-0 w-[2px] bg-gradient-to-b from-primary to-accent rounded-full transition-all duration-150"
            style={{ height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          />

          {SCENES_META.map((meta, idx) => {
            const isActive = idx === currentScene;
            return (
              <button
                key={meta.id}
                type="button"
                onClick={() => onNavigateToScene(idx)}
                aria-label={`Jump to ${meta.label} scene`}
                className="group relative z-10 p-1 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
              >
                {/* Dot */}
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-primary ring-4 ring-primary/20 scale-125"
                      : "bg-muted-fg/40 hover:bg-fg/80 group-hover:scale-110"
                  }`}
                />

                {/* Hover Tooltip Label */}
                <span className="pointer-events-none absolute right-7 px-2 py-0.5 rounded-md bg-card dark:bg-slate-900 border border-border shadow-md text-[11px] font-medium text-fg whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
                  {meta.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Floating Bottom View Mode Switcher Pill */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center">
        <button
          type="button"
          onClick={onToggleViewMode}
          aria-pressed={viewMode === "cinematic"}
          aria-label={`View mode switch: currently ${viewMode === "cinematic" ? "Cinematic" : "Classic"}. Click to switch.`}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/90 dark:bg-card/75 backdrop-blur-xl border border-border text-xs font-mono font-medium text-fg shadow-md hover:border-primary/50 transition-all focus-visible:ring-2 focus-visible:ring-primary cursor-pointer select-none"
        >
          <span className="text-muted-fg">Stage:</span>
          <span className="flex items-center gap-1.5 font-semibold text-fg">
            {viewMode === "cinematic" ? (
              <>
                <Film className="w-3.5 h-3.5 text-primary" />
                <span>Cinematic</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5 text-secondary" />
                <span>Classic</span>
              </>
            )}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-fg px-1.5 py-0.5 rounded-md bg-muted/80 ml-1">
            Switch
          </span>
        </button>
      </div>
    </>
  );
}
