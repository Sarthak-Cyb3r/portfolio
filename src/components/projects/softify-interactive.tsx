"use client";

import { useState } from "react";
import { Play, Pause, Search, Smartphone, Apple, Terminal, Globe } from "lucide-react";
import { motion } from "motion/react";

export function SoftifyInteractive() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTrack, setActiveTrack] = useState("Weightless - Marconi Union");

  const TRACKS = [
    { title: "Weightless - Marconi Union", genre: "Ambient · 100% Cached", duration: "8:05" },
    { title: "Resonance - HOME", genre: "Synthwave · Offline", duration: "3:32" },
    { title: "Nightcall - Kavinsky", genre: "Electro · Local FTS5", duration: "4:19" },
  ];

  const filtered = TRACKS.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full rounded-xl border border-border bg-slate-950/90 text-slate-100 p-4 shadow-inner flex flex-col gap-3 font-sans">
      {/* Player Header with Equalizer */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause track" : "Play track"}
            className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-md shadow-primary/40"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
          <div>
            <div className="text-xs font-semibold text-white truncate max-w-[170px] sm:max-w-[200px]">
              {activeTrack}
            </div>
            <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isPlaying ? "Decoding Audio Stream" : "Ready · Zero Telemetry"}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Animated Waveform Equalizer */}
        <div className="flex items-end gap-1 h-5 px-2">
          {[12, 20, 8, 16, 22, 10, 18, 14].map((h, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-primary"
              animate={isPlaying ? { height: [4, h, 6, h * 0.7, 4] } : { height: 4 }}
              transition={
                isPlaying
                  ? {
                      duration: 0.8 + (i % 3) * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : { duration: 0.2 }
              }
            />
          ))}
        </div>
      </div>

      {/* Simulated On-Device FTS5 Search Input */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter tracks via SQLite FTS5 (<1ms)..."
          className="w-full rounded-lg bg-white/5 border border-white/10 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-primary/60 transition-colors"
        />
      </div>

      {/* Track list results */}
      <div className="flex flex-col gap-1 max-h-[85px] overflow-y-auto">
        {filtered.map((trk) => (
          <button
            key={trk.title}
            type="button"
            onClick={() => {
              setActiveTrack(trk.title);
              setIsPlaying(true);
            }}
            className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-white/10 text-left transition-colors cursor-pointer group"
          >
            <div>
              <div className="text-xs text-slate-200 group-hover:text-primary transition-colors">{trk.title}</div>
              <div className="text-[10px] text-slate-400">{trk.genre}</div>
            </div>
            <span className="text-[10px] font-mono text-slate-400">{trk.duration}</span>
          </button>
        ))}
      </div>

      {/* Shipped Platform Pills */}
      <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-mono text-slate-400 mr-1">Platforms:</span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-slate-300">
          <Smartphone className="w-3 h-3 text-emerald-400" /> Android
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-slate-300">
          <Apple className="w-3 h-3 text-sky-400" /> iOS
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-slate-300">
          <Terminal className="w-3 h-3 text-amber-400" /> Linux
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-slate-300">
          <Globe className="w-3 h-3 text-indigo-400" /> Web
        </span>
      </div>
    </div>
  );
}
