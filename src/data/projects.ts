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
      "Ad-free, paywall-free Android & iOS music streaming app with on-device search & recommendations intelligence engine. 320kbps studio masters, synced lyrics, and zero telemetry.",
    description:
      "Softify brings the premium music listening experience back to the listener across Android and iOS. Powered by a 100% on-device search and recommendation intelligence engine, Softify delivers instant local-first search, dual-band taste decay modeling, skip-sensitive algotorial shelves, vector semantic search, synchronized lyrics, custom playlists, and offline downloads without subscriptions, audio or visual advertisements, or account paywalls. Built from the ground up using Flutter and strict Clean Architecture, Softify operates entirely client-side with native Lock Screen & Dynamic Island controls, AirPods stem gestures, Apple CarPlay integration, and zero telemetry tracking.",
    features: [
      "On-Device Recommendation & Search Intelligence Engine — 100% client-side, zero cloud telemetry",
      "Instant Local-First Search (<100ms) — SQLite FTS5 full-text search with Damerau-Levenshtein typo tolerance & domain aliases",
      "Linear Search Re-Ranker — Combines BM25, listen counts, and recency with a +10.0 exact-title boost invariant",
      "Dual-Band Taste Decay Modeling — 4-hour fast mood band (W_fast) + 14-day slow long-term band (W_slow)",
      "Session Sentence Co-Occurrence Graph — Off-thread PPMI calculation treating consecutive plays as natural language sentences",
      "Pointwise Logistic Regression Ranker — On-device SGD classifier with >50% penalty on 3 consecutive skips",
      "Algotorial Home Shelves — Heavy Rotation, Forgotten Favorites, and Discover Weekly with 10% familiar anchor ratio",
      "Dual-Engine Standby Pre-Buffering — Near-instant song transitions (<10ms perceived latency)",
      "Automix Tail Reordering — Respects untouched Track N and N+1 player pre-buffer invariant",
      "Contextual Bandit & Calibration — Epsilon-greedy novelty exploration with KL-divergence genre distribution calibration",
      "MMR Diversity Controller — Hard maxPerArtist=2 cap per shelf with 30-day artist snoozing & Incognito taste mode",
      "On-Device Semantic Vector Search — 128-dimensional subword trigram float32 embeddings with zero-network cosine similarity",
      "Native iOS & Android integration — Lock Screen & Dynamic Island (MPRemoteCommandCenter) with live scrubber",
      "AirPods & Bluetooth controls — Hardware stem squeeze / tap gesture handling and volume sync",
      "Apple CarPlay & background audio streaming",
      "iOS Sideloading support — AltStore, Sideloadly, TrollStore, and SideStore (.ipa package)",
      "320 kbps Studio Master Streaming with automated stream failover",
      "Synced Karaoke Lyrics — Real-time LRCLIB synchronization with tap-to-seek",
      "1-Click Spotify Playlist Importer — Zero-key public playlist migration",
      "Offline Downloads Manager with ISO-BMFF MP4 atom chunk offset shifting and legacy auto-repair",
      "Client-Side Privacy — Zero central servers, zero accounts, zero telemetry",
      "170/170 automated unit and integration tests passing (100% coverage, 0 lint issues)",
    ],
    stack: [
      "Flutter 3.19+",
      "Dart 3.3+",
      "Drift (SQLite FTS5)",
      "On-Device ML / SGD",
      "Vector Embeddings",
      "Clean Architecture",
      "Riverpod",
      "iOS 15+ (Swift & Obj-C)",
      "Android SDK (API 26+)",
      "Just Audio & MPRemoteCommandCenter",
      "LRCLIB API",
    ],
    status: "completed",
    progressNote:
      "v2.0.0 released with On-Device Search & Recommendation Intelligence Engine, Universal Android APK (.apk), and sideloadable iOS package (.ipa). Features FTS5 instant search, dual-band taste decay, and 128-dim vector embeddings with 170 passing tests.",
    roadmap: [
      "✓ On-Device Search & Recommendation Intelligence Engine (Drift / SQLite FTS5)",
      "✓ Dual-band taste decay (4h fast / 14d slow) & session co-occurrence PPMI graph",
      "✓ Pointwise logistic regression ranker & Algotorial Home Shelves",
      "✓ Contextual bandit novelty exploration with KL-divergence calibration",
      "✓ 128-dim subword trigram vector embeddings & zero-network similarity search",
      "✓ Dual-Engine standby pre-buffering (<10ms track transitions)",
      "✓ ISO-BMFF MP4 atom tagger & legacy offline audio auto-repair",
      "✓ 320kbps studio master stream resolver with automated fallback",
      "✓ Synced lyrics integration via LRCLIB with interactive seek",
      "✓ 1-click Spotify public playlist importer and library sync",
      "✓ iOS platform support: Dynamic Island, AirPods stem click gestures & CarPlay",
      "✓ Sideloadable iOS package (.ipa) for AltStore, Sideloadly & TrollStore",
      "Android Auto integration and landscape tablet UI layouts",
      "Desktop Linux and Windows player shells",
    ],
    cover: "/projects/softify/cover.png",
    liveUrl: "https://github.com/Sarthak-Cyb3r/softify/releases/tag/v2.0.0",
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
        file: "https://github.com/Sarthak-Cyb3r/softify/releases/download/v2.0.0/Softify-v2.0.0-Universal.apk",
        sizeBytes: 69714441,
        version: "2.0.0",
        fileName: "Softify-v2.0.0-Universal.apk",
      },
      ipa: {
        file: "https://github.com/Sarthak-Cyb3r/softify/releases/download/v2.0.0/Softify-iOS-Universal.ipa",
        sizeBytes: 11086504,
        version: "2.0.0",
        fileName: "Softify-iOS-Universal.ipa",
      },
    },
    releaseNotes: [
      {
        version: "2.0.0",
        tag: "v2.0.0",
        date: "October 7, 2026",
        title: "Softify v2.0.0 — On-Device Search & Recommendations Intelligence Engine",
        summary:
          "Softify v2.0.0 is a milestone release introducing a state-of-the-art, 100% client-side, zero-telemetry search and recommendation intelligence system built directly on top of SQLite/Drift tables with zero cloud machine learning dependencies and 170 passing tests.",
        changes: [
          {
            title: "Local-First Instant Search & FTS5 Retrieval",
            badge: "Search Engine",
            problem:
              "Network-only search caused input lag, failed completely without connectivity, and had zero typo tolerance for artist names or track aliases.",
            fix:
              "Sub-100ms debounced instant search backed by SQLite FTS5 full-text indexing, Damerau-Levenshtein typo tolerance, and domain alias normalization. Merges local results before network tracks stream in.",
            details: [
              "Diacritic stripping and tokenized prefix search across your entire library, history, and playlists.",
              "Linear search re-ranker combining BM25, listen counts, and recency with a strict +10.0 exact-match boost invariant.",
            ],
          },
          {
            title: "Dual-Band Taste Decay & Co-occurrence Sentence Graph",
            badge: "Taste Profiling",
            problem:
              "Conventional recommendation models either erase long-term preferences prematurely or become trapped in repetitive listening bubbles.",
            fix:
              "Dual-Band Exponential Half-Life Modeling: W_fast (4-hour half-life) captures immediate mood and session vibes, while W_slow (14-day half-life) protects enduring favorite genres. Consecutive plays (≤60s gap) form sentence graphs to compute Positive Pointwise Mutual Information (PPMI).",
            details: [
              "Runs off-thread in background isolates to keep the UI strictly at 60/120 FPS.",
              "PPMI co-occurrence weights naturally chain musically compatible songs without cloud training.",
            ],
          },
          {
            title: "Pointwise Logistic Regression & Algotorial Shelves",
            badge: "Ranking & Discovery",
            problem:
              "Static playlists ignore negative interaction signals and fail to dynamically surface forgotten music.",
            fix:
              "On-Device SGD Classifier estimating stream probabilities σ(z) = 1 / (1 + e^-z) locally, coupled with an aggressive skip sensitivity rule penalizing tracks/artists >50% after 3 consecutive skips.",
            details: [
              "Heavy Rotation shelf: High-affinity tracks blended across fast and slow interest bands.",
              "Forgotten Favorites shelf: Deep catalog favorites not played in >30 days.",
              "Discover Weekly shelf: Fresh musical discoveries with a strict ~10% familiar anchor ratio (1 anchor per 10 recommendations).",
            ],
          },
          {
            title: "Dynamic Queue Reordering & Pre-Buffer Invariant",
            badge: "Playback Pipeline",
            problem:
              "Dynamic queue adjustments can interrupt or corrupt the active player standby engine.",
            fix:
              "Player Pre-Buffer Invariant: The dual-engine pipeline strictly guarantees Track N and Track N+1 are never reordered, mutated, or canceled once buffered. Re-ranking occurs exclusively on the unbuffered tail (≥ N+2).",
            details: [
              "Contextual Epsilon-Greedy Bandit exploring novelty arms (0.0 to 0.5) to avoid listening fatigue.",
              "KL Divergence Distribution Calibrator aligning recommendation slate genres with historical listening distributions.",
            ],
          },
          {
            title: "Maximal Marginal Relevance, Diversity & Privacy Agency",
            badge: "Discovery Controls",
            problem:
              "Algorithmic recommendations often monopolize feeds with a single artist and lack privacy for shared listening.",
            fix:
              "Maximal Marginal Relevance (MMR) enforcing hard maxPerArtist = 2 caps per shelf, 30-day 1-tap artist snoozing, incognito taste mode, and 1-line transparent recommendation explanations.",
            details: [
              "Incognito Taste Mode: Toggle in Settings to pause all profile learning during party or shared speaker sessions.",
              "Cold-Start Seeding: Instant taste initialization from imported Spotify playlists or onboarding genre picker.",
            ],
          },
          {
            title: "On-Device Semantic Vector Search (128-Dim)",
            badge: "Vector AI",
            problem:
              "Traditional lexical keyword matching fails when searching for subgenres, moods, or loosely recalled track vibes.",
            fix:
              "128-dimensional Float32 embeddings generated via subword character trigrams and word hashing, with zero-network cosine similarity computed directly over SQLite (<1 MB binary overhead).",
            details: [
              "On-Device Team-Draft Interleaving with 10% holdback slot to measure real user preference without telemetry.",
              "Automated Latency Guardrail runner ensuring p75 < 100ms over 54 golden query benchmarks.",
            ],
          },
        ],
        assets: [
          {
            name: "Softify-v2.0.0-Universal.apk",
            size: "66.5 MB",
            platform: "Android 8.0+",
            url: "https://github.com/Sarthak-Cyb3r/softify/releases/download/v2.0.0/Softify-v2.0.0-Universal.apk",
          },
          {
            name: "Softify-iOS-Universal.ipa",
            size: "10.6 MB",
            platform: "iOS 15.0+",
            url: "https://github.com/Sarthak-Cyb3r/softify/releases/download/v2.0.0/Softify-iOS-Universal.ipa",
          },
        ],
      },
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
