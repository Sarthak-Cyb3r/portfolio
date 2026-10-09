"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Timer, Play, Pause, RefreshCw, CheckCircle2, BookOpen } from "lucide-react";

export function StudyStackInteractive() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25 min
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="w-full rounded-xl border border-border bg-slate-950/90 text-slate-100 p-4 shadow-inner flex flex-col gap-3 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-white">Study Engine & SM-2 Scheduler</span>
        </div>
        <span className="text-[10px] font-mono text-sky-400">455 Automated Tests</span>
      </div>

      <div className="grid grid-cols-2 gap-4 items-stretch">
        {/* Interactive Flashcard with 3D Flip */}
        <div
          className="relative min-h-[110px] [perspective:800px] cursor-pointer select-none group"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            className="w-full h-full rounded-xl border border-white/10 bg-white/5 p-3 flex flex-col justify-between [transform-style:preserve-3d] transition-all duration-500 shadow-md"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
          >
            {/* Front of card */}
            <div className={`flex flex-col justify-between h-full ${isFlipped ? "hidden" : "flex"}`}>
              <div>
                <div className="text-[10px] font-mono text-primary uppercase tracking-wider">Flashcard Front</div>
                <div className="text-xs font-semibold text-white mt-1">SuperMemo-2 Interval Formula</div>
              </div>
              <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                <span>Click to reveal answer</span>
                <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform" />
              </div>
            </div>

            {/* Back of card */}
            <div
              className={`flex flex-col justify-between h-full [transform:rotateY(180deg)] ${
                isFlipped ? "flex" : "hidden"
              }`}
            >
              <div>
                <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Solution</div>
                <div className="text-xs font-mono text-slate-200 mt-1">
                  I(n) = I(n-1) × EF
                  <br />
                  <span className="text-[10px] text-slate-400">EF′ = EF + (0.1 - (5-q) × 0.08)</span>
                </div>
              </div>
              <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Deterministic</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mini Pomodoro Timer Widget */}
        <div className="flex flex-col justify-between p-3 rounded-xl bg-white/5 border border-white/10">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <Timer className="w-3 h-3" /> Focus Session
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-primary/20 text-primary">
                Pomodoro
              </span>
            </div>
            <div className="text-2xl font-bold font-mono text-white tracking-tight mt-1 text-center">
              {timeFormatted}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-3 py-1 rounded-md bg-primary hover:bg-blue-600 text-white text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
              <span>{isTimerRunning ? "Pause" : "Start"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsTimerRunning(false);
                setSecondsLeft(1500);
              }}
              className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer"
              aria-label="Reset timer"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer details */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>Dynamic timetable constraint engine</span>
        <span>Local-first IndexedDB</span>
      </div>
    </div>
  );
}
