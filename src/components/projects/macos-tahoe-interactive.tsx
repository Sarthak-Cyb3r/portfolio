"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Terminal, ShieldCheck, Sparkles, Sliders } from "lucide-react";

export function MacOSTahoeInteractive() {
  const [activeTab, setActiveTab] = useState<"c-hook" | "glsl">("c-hook");
  const [isPatched, setIsPatched] = useState(true);
  const [cornerCurve, setCornerCurve] = useState(14);

  return (
    <div className="w-full rounded-xl border border-border bg-slate-950/90 text-slate-100 p-4 shadow-inner flex flex-col gap-3 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-white">macOS Tahoe 26 Compositor & C Hook</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/5 p-0.5 rounded-lg border border-white/10 text-[10px] font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("c-hook")}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeTab === "c-hook" ? "bg-primary text-white font-semibold" : "text-muted-fg hover:text-white"
            }`}
          >
            C Hook
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("glsl")}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeTab === "glsl" ? "bg-primary text-white font-semibold" : "text-muted-fg hover:text-white"
            }`}
          >
            GLSL Curves
          </button>
        </div>
      </div>

      {activeTab === "c-hook" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
          {/* Code Inspection */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col justify-between text-xs font-mono">
            <div>
              <div className="text-[10px] text-primary uppercase tracking-wider font-bold mb-1">
                libplank-noglow.c (LD_PRELOAD)
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                {isPatched ? (
                  <>
                    <span className="text-emerald-400 font-bold">*(unsigned char *)fn = 0xc3;</span>
                    <br />
                    <span className="text-slate-400">{"// Injected 'ret' instruction. Active glow function bypassed with 0ms overhead."}</span>
                  </>
                ) : (
                  <>
                    <span className="text-amber-400">elapsed / 0.0 = +inf</span>
                    <br />
                    <span className="text-slate-400">{"// ActiveTime=0 causes div-by-zero, forcing permanent elementary OS glow box."}</span>
                  </>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsPatched(!isPatched)}
              className="mt-3 inline-flex items-center justify-between text-[11px] font-sans px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-white transition-colors"
            >
              <span>Toggle Hook: {isPatched ? "0xc3 Patch Applied" : "Default elementary Glow"}</span>
              <ShieldCheck className={`w-3.5 h-3.5 ${isPatched ? "text-emerald-400" : "text-amber-400"}`} />
            </button>
          </div>

          {/* Live Dock Preview */}
          <div className="rounded-xl border border-white/10 bg-black/50 p-3 flex flex-col items-center justify-center relative overflow-hidden">
            <span className="text-[10px] font-mono text-muted-fg mb-2 uppercase">Simulated Dock Icon</span>
            <div className="relative flex flex-col items-center">
              {/* Elementary OS Glow rectangle (shown when not patched) */}
              {!isPatched && (
                <div className="absolute inset-0 -m-2 bg-sky-500/20 rounded-xl blur-xs border border-sky-400/40 pointer-events-none" />
              )}
              {/* App Icon */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/20 shadow-md flex items-center justify-center relative z-10">
                <Sparkles className="w-6 h-6 text-sky-400" />
              </div>
              {/* macOS Running Dot */}
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shadow-sm" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-2">
              {isPatched ? "Clean native macOS dot" : "Artifact: rectangular glow"}
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
          {/* Controls */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col justify-between text-xs">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-primary uppercase tracking-wider font-bold mb-2">
                <span>Clutter GLSL Shader</span>
                <span className="text-white">{cornerCurve}px</span>
              </div>
              <p className="text-[11px] text-slate-300 mb-3 leading-snug">
                Hardware-accelerated window clipping via Clutter compositor fragment shader.
              </p>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-muted-fg flex items-center gap-1">
                  <Sliders className="w-3 h-3" /> Corner Radius
                </label>
                <input
                  type="range"
                  min="6"
                  max="24"
                  value={cornerCurve}
                  onChange={(e) => setCornerCurve(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
            <div className="text-[10px] font-mono text-emerald-400 mt-2">
              RoundedCorners@klangman: 0 tearing
            </div>
          </div>

          {/* Mini Window Frame */}
          <div className="rounded-xl border border-white/10 bg-black/60 p-3 flex items-center justify-center">
            <motion.div
              className="w-full max-w-[180px] bg-slate-900/90 border border-white/20 p-2 shadow-2xl backdrop-blur-md transition-all"
              style={{ borderRadius: `${cornerCurve}px` }}
            >
              {/* Traffic Lights */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                <span className="text-[9px] font-mono text-muted-fg ml-1">Terminal</span>
              </div>
              <div className="bg-black/50 rounded p-1.5 text-[9px] font-mono text-emerald-400">
                $ uname -srm
                <br />
                <span className="text-white">Linux x86_64 Mint</span>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
