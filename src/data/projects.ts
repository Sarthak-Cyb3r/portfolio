export type ProjectStatus = "completed" | "in-development";

export interface DownloadArtifact {
  /** Public URL path, e.g. "/downloads/ludo-vercel/ludo-with-friends.apk" */
  file: string;
  /** Exact size on disk, in bytes */
  sizeBytes: number;
  /** Version label shown next to the button */
  version: string;
  /** Download filename shown to the visitor */
  fileName: string;
}

export type DownloadKey = "deb" | "apk" | "ipa" | "windows";

export interface ProjectDownloads {
  deb?: DownloadArtifact;
  apk?: DownloadArtifact;
  ipa?: DownloadArtifact;
  windows?: DownloadArtifact;
  /**
   * Platforms whose artifact is being built right now (e.g. a red CI run).
   * Renders a disabled "CI build pending" control instead of a link that 404s.
   * Removing the key once the file is published is all it takes to go live.
   */
  pending?: DownloadKey[];
}

export interface ReleaseChange {
  title: string;
  badge?: string;
  problem?: string;
  fix: string;
  details?: string[];
}

export interface ReleaseNote {
  version: string;
  tag: string;
  date: string;
  title: string;
  summary: string;
  changes: ReleaseChange[];
  assets?: {
    name: string;
    size: string;
    platform: string;
    url: string;
  }[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  status: ProjectStatus;
  /** One honest sentence about where the project actually stands */
  progressNote: string;
  /** Real next steps for in-development projects. Empty = nothing published yet. */
  roadmap: string[];
  cover?: string;
  liveUrl?: string;
  repoUrl?: string;
  screenshots: string[];
  downloads: ProjectDownloads;
  releaseNotes?: ReleaseNote[];
}

export const projects: Project[] = [
  {
    slug: "ludo-vercel",
    name: "Ludo",
    tagline:
      "Multiplayer Ludo for 2–6 players — open a room, share the 5-letter code, play with friends from any device.",
    description:
      "Ludo is a real-time multiplayer Ludo site built as a zero-build static app. A cross board for 2–4 players, a pentagon for 5 and a hexagon for 6 all run off the same room-code flow: create a room, send the code, friends join from their phone or laptop. Firestore holds the live room state, anonymous Firebase Auth handles identity, and a service worker turns the site into an installable PWA. The same codebase ships as a native Android app (Capacitor) and a Linux desktop app (Electron), both built from this repo.",
    features: [
      "5-letter room codes — friends join from any device",
      "Three board shapes: classic cross (2–4), pentagon (5), hexagon (6)",
      "Live Firestore sync for moves, turns and board state",
      "In-room chat while you play",
      "Playable demo mode that works without Firebase",
      "Installable PWA with offline shell and launcher icons",
      "Native Android build via Capacitor",
      "Linux .deb and AppImage builds via Electron",
    ],
    stack: [
      "Vanilla JS (ES modules)",
      "Firebase Firestore",
      "Firebase Auth (anonymous)",
      "Service Worker / PWA",
      "Capacitor (Android)",
      "Electron (Linux)",
      "Vercel",
    ],
    status: "completed",
    progressNote:
      "Shipped. The site is deployed on Vercel and the Android and Linux installers are built and published.",
    roadmap: [],
    cover: "/projects/ludo/logo.png",
    liveUrl: "https://ludo-vercel-rho.vercel.app",
    repoUrl: "https://github.com/Sarthak-Cyb3r/ludo-vercel",
    screenshots: [
      "/projects/ludo/home.png",
      "/projects/ludo/demo-board.png",
      "/projects/ludo/scoreboard.png",
      "/projects/ludo/logo.png",
    ],
    downloads: {
      deb: {
        file: "/downloads/ludo-vercel/ludo-with-friends-1.0.0-amd64.deb",
        sizeBytes: 98844460,
        version: "1.0.0",
        fileName: "ludo-with-friends-1.0.0-amd64.deb",
      },
      apk: {
        file: "/downloads/ludo-vercel/ludo-with-friends.apk",
        sizeBytes: 4710178,
        version: "1.0",
        fileName: "ludo-with-friends.apk",
      },
    },
  },
  {
    slug: "studystack",
    name: "StudyStack",
    tagline:
      "App to manage academics — lectures, backlogs, assignments and everything with a deadline on it.",
    description:
      "StudyStack answers one question: what should I study right now? It folds the pieces students usually spread across a notes app, a calendar and a task manager into a single prioritised surface — a weekly timetable, homework with deadlines, a derived backlog view, and revision sessions that feed back into scoring. A ratio-interval engine ranks active tasks by deadline urgency, remaining workload and task type, so the dashboard order is computed rather than guessed.",
    features: [
      "Prioritised dashboard — the top item is what to study next",
      "Weekly timetable with per-day class slots",
      "Tasks and assignments with deadlines and estimated hours",
      "Backlog view: everything incomplete, grouped by subject",
      "Revision plans per chapter with session tracking",
      "Scoring engine: urgency × workload × task type",
      "CSV and RFC 5545 iCalendar export",
      "Light and dark themes with a tested contrast gate",
      "scrypt auth with server-revocable session cookies",
      "Single-use hashed-token password reset",
    ],
    stack: [
      "Node.js 18",
      "Express 4",
      "SQLite (better-sqlite3)",
      "EJS templates",
      "Hand-written CSS",
      "Docker",
      "Node test runner",
    ],
    status: "in-development",
    progressNote:
      "Phase 2 shipped — 455/455 tests passing and five release gates green. Not cleared for deployment: the Docker image has never been built and no host exists yet.",
    roadmap: [
      "Build the Docker image and run a real deployment with TLS",
      "Wire a real mail transport so password reset works in production",
      "Email verification for registrations, reusing the reset-token flow",
      "Per-subject backlog filters and a month-view calendar",
      "Repair the visual regression gate and verify WCAG 1.4.10 reflow",
    ],
    cover: "/projects/studystack/dashboard.png",
    repoUrl: "https://github.com/Sarthak-Cyb3r/studystack",
    screenshots: [
      "/projects/studystack/dashboard.png",
      "/projects/studystack/subjects.png",
      "/projects/studystack/backlog.png",
      "/projects/studystack/revision.png",
      "/projects/studystack/tasks.png",
      "/projects/studystack/timetable.png",
    ],
    downloads: {},
  },
  {
    slug: "softify",
    name: "Softify",
    tagline:
      "Ad-free, paywall-free Android & iOS music streaming app built with Flutter. 320kbps studio masters, synced lyrics, Spotify importer, and offline playback.",
    description:
      "Softify brings the premium music listening experience back to the listener across Android and iOS. It delivers unrestricted, high-fidelity music streaming, instant search, synchronized lyrics, custom playlists, and offline downloads without subscriptions, audio or visual advertisements, or account paywalls. Built from the ground up using Flutter and strict Clean Architecture, Softify operates entirely client-side with native Lock Screen & Dynamic Island controls, AirPods stem gestures, Apple CarPlay integration, and zero telemetry tracking.",
    features: [
      "Dual-Engine Standby Pre-Buffering — near-instant song transitions (<10ms perceived latency)",
      "Native iOS & Android integration — Lock Screen & Dynamic Island (MPRemoteCommandCenter) with live scrubber",
      "AirPods & Bluetooth controls — Hardware stem squeeze / tap gesture handling and volume sync",
      "Apple CarPlay & background audio streaming",
      "iOS Sideloading support — AltStore, Sideloadly, TrollStore, and SideStore (.ipa package)",
      "320 kbps Studio Master Streaming with automated stream failover",
      "Smart Search Deduplication — eliminates noisy compilation duplicates",
      "Synced Karaoke Lyrics — real-time LRCLIB synchronization with tap-to-seek",
      "Automix & Continuous Autoplay with genre and language isolation",
      "1-Click Spotify Playlist Importer — zero-key public playlist migration",
      "Offline Downloads Manager with ISO-BMFF MP4 atom chunk offset shifting and legacy auto-repair",
      "Client-Side Privacy — zero central servers, zero accounts, zero telemetry",
      "Local Drift SQLite library cache for playlists, favorites, and history",
      "54/54 automated unit and integration tests passing (100% coverage)",
    ],
    stack: [
      "Flutter 3.19+",
      "Dart 3.3+",
      "iOS 15+ (Swift & Obj-C)",
      "Android SDK (API 26+)",
      "Clean Architecture",
      "Riverpod",
      "Drift (SQLite)",
      "Just Audio & MPRemoteCommandCenter",
      "LRCLIB API",
    ],
    status: "completed",
    progressNote:
      "v1.0.1 released with the Universal Android APK (.apk) and sideloadable iOS package (.ipa) for AltStore, Sideloadly & TrollStore. Fixes track transition latency (<10ms) and offline audio decoding silence.",
    roadmap: [
      "✓ Dual-Engine standby pre-buffering (<10ms track transitions)",
      "✓ ISO-BMFF MP4 atom tagger & legacy offline audio auto-repair",
      "✓ 320kbps studio master stream resolver with automated fallback",
      "✓ Synced lyrics integration via LRCLIB with interactive seek",
      "✓ 1-click Spotify public playlist importer and library sync",
      "✓ Embedded iTunes MP4 atom tagger for offline downloads",
      "✓ Autoplay radio engines with mood & genre isolation",
      "✓ iOS platform support: Dynamic Island, AirPods stem click gestures & CarPlay",
      "✓ Sideloadable iOS package (.ipa) for AltStore, Sideloadly & TrollStore",
      "Android Auto integration and landscape tablet UI layouts",
      "Desktop Linux and Windows player shells",
    ],
    cover: "/projects/softify/cover.png",
    liveUrl: "https://github.com/Sarthak-Cyb3r/softify/releases/tag/v1.0.1",
    repoUrl: "https://github.com/Sarthak-Cyb3r/softify",
    screenshots: [
      "/projects/softify/cover.png",
      "/projects/softify/01_homepage.png",
      "/projects/softify/05_now_playing_self_aware.png",
      "/projects/softify/02_search.png",
      "/projects/softify/03_library.png",
      "/projects/softify/04_settings.png",
    ],
    downloads: {
      apk: {
        file: "https://github.com/Sarthak-Cyb3r/softify/releases/download/v1.0.1/Softify-v1.0.1-Universal.apk",
        sizeBytes: 68615379,
        version: "1.0.1",
        fileName: "Softify-v1.0.1-Universal.apk",
      },
      ipa: {
        file: "https://github.com/Sarthak-Cyb3r/softify/releases/download/v1.0.1/Softify-iOS-Universal.ipa",
        sizeBytes: 10952446,
        version: "1.0.1",
        fileName: "Softify-iOS-Universal.ipa",
      },
    },
    releaseNotes: [
      {
        version: "1.0.1",
        tag: "v1.0.1",
        date: "October 7, 2026",
        title: "Softify v1.0.1 — Critical Bug Fixes & Sideloadable iOS Release",
        summary:
          "This release addresses two critical playback bugs reported in v1.0.0, restoring offline music playback and making song transitions virtually instant (<10ms), while publishing the official sideloadable iOS IPA.",
        changes: [
          {
            title: "Near-Instant Song Transitions (< 10ms Perception)",
            badge: "Playback Engine",
            problem:
              "Transitions between songs previously suffered from noticeable dead silence (1.5s – 3.5s) due to synchronous stream resolution, player teardown, and fresh network buffering on every track advance.",
            fix:
              "Implemented Dual-Engine Standby Pre-Buffering Architecture in JustAudioPlayerAdapter. While track N plays, track N+1 is pre-resolved and pre-buffered in the background on a standby audio engine sitting paused at ProcessingState.ready. Swapping engines on skip/finish is instantaneous with zero perceived latency.",
            details: [
              "Non-critical database logging (e.g. play history recording) is handled asynchronously without blocking transition pipelines.",
              "Continuous queue listener ensures standby engine preloads the next song ~15 seconds before the current track finishes.",
            ],
          },
          {
            title: "Downloaded Songs Silence & Playback Failure Repair",
            badge: "Offline Storage",
            problem:
              "Songs downloaded for offline listening appeared to download successfully, but produced complete silence when played back.",
            fix:
              "Re-architected M4aAtomTagger to recursively traverse the MP4 atom tree (moov -> trak -> mdia -> minf -> stbl) and dynamically shift all stco (32-bit) and co64 (64-bit) chunk offsets by the exact metadata size delta.",
            details: [
              "On-The-Fly Legacy Repair: existing offline tracks downloaded on v1.0.0 are automatically detected and healed upon access in BackgroundDownloadRepository.",
              "Robust fallback: if local file playback ever fails, SoftifyAudioHandler seamlessly falls back to real-time CDN streaming.",
            ],
          },
          {
            title: "Official Sideloadable iOS Release (.ipa)",
            badge: "iOS Distribution",
            problem:
              "iOS users required a pre-packaged sideloadable IPA compatible with AltStore, Sideloadly, TrollStore, and SideStore.",
            fix:
              "Configured automated GitHub Actions workflow to build runner archive, package Runner.app into standard Payload directory, and publish Softify-iOS-Universal.ipa directly to release assets.",
            details: [
              "Full iOS 15.0+ compatibility across iPhone and iPad.",
              "Lock Screen & Dynamic Island (MPRemoteCommandCenter) with live scrubber.",
              "AirPods stem click gestures & Apple CarPlay support.",
            ],
          },
          {
            title: "In-App OTA Updater & Release Build Optimizations",
            badge: "Tooling & CI",
            problem:
              "Manual APK verification was required to discover new releases, and CI release builds took excessive memory.",
            fix:
              "Connected GitHubReleaseUpdateChecker to Sarthak-Cyb3r/softify for seamless one-tap background APK updating, and bypassed memory-heavy lint tasks in Gradle release builds.",
            details: [
              "One-tap update checking from inside Settings screen.",
              "GitHub Actions release write permissions enabled.",
            ],
          },
        ],
        assets: [
          {
            name: "Softify-v1.0.1-Universal.apk",
            size: "65.4 MB",
            platform: "Android 8.0+",
            url: "https://github.com/Sarthak-Cyb3r/softify/releases/download/v1.0.1/Softify-v1.0.1-Universal.apk",
          },
          {
            name: "Softify-iOS-Universal.ipa",
            size: "10.4 MB",
            platform: "iOS 15.0+",
            url: "https://github.com/Sarthak-Cyb3r/softify/releases/download/v1.0.1/Softify-iOS-Universal.ipa",
          },
        ],
      },
    ],
  },
  {
    slug: "accounty",
    name: "Accounty",
    tagline:
      "Finance app that tracks and analyses your spending — e.g. how much you spent each month.",
    description:
      "Accounty is a personal finance app built around one job: show where the money went and what it adds up to per month. The source, screenshots and any public repo are not published yet, so this page only states what is confirmed — nothing is filled in with guesses.",
    features: [],
    stack: [],
    status: "in-development",
    progressNote:
      "In development — no source, screenshots or repository published yet.",
    roadmap: [],
    cover: "/projects/accounty/placeholder.png",
    screenshots: ["/projects/accounty/placeholder.png"],
    downloads: {},
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const completedProjects = projects.filter((p) => p.status === "completed");
export const inDevelopmentProjects = projects.filter(
  (p) => p.status === "in-development",
);

/** Unique technologies across every project — drives the marquee and the stat counter. */
export const technologies: string[] = Array.from(
  new Set(projects.flatMap((project) => project.stack)),
).sort((a, b) => a.localeCompare(b));

export const stats = {
  projects: projects.length,
  completed: completedProjects.length,
  inDevelopment: inDevelopmentProjects.length,
  technologies: technologies.length,
};
