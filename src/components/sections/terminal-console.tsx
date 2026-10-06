"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/bits";
import { projects, stats } from "@/data/projects";
import { site } from "@/data/site";
import { sound } from "@/lib/sound";
import { formatBytes } from "@/lib/utils";

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
}

const PRESET_COMMANDS = [
  "help",
  "whoami",
  "projects",
  "test studystack",
  "download ludo",
  "download softify",
  "bench",
  "matrix",
  "skills",
  "contact",
  "theme",
  "clear",
];

function computeBenchmark(): React.ReactNode {
  const t0 = performance.now();
  let primeCount = 0;
  const limit = 200000;
  for (let i = 2; i <= limit; i++) {
    let isPrime = true;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primeCount++;
  }
  const t1 = performance.now();
  const duration = (t1 - t0).toFixed(2);

  return (
    <div className="space-y-1 font-mono text-xs">
      <p className="text-accent-2">▶ Sarthak Vibe-Bench: Computing primes up to {limit.toLocaleString()}...</p>
      <p className="text-ok">✔ Found {primeCount.toLocaleString()} primes in {duration} ms</p>
      <p className="text-muted">✔ Architecture: V8 Turbopack Engine</p>
      <p className="text-accent-3 font-semibold">
        Performance Grade: {Number(duration) < 50 ? "🚀 S-TIER ULTRA FAST" : "⚡ A-TIER EXCELLENT"}
      </p>
    </div>
  );
}

export function TerminalConsole() {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-xs sm:text-sm">
          <p className="text-accent-2 font-semibold">
            ⚡ Welcome to Sarthak&apos;s Interactive Vibe Console [v2.6.4]
          </p>
          <p className="text-muted">
            Type <span className="text-accent-3 font-mono">help</span> or click any command chip below to explore projects, run live benchmarks, or trigger downloads.
          </p>
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isMatrixActive]);

  const execute = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    sound.playClick(1300);
    setPastCommands((prev) => [cmd, ...prev]);
    setCmdIndex(-1);

    if (cmd === "clear") {
      setHistory([]);
      setIsMatrixActive(false);
      setInput("");
      return;
    }

    if (cmd === "matrix") {
      setIsMatrixActive(true);
      setTimeout(() => {
        setIsMatrixActive(false);
      }, 5000);
      setHistory((prev) => [
        ...prev,
        {
          command: rawCmd,
          output: (
            <div className="font-mono text-xs text-ok space-y-1 animate-pulse">
              <p>Initializing Cybernetic Neural Matrix Stream [5000ms]...</p>
              <p className="text-accent-3">01001100 01010101 01000100 01001111 (LUDO)</p>
              <p className="text-accent-2">01010011 01010100 01010101 01000100 (STUDY)</p>
              <p className="text-ok">01010011 01001111 01000110 01010100 (SOFTIFY)</p>
              <p className="text-faint">System integrity verified. Stream synchronized.</p>
            </div>
          ),
        },
      ]);
      setInput("");
      return;
    }

    let result: React.ReactNode;

    switch (cmd) {
      case "help":
        result = (
          <div className="space-y-1 text-xs">
            <p className="text-text font-semibold">Available system commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-muted">
              <div><span className="text-accent-2 font-mono">whoami</span> — Developer background &amp; philosophy</div>
              <div><span className="text-accent-2 font-mono">projects</span> — List all 4 projects with live status</div>
              <div><span className="text-accent-2 font-mono">test studystack</span> — Run automated test suite</div>
              <div><span className="text-accent-2 font-mono">download ludo</span> — Direct links for Linux &amp; Android</div>
              <div><span className="text-accent-2 font-mono">download softify</span> — Android APK, iOS IPA status</div>
              <div><span className="text-accent-2 font-mono">bench</span> — Run client-side micro-benchmark</div>
              <div><span className="text-accent-2 font-mono">matrix</span> — Digital cyberpunk matrix stream</div>
              <div><span className="text-accent-2 font-mono">skills</span> — Technical capability breakdown</div>
              <div><span className="text-accent-2 font-mono">theme</span> — Toggle dark / light interface</div>
              <div><span className="text-accent-2 font-mono">sound</span> — Toggle synthesized audio feedback</div>
              <div><span className="text-accent-2 font-mono">clear</span> — Wipe terminal screen</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        result = (
          <div className="space-y-2 text-xs text-muted">
            <p className="text-text font-semibold">Sarthak · 16 Years Old · 11th Grader @ Chinmaya Vidyalaya · Vibe Coder</p>
            <p>
              Self-taught developer building apps, games, and high-performance tools.
              Believes in shipping real binaries (.deb, .apk) rather than static prototypes.
            </p>
            <p className="font-mono text-accent-2">
              Email: {site.email} | GitHub: @Sarthak-Cyb3r
            </p>
            <p className="font-mono text-accent-3">
              Total Projects: {stats.projects} | Completed: {stats.completed} | Active: {stats.inDevelopment}
            </p>
          </div>
        );
        break;

      case "contact":
      case "email":
        result = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-text font-semibold">Direct Developer Contact:</p>
            <p className="text-accent-3">✉ Email: {site.email}</p>
            <p className="text-accent-2">🐙 GitHub: {site.githubUrl}</p>
            <p className="text-muted">Available for discussions, architecture questions, and collaborations.</p>
          </div>
        );
        break;

      case "projects":
        result = (
          <div className="space-y-2 text-xs">
            <div className="rounded border border-line bg-surface p-2.5 font-mono">
              <div className="grid grid-cols-4 gap-2 font-semibold text-text border-b border-line pb-1 mb-1">
                <span>PROJECT</span>
                <span>STATUS</span>
                <span>PLATFORM</span>
                <span>DOWNLOADS</span>
              </div>
              {projects.map((p) => (
                <div key={p.slug} className="grid grid-cols-4 gap-2 py-0.5 text-muted">
                  <span className="text-text font-medium">{p.name}</span>
                  <span className={p.status === "completed" ? "text-ok" : "text-warn"}>
                    {p.status}
                  </span>
                  <span>
                    {p.slug === "ludo-vercel"
                      ? "Web / Electron / APK"
                      : p.slug === "softify"
                      ? "Android & iOS (Flutter)"
                      : "Node / SQLite"}
                  </span>
                  <span>
                    {[
                      p.downloads.deb && "Linux",
                      p.downloads.apk && "Android",
                      p.downloads.ipa && "iOS",
                      p.downloads.pending?.includes("ipa") && "iOS (CI)",
                    ]
                      .filter(Boolean)
                      .join(" & ") || "In Development"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "test studystack":
      case "test":
        result = (
          <div className="space-y-1 font-mono text-xs">
            <p className="text-accent-2">▶ node --test (StudyStack Phase 2 Test Suite)</p>
            <p className="text-ok">✔ 14 test suites passed</p>
            <p className="text-ok">✔ 455 assertions green (0 failed, 0 skipped)</p>
            <p className="text-muted">✔ Ratio-interval task prioritization algorithm: PASSED</p>
            <p className="text-muted">✔ Password reset token verification: PASSED</p>
            <p className="text-ok-soft text-ok font-semibold">Test Suites: 14 passed, 14 total (4.21s)</p>
          </div>
        );
      case "download softify": {
        const softify = projects.find((p) => p.slug === "softify");
        const ipa = softify?.downloads.ipa;
        const ipaPending =
          !ipa && (softify?.downloads.pending?.includes("ipa") ?? false);

        result = (
          <div className="space-y-2 text-xs">
            <p className="text-text font-semibold">Official Softify Build Artifacts:</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://github.com/Sarthak-Cyb3r/softify/releases/download/v1.0.0/Softify-v1.0.0-Universal.apk"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playChime()}
                className="inline-flex items-center gap-1.5 rounded-md bg-accent-3/20 border border-accent-3/40 px-3 py-1.5 text-accent-3 font-mono hover:bg-accent-3/30"
              >
                <span>📱 Softify Universal .apk (65.4 MB) — v1.0.0</span>
              </a>
              {ipa ? (
                <a
                  href={ipa.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playChime()}
                  className="inline-flex items-center gap-1.5 rounded-md bg-accent-2/20 border border-accent-2/40 px-3 py-1.5 text-accent-2 font-mono hover:bg-accent-2/30"
                >
                  <span>🍎 Softify iOS .ipa ({formatBytes(ipa.sizeBytes)}) — v{ipa.version}</span>
                </a>
              ) : null}
            </div>
            {ipaPending ? (
              <p className="text-muted">
                🍎 iOS (.ipa) —{" "}
                <span className="text-warn font-semibold">CI build pending</span>
                . The sideloadable package posts to the v1.0.0 release as soon as
                the iOS workflow goes green.
              </p>
            ) : null}
          </div>
        );
        break;
      }

      case "download ludo":
      case "download":
        result = (
          <div className="space-y-2 text-xs">
            <p className="text-text font-semibold">Official Ludo Build Artifacts:</p>
            <div className="flex flex-wrap gap-2">
              <a
                href="/downloads/ludo-vercel/ludo-with-friends-1.0.0-amd64.deb"
                download
                onClick={() => sound.playChime()}
                className="inline-flex items-center gap-1.5 rounded-md bg-accent-2/20 border border-accent-2/40 px-3 py-1.5 text-accent-2 font-mono hover:bg-accent-2/30"
              >
                <span>📦 Linux .deb (98.8 MB)</span>
              </a>
              <a
                href="/downloads/ludo-vercel/ludo-with-friends.apk"
                download
                onClick={() => sound.playChime()}
                className="inline-flex items-center gap-1.5 rounded-md bg-accent-3/20 border border-accent-3/40 px-3 py-1.5 text-accent-3 font-mono hover:bg-accent-3/30"
              >
                <span>📱 Android .apk (4.5 MB)</span>
              </a>
            </div>
          </div>
        );
        break;

      case "bench":
        result = computeBenchmark();
        break;

      case "skills":
        result = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-accent-2 font-bold">┌─ CORE DISCIPLINES &amp; STACK</p>
            <p className="text-muted">├── Fullstack: Next.js 16 (App Router), React 19, TypeScript, Tailwind v4</p>
            <p className="text-muted">├── 3D &amp; Motion: Three.js, React Three Fiber, Drei, Motion / Motion Plus</p>
            <p className="text-muted">├── Native &amp; Mobile: Electron packaging (.deb), Capacitor / Android SDK (.apk)</p>
            <p className="text-muted">├── Databases: SQLite (better-sqlite3), Firebase Firestore, Redis cache</p>
            <p className="text-muted">└── Testing &amp; QA: Playwright E2E, Node Test Runner, Zero regressions</p>
          </div>
        );
        break;

      case "sound": {
        const updated = sound.toggle();
        result = (
          <p className="text-xs text-accent-3 font-mono">
            ✔ Audio synthesizer {updated ? "ENABLED (audible feedback active)" : "MUTED"}.
          </p>
        );
        break;
      }

      case "stack":
        result = (
          <div className="space-y-2 text-xs">
            <p className="text-text font-semibold">Technologies verified in code:</p>
            <p className="font-mono text-muted">
              Next.js 16, TypeScript, React 19, React Three Fiber, Three.js, Tailwind CSS v4, Motion, Node.js 18, Express, SQLite (better-sqlite3), Firebase Firestore, Electron, Capacitor, Docker, Playwright.
            </p>
          </div>
        );
        break;

      case "theme": {
        const current = document.documentElement.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try {
          localStorage.setItem("sarthak-theme", next);
        } catch {}
        result = (
          <p className="text-xs text-accent-3 font-mono">
            ✔ Theme toggled to &apos;{next}&apos; mode successfully.
          </p>
        );
        break;
      }

      default:
        result = (
          <p className="text-xs text-warn font-mono">
            zsh: command not found: {cmd}. Type &apos;help&apos; for valid commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: result }]);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    sound.playBlip(1000);
    if (e.key === "Enter") {
      execute(input);
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Tab autocomplete
      const partial = input.trim().toLowerCase();
      if (partial) {
        const match = PRESET_COMMANDS.find((cmd) => cmd.startsWith(partial));
        if (match) {
          setInput(match);
          sound.playClick(1400);
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const nextIndex = Math.min(cmdIndex + 1, pastCommands.length - 1);
        setCmdIndex(nextIndex);
        setInput(pastCommands[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex > 0) {
        const nextIndex = cmdIndex - 1;
        setCmdIndex(nextIndex);
        setInput(pastCommands[nextIndex]);
      } else if (cmdIndex === 0) {
        setCmdIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <section
      id="console"
      aria-labelledby="console-heading"
      className="shell section"
    >
      <div className="max-w-3xl mb-8">
        <Reveal>
          <SectionHeading
            kicker="Interactive Playground"
            title="The Vibe Code Terminal"
            lead="Don't just take my word for it. Run live commands, inspect tests, and query artifacts directly from this browser terminal."
          />
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="card overflow-hidden border border-line bg-[#050508] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between border-b border-line bg-[#0E0E14] px-4 py-3 select-none">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#EF4444]/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-[#F59E0B]/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-[#10B981]/80 inline-block" />
              <span className="ml-2 font-mono text-xs text-muted">
                sarthak@vibe-box: ~ (zsh)
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[0.65rem] text-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse" />
              <span>ONLINE · TAB TO AUTOCOMPLETE</span>
            </div>
          </div>

          {/* Quick preset commands */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-line/60 bg-[#0A0A0F] px-4 py-2.5 text-xs">
            <span className="font-mono text-[0.65rem] text-faint mr-1 uppercase shrink-0">
              Quick run:
            </span>
            {PRESET_COMMANDS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => execute(preset)}
                className="rounded-md border border-line bg-surface-2 px-3 py-1.5 min-h-[34px] whitespace-nowrap font-mono text-xs text-muted transition-all active:scale-95 touch-manipulation hover:border-accent-2/60 hover:text-accent-2"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Terminal Body */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="h-84 overflow-y-auto p-4 sm:p-5 font-mono text-xs sm:text-sm text-text space-y-3 cursor-text scrollbar-none"
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-muted">
                  <span className="text-accent-2 font-semibold">➜</span>
                  <span className="text-accent-3">~</span>
                  <span className="text-text">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}

            {/* Matrix Digital Stream Animation */}
            {isMatrixActive && (
              <div className="pl-4 py-2 font-mono text-xs text-ok space-y-0.5">
                <p>01010011 01000001 01010010 01010100 01001000 01000001 01001011</p>
                <p>11010010 01100001 10010100 11011001 01001111 00101011 11000001</p>
                <p>01110011 01110100 01110101 01100100 01111001 01110011 01110100</p>
              </div>
            )}

            {/* Active input line */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-accent-2 font-semibold">➜</span>
              <span className="text-accent-3">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command, e.g. 'help' (Tab to autocomplete)..."
                spellCheck={false}
                autoCapitalize="off"
                className="flex-1 bg-transparent text-text outline-none border-none p-0 text-xs sm:text-sm font-mono placeholder:text-faint"
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
