export type ProjectStatus = "completed" | "in-development";

export interface DownloadArtifact {
  file: string;
  sizeBytes: number;
  version: string;
  fileName: string;
  sha256?: string;
  installGuide?: string[];
}

export type DownloadKey = "deb" | "apk" | "ipa" | "tar";

export interface ProjectDownloads {
  deb?: DownloadArtifact;
  apk?: DownloadArtifact;
  ipa?: DownloadArtifact;
  tar?: DownloadArtifact;
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
}

export interface KeyDecision {
  title: string;
  rationale: string;
}

export interface ArchitectureNode {
  title: string;
  desc: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  outcome: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  highlightTech: [string, string, string];
  status: ProjectStatus;
  statusLabel: string;
  progressNote: string;
  testsPassing?: number;
  testSuiteCount?: number;
  platforms: string[];
  cover?: string;
  liveUrl?: string;
  repoUrl?: string;
  screenshots: string[];
  downloads: ProjectDownloads;
  keyDecisions: KeyDecision[];
  challenges: string[];
  architectureOverview: string;
  releaseNotes?: ReleaseNote[];
}

export const projects: Project[] = [
  {
    slug: "softify",
    name: "Softify",
    tagline: "Cross-platform audio player with on-device recommendation & search engine",
    outcome: "Client-side music streaming app with offline caching and zero cloud telemetry",
    description:
      "Softify is a cross-platform music streaming client engineered with Flutter and strict Clean Architecture. Operating entirely client-side without centralized servers or telemetry tracking, it features an on-device search and ranking engine, background audio playback, offline MP4 atom shifting, and native multi-platform compilation for Android, iOS, and Linux desktop.",
    problem:
      "Traditional streaming apps rely heavily on continuous telemetry, server-side tracking, and cloud-dependent recommendation pipelines that degrade privacy and induce interface latency.",
    solution:
      "A 100% client-side architecture using Drift/SQLite FTS5, subword trigram vector embeddings, and on-device SGD classification for recommendation ranking, paired with dual-engine standby pre-buffering.",
    features: [
      "Cross-platform compilation across Android, iOS, Linux desktop, and Web",
      "On-device search index with SQLite FTS5, typo tolerance, and domain alias normalization",
      "On-device recommendation ranker with dual-band taste decay (4h fast / 14d slow)",
      "Standby pre-buffering pipeline achieving sub-10ms perceived track transitions",
      "ISO-BMFF MP4 atom tagger with dynamic chunk-offset shifting for reliable offline storage",
      "Synced lyrics rendering via real-time LRCLIB synchronization",
      "Native MPRemoteCommandCenter, Dynamic Island, and headset gesture integration",
      "Client-side privacy model: zero telemetry, zero accounts, zero analytics collection",
    ],
    stack: [
      "Flutter",
      "Dart",
      "Drift (SQLite FTS5)",
      "Riverpod",
      "Clean Architecture",
      "Linux GTK",
      "Android SDK",
      "iOS (Swift)",
    ],
    highlightTech: ["Flutter", "Drift / SQLite", "Riverpod"],
    status: "completed",
    statusLabel: "Live",
    progressNote:
      "v2.0.0 released with on-device search & recommendation engine across Android, iOS (sideload), Linux desktop, and Web. 170 passing tests.",
    testsPassing: 170,
    testSuiteCount: 1,
    platforms: ["Android", "iOS (Sideload)", "Linux", "Web"],
    cover: "/projects/softify/cover.png",
    liveUrl: "https://softify-app.vercel.app/",
    repoUrl: "https://github.com/Sarthak-Cyb3r/softify",
    screenshots: [
      "/projects/softify/cover.png",
      "/projects/softify/01_homepage.png",
      "/projects/softify/05_now_playing_self_aware.png",
      "/projects/softify/02_search.png",
      "/projects/softify/03_library.png",
      "/projects/softify/04_settings.png",
    ],
    architectureOverview:
      "Clean Architecture domain layers (UseCases, Repositories, Entities) decouple pure business logic from UI widgets and audio platform channels. Drift SQLite provides local persistence and FTS5 search indexing.",
    keyDecisions: [
      {
        title: "Clean Architecture & Riverpod Isolation",
        rationale:
          "Separated pure domain models from the underlying audio driver and platform channels, allowing identical business logic to execute on mobile, desktop, and web.",
      },
      {
        title: "Client-Side SQLite FTS5 & Vector Embeddings",
        rationale:
          "Rather than querying a remote index, tracks are tokenized locally with subword trigrams, enabling sub-100ms offline-capable search with zero server telemetry.",
      },
      {
        title: "Dual-Engine Standby Pre-Buffering",
        rationale:
          "Pre-resolving track N+1 in a standby audio engine eliminated the 2–3s transition gap, making playback changes immediate.",
      },
      {
        title: "Recursive ISO-BMFF Atom Tagging",
        rationale:
          "Traversed MP4 atom boxes (moov -> trak -> stbl) to dynamically recalculate 32-bit and 64-bit chunk offsets, resolving silent playback bugs on offline cached tracks.",
      },
    ],
    challenges: [
      "Handling MP4 chunk offset shifting across varying file encoders without corrupting audio containers.",
      "Maintaining smooth 60/120 FPS UI performance while calculating off-thread PPMI matrix operations in background isolates.",
      "iOS background audio lifecycle and remote command center synchronisation without proprietary push services.",
    ],
    downloads: {
      apk: {
        file: "https://github.com/Sarthak-Cyb3r/softify/releases/download/v2.0.5/Softify-v2.0.5-Android-Universal.apk",
        sizeBytes: 71193497,
        version: "v2.0.5",
        fileName: "Softify-v2.0.5-Android-Universal.apk",
        sha256: "38674d92d0caa5721e32b2bbc700ee2e1b26f82942f18b21b30ae80cf84405df",
        installGuide: [
          "Download the APK onto your Android device (Android 8.0+).",
          "Open your device file manager and tap the downloaded file.",
          "If prompted, allow 'Install from unknown sources' for your browser or file manager.",
          "Complete installation and launch Softify.",
        ],
      },
      ipa: {
        file: "https://github.com/Sarthak-Cyb3r/softify/releases/download/v2.0.5/Softify-iOS-Universal.ipa",
        sizeBytes: 11406080,
        version: "v2.0.5",
        fileName: "Softify-iOS-Universal.ipa",
        installGuide: [
          "iOS requires sideloading using an on-device or desktop tool such as AltStore, SideStore, Sideloadly, or TrollStore.",
          "Download the .ipa package to your computer or iOS device.",
          "Open your sideloading manager and sign the package using your free Apple ID certificate.",
          "Trust your developer profile in iOS Settings → General → VPN & Device Management.",
        ],
      },
      tar: {
        file: "https://github.com/Sarthak-Cyb3r/softify/releases/download/v2.0.5/Softify-Linux-x64.tar.gz",
        sizeBytes: 14043394,
        version: "v2.0.5",
        fileName: "Softify-Linux-x64.tar.gz",
        installGuide: [
          "Extract archive: tar -xzf Softify-Linux-x64.tar.gz",
          "Run executable: ./softify",
          "Optional terminal installer for launcher icon: curl -fsSL https://raw.githubusercontent.com/Sarthak-Cyb3r/softify/main/install.sh | bash",
        ],
      },
    },
    releaseNotes: [
      {
        version: "2.0.5",
        tag: "v2.0.5",
        date: "October 2026",
        title: "v2.0.5 — YouTube Audio Tab & Studio Equalizer",
        summary:
          "Added dedicated YouTube audio-only streaming tab with InnerTube endpoint integration, 5-band studio hardware DSP equalizer, and 1-line Linux terminal updater.",
        changes: [
          {
            title: "YouTube Audio-Only Stream Resolution",
            badge: "Feature",
            fix: "Direct mobile InnerTube endpoint integration with Android share intent, persistent history, and playlist queuing.",
          },
          {
            title: "Native 5-Band Studio DSP Equalizer",
            badge: "Audio DSP",
            fix: "Hardware DSP acceleration, 14 acoustic presets, Catmull-Rom Bézier curve visualizer, and A/B audition bypass.",
          },
          {
            title: "Linux In-Place Terminal Updater",
            badge: "Platform",
            fix: "Atomic 1-line updater preserving local SQLite databases and offline cached tracks.",
          },
        ],
      },
      {
        version: "2.0.0",
        tag: "v2.0.0",
        date: "October 2026",
        title: "v2.0.0 — On-Device Intelligence & Linux Desktop",
        summary:
          "Introduced local-first search engine, dual-band taste decay modeling, and native Linux desktop support with GTK runner.",
        changes: [
          {
            title: "Local-First Instant Search with SQLite FTS5",
            badge: "Search",
            fix: "Sub-100ms debounced search index with prefix matching and typo tolerance running client-side.",
          },
          {
            title: "Dual-Engine Standby Pre-Buffering",
            badge: "Audio Engine",
            fix: "Pre-buffers track N+1 in background isolate to eliminate track transition latency.",
          },
          {
            title: "Native Linux Desktop Client",
            badge: "Platform",
            fix: "GTK-based desktop player with responsive layout, keyboard shortcuts, and system desktop launcher.",
          },
        ],
      },
    ],
  },
  {
    slug: "ludo-vercel",
    name: "Ludo",
    tagline: "Real-time multiplayer board game for 2–6 players with zero build step",
    outcome: "Multiplayer board game with Firestore real-time listeners and multi-platform installers",
    description:
      "Ludo with Friends is a lightweight, responsive multiplayer game supporting 2 to 6 players across classic cross, pentagon, and hexagon geometries. Built with vanilla JavaScript and HTML5 Canvas, it synchronizes moves via Firestore real-time listeners with anonymous authentication. The same codebase packages to native Android (Capacitor) and Linux (Electron).",
    problem:
      "Online multiplayer board games are often bloated with mandatory account creation, ad overlays, and heavyweight asset bundles that hinder quick casual games with friends.",
    solution:
      "A zero-build static architecture using Firebase Firestore real-time listeners, anonymous session tokens, 5-letter room codes, and mathematical SVG/Canvas board projections for 2, 3, 4, 5, and 6 players.",
    features: [
      "5-letter room code joining across phones, tablets, and laptops",
      "Dynamic board geometry: classic cross (2–4), pentagon (5), and hexagon (6)",
      "Real-time state synchronization via Firestore listeners",
      "Playable offline demo mode functioning without cloud connection",
      "Zero-build static frontend with pure ES modules and native Canvas rendering",
      "Packaged Android APK via Capacitor (4.5 MB)",
      "Packaged Linux .deb binary via Electron (95 MB)",
    ],
    stack: [
      "Vanilla JavaScript",
      "HTML5 Canvas",
      "Firebase Firestore",
      "Firebase Auth",
      "Capacitor",
      "Electron",
      "Vercel",
    ],
    highlightTech: ["Firestore", "HTML5 Canvas", "Capacitor"],
    status: "completed",
    statusLabel: "Live",
    progressNote:
      "Deployed on Vercel with Android and Linux binaries compiled and available.",
    platforms: ["Web", "Android", "Linux"],
    cover: "/projects/ludo/logo.png",
    liveUrl: "https://ludo-vercel-rho.vercel.app",
    repoUrl: "https://github.com/Sarthak-Cyb3r/ludo-vercel",
    screenshots: [
      "/projects/ludo/home.png",
      "/projects/ludo/demo-board.png",
      "/projects/ludo/scoreboard.png",
      "/projects/ludo/logo.png",
    ],
    architectureOverview:
      "Game state machine updates locally and commits transactional state deltas to Firestore. Active listener subscriptions stream state transitions to all connected clients in the room.",
    keyDecisions: [
      {
        title: "Firestore Real-Time Listeners over Custom WebSockets",
        rationale:
          "Firestore document snapshots provided robust presence handling, state recovery on mobile app backgrounding, and zero server maintenance costs.",
      },
      {
        title: "Parametric Polygon Board Generation",
        rationale:
          "Rather than pre-rendering static assets for 5 and 6 players, board track vertices are generated parametrically, keeping total bundle size under 150 KB.",
      },
      {
        title: "Anonymous Auth for Frictionless Access",
        rationale:
          "Players jump immediately into games without passwords or email verification while maintaining a secure UID for turn authorization.",
      },
    ],
    challenges: [
      "Reconciling simultaneous dice rolls and network race conditions under intermittent mobile connectivity.",
      "Calculating coordinate trajectories across pentagonal and hexagonal tile geometry without visual distortion.",
    ],
    downloads: {
      apk: {
        file: "/downloads/ludo-vercel/ludo-with-friends.apk",
        sizeBytes: 4710178,
        version: "1.0.0",
        fileName: "ludo-with-friends.apk",
        sha256: "0d6c46f1426d51fbb224a7c57127711bdc188452fa5a049c4eb13036f31de500",
        installGuide: [
          "Download the APK to your Android device (4.5 MB).",
          "Open the file from your notifications or file manager.",
          "Enable 'Install unknown apps' if prompted.",
          "Launch and enter your room code to play.",
        ],
      },
      deb: {
        file: "/downloads/ludo-vercel/ludo-with-friends-1.0.0-amd64.deb",
        sizeBytes: 98844460,
        version: "1.0.0",
        fileName: "ludo-with-friends-1.0.0-amd64.deb",
        sha256: "c4f22c683040969f9d0c41775ca12002adc00a19462c708e7d834be6a3487295",
        installGuide: [
          "Download the Debian package to your Linux machine.",
          "Install via terminal: sudo dpkg -i ludo-with-friends-1.0.0-amd64.deb",
          "Or double-click the .deb package in your desktop file manager to install via software center.",
          "Launch 'Ludo with Friends' from your application launcher.",
        ],
      },
    },
    releaseNotes: [
      {
        version: "1.0.0",
        tag: "v1.0.0",
        date: "September 2026",
        title: "v1.0.0 — Initial Multi-Platform Release",
        summary:
          "Initial release featuring 2–6 player support, Firestore real-time sync, and native Android & Linux packages.",
        changes: [
          {
            title: "2 to 6 Player Support",
            badge: "Gameplay",
            fix: "Parametric board rendering for 4, 5, and 6 players with turn sequencing.",
          },
          {
            title: "Offline Demo Mode",
            badge: "Offline",
            fix: "Full local hotseat game loop operational without network connection.",
          },
        ],
      },
    ],
  },
  {
    slug: "studystack",
    name: "StudyStack",
    tagline: "Academic planning engine with deadline auto-prioritization and revision tracking",
    outcome: "Student task manager with 455 passing tests and ratio-interval scoring",
    description:
      "StudyStack answers one fundamental question for students: what should I study right now? It consolidates timetables, homework deadlines, derived backlog lists, and revision intervals into a unified dashboard backed by a ratio-interval urgency scoring engine.",
    problem:
      "Students fragment their schedule across disjoint calendars, todo apps, and notes without an objective way to prioritize urgent tasks against heavy workloads.",
    solution:
      "A deterministic ratio-interval scoring algorithm ranking tasks based on remaining workload, deadline proximity, and assignment weight, backed by an Express and SQLite backend.",
    features: [
      "Prioritized dashboard showing deterministic next-action items",
      "Weekly timetable matrix mapping day-of-week class schedules",
      "Derived backlog view grouping uncompleted tasks by subject",
      "Spaced revision planner tracking chapter progress and study cadence",
      "RFC 5545 iCalendar and CSV schedule export",
      "scrypt password hashing with session revocation",
      "455 verified automated tests across 21 test suites",
    ],
    stack: [
      "Node.js",
      "Express",
      "SQLite (better-sqlite3)",
      "EJS",
      "Vanilla CSS",
    ],
    highlightTech: ["Node.js", "SQLite", "Express"],
    status: "in-development",
    statusLabel: "In Progress",
    progressNote:
      "Phase 2 complete with 455/455 tests passing across 21 test suites. Production Docker deployment pending.",
    testsPassing: 455,
    testSuiteCount: 21,
    platforms: ["Web", "Self-Hosted"],
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
    architectureOverview:
      "Express controller pipeline with SQLite prepared statements via better-sqlite3. A mathematical prioritization module computes score = (workload_hours / hours_until_deadline) * weight_factor.",
    keyDecisions: [
      {
        title: "Node.js & better-sqlite3 Runtime",
        rationale:
          "Selected synchronous SQLite bindings in Node.js to achieve sub-millisecond query execution without external database container overhead.",
      },
      {
        title: "Derived View for Backlog",
        rationale:
          "Rather than persisting redundant backlog tables, backlog views are queried dynamically from active task deadlines, preventing data synchronization anomalies.",
      },
      {
        title: "Strict Test-Driven Hardening",
        rationale:
          "Authored 455 regression tests covering session handling, boundary dates, leap years, and rate limits to guarantee reliability.",
      },
    ],
    challenges: [
      "Handling timezone offsets and daylight saving transitions across student timetable recurrence rules.",
      "Maintaining high contrast accessibility across both light and dark themes without heavy CSS frameworks.",
    ],
    downloads: {},
    releaseNotes: [
      {
        version: "0.2.0",
        tag: "v0.2.0",
        date: "September 2026",
        title: "Phase 2 Security & Scheduling Hardening",
        summary:
          "Shipped single-use token password resets, rate limiting, calendar exports, and 455 passing tests.",
        changes: [
          {
            title: "Ratio-Interval Scoring Engine",
            badge: "Algorithm",
            fix: "Computed ranking sorting pending tasks by deadline urgency and remaining hours.",
          },
          {
            title: "Security & Session Gate",
            badge: "Security",
            fix: "Implemented scrypt auth, timing-safe token comparisons, and bruteforce rate limiting.",
          },
        ],
      },
    ],
  },
];

export const inProgressProjects = [
  {
    name: "Accounty",
    oneLiner: "Personal finance and monthly expense tracking app (in active design and prototyping).",
    status: "In Progress",
    stack: ["TypeScript", "Next.js", "SQLite"],
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);
