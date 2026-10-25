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
    outcome: "Client-side music streaming app with offline caching and on-device search",
    description:
      "Softify is a cross-platform music streaming client engineered with Flutter and strict Clean Architecture. Operating client-side with local data persistence, it features an on-device search and ranking engine, background audio playback, offline MP4 atom shifting, and native multi-platform compilation for Android, iOS, and Linux desktop.",
    problem:
      "Traditional streaming apps rely heavily on continuous telemetry, server-side tracking, and cloud-dependent recommendation pipelines that degrade privacy and induce interface latency.",
    solution:
      "A client-side architecture using Drift/SQLite FTS5, subword trigram vector embeddings, and on-device SGD classification for recommendation ranking, paired with dual-engine standby pre-buffering.",
    features: [
      "Cross-platform compilation across Android, iOS, Linux desktop, and Web",
      "On-device search index with SQLite FTS5, typo tolerance, and domain alias normalization",
      "On-device recommendation ranker with dual-band taste decay (4h fast / 14d slow)",
      "Standby pre-buffering pipeline achieving sub-10ms perceived track transitions",
      "Catmull-Rom Bézier spline DSP equalizer with real-time gain curve interpolation",
      "ISO-BMFF MP4 atom tagger with dynamic chunk-offset shifting for reliable offline storage",
      "Synced lyrics rendering via real-time LRCLIB synchronization",
      "Native MPRemoteCommandCenter, Dynamic Island, and headset gesture integration",
      "Local-first privacy model: zero mandatory accounts, zero ad trackers, client-side data persistence",
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
      "v3.0.1 released with desktop performance & smooth rendering overhaul, Skia readback stall elimination, and studio search isolation. 170 passing tests.",
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
          "Rather than querying a remote index, tracks are tokenized locally with subword trigrams, enabling sub-100ms offline-capable search without cloud bottlenecks.",
      },
      {
        title: "Dual-Engine Standby Pre-Buffering",
        rationale:
          "Pre-resolving track N+1 in a standby audio engine eliminated the 2–3s transition gap, making playback changes immediate.",
      },
      {
        title: "Catmull-Rom Bézier DSP Equalizer Curve",
        rationale:
          "Calculated Catmull-Rom Bézier splines across 5 frequency bands in real-time, delivering continuous non-linear gain curves without audio clipping or phase distortion.",
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
        file: "https://github.com/Sarthak-Cyb3r/softify/releases/download/v3.0.1/Softify-v3.0.1-Android.apk",
        sizeBytes: 28843549,
        version: "v3.0.1",
        fileName: "Softify-v3.0.1-Android.apk",
        sha256: "36931b569da5099b32974824ebb50a4afcd89dc484192d05ccf29a5ddceb2034",
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
        file: "https://github.com/Sarthak-Cyb3r/softify/releases/download/v3.0.1/Softify-Linux-x64.tar.gz",
        sizeBytes: 14819671,
        version: "v3.0.1",
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
        version: "3.0.1",
        tag: "v3.0.1",
        date: "October 2026",
        title: "v3.0.1 — Desktop Performance & Smooth Rendering Overhaul",
        summary:
          "Eliminated Skia GPU readback stalls, isolated multi-layer RepaintBoundary rendering, and purified studio catalog search.",
        changes: [
          {
            title: "Desktop GPU Lag & Compositor Stall Elimination",
            badge: "Performance",
            fix: "Replaced synchronous Skia BackdropFilter glReadPixels readback with hardware-accelerated Specular Translucent fills.",
          },
          {
            title: "Multi-Layer Paint Isolation (RepaintBoundary)",
            badge: "Architecture",
            fix: "Isolated player scrubber ticks, sidebar, and viewport into independent render layers to prevent full-window repaints.",
          },
          {
            title: "Studio Search Isolation",
            badge: "Search",
            fix: "Main catalog search queries direct studio masters from Spotify, JioSaavn, iTunes, and Deezer without fallback scraping.",
          },
        ],
      },
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
    slug: "macos-tahoe",
    name: "macOS Tahoe 26 on Linux Mint",
    tagline: "Liquid Glass desktop transformation with C runtime hook & hardware GLSL window curves",
    outcome: "Pixel-perfect macOS Tahoe 26 clone on Linux Mint Cinnamon with LD_PRELOAD C hook",
    description:
      "Transform Linux Mint (Cinnamon Edition) into a pixel-perfect replica of macOS Tahoe 26 ('Liquid Glass'). Features an engineered dark frosted dock with Plank active-glow eliminated via an LD_PRELOAD C hook (patching glow to 0xc3 ret), Clutter GLSL hardware-accelerated window corner shaders, authentic 30px frosted Apple menubar, Plymouth Apple boot splash, and Spotlight search.",
    problem:
      "Desktop Linux customization themes often suffer from clunky dock rendering (permanent elementary OS active glow boxes), unaccelerated jagged window corners, and fragile manual setups that cannot cleanly rollback.",
    solution:
      "An engineered desktop environment combining a lightweight C runtime hook (libplank-noglow.so), Clutter GLSL window curve shaders, systemd auto-recovery services, and automated installation and rollback scripts.",
    features: [
      "Liquid Glass Shell: 30px frosted dark menubar with authentic Apple vector mark and dynamic application title",
      "Engineered macOS Clone Dock: Dark frosted glass with 22px rounded corners and native running dots",
      "C Runtime Hook: libplank-noglow.so loaded via LD_PRELOAD atomically patches glow entry byte to 0xc3 (ret)",
      "Hardware-Accelerated Window Curves: 14px rounded corners and shadows rendered via Clutter GLSL shaders",
      "Bento Desktop Widgets: Live Clock/Calendar, real-time CPU/RAM/SSD telemetry, and Weather cards",
      "Spotlight Search: Ulauncher styled with custom translucent macOS Tahoe bento palette (Super + Space)",
      "Native Mac Shortcuts: Super + Space for Spotlight, Super + Q to quit active windows, Super + Tab switcher",
      "Apple Boot Screen: Plymouth boot splash with high-DPI Apple mark and macOS progress bar",
      "Automated install.sh and safe rollback.sh restoring system baseline cleanly",
    ],
    stack: [
      "C",
      "Shell",
      "GLSL (Clutter)",
      "Linux Mint Cinnamon",
      "Plank",
      "systemd",
      "GTK 3/4",
      "Ulauncher",
    ],
    highlightTech: ["C (LD_PRELOAD)", "GLSL Shaders", "Linux Shell"],
    status: "completed",
    statusLabel: "Open Source",
    progressNote:
      "Complete with automated install and rollback scripts, C runtime hook, GLSL corner shaders, and systemd service.",
    platforms: ["Linux Mint (Cinnamon)", "Ubuntu / Debian"],
    cover: "/projects/macos-tahoe/preview.png",
    repoUrl: "https://github.com/Sarthak-Cyb3r/macos-tahoe-linux-mint",
    screenshots: [
      "/projects/macos-tahoe/preview.png",
    ],
    architectureOverview:
      "Architecture spans user-space C hooks dynamically preloaded into Plank, Mutter/Clutter GLSL fragment shaders clipping window surfaces, Cinnamon desktop applet configs, and systemd user units guaranteeing process persistence.",
    keyDecisions: [
      {
        title: "Atomic C Runtime Patching over Recompiling Plank",
        rationale:
          "Rather than maintaining a custom fork of Plank that breaks on apt upgrade, an LD_PRELOAD shared library (libplank-noglow.so) patches plank_dock_theme_draw_active_glow with a single 0xc3 (ret) byte in memory at process startup.",
      },
      {
        title: "Clutter GLSL Shaders for Window Curves",
        rationale:
          "Standard GTK CSS curves leave window corner artifacts. Hardware-accelerated Clutter shaders (RoundedCorners@klangman) clip window draw surfaces at the compositor layer with zero tearing.",
      },
      {
        title: "Systemd User Service Auto-Recovery",
        rationale:
          "Managing the custom dock and telemetry widgets under systemd --user ensures crash-safe auto-restart and clean lifecycle control across login sessions.",
      },
    ],
    challenges: [
      "Fixing Plank division-by-zero clamping when ActiveTime=0 by engineering an in-memory function interceptor in C.",
      "Eliminating librsvg rendering timeouts on high-resolution displays by pre-caching 128x128 PNG icon buffers.",
    ],
    downloads: {},
    releaseNotes: [
      {
        version: "1.0.0",
        tag: "v1.0.0",
        date: "October 2026",
        title: "v1.0.0 — macOS Tahoe 26 Release",
        summary:
          "Complete pixel-perfect transformation suite with C LD_PRELOAD runtime hook, GLSL shaders, automated installer and rollback.",
        changes: [
          {
            title: "C LD_PRELOAD Runtime Hook (libplank-noglow.so)",
            badge: "C / Runtime",
            fix: "Atomically patches Plank active-glow function with 0xc3 ret instruction, removing ugly background glow boxes.",
          },
          {
            title: "Clutter GLSL Hardware Window Corners",
            badge: "GLSL / Compositor",
            fix: "Compositor-level 14px rounded window clipping and soft drop-shadow rendering.",
          },
          {
            title: "Automated Installer & Safe Rollback",
            badge: "Automation",
            fix: "One-command install.sh and rollback.sh script suite with baseline gsettings backup.",
          },
        ],
      },
    ],
  },
];

export const inProgressProjects: Array<{
  name: string;
  oneLiner: string;
  status: string;
  stack: string[];
}> = [];

export const getProject = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);
