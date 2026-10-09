"use client";

import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { Smartphone, Apple, Terminal, Globe, Layers, Cpu, Code2, Database } from "lucide-react";

const MARQUEE_ROW_1 = [
  { name: "Flutter", tag: "Cross-Platform" },
  { name: "Dart", tag: "Language" },
  { name: "Next.js 16", tag: "Web Engine" },
  { name: "TypeScript", tag: "Language" },
  { name: "React 19", tag: "UI Framework" },
  { name: "Tailwind CSS v4", tag: "Styling" },
  { name: "SQLite FTS5", tag: "Local Search" },
  { name: "Firestore Listeners", tag: "Real-time" },
];

const MARQUEE_ROW_2 = [
  { name: "Android SDK", tag: "Mobile Native" },
  { name: "iOS / Swift", tag: "Mobile Native" },
  { name: "Linux / GTK", tag: "Desktop Native" },
  { name: "Clean Architecture", tag: "Pattern" },
  { name: "BLoC State", tag: "Architecture" },
  { name: "Audio Pipelines", tag: "Streaming" },
  { name: "Git & Workflows", tag: "Tooling" },
  { name: "Docker & Linux", tag: "DevOps" },
];

export function Tech() {
  return (
    <section id="tech" className="py-24 sm:py-32 border-t border-border/80 bg-dot-pattern/50 overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Architecture & Toolchain"
          title="From code foundations to multi-platform shipping."
          description="Disciplined stack engineered for offline-first performance, real-time listeners, and cross-platform native binaries."
        />

        {/* 1. Animated Beam Architecture Conduit */}
        <div className="relative my-12 rounded-2xl border border-border bg-card/70 dark:bg-card/50 backdrop-blur-xl p-6 sm:p-10 shadow-sm overflow-hidden">
          {/* Subtle conduit background glow */}
          <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent pointer-events-none" />

          {/* SVG Animated Beams (Conduit cables) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#7C3AED" stopOpacity="1" />
                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Input to Hub lines */}
            <path d="M 220 70 C 350 70, 360 160, 480 160" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="2" />
            <path d="M 220 160 C 350 160, 360 160, 480 160" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="2" />
            <path d="M 220 250 C 350 250, 360 160, 480 160" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="2" />

            {/* Hub to Output lines */}
            <path d="M 660 160 C 780 160, 800 50, 920 50" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="2" />
            <path d="M 660 160 C 780 160, 800 125, 920 125" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="2" />
            <path d="M 660 160 C 780 160, 800 200, 920 200" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="2" />
            <path d="M 660 160 C 780 160, 800 270, 920 270" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="2" />

            {/* Animated glowing pulses along conduits */}
            <motion.path
              d="M 220 70 C 350 70, 360 160, 480 160"
              fill="none"
              stroke="url(#beam-grad)"
              strokeWidth="2.5"
              strokeDasharray="40 200"
              animate={{ strokeDashoffset: [240, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M 220 160 C 350 160, 360 160, 480 160"
              fill="none"
              stroke="url(#beam-grad)"
              strokeWidth="2.5"
              strokeDasharray="40 200"
              animate={{ strokeDashoffset: [240, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
            />
            <motion.path
              d="M 220 250 C 350 250, 360 160, 480 160"
              fill="none"
              stroke="url(#beam-grad)"
              strokeWidth="2.5"
              strokeDasharray="40 200"
              animate={{ strokeDashoffset: [240, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: 1.2 }}
            />

            <motion.path
              d="M 660 160 C 780 160, 800 50, 920 50"
              fill="none"
              stroke="url(#beam-grad)"
              strokeWidth="2.5"
              strokeDasharray="50 250"
              animate={{ strokeDashoffset: [300, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: 0.3 }}
            />
            <motion.path
              d="M 660 160 C 780 160, 800 125, 920 125"
              fill="none"
              stroke="url(#beam-grad)"
              strokeWidth="2.5"
              strokeDasharray="50 250"
              animate={{ strokeDashoffset: [300, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 0.8 }}
            />
            <motion.path
              d="M 660 160 C 780 160, 800 200, 920 200"
              fill="none"
              stroke="url(#beam-grad)"
              strokeWidth="2.5"
              strokeDasharray="50 250"
              animate={{ strokeDashoffset: [300, 0] }}
              transition={{ duration: 2.7, repeat: Infinity, ease: "linear", delay: 1.5 }}
            />
            <motion.path
              d="M 660 160 C 780 160, 800 270, 920 270"
              fill="none"
              stroke="url(#beam-grad)"
              strokeWidth="2.5"
              strokeDasharray="50 250"
              animate={{ strokeDashoffset: [300, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.1 }}
            />
          </svg>

          {/* Conduit Nodes Layout */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center min-h-[320px]">
            {/* Column 1: Core Technologies */}
            <div className="flex flex-col gap-3.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-fg font-semibold mb-1">
                Core Foundations
              </span>
              {[
                { name: "Flutter & Dart", desc: "Cross-platform mobile engine", icon: Code2 },
                { name: "Next.js & TypeScript", desc: "Server components & static typing", icon: Cpu },
                { name: "SQLite & Firestore", desc: "Offline FTS5 + real-time listeners", icon: Database },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card shadow-sm hover:border-primary/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-fg">{item.name}</div>
                    <div className="text-[11px] text-muted-fg">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2: The Core Product Engine (Center Hub) */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative group p-6 rounded-2xl border-2 border-primary/30 bg-gradient-to-b from-card to-muted/40 shadow-xl flex flex-col items-center text-center max-w-[220px] w-full">
                <span className="absolute -top-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary text-white tracking-widest uppercase">
                  Engine
                </span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center shadow-lg shadow-primary/25 mb-3">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-fg">Sarthak Architecture</div>
                <div className="text-[11px] text-muted-fg mt-1">
                  Softify · Ludo · StudyStack
                </div>
                <div className="mt-3 text-[10px] font-mono text-primary font-medium">
                  Clean Architecture
                </div>
              </div>
            </div>

            {/* Column 3: Shipped Platforms */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-fg font-semibold mb-1">
                Target Platforms
              </span>
              {[
                { name: "Android", desc: "APK · Android SDK", icon: Smartphone, color: "text-emerald-500" },
                { name: "iOS", desc: "IPA · Sideload verified", icon: Apple, color: "text-sky-500" },
                { name: "Linux", desc: "AppImage · GTK bundle", icon: Terminal, color: "text-amber-500" },
                { name: "Web", desc: "PWA · Edge static deployment", icon: Globe, color: "text-indigo-500" },
              ].map((plat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-border bg-card shadow-sm hover:border-primary/40 transition-colors"
                >
                  <div className={`w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 ${plat.color}`}>
                    <plat.icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-semibold text-fg">{plat.name}</span>
                    <span className="text-[10px] font-mono text-muted-fg">{plat.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Dual-Row Infinite Marquee with edge fade masks */}
        <div className="mt-14 space-y-4">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-fg">
              Technologies & Standards
            </span>
          </div>

          {/* Row 1: Leftward Marquee */}
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-4 w-max animate-[marquee_32s_linear_infinite] hover:[animation-play-state:paused]">
              {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border bg-card/80 hover:border-primary/40 shadow-sm transition-all"
                >
                  <span className="text-xs font-semibold text-fg">{item.name}</span>
                  <span className="text-[10px] font-mono text-muted-fg px-1.5 py-0.5 rounded bg-muted">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Rightward Marquee */}
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-4 w-max animate-[marquee-reverse_36s_linear_infinite] hover:[animation-play-state:paused]">
              {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border bg-card/80 hover:border-primary/40 shadow-sm transition-all"
                >
                  <span className="text-xs font-semibold text-fg">{item.name}</span>
                  <span className="text-[10px] font-mono text-muted-fg px-1.5 py-0.5 rounded bg-muted">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
