"use client";

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { Terminal as TerminalIcon, Sparkles } from "lucide-react";
import { useInView } from "motion/react";
import { projects } from "@/data/projects";
import { site, EMAIL, GITHUB_URL } from "@/data/site";
import { SectionHeader } from "@/components/ui/section-header";

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

const COMMANDS = [
  "help",
  "whoami",
  "projects",
  "skills",
  "download",
  "contact",
  "theme",
  "clear",
] as const;

export function TerminalConsole() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const autoTypeFired = useRef(false);

  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "sysinfo",
      output: (
        <div className="space-y-1 text-xs text-slate-400 font-mono">
          <p className="text-primary font-semibold">Sarthak Terminal</p>
          <p>Native Flutter · Next.js 16 · SQLite FTS5 · Zero Telemetry</p>
          <p>Type <span className="text-white font-bold underline">help</span> or tap any suggested command below.</p>
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const execute = useCallback((rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    setPastCommands((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    let out: React.ReactNode;

    switch (cmd) {
      case "help":
        out = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-slate-400 font-medium">Available production commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
              <div><span className="text-primary font-semibold">whoami</span> — Profile summary & background</div>
              <div><span className="text-primary font-semibold">projects</span> — Flagship builds & status</div>
              <div><span className="text-primary font-semibold">skills</span> — Verified technical toolchain</div>
              <div><span className="text-primary font-semibold">download</span> — Compiled native packages</div>
              <div><span className="text-primary font-semibold">contact</span> — Reach out directly</div>
              <div><span className="text-primary font-semibold">theme</span> — Toggle light / dark mode</div>
              <div><span className="text-primary font-semibold">clear</span> — Reset terminal history</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        out = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="font-semibold text-white">Sarthak</p>
            <p className="text-slate-400">
              16-year-old solo software developer. Building native Android, iOS, Linux, and web applications.
            </p>
            <p className="text-slate-400">
              GitHub: <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-primary underline">{GITHUB_URL}</a>
            </p>
          </div>
        );
        break;

      case "projects":
        out = (
          <div className="space-y-2 text-xs font-mono">
            {projects.map((p) => (
              <div key={p.slug} className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{p.name}</span>
                  <span className="text-slate-400">[{p.statusLabel}]</span>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-primary underline">
                      live
                    </a>
                  )}
                </div>
                <p className="text-slate-400">{p.outcome}</p>
              </div>
            ))}
            <div className="flex flex-col gap-0.5 pt-1 border-t border-white/10">
              <span className="font-semibold text-white">Accounty [In Progress]</span>
              <p className="text-slate-400">Personal finance tracking app (in active prototyping).</p>
            </div>
          </div>
        );
        break;

      case "skills":
        out = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p><span className="text-slate-400">Mobile:</span> Flutter, Dart, Android SDK</p>
            <p><span className="text-slate-400">Web:</span> Next.js, React, TypeScript, Tailwind CSS</p>
            <p><span className="text-slate-400">Backend & Data:</span> Node.js, SQLite FTS5, Firebase Firestore Listeners</p>
            <p><span className="text-slate-400">Tooling:</span> Git, Linux, Docker, Vercel</p>
          </div>
        );
        break;

      case "download":
        out = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="font-medium text-white">Verified application packages:</p>
            <ul className="space-y-1 text-slate-300">
              <li>
                Softify:{" "}
                <a href={projects[0].downloads.apk?.file} className="text-primary underline">Android APK</a> ·{" "}
                <a href={projects[0].downloads.ipa?.file} className="text-primary underline">iOS IPA</a> ·{" "}
                <a href={projects[0].downloads.tar?.file} className="text-primary underline">Linux x64</a>
              </li>
              <li>
                Ludo:{" "}
                <a href={projects[1].downloads.apk?.file} className="text-primary underline">Android APK (4.5 MB)</a> ·{" "}
                <a href={projects[1].downloads.deb?.file} className="text-primary underline">Linux .deb (95 MB)</a>
              </li>
            </ul>
          </div>
        );
        break;

      case "contact":
        out = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-slate-400">
              Email: <span className="font-semibold text-white">{EMAIL}</span>
            </p>
            <p className="text-slate-400">
              GitHub: <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-primary underline">{site.handle}</a>
            </p>
          </div>
        );
        break;

      case "theme": {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        const next = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("sarthak-theme", next);
        out = <p className="text-xs text-slate-400 font-mono">Switched theme to {next} mode.</p>;
        break;
      }

      default:
        out = (
          <p className="text-xs text-slate-400 font-mono">
            Command not recognized: <span className="font-semibold text-white">{cmd}</span>. Type <span className="text-primary underline">help</span> for available commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: out }]);
    setInput("");
  }, []);

  // Autoplay typing demo on first view
  useEffect(() => {
    if (!isInView || autoTypeFired.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    autoTypeFired.current = true;
    const demoCmd = "whoami";
    let charIndex = 0;

    const timer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (charIndex <= demoCmd.length) {
          setInput(demoCmd.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            execute("whoami");
          }, 300);
        }
      }, 70);
    }, 600);

    return () => clearTimeout(timer);
  }, [isInView, execute]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      execute(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const nextIndex = Math.min(historyIndex + 1, pastCommands.length - 1);
        setHistoryIndex(nextIndex);
        setInput(pastCommands[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(pastCommands[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <section id="terminal" className="py-24 sm:py-32 border-t border-border/80 bg-dot-pattern/40">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Terminal"
          title="Interactive console."
          description="Inspect system specs, binaries, and repositories directly via command line."
        />

        <div
          ref={containerRef}
          className="relative rounded-2xl border border-slate-800 bg-slate-950/95 text-slate-200 shadow-2xl overflow-hidden font-mono"
        >
          {/* Subtle Scanline Overlay */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40 z-10"
            aria-hidden
          />

          {/* macOS-style Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-900/80 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              {/* macOS window action dots */}
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-xs" />
                <span className="w-3 h-3 rounded-full bg-amber-500/90 shadow-xs" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-xs" />
              </div>
              <TerminalIcon className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] text-slate-300">sarthak@portfolio — zsh</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>UTF-8</span>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="relative z-20 p-5 sm:p-6 text-sm min-h-[300px] max-h-[440px] overflow-y-auto space-y-4 cursor-text"
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                {item.command !== "sysinfo" && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-primary font-bold">➜</span>
                    <span className="text-emerald-400 font-semibold">~</span>
                    <span className="text-white">{item.command}</span>
                  </div>
                )}
                <div>{item.output}</div>
              </div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center gap-2 text-xs pt-1">
              <span className="text-primary font-bold">➜</span>
              <span className="text-emerald-400 font-semibold">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command (e.g. whoami, projects, help)..."
                className="w-full bg-transparent text-white placeholder:text-slate-500 outline-none font-mono text-xs"
              />
            </div>
            <div ref={bottomRef} />
          </div>

          {/* Suggested Quick-Action Chips */}
          <div className="relative z-20 p-3 sm:p-4 border-t border-white/10 bg-slate-900/60 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-400 mr-1.5 hidden sm:inline">
              Suggested:
            </span>
            {COMMANDS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => execute(cmd)}
                className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 transition-all cursor-pointer active:scale-95"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
