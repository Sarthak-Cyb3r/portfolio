# Sarthak — SaaS Portfolio & Engineering Showcase

> **16-year-old 11th grader studying at Chinmaya Vidyalaya & vibe coder** crafting high-performance SaaS applications, real-time multiplayer systems, mobile audio engines, and developer tools.

[![Live on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://sarthak-cyb3r.vercel.app)
[![Next.js 15](https://img.shields.io/badge/Next.js-15%20(App%20Router)-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Three.js](https://img.shields.io/badge/3D-Three.js%20%2B%20WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

---

## 🌐 Live Deployments

| Channel | URL | Notes |
|---|---|---|
| **Primary Domain** | [https://sarthak-cyb3r.vercel.app](https://sarthak-cyb3r.vercel.app) | Production Canonical |
| **Portfolio Alias** | [https://sarthak-cyb3r-portfolio.vercel.app](https://sarthak-cyb3r-portfolio.vercel.app) | Branded Alias |
| **Alternative Alias** | [https://portfolio-sarthak-cyb3r.vercel.app](https://portfolio-sarthak-cyb3r.vercel.app) | Mirrored Alias |
| **GitHub Repository** | [https://github.com/Sarthak-Cyb3r/portfolio](https://github.com/Sarthak-Cyb3r/portfolio) | Private |

---

## ✨ Features & Highlights

### 1. SaaS 3D Interactive Hero Canvas
- **WebGL Three.js Engine**: Dynamic geometric Torus Knot with custom wireframe shaders, particle fields, and smooth mouse-follow physics.
- **Scroll-Linked Mechanics**: 3D rotation, scaling, and camera depth seamlessly driven by scroll velocity.

### 2. Motion & Velocity Animations
- **Motion Engine**: Smooth spring physics, staggered list entries, and sticky scroll transitions.
- **Micro-Interactions**: Magnetic buttons, holographic gradient glow borders, and synthetic Web Audio sound effects on click.

### 3. Mobile Dynamic Island & Floating Dock
- **Adaptive Mobile Layout**: Custom dynamic island status bar, bottom blur navigation dock, and touch-optimized drawer menus.
- **Haptic & Visual Feedback**: Fluid touch targets designed specifically for handheld navigation.

### 4. Interactive In-Browser Terminal
- Fully functional CLI terminal emulator supporting interactive commands:
  - `help` — Lists available commands
  - `projects` — Displays project manifest with quick links
  - `skills` — Prints full technical stack & tools
  - `stats` — Shows real-time vibe coding metrics
  - `download` — Triggers verified Linux (`.deb`) and Android (`.apk`) downloads
  - `contact` — Quick-copy contact info
  - `clear` — Resets console output

### 5. Interactive Vibe Coding Calculator
- Interactive ROI & dev velocity widget demonstrating real-world productivity multipliers and rapid prototyping speed.

### 6. Case Study Hub & Route Architecture
- Deep-dive product breakdowns with architecture diagrams, live demo links, and tech breakdowns:
  - **Ludo with Friends** — Real-time multiplayer board game with Firebase subcollections, Electron desktop shell, Capacitor Android app, and PWA offline support.
  - **Studystack** — JEE 2028 analytics tracker, revision schedule engine, and test performance diagnostics.
  - **Softify** — Ad-free, paywall-free Android music streaming app built with Flutter. 320kbps studio masters, synced lyrics, Spotify importer, and offline playback ([GitHub Repo](https://github.com/Sarthak-Cyb3r/softify)).
  - **Accounty** — Double-entry personal ledger and finance tracker.

### 7. Hosted Real Binaries
- Direct downloads hosted and available:
  - **Softify Android APK**: [Softify-v1.0.0-Universal.apk](https://github.com/Sarthak-Cyb3r/softify/releases/tag/v1.0.0) (65.4 MB)
  - **Ludo Android APK**: `ludo-with-friends.apk` (4.7 MB)
  - **Ludo Linux Debian Package**: `ludo-with-friends-1.0.0-amd64.deb` (94 MB)

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19, Turbopack)
- **3D & Visuals**: [Three.js](https://threejs.org/) WebGL canvas
- **Animation**: [Motion / Motion Plus](https://motion.dev/) (Framer Motion)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom dark neon/cyber SaaS theme
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Feedback**: Native HTML5 Web Audio API synthesizers
- **Deployment**: [Vercel](https://vercel.com/) Edge Network

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Sarthak-Cyb3r/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server with Turbopack
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Compile and optimize for production
npm run build

# Run production server locally
npm run start
```

### Deploying to Vercel

```bash
# Deploy to production
vercel --prod
```

---

## 📂 Project Structure

```text
portfolio/
├── public/
│   ├── downloads/          # Pre-built verified native binaries (.deb, .apk)
│   ├── projects/           # High-resolution screenshots & UI mockups
│   ├── favicon.ico         # Favicon and branding assets
│   └── sitemap.xml         # Auto-generated SEO sitemap
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root HTML shell, fonts, meta tags
│   │   ├── page.tsx        # SaaS Landing Page with 3D Canvas & Bento grid
│   │   ├── projects/       # Dynamic case study route engine (/projects/[slug])
│   │   └── sitemap.ts      # Programmatic sitemap generator
│   ├── components/
│   │   ├── 3d/             # Three.js canvas & WebGL shaders
│   │   ├── layout/         # Navigation dock, header, footer, dynamic island
│   │   ├── projects/       # Case study cards, filters, bento items
│   │   ├── sections/       # Hero, Terminal, Calculator, Experience, Contact
│   │   └── ui/             # Glass buttons, badges, modals, tooltips
│   ├── data/
│   │   └── projects.ts     # Centralized structured case study data
│   └── lib/                # Audio synthesizer, utilities, animation helpers
└── vercel.json             # Vercel deployment & cache headers configuration
```

---

## 📬 Contact & Connect

- **Email**: [lakh125yu@gmail.com](mailto:lakh125yu@gmail.com)
- **GitHub**: [@Sarthak-Cyb3r](https://github.com/Sarthak-Cyb3r)
- **Portfolio**: [https://sarthak-cyb3r.vercel.app](https://sarthak-cyb3r.vercel.app)

---

*Designed and vibe-coded with precision by Sarthak.*
