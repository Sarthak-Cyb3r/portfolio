"use client";

import { motion } from "motion/react";

export function ArchitectureDiagram({ slug }: { slug: string }) {
  if (slug === "softify") {
    return (
      <div className="w-full overflow-x-auto p-6 sm:p-8 bg-card/85 dark:bg-card/70 backdrop-blur-xl border border-border rounded-2xl shadow-sm">
        <svg
          viewBox="0 0 800 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full min-w-[640px] h-auto text-fg font-sans"
        >
          <defs>
            <linearGradient id="beam-softify" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity="1" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Layer 1: UI */}
          <rect x="20" y="30" width="160" height="180" rx="12" className="fill-muted/40 stroke-border" strokeWidth="1.5" />
          <text x="100" y="58" textAnchor="middle" className="text-xs font-bold fill-fg">UI Layer</text>
          <rect x="35" y="78" width="130" height="34" rx="8" className="fill-card stroke-border shadow-xs" />
          <text x="100" y="100" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">Player & Shelves</text>
          <rect x="35" y="122" width="130" height="34" rx="8" className="fill-card stroke-border shadow-xs" />
          <text x="100" y="144" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">Search & Library</text>
          <rect x="35" y="166" width="130" height="28" rx="6" className="fill-primary/10 stroke-primary/30" />
          <text x="100" y="184" textAnchor="middle" className="text-[10px] fill-primary font-mono font-semibold">Riverpod State</text>

          {/* Static Conduits */}
          <path d="M180 120 H260" className="stroke-border" strokeWidth="2" strokeDasharray="4 4" />
          {/* Animated Glowing Pulses */}
          <motion.path
            d="M180 120 H260"
            stroke="url(#beam-softify)"
            strokeWidth="3"
            strokeDasharray="20 60"
            animate={{ strokeDashoffset: [80, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />

          {/* Layer 2: Domain Logic & ML Engine */}
          <rect x="260" y="30" width="240" height="180" rx="12" className="fill-muted/40 stroke-border" strokeWidth="1.5" />
          <text x="380" y="58" textAnchor="middle" className="text-xs font-bold fill-fg">Domain & ML Engine</text>
          <rect x="275" y="78" width="210" height="34" rx="8" className="fill-card stroke-border shadow-xs" />
          <text x="380" y="100" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">Dual-Band Taste Decay</text>
          <rect x="275" y="122" width="210" height="34" rx="8" className="fill-card stroke-border shadow-xs" />
          <text x="380" y="144" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">On-Device SGD Classifier</text>
          <rect x="275" y="166" width="210" height="28" rx="6" className="fill-primary/10 stroke-primary/30" />
          <text x="380" y="184" textAnchor="middle" className="text-[10px] fill-primary font-mono font-semibold">128-Dim Vector Cosine</text>

          {/* Static Conduits */}
          <path d="M500 120 H580" className="stroke-border" strokeWidth="2" strokeDasharray="4 4" />
          {/* Animated Glowing Pulses */}
          <motion.path
            d="M500 120 H580"
            stroke="url(#beam-softify)"
            strokeWidth="3"
            strokeDasharray="20 60"
            animate={{ strokeDashoffset: [80, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />

          {/* Layer 3: Persistence & Audio Driver */}
          <rect x="580" y="30" width="200" height="180" rx="12" className="fill-muted/40 stroke-border" strokeWidth="1.5" />
          <text x="680" y="58" textAnchor="middle" className="text-xs font-bold fill-fg">Data & Audio Engine</text>
          <rect x="595" y="78" width="170" height="34" rx="8" className="fill-card stroke-border shadow-xs" />
          <text x="680" y="100" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">Drift SQLite FTS5</text>
          <rect x="595" y="122" width="170" height="34" rx="8" className="fill-card stroke-border shadow-xs" />
          <text x="680" y="144" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">Dual Standby Audio Engine</text>
          <rect x="595" y="166" width="170" height="28" rx="6" className="fill-primary/10 stroke-primary/30" />
          <text x="680" y="184" textAnchor="middle" className="text-[10px] fill-primary font-mono font-semibold">ISO-BMFF Atom Offset</text>
        </svg>
      </div>
    );
  }

  if (slug === "ludo-vercel" || slug === "ludo") {
    return (
      <div className="w-full overflow-x-auto p-6 sm:p-8 bg-card/85 dark:bg-card/70 backdrop-blur-xl border border-border rounded-2xl shadow-sm">
        <svg
          viewBox="0 0 800 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full min-w-[640px] h-auto text-fg font-sans"
        >
          <defs>
            <linearGradient id="beam-ludo" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity="1" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Client Canvas */}
          <rect x="30" y="40" width="200" height="160" rx="12" className="fill-muted/40 stroke-border" strokeWidth="1.5" />
          <text x="130" y="68" textAnchor="middle" className="text-xs font-bold fill-fg">Client Frontend</text>
          <rect x="45" y="88" width="170" height="34" rx="8" className="fill-card stroke-border" />
          <text x="130" y="110" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">HTML5 Canvas Engine</text>
          <rect x="45" y="132" width="170" height="34" rx="8" className="fill-card stroke-border" />
          <text x="130" y="154" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">2–6 Player Geometry</text>

          {/* Sync arrows */}
          <path d="M230 100 H370" className="stroke-border" strokeWidth="2" />
          <motion.path
            d="M230 100 H370"
            stroke="url(#beam-ludo)"
            strokeWidth="3"
            strokeDasharray="30 110"
            animate={{ strokeDashoffset: [140, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />

          <path d="M370 140 H230" className="stroke-border" strokeWidth="2" strokeDasharray="4 4" />
          <motion.path
            d="M370 140 H230"
            stroke="url(#beam-ludo)"
            strokeWidth="3"
            strokeDasharray="30 110"
            animate={{ strokeDashoffset: [0, 140] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.6 }}
          />
          <text x="300" y="90" textAnchor="middle" className="text-[10px] fill-primary font-mono font-semibold">Moves / Delta</text>
          <text x="300" y="160" textAnchor="middle" className="text-[10px] fill-muted-fg font-mono">Listeners Sync</text>

          {/* Firestore */}
          <rect x="370" y="40" width="190" height="160" rx="12" className="fill-muted/40 stroke-border" strokeWidth="1.5" />
          <text x="465" y="68" textAnchor="middle" className="text-xs font-bold fill-fg">Cloud Layer</text>
          <rect x="385" y="88" width="160" height="34" rx="8" className="fill-card stroke-border" />
          <text x="465" y="110" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">Firestore Real-time</text>
          <rect x="385" y="132" width="160" height="34" rx="8" className="fill-card stroke-border" />
          <text x="465" y="154" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">Anonymous Auth UID</text>

          {/* Arrow to wrappers */}
          <path d="M560 120 H630" className="stroke-border" strokeWidth="2" />
          <motion.path
            d="M560 120 H630"
            stroke="url(#beam-ludo)"
            strokeWidth="3"
            strokeDasharray="20 50"
            animate={{ strokeDashoffset: [70, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.4 }}
          />

          {/* Native distribution */}
          <rect x="630" y="40" width="140" height="160" rx="12" className="fill-muted/40 stroke-border" strokeWidth="1.5" />
          <text x="700" y="68" textAnchor="middle" className="text-xs font-bold fill-fg">Native Builds</text>
          <rect x="640" y="92" width="120" height="30" rx="6" className="fill-card stroke-border" />
          <text x="700" y="111" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">Android (.apk)</text>
          <rect x="640" y="132" width="120" height="30" rx="6" className="fill-card stroke-border" />
          <text x="700" y="151" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">Linux (.deb)</text>
        </svg>
      </div>
    );
  }

  // StudyStack
  return (
    <div className="w-full overflow-x-auto p-6 sm:p-8 bg-card/85 dark:bg-card/70 backdrop-blur-xl border border-border rounded-2xl shadow-sm">
      <svg
        viewBox="0 0 800 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full min-w-[640px] h-auto text-fg font-sans"
      >
        <defs>
          <linearGradient id="beam-studystack" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="1" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Presentation Layer */}
        <rect x="30" y="40" width="190" height="160" rx="12" className="fill-muted/40 stroke-border" strokeWidth="1.5" />
        <text x="125" y="68" textAnchor="middle" className="text-xs font-bold fill-fg">Presentation</text>
        <rect x="45" y="88" width="160" height="34" rx="8" className="fill-card stroke-border" />
        <text x="125" y="110" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">EJS Dynamic Views</text>
        <rect x="45" y="132" width="160" height="34" rx="8" className="fill-card stroke-border" />
        <text x="125" y="154" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">Vanilla CSS Grid</text>

        {/* Route dispatch */}
        <path d="M220 120 H320" className="stroke-border" strokeWidth="2" />
        <motion.path
          d="M220 120 H320"
          stroke="url(#beam-studystack)"
          strokeWidth="3"
          strokeDasharray="25 75"
          animate={{ strokeDashoffset: [100, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />

        {/* Core Algorithm */}
        <rect x="320" y="40" width="220" height="160" rx="12" className="fill-muted/40 stroke-border" strokeWidth="1.5" />
        <text x="430" y="68" textAnchor="middle" className="text-xs font-bold fill-fg">Scoring Engine</text>
        <rect x="335" y="88" width="190" height="34" rx="8" className="fill-card stroke-border" />
        <text x="430" y="110" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">Ratio-Interval Prioritizer</text>
        <rect x="335" y="132" width="190" height="34" rx="8" className="fill-card stroke-border" />
        <text x="430" y="154" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">Derived Backlog View</text>

        {/* DB Connection */}
        <path d="M540 120 H630" className="stroke-border" strokeWidth="2" />
        <motion.path
          d="M540 120 H630"
          stroke="url(#beam-studystack)"
          strokeWidth="3"
          strokeDasharray="25 65"
          animate={{ strokeDashoffset: [90, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />

        {/* SQLite */}
        <rect x="630" y="40" width="140" height="160" rx="12" className="fill-muted/40 stroke-border" strokeWidth="1.5" />
        <text x="700" y="68" textAnchor="middle" className="text-xs font-bold fill-fg">Database</text>
        <rect x="640" y="90" width="120" height="34" rx="8" className="fill-card stroke-border" />
        <text x="700" y="112" textAnchor="middle" className="text-[11px] fill-muted-fg font-medium">better-sqlite3</text>
        <rect x="640" y="136" width="120" height="26" rx="6" className="fill-primary/10 stroke-primary/30" />
        <text x="700" y="153" textAnchor="middle" className="text-[10px] fill-primary font-mono font-semibold">Prepared Stmts</text>
      </svg>
    </div>
  );
}
