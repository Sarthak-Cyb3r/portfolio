"use client";

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  CircleDashed,
  DownloadSimple,
  Eye,
  GameController,
  GraduationCap,
  Headphones,
  Pause,
  Play,
  TrendUp,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Chip, StatusBadge } from "@/components/ui/bits";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { getProject, projects } from "@/data/projects";
import { sound } from "@/lib/sound";

export function FeaturedBento() {
  const ludo = getProject("ludo-vercel")!;
  const studystack = getProject("studystack")!;
  const softify = getProject("softify")!;
  const accounty = getProject("accounty")!;
  // The iOS artifact only counts as shipped once the release actually carries it.
  const softifyIpaPending =
    !softify.downloads.ipa &&
    (softify.downloads.pending?.includes("ipa") ?? false);

  // -------------------------------------------------------------
  // LUDO STATE: Interactive board preview & 3D dice roller
  // -------------------------------------------------------------
  const [ludoMode, setLudoMode] = useState<"demo" | "board" | "score">("demo");
  const [diceRolling, setDiceRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(6);
  const [diceLog, setDiceLog] = useState<string>("Ready to roll. Click dice to simulate multiplayer turn.");

  const ludoImage =
    ludoMode === "demo"
      ? "/projects/ludo/demo-board.png"
      : ludoMode === "board"
      ? "/projects/ludo/home.png"
      : "/projects/ludo/scoreboard.png";

  const handleRollDice = () => {
    if (diceRolling) return;
    setDiceRolling(true);
    sound.playClick(800);
    sound.haptic([15, 20, 15]);

    let rolls = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      sound.playBlip(600 + rolls * 50);
      sound.haptic(10);
      rolls++;
      if (rolls > 6) {
        clearInterval(interval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);
        setDiceRolling(false);
        sound.playChime();
        sound.haptic([25, 40, 30]);
        if (finalValue === 6) {
          setDiceLog("🎉 Rolled 6! Free turn + token deployed from Yard to Star.");
        } else {
          setDiceLog(`Moved token ${finalValue} steps along the Pentagon circuit.`);
        }
      }
    }, 80);
  };

  // -------------------------------------------------------------
  // STUDYSTACK STATE: Interactive Spaced Repetition Flashcard
  // -------------------------------------------------------------
  const [flipped, setFlipped] = useState(false);
  const [studyScore, setStudyScore] = useState(94.2);
  const [studyFeedback, setStudyFeedback] = useState("Ratio interval: Priority high");

  const handleStudyGrade = (grade: "hard" | "good" | "easy") => {
    sound.haptic(grade === "easy" ? [15, 30] : 14);
    sound.playClick(grade === "easy" ? 1400 : 1000);
    if (grade === "hard") {
      setStudyScore((prev) => Math.max(70, Number((prev - 4.5).toFixed(1))));
      setStudyFeedback("Next review: in 12h (Urgency boosted)");
    } else if (grade === "good") {
      setStudyScore((prev) => Math.min(98, Number((prev + 1.2).toFixed(1))));
      setStudyFeedback("Next review: in 2 days (Interval optimized)");
    } else {
      setStudyScore((prev) => Math.min(99.5, Number((prev + 3.8).toFixed(1))));
      setStudyFeedback("Mastered! Next review: in 6 days");
    }
    setFlipped(false);
  };

  // -------------------------------------------------------------
  // SOFTIFY STATE: Real Web Audio synth preview
  // -------------------------------------------------------------
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    let stopFn: (() => void) | null = null;
    if (isPlayingAudio) {
      stopFn = sound.playMelodyPreview();
    }
    return () => {
      stopFn?.();
    };
  }, [isPlayingAudio]);

  const toggleSoftifyAudio = () => {
    sound.haptic(20);
    sound.playClick(1100);
    setIsPlayingAudio((prev) => !prev);
  };

  // -------------------------------------------------------------
  // ACCOUNTY STATE: Interactive cash flow period filter
  // -------------------------------------------------------------
  const [accountyPeriod, setAccountyPeriod] = useState<"1M" | "3M" | "6M" | "1Y">("1M");

  const accountyData = {
    "1M": { amount: "-$420.00 / mo", path: "M0 32 Q25 8, 50 25 T100 12 T140 18", label: "Monthly Net Burn" },
    "3M": { amount: "-$1,260.00 / qtr", path: "M0 35 Q30 14, 60 20 T110 8 T140 12", label: "Q3 Cumulative Burn" },
    "6M": { amount: "-$2,480.00 / h1", path: "M0 28 Q35 30, 70 12 T120 16 T140 6", label: "H1 Operating Run Rate" },
    "1Y": { amount: "-$4,920.00 / yr", path: "M0 30 Q40 10, 80 24 T130 10 T140 14", label: "Annual Server Infrastructure" },
  };

  return (
    <section
      id="work"
      aria-labelledby="featured-work-heading"
      className="shell section"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-12 sm:mb-16">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2 animate-pulse" />
              <span>Flagship Showcase</span>
            </div>
            <h2 id="featured-work-heading" className="text-[clamp(2rem,1.2rem+3vw,3.6rem)]">
              Crafted with discipline. <br />
              <span className="aurora-text">Shipped to production.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Every project here is grounded in real code, verifiable test suites, and packaged native binaries.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="shrink-0">
          <Button href="/projects" variant="quiet" onClick={() => sound.playClick(1000)}>
            View All Projects ({projects.length})
            <ArrowRight size={15} weight="bold" aria-hidden="true" />
          </Button>
        </Reveal>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* ============================================================== */}
        {/* CARD 1: Ludo Multiplayer — Massive 2-Col Flagship Card (8 cols) */}
        {/* ============================================================== */}
        <div className="md:col-span-12 lg:col-span-8">
          <SpotlightCard
            spotlightColor="rgba(124, 92, 255, 0.16)"
            className="p-6 sm:p-8 border-line-strong bg-surface"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[linear-gradient(135deg,#7C5CFF,#38E1FF)] flex items-center justify-center text-[#08080C] shadow-lg">
                  <GameController size={22} weight="bold" />
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl text-text font-bold">
                    {ludo.name}
                  </h3>
                  <p className="font-mono text-xs text-muted">
                    Multiplayer Cross/Pentagon/Hexagon Engine
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <StatusBadge status="completed" />
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-ok/30 bg-ok-soft px-2.5 py-1 font-mono text-[0.65rem] text-ok">
                  <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                  Live on Vercel
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-muted leading-relaxed max-w-2xl mb-6">
              {ludo.tagline} Built with zero frontend build dependencies, Firebase Firestore real-time synchronization, and packaged as native Android APK and Linux .deb installers.
            </p>

            {/* Interactive Board Preview Screen with Mode Selector */}
            <div className="relative rounded-xl overflow-hidden border border-line bg-surface-2 p-2 sm:p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3 mb-3">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick(1100);
                      setLudoMode("demo");
                    }}
                    className={`rounded-md px-3.5 py-1.5 min-h-[38px] font-mono text-xs whitespace-nowrap transition-all active:scale-95 touch-manipulation ${
                      ludoMode === "demo"
                        ? "bg-accent-2 text-[#08080C] font-semibold"
                        : "text-muted hover:text-text bg-surface"
                    }`}
                  >
                    5-Player Pentagon
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick(1100);
                      setLudoMode("board");
                    }}
                    className={`rounded-md px-3.5 py-1.5 min-h-[38px] font-mono text-xs whitespace-nowrap transition-all active:scale-95 touch-manipulation ${
                      ludoMode === "board"
                        ? "bg-accent-2 text-[#08080C] font-semibold"
                        : "text-muted hover:text-text bg-surface"
                    }`}
                  >
                    Classic Lobby
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick(1100);
                      setLudoMode("score");
                    }}
                    className={`rounded-md px-3.5 py-1.5 min-h-[38px] font-mono text-xs whitespace-nowrap transition-all active:scale-95 touch-manipulation ${
                      ludoMode === "score"
                        ? "bg-accent-2 text-[#08080C] font-semibold"
                        : "text-muted hover:text-text bg-surface"
                    }`}
                  >
                    Leaderboard
                  </button>
                </div>

                <div className="flex items-center gap-2 font-mono text-[0.7rem] text-accent-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-3 animate-ping" />
                  <span>ROOM: #7X9KW</span>
                </div>
              </div>

              <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-[#0A0A0F]">
                <Image
                  src={ludoImage}
                  alt="Ludo real-time game view"
                  fill
                  className="object-contain transition-opacity duration-300"
                />
              </div>

              {/* Interactive Dice Roller Bar */}
              <div className="mt-3 pt-3 border-t border-line/60 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleRollDice}
                    disabled={diceRolling}
                    className="flex items-center gap-2 rounded-lg bg-[linear-gradient(135deg,#7C5CFF,#38E1FF)] px-4 py-2.5 min-h-[44px] font-mono text-xs font-bold text-[#08080C] hover:opacity-95 active:scale-95 transition-all shadow-md disabled:opacity-50 touch-manipulation"
                  >
                    <span className="text-base">🎲</span>
                    <span>{diceRolling ? "Rolling..." : `Roll: ${diceValue}`}</span>
                  </button>

                  <p className="font-mono text-xs text-muted truncate max-w-[260px] sm:max-w-md">
                    {diceLog}
                  </p>
                </div>

                <span className="font-mono text-[0.65rem] text-faint">
                  Engine: Turn-based WebSocket/Firestore
                </span>
              </div>
            </div>

            {/* Tech Chips & Quick Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-2">
              <div className="flex flex-wrap gap-1.5">
                {ludo.stack.slice(0, 4).map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {ludo.liveUrl ? (
                  <Button
                    href={ludo.liveUrl}
                    external
                    variant="primary"
                    className="!text-xs !py-2 !min-h-9"
                    onClick={() => sound.playClick(1200)}
                  >
                    Play Live
                    <ArrowUpRight size={14} weight="bold" />
                  </Button>
                ) : null}

                <Link
                  href={`/projects/${ludo.slug}`}
                  onClick={() => sound.playClick(1000)}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3.5 py-1.5 text-xs font-medium text-text hover:border-line-strong hover:bg-surface transition-colors"
                >
                  <DownloadSimple size={14} />
                  Get .deb / .apk
                </Link>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* ============================================================== */}
        {/* CARD 2: StudyStack — 4 cols, Deep Architecture & Tests         */}
        {/* ============================================================== */}
        <div className="md:col-span-12 lg:col-span-4">
          <SpotlightCard
            spotlightColor="rgba(56, 225, 255, 0.16)"
            className="p-6 sm:p-7 border-line bg-surface flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-accent-2/10 border border-accent-2/30 flex items-center justify-center text-accent-2">
                  <GraduationCap size={22} weight="duotone" />
                </div>
                <StatusBadge status="in-development" />
              </div>

              <h3 className="font-display text-2xl text-text font-bold">
                {studystack.name}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Academic manager that prioritizes backlogs, timetable slots, and deadlines through a mathematically weighted scoring engine.
              </p>

              {/* Test Suite Passed Badge */}
              <div className="mt-5 rounded-xl border border-ok/30 bg-ok-soft p-3.5 space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="flex items-center gap-1.5 text-ok font-semibold">
                    <CheckCircle weight="fill" size={16} />
                    455 / 455 Tests Passing
                  </span>
                  <span className="text-muted">100% Green</span>
                </div>
                <p className="text-[0.7rem] text-muted leading-relaxed">
                  Phase 2 shipped with 5 release gates passing. Urgency × workload calculation fully verified.
                </p>
              </div>

              {/* Interactive Flashcard / Algorithm Demo */}
              <div className="mt-4 rounded-xl border border-line bg-surface-2 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-faint">
                    Spaced Repetition Engine
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      sound.haptic(12);
                      sound.playClick(1000);
                      setFlipped(!flipped);
                    }}
                    className="flex items-center gap-1.5 font-mono text-xs text-accent-2 hover:underline min-h-[36px] py-1 px-2.5 rounded border border-accent-2/20 bg-accent-2/5 active:scale-95 touch-manipulation"
                  >
                    <Eye size={13} />
                    {flipped ? "Hide Answer" : "Reveal Answer"}
                  </button>
                </div>

                <div className="rounded-lg border border-line/60 bg-surface p-2.5 font-mono text-xs">
                  <p className="text-text font-medium">
                    Q: Constant-time scrypt password hashing parameter?
                  </p>
                  {flipped && (
                    <p className="mt-1 text-ok font-semibold text-[0.75rem] border-t border-line/50 pt-1">
                      A: N=16384, r=8, p=1 (Node crypto scrypt)
                    </p>
                  )}
                </div>

                {flipped && (
                  <div className="grid grid-cols-3 gap-2 pt-1.5">
                    <button
                      type="button"
                      onClick={() => handleStudyGrade("hard")}
                      className="rounded-lg bg-warn-soft text-warn text-xs font-mono py-2.5 min-h-[42px] font-bold hover:bg-warn/20 active:scale-95 touch-manipulation transition-all"
                    >
                      Hard
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStudyGrade("good")}
                      className="rounded-lg bg-accent/20 text-link text-xs font-mono py-2.5 min-h-[42px] font-bold hover:bg-accent/30 active:scale-95 touch-manipulation transition-all"
                    >
                      Good
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStudyGrade("easy")}
                      className="rounded-lg bg-ok-soft text-ok text-xs font-mono py-2.5 min-h-[42px] font-bold hover:bg-ok/20 active:scale-95 touch-manipulation transition-all"
                    >
                      Easy
                    </button>
                  </div>
                )}

                <div className="space-y-1.5 text-xs font-mono pt-1">
                  <div className="flex justify-between text-muted">
                    <span>Task Priority Index</span>
                    <span className="text-accent-3 font-semibold">{studyScore} / 100</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-surface overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent-3 transition-all duration-500"
                      style={{ width: `${studyScore}%` }}
                    />
                  </div>
                  <p className="text-[0.65rem] text-faint text-right">{studyFeedback}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
              <span className="font-mono text-xs text-faint">Node 18 · SQLite · scrypt</span>
              <Link
                href={`/projects/${studystack.slug}`}
                onClick={() => sound.playClick(1000)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-link hover:text-text transition-colors"
              >
                Inspect roadmap
                <ArrowRight size={13} weight="bold" />
              </Link>
            </div>
          </SpotlightCard>
        </div>

        {/* ============================================================== */}
        {/* CARD 3: Softify — 6 cols, Audio Player Spectrum                 */}
        {/* ============================================================== */}
        <div className="md:col-span-12 lg:col-span-6">
          <SpotlightCard
            spotlightColor="rgba(198, 255, 74, 0.16)"
            className="p-6 sm:p-7 border-line bg-surface"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent-3/10 border border-accent-3/30 flex items-center justify-center text-accent-3">
                  <Headphones size={22} weight="duotone" />
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl text-text font-bold">
                    {softify.name}
                  </h3>
                  <p className="font-mono text-xs text-muted">Flutter Android &amp; iOS · 320kbps Audio</p>
                </div>
              </div>
              <StatusBadge status={softify.status} />
            </div>

            <p className="text-sm text-muted leading-relaxed mb-5">
              {softify.tagline}
            </p>

            {/* Interactive Audio Player & Equalizer */}
            <div className="rounded-xl border border-line bg-surface-2 p-4 flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleSoftifyAudio}
                  className={`h-11 w-11 min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center transition-all active:scale-90 touch-manipulation ${
                    isPlayingAudio
                      ? "bg-accent-3 text-[#08080C] shadow-[0_0_16px_rgba(198,255,74,0.4)]"
                      : "bg-surface border border-line text-accent-3 hover:border-accent-3"
                  }`}
                  aria-label={isPlayingAudio ? "Pause preview sound loop" : "Play preview sound loop"}
                >
                  {isPlayingAudio ? (
                    <Pause size={18} weight="fill" />
                  ) : (
                    <Play size={18} weight="fill" className="translate-x-0.5" />
                  )}
                </button>

                <div className="flex items-end gap-1 h-7">
                  <span className={`w-1 bg-accent-3 rounded-full ${isPlayingAudio ? "animate-[soundwave_0.8s_ease-in-out_infinite]" : "h-2"}`} />
                  <span className={`w-1 bg-accent-2 rounded-full ${isPlayingAudio ? "animate-[soundwave_1.2s_ease-in-out_0.2s_infinite]" : "h-3"}`} />
                  <span className={`w-1 bg-accent rounded-full ${isPlayingAudio ? "animate-[soundwave_0.7s_ease-in-out_0.4s_infinite]" : "h-4"}`} />
                  <span className={`w-1 bg-accent-3 rounded-full ${isPlayingAudio ? "animate-[soundwave_1.1s_ease-in-out_0.1s_infinite]" : "h-2.5"}`} />
                  <span className={`w-1 bg-accent-2 rounded-full ${isPlayingAudio ? "animate-[soundwave_1.4s_ease-in-out_0.3s_infinite]" : "h-3.5"}`} />
                  <span className={`w-1 bg-accent rounded-full ${isPlayingAudio ? "animate-[soundwave_0.9s_ease-in-out_0.5s_infinite]" : "h-2"}`} />
                </div>

                <div className="font-mono text-xs">
                  <span className="text-text font-medium block">
                    {isPlayingAudio ? "Streaming Synthesized Chords" : "Zero-Latency Audio Engine"}
                  </span>
                  <span className="text-faint text-[0.7rem]">
                    {isPlayingAudio ? "Web Audio API Harmonic Loop" : "Click play for synth demo"}
                  </span>
                </div>
              </div>

              <span className="font-mono text-[0.6875rem] text-accent-3 border border-accent-3/30 rounded-md px-2 py-0.5">
                NO ADS
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-xs flex items-center gap-1.5 ${
                    softifyIpaPending ? "text-warn" : "text-ok"
                  }`}
                >
                  {softifyIpaPending ? (
                    <CircleDashed size={14} weight="fill" />
                  ) : (
                    <CheckCircle size={14} weight="fill" />
                  )}
                  {softifyIpaPending
                    ? "Android APK shipped · iOS IPA in CI"
                    : "Android APK + iOS IPA Shipped"}
                </span>
                {softify.repoUrl && (
                  <a
                    href={softify.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[0.6875rem] text-muted hover:text-text border border-line rounded px-2 py-0.5 transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
              <Link
                href={`/projects/${softify.slug}`}
                onClick={() => sound.playClick(1000)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-link hover:text-text transition-colors"
              >
                Case study &amp; Downloads
                <ArrowRight size={13} weight="bold" />
              </Link>
            </div>
          </SpotlightCard>
        </div>

        {/* ============================================================== */}
        {/* CARD 4: Accounty — 6 cols, Financial Intelligence Sparkline    */}
        {/* ============================================================== */}
        <div className="md:col-span-12 lg:col-span-6">
          <SpotlightCard
            spotlightColor="rgba(56, 225, 255, 0.16)"
            className="p-6 sm:p-7 border-line bg-surface"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent-2/10 border border-accent-2/30 flex items-center justify-center text-accent-2">
                  <TrendUp size={22} weight="duotone" />
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl text-text font-bold">
                    {accounty.name}
                  </h3>
                  <p className="font-mono text-xs text-muted">Expense &amp; Analytics Tracker</p>
                </div>
              </div>
              <StatusBadge status="in-development" />
            </div>

            <p className="text-sm text-muted leading-relaxed mb-5">
              {accounty.tagline} Monthly cash-flow visualization with automatic categorization and zero tracking.
            </p>

            {/* Sparkline curve preview with Period Tabs */}
            <div className="rounded-xl border border-line bg-surface-2 p-4 mb-4">
              <div className="flex items-center justify-between mb-3 border-b border-line/60 pb-2.5">
                <div className="space-y-0.5">
                  <span className="font-mono text-[0.65rem] text-faint uppercase tracking-wider">
                    {accountyData[accountyPeriod].label}
                  </span>
                  <p className="font-display text-lg text-text font-bold">
                    {accountyData[accountyPeriod].amount}
                  </p>
                </div>

                {/* Period Switcher */}
                <div className="flex items-center gap-1">
                  {(["1M", "3M", "6M", "1Y"] as const).map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => {
                        sound.haptic(10);
                        sound.playClick(1200);
                        setAccountyPeriod(period);
                      }}
                      className={`px-2.5 py-1.5 min-h-[36px] min-w-[36px] rounded font-mono text-xs transition-all active:scale-95 touch-manipulation ${
                        accountyPeriod === period
                          ? "bg-accent-2 text-[#08080C] font-semibold"
                          : "text-muted hover:text-text bg-surface"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mini SVG sparkline */}
              <div className="w-full h-12">
                <svg viewBox="0 0 140 40" className="w-full h-full overflow-visible">
                  <path
                    d={accountyData[accountyPeriod].path}
                    fill="none"
                    stroke="#38E1FF"
                    strokeWidth="2.5"
                    className="transition-all duration-300"
                  />
                  <path
                    d={`${accountyData[accountyPeriod].path} L140 40 L0 40 Z`}
                    fill="url(#sparkline-grad)"
                    opacity="0.3"
                    className="transition-all duration-300"
                  />
                  <defs>
                    <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38E1FF" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-xs text-faint">In Development</span>
              <Link
                href={`/projects/${accounty.slug}`}
                onClick={() => sound.playClick(1000)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-link hover:text-text transition-colors"
              >
                View status
                <ArrowRight size={13} weight="bold" />
              </Link>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
