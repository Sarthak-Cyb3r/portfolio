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
      "Native iOS & Android integration — Lock Screen & Dynamic Island (MPRemoteCommandCenter) with live scrubber",
      "AirPods & Bluetooth controls — Hardware stem squeeze / tap gesture handling and volume sync",
      "Apple CarPlay & background audio streaming",
      "iOS Sideloading support — AltStore, Sideloadly, TrollStore, and SideStore (.ipa package)",
      "320 kbps Studio Master Streaming with automated stream failover",
      "Smart Search Deduplication — eliminates noisy compilation duplicates",
      "Synced Karaoke Lyrics — real-time LRCLIB synchronization with tap-to-seek",
      "Automix & Continuous Autoplay with genre and language isolation",
      "1-Click Spotify Playlist Importer — zero-key public playlist migration",
      "Offline Downloads Manager with embedded iTunes MP4 atom metadata",
      "Client-Side Privacy — zero central servers, zero accounts, zero telemetry",
      "Local Drift SQLite library cache for playlists, favorites, and history",
      "49/49 automated unit and integration tests passing (100% coverage)",
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
      "v1.0.0 released with the Universal Android APK (.apk). The iOS sideloadable package (.ipa) is building in CI and lands on the release the moment that run goes green.",
    roadmap: [
      "✓ 320kbps studio master stream resolver with automated fallback",
      "✓ Synced lyrics integration via LRCLIB with interactive seek",
      "✓ 1-click Spotify public playlist importer and library sync",
      "✓ Embedded iTunes MP4 atom tagger for offline downloads",
      "✓ Autoplay radio engines with mood & genre isolation",
      "✓ iOS platform support: Dynamic Island, AirPods stem click gestures & CarPlay",
      "Sideloadable iOS package (.ipa) for AltStore, Sideloadly & TrollStore — publishing from CI",
      "Android Auto integration and landscape tablet UI layouts",
      "Desktop Linux and Windows player shells",
    ],
    cover: "/projects/softify/cover.png",
    liveUrl: "https://github.com/Sarthak-Cyb3r/softify/releases/tag/v1.0.0",
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
        file: "https://github.com/Sarthak-Cyb3r/softify/releases/download/v1.0.0/Softify-v1.0.0-Universal.apk",
        sizeBytes: 68582607,
        version: "1.0.0",
        fileName: "Softify-v1.0.0-Universal.apk",
      },
      // iOS stays out of the artifact map until the release actually carries it:
      // the `ios_release.yml` run failed, so `Softify-iOS-Universal.ipa` is not on
      // v1.0.0 yet. Publish a real `ipa: { file, sizeBytes, version, fileName }`
      // (and drop "ipa" from `pending`) the moment CI goes green.
      pending: ["ipa"],
    },
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
