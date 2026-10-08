"use client";

import {
  AppleLogo,
  Check,
  DeviceMobile,
  DownloadSimple,
  Info,
  Laptop,
  Monitor,
  TerminalWindow,
  Warning,
  type Icon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { DownloadArtifact, DownloadKey, Project } from "@/data/projects";
import type { Platform } from "@/lib/os-detect";
import { detectPlatform } from "@/lib/os-detect";
import { cn, formatBytes } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

interface Confirmation {
  file: string;
  /** Monotonic id so a repeated click replays the check and restarts the timer. */
  seq: number;
}

interface TabDef {
  platform: Platform;
  /** Key inside `project.downloads` that holds this platform's artifact. */
  key: DownloadKey;
  label: string;
  buttonLabel: string;
  Icon: Icon;
  /** OS-appropriate one-liner shown once a real artifact exists. */
  hint: (fileName: string) => { text: string; mono?: boolean };
  /** Honest line when this platform has no artifact yet. */
  note: (projectName: string) => string;
  noteTone: "muted" | "warn";
  /** Label for the disabled control. */
  unavailableLabel: string;
  /** Copy for the "artifact is being built by CI right now" state. */
  pendingNote: (projectName: string) => string;
  /** Label for the disabled control while a build is pending. */
  pendingLabel: string;
}

const TABS: TabDef[] = [
  {
    platform: "linux",
    key: "deb",
    label: "Linux Desktop",
    buttonLabel: "Download for Linux",
    Icon: Laptop,
    hint: (fileName) => {
      if (fileName.endsWith(".sh") || fileName.endsWith(".tar.gz")) {
        return {
          text: "curl -fsSL https://raw.githubusercontent.com/Sarthak-Cyb3r/softify/main/install.sh | bash",
          mono: true,
        };
      }
      return { text: `sudo apt install ./${fileName}`, mono: true };
    },
    note: (projectName) => `No Linux build for ${projectName} has been published yet.`,
    noteTone: "muted",
    unavailableLabel: "Not available yet",
    pendingNote: (projectName) =>
      `The Linux build for ${projectName} is still running in CI.`,
    pendingLabel: "CI build pending",
  },
  {
    platform: "android",
    key: "apk",
    label: "Android (.apk)",
    buttonLabel: "Download for Android",
    Icon: DeviceMobile,
    hint: () => ({
      text: "Open the APK on your phone — Android will ask you to allow installs from unknown sources first.",
    }),
    note: (projectName) => `No .apk for ${projectName} has been published yet.`,
    noteTone: "muted",
    unavailableLabel: "Not available yet",
    pendingNote: (projectName) =>
      `The Android build for ${projectName} is still running in CI.`,
    pendingLabel: "CI build pending",
  },
  {
    platform: "ios",
    key: "ipa",
    label: "iOS / iPadOS (.ipa)",
    buttonLabel: "Download for iOS",
    Icon: AppleLogo,
    hint: () => ({
      text: "Install using AltStore, Sideloadly, TrollStore or SideStore on iOS 15.0+.",
    }),
    note: (projectName) => `No .ipa package for ${projectName} has been published yet.`,
    noteTone: "muted",
    unavailableLabel: "Not available yet",
    pendingNote: (projectName) =>
      `The iOS build for ${projectName} is compiling in CI right now — the .ipa appears on the GitHub release as soon as that run goes green.`,
    pendingLabel: "CI build pending",
  },
  {
    platform: "windows",
    key: "windows",
    label: "Windows",
    buttonLabel: "Download for Windows",
    Icon: Monitor,
    hint: () => ({ text: "Run the downloaded installer and follow the prompts." }),
    note: () =>
      "Windows builds are still in development across the board — nothing to download yet.",
    noteTone: "warn",
    unavailableLabel: "Windows build in development",
    pendingNote: () =>
      "The Windows build is still running in CI — nothing to download yet.",
    pendingLabel: "CI build pending",
  },
];

const controlBase =
  "inline-flex min-h-11 select-none items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm";

/** Mirrors the `primary` variant from ui/button.tsx so a raw `<a download>` matches it pixel for pixel. */
const primaryCta = cn(
  controlBase,
  "font-semibold text-[#08080C] bg-[linear-gradient(105deg,#7C5CFF_0%,#38E1FF_55%,#C6FF4A_100%)] bg-[length:160%_160%] bg-[position:0%_50%] hover:bg-[position:100%_50%] transition-[background-position,transform] duration-500 shadow-[0_16px_40px_-24px_rgba(124,92,255,0.9)] hover:-translate-y-0.5",
);

const disabledCta = cn(
  controlBase,
  "cursor-not-allowed border border-line bg-surface-2 text-muted opacity-45",
);

const INDICATOR_PREFIX = "platform-tab-indicator";

/** `downloads` is keyed by platform, so one lookup covers every tab. */
const artifactFor = (project: Project, key: DownloadKey) =>
  project.downloads[key];

export function PlatformTabs({ project }: { project: Project }) {
  const baseId = useId();
  const tabId = (index: number) => `${baseId}-tab-${TABS[index].platform}`;
  const panelId = `${baseId}-panel`;

  /** Deterministic first paint (SSR + hydration); defaults to first available artifact */
  const defaultIndex = project.downloads.deb
    ? 0
    : project.downloads.apk
    ? 1
    : project.downloads.ipa
    ? 2
    : project.downloads.windows
    ? 3
    : 0;
  const [active, setActive] = useState(defaultIndex);
  const [confirmed, setConfirmed] = useState<Confirmation | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const initialised = useRef(false);
  const confirmSeq = useRef(0);

  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;

    // Defer the correction one microtask: the server HTML and the first client
    // paint both show the default tab (no hydration mismatch), then the real OS
    // is applied before the browser paints — when it differs and that platform
    // has an artifact *or* a build on the way (so an iPhone visitor still lands
    // on the honest iOS state instead of someone else's platform).
    queueMicrotask(() => {
      const detected = detectPlatform();
      if (!detected) return;
      const index = TABS.findIndex((tab) => tab.platform === detected);
      if (index >= 0) {
        const key = TABS[index].key;
        if (
          project.downloads[key] ||
          project.downloads.pending?.includes(key)
        ) {
          setActive(index);
        }
      }
    });
  }, [project.downloads]);

  /** Auto-hide the inline confirmation ~4s after a download starts. */
  useEffect(() => {
    if (!confirmed) return;
    const timer = window.setTimeout(() => setConfirmed(null), 4000);
    return () => window.clearTimeout(timer);
  }, [confirmed]);

  /** Each activation is its own confirmation, so repeats replay the check. */
  const startDownload = (fileName: string) => {
    confirmSeq.current += 1;
    setConfirmed({ file: fileName, seq: confirmSeq.current });
  };

  /** Switching device drops the confirmation — it names the previous file. */
  const selectTab = (index: number) => {
    setActive(index);
    setConfirmed(null);
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next: number;
    switch (event.key) {
      case "ArrowLeft":
        next = (index - 1 + TABS.length) % TABS.length;
        break;
      case "ArrowRight":
        next = (index + 1) % TABS.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = TABS.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    selectTab(next);
    tabRefs.current[next]?.focus();
  };

  const current = TABS[active];
  const artifact = artifactFor(project, current.key);
  const pending =
    !artifact && (project.downloads.pending?.includes(current.key) ?? false);

  return (
    <div className="mt-5">
      <div
        role="tablist"
        aria-label={`Download platform for ${project.name}`}
        className="flex flex-wrap gap-1.5 rounded-2xl border border-line bg-surface-2 p-1.5"
      >
        {TABS.map((tab, index) => {
          const isActive = index === active;
          const TabIcon = tab.Icon;
          const isPending = project.downloads.pending?.includes(tab.key);
          return (
            <button
              key={tab.platform}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={tabId(index)}
              aria-controls={panelId}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={cn(
                "relative inline-flex min-h-11 flex-1 basis-auto items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3.5 text-sm transition-colors duration-200 sm:px-4",
                isActive
                  ? "text-text"
                  : "text-muted hover:text-text focus-visible:text-text",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId={`${baseId}-${INDICATOR_PREFIX}`}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl border border-line-strong bg-surface shadow-[0_14px_30px_-22px_rgba(0,0,0,0.95)]"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              ) : null}
              <TabIcon
                aria-hidden="true"
                weight="bold"
                className="relative h-4 w-4 shrink-0"
              />
              <span className="relative">{tab.label}</span>
              {/* Never colour alone: the dot always ships with screen-reader text. */}
              {isPending && !artifactFor(project, tab.key) ? (
                <span aria-hidden="true" className="relative flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-warn" />
                  <span className="sr-only"> — CI build pending</span>
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(active)}
        {...(artifact ? null : { tabIndex: 0 })}
        className="mt-4 rounded-2xl border border-line bg-surface-2 p-4 sm:p-5"
      >
        <motion.div
          key={current.platform}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          {artifact ? (
            <Downloadable
              artifact={artifact}
              tab={current}
              projectName={project.name}
              confirmed={confirmed}
              onActivate={() => startDownload(artifact.fileName)}
            />
          ) : (
            <Unavailable
              tab={current}
              projectName={project.name}
              pending={pending}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

function Downloadable({
  artifact,
  tab,
  projectName,
  confirmed,
  onActivate,
}: {
  artifact: DownloadArtifact;
  tab: TabDef;
  projectName: string;
  confirmed: Confirmation | null;
  onActivate: () => void;
}) {
  const hint = tab.hint(artifact.fileName);

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
        <div className="min-w-0">
          <p className="truncate font-mono text-xs text-faint">
            {artifact.fileName}
          </p>
          <p className="mt-1.5 text-sm text-muted">
            <span className="tabular font-medium text-text">
              {formatBytes(artifact.sizeBytes)}
            </span>
            <span aria-hidden="true"> · </span>
            <span className="tabular">v{artifact.version}</span>
            <span className="sr-only"> for {projectName}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Real anchor: the download must never be intercepted. */}
          <a
            href={artifact.file}
            download={artifact.file.startsWith("http") ? undefined : artifact.fileName}
            target={artifact.file.startsWith("http") ? "_blank" : undefined}
            rel={artifact.file.startsWith("http") ? "noopener noreferrer" : undefined}
            onClick={onActivate}
            className={primaryCta}
          >
            <DownloadSimple weight="bold" aria-hidden="true" className="h-5 w-5" />
            {tab.buttonLabel}
            <span className="sr-only">
              {` — ${artifact.fileName}, ${formatBytes(artifact.sizeBytes)}, version ${artifact.version}`}
            </span>
          </a>

          <div aria-live="polite" className="flex min-w-0 items-center">
            <AnimatePresence mode="wait" initial={false}>
              {confirmed ? (
                <motion.div
                  key={confirmed.seq}
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.3, ease }}
                  className="flex max-w-full items-center gap-2 rounded-full border border-ok/40 bg-ok-soft px-3 py-1.5"
                >
                  <motion.span
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 520,
                      damping: 22,
                      delay: 0.05,
                    }}
                    className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ok text-bg"
                  >
                    <Check weight="bold" aria-hidden="true" className="h-3.5 w-3.5" />
                  </motion.span>
                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="max-w-[13rem] truncate text-xs text-text">
                      {confirmed.file}
                    </span>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ok">
                      Download started
                    </span>
                  </span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p
        className={cn(
          "mt-4 flex items-start gap-2 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-xs leading-relaxed text-muted",
          hint.mono ? "font-mono" : "font-sans",
        )}
      >
        {hint.mono ? (
          <TerminalWindow
            weight="bold"
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-link"
          />
        ) : (
          <Info
            weight="bold"
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-link"
          />
        )}
        <span>{hint.text}</span>
      </p>
    </>
  );
}

function Unavailable({
  tab,
  projectName,
  pending,
}: {
  tab: TabDef;
  projectName: string;
  pending: boolean;
}) {
  // Three honest states: shipping (handled above), building in CI, not started.
  const tone = pending ? "pending" : tab.noteTone === "warn" ? "warn" : "muted";
  const text = pending
    ? tab.pendingNote(projectName)
    : tab.note(projectName);
  const label = pending ? tab.pendingLabel : tab.unavailableLabel;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <p
        className={cn(
          "flex max-w-md items-start gap-2 rounded-xl border px-3.5 py-2.5 text-xs leading-relaxed",
          tone === "pending" && "border-link/40 bg-link/10 text-link",
          tone === "warn" && "border-warn/40 bg-warn-soft text-warn",
          tone === "muted" && "border-line bg-surface text-muted",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 shrink-0",
            tone === "pending" && "text-link",
            tone === "warn" && "text-warn",
            tone === "muted" && "text-faint",
          )}
        >
          {tone === "muted" ? (
            <Info weight="bold" className="h-4 w-4" />
          ) : (
            <Warning weight="bold" className="h-4 w-4" />
          )}
        </span>
        <span>{text}</span>
      </p>

      <button
        type="button"
        disabled
        aria-disabled="true"
        className={cn(disabledCta, "shrink-0")}
      >
        {label}
      </button>
    </div>
  );
}
