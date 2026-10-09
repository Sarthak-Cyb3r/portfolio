"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Dices } from "lucide-react";

const DICE_DOTS: Record<number, number[][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

export function LudoInteractive() {
  const [diceValue, setDiceValue] = useState<number>(6);
  const [isRolling, setIsRolling] = useState(false);
  const [rolls, setRolls] = useState<number[]>([6]);
  const [playerTurn, setPlayerTurn] = useState<"Red" | "Green" | "Yellow" | "Blue">("Red");

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);

    // Roll random iterations
    let ticks = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      ticks++;
      if (ticks > 8) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalVal);
        setRolls((prev) => [finalVal, ...prev.slice(0, 4)]);
        setIsRolling(false);

        // Turn progression
        const turns: ("Red" | "Green" | "Yellow" | "Blue")[] = ["Red", "Green", "Yellow", "Blue"];
        setPlayerTurn((prev) => {
          const nextIdx = (turns.indexOf(prev) + 1) % turns.length;
          return turns[nextIdx];
        });
      }
    }, 60);
  };

  const dots = DICE_DOTS[diceValue] || [[1, 1]];

  return (
    <div className="w-full rounded-xl border border-border bg-slate-950/90 text-slate-100 p-4 shadow-inner flex flex-col gap-3 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Dices className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-white">Zero-Build Multiplayer Engine</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Listeners
        </span>
      </div>

      {/* Main Dice & Mini Board Action */}
      <div className="grid grid-cols-2 gap-4 items-center">
        {/* Interactive 3D Dice */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10">
          <motion.button
            type="button"
            onClick={rollDice}
            disabled={isRolling}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            animate={isRolling ? { rotate: [0, 90, 180, 270, 360], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5 }}
            aria-label="Roll dice"
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-slate-200 border-2 border-slate-300 shadow-xl flex items-center justify-center p-2.5 cursor-pointer select-none group"
          >
            <div className="grid grid-cols-3 grid-rows-3 w-full h-full gap-1">
              {[0, 1, 2].map((r) =>
                [0, 1, 2].map((c) => {
                  const hasDot = dots.some(([dr, dc]) => dr === r && dc === c);
                  return (
                    <div key={`${r}-${c}`} className="flex items-center justify-center">
                      {hasDot && (
                        <div
                          className={`w-2 h-2 rounded-full ${
                            diceValue === 6 ? "bg-rose-600" : "bg-slate-900"
                          } shadow-xs`}
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </motion.button>

          <div className="mt-2 text-center">
            <span className="text-[11px] font-medium text-slate-300">
              {isRolling ? "Rolling..." : `Rolled a ${diceValue}!`}
            </span>
            <div className="text-[10px] text-muted-fg font-mono">Click dice to roll</div>
          </div>
        </div>

        {/* Mini Game State Info */}
        <div className="flex flex-col gap-2">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <div className="text-[10px] text-slate-400 font-mono">Current Turn</div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  playerTurn === "Red"
                    ? "bg-rose-500"
                    : playerTurn === "Green"
                    ? "bg-emerald-500"
                    : playerTurn === "Yellow"
                    ? "bg-amber-400"
                    : "bg-sky-500"
                }`}
              />
              Player {playerTurn}
            </div>
          </div>

          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <div className="text-[10px] text-slate-400 font-mono">Recent Rolls</div>
            <div className="flex items-center gap-1.5 mt-1 font-mono text-xs">
              {rolls.map((r, i) => (
                <span
                  key={i}
                  className={`px-1.5 py-0.5 rounded ${
                    i === 0 ? "bg-primary text-white font-bold" : "bg-white/10 text-slate-300"
                  }`}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer details */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>Deterministic rules</span>
        <span>2–6 players · Android, Linux, Web</span>
      </div>
    </div>
  );
}
