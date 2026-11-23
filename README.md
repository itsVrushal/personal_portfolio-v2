# Vrushal Patil — AI & Systems Developer Portfolio 🌌

> **Personal portfolio and engineering showcase of Vrushal Patil.**  
> Crafted with **Next.js 16**, **React 19**, **Three.js**, **Tailwind CSS v4**, and custom astronomical physics shaders.

[![Live Website](https://img.shields.io/badge/Live%20Site-vrushalpatil.vercel.app-ff6600?style=for-the-badge&logo=vercel)](https://vrushalpatil.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.184-black?style=for-the-badge&logo=threedotjs)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Automated Tests](https://img.shields.io/badge/Tests-34%20Passing-success?style=for-the-badge)](tests/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

---

## 👨‍💻 About Vrushal Patil

I am an **AI & Systems Developer** based in Pune, India, currently pursuing my B.Tech in Artificial Intelligence and Data Science at **Vishwakarma Institute of Technology (VIT Pune)** (*CGPA: 9.14*).

My engineering focus centers on high-performance applied AI, low-latency infrastructure, distributed systems, and polyglot software craftsmanship across **Python, Go, Rust, and TypeScript**.

### 💼 Experience

- **AutonexAI360** — *ML Developer* `(July 2026 – Sept 2026)`
  - Architected evaluation pipelines and automated benchmarking functions to measure frontier ML model outputs across continuous training iterations.
  - Implemented inference accuracy regression test suites to ensure model stability prior to production deployment.
- **PTC Pune** — *AI Engineering Intern* `(July 2025 – June 2026)`
  - Designed an autonomous multi-agent orchestration layer (LangChain) routing cross-database reasoning across Snowflake and PostgreSQL.
  - Benchmarked and shipped Redis-backed semantic caching: **801× query speedup** (31.9s → 0.03s), **60–90% reduction in redundant LLM API calls**, and **10–50ms cache-hit latency**.
  - Built hybrid RAG pipelines (semantic + BM25 keyword retrieval) with a 92% cache hit rate; developed modular Model Context Protocol (MCP) servers.
- **OneShot Technologies** — *Founding Engineer* `(2024 – Present)`
  - Architected edge-to-cloud video streaming converting raw RTSP feeds into ultra-low-latency WebRTC streams (`go2rtc`) across multi-brand IP cameras.
  - Engineered a secure Edge Gateway + WireGuard VPN networking layer enabling remote ML model management across 300+ distributed sites with zero public exposure.

### 🏆 Recognitions & Open Source

- **Patents Granted**: Awarded patents for video surveillance and real-time public transit safety systems.
- **Springer Publication**: Published peer-reviewed research on NLP and ensemble machine learning in *Springer LNNS, ICTIS 2024* (Scopus-indexed).
- **OSWorld Benchmark Contributor**: Fixed and stabilized GIMP task evaluators in the OSWorld computer-use agent benchmark ([PR #681 merged into `main`](https://github.com/xlang-ai/OSWorld/pull/681)).
- **HackMITWPU '24**: Runner-up for an edge-inference platform safety system deployed with Pune Maha-Metro.

---

## 🌐 About This Website

Designed and built from scratch as a high-performance, dark-aesthetic engineering console. Rather than a flat corporate template, this site combines **astronomical mechanics, dynamic living landscapes, and 3D physics**.

🔗 **Live Deployment:** [vrushalpatil.vercel.app](https://vrushalpatil.vercel.app)

### ✨ Signature Features

#### 1. 🌅 Living Landscape & Celestial Engine
- **Astronomical Trajectories (`lib/astronomy.ts`)**: Calculates real-time solar and lunar trajectories based on system time. The sun and moon rise from the eastern mountains and set across the western horizon along realistic elliptical curves.
- **Real-Time Moon Phases (`lib/moonPhase.ts`)**: Mathematical lunar cycle engine computing true illumination percentage and phase (New Moon, Waxing/Waning Crescent, Gibbous, Full Moon) with real-time SVG lunar shadow masks.
- **Atmospheric Lighting Shift**: Dynamic CSS variable interpolation transitioning between **Dawn, Sunrise, Golden Hour, Dusk, and Night**.
- **Living Flora & Fauna**: Daytime flocking birds, soaring hawks (`CircularBird.tsx`), riverside water highlights, grazing stag, and nighttime glowing fireflies.
- **Simulation Time Scrubber (`TimeScrubber.tsx`)**: Development controller permitting interactive scrubbing of the 24-hour celestial clock.

#### 2. 🌌 Ambient 3D Particle Physics
- Integrated **Three.js** canvas (`@react-three/fiber` & `@react-three/drei`) with dynamic particle distribution.
- Physics-based mouse repulsion: particles disperse on cursor approach and organically regain formation with realistic momentum damping.

#### 3. 📐 3D Perspective Scroll & Micro-Interactions
- Custom scroll hook (`use3DScroll.ts`) using **Framer Motion** to dynamically apply perspective rotation (`rotateX`), depth translation (`translateY`), and scale to content cards during viewport navigation.
- Smooth inertia scrolling via custom wheel acceleration interpolation (`SmoothScroll.tsx`).
- Glassmorphic UI surfaces (`GlassCard.tsx`) with layered frosted-glass borders and noise filters.

#### 4. 🚀 Featured Live Deployments & Project Demos
- **[Proof-Sheet](https://hnproofsheet.vercel.app/)** — Client-side editorial Hacker News sheet built in **Rust** (Leptos 0.8 CSR) compiled to WebAssembly with a Canvas 2D drying ink effect ([GitHub](https://github.com/itsVrushal/Proof-Sheet)).
- **[GitHub Activity Tracker](https://githubactivitytracker.vercel.app/)** — Real-time GitHub activity feed and annual contribution calendar built in **Go**, Templ, and HTMX with in-memory caching and Docker deployment ([GitHub](https://github.com/itsVrushal/Github-activity-tracker)).
- **Multi-Agent AI Network** — Enterprise RAG orchestration with Redis semantic caching and MCP servers.
- **Edge Vision Safety Pipeline** — Real-time YOLOv8 platform anomaly detection containerized with Docker for edge hardware.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework & Core** | Next.js 16.2.6 (App Router, Turbopack), React 19.2.4, TypeScript 5 |
| **3D & Canvas** | Three.js 0.184, `@react-three/fiber`, `@react-three/drei`, Canvas 2D |
| **Animation & Scroll** | Framer Motion 12.40, Custom 3D Perspective Hooks, Inertia Scroller |
| **Styling** | Tailwind CSS v4, PostCSS, Syne & DM Mono Google Fonts |
| **Testing** | Node.js Test Runner (`node --test`), TypeScript strip-types |
| **Deployment** | Vercel (Edge Network, CI/CD automated builds) |

---

## 📂 Project Directory Structure

```text
personal_portfolio-v2/
├── app/
│   ├── favicon.ico             # Custom browser favicon
│   ├── globals.css             # Tailwind v4 theme, font variables & celestial themes
│   ├── layout.tsx              # Root layout with SEO metadata & Google verification
│   └── page.tsx                # Orchestrates 3D canvas, landscape, and sections
├── components/
│   ├── about/                  # Education, philosophy, background
│   ├── achievements/           # Patents, Springer paper, HackMITWPU awards
│   ├── contact/                # Direct contact channels, socials & location
│   ├── experience/             # PTC, AutonexAI360, OneShot engineering roles
│   ├── hero/                   # Kinetic typography, role toggler, status indicators
│   ├── nav/                    # Responsive floating glass navbar
│   ├── projects/               # Filterable project showcase with Colab/GitHub/Demo links
│   ├── stack/                  # Domain-clustered technical skillset
│   └── ui/                     # 3D canvas, CelestialBodies, LivingLandscape, GlassCard
├── lib/
│   ├── astronomy.ts            # Sun/Moon solar elevation, zenith & trajectory math
│   ├── config.ts               # Feature toggles (e.g. enableTimeScrubber)
│   ├── data.ts                 # Strongly-typed source of truth for all portfolio data
│   ├── moonPhase.ts            # Lunar phase algorithm, illumination & SVG shadow mask
│   ├── use3DScroll.ts          # Framer Motion 3D tilt & perspective scroll transforms
│   └── useTimeOfDay.tsx        # React Context tracking 24h system time & time scrubber
├── public/                     # Static web assets
├── scripts/
│   └── check-case-studies.mjs  # Automation script checking portfolio sync state
├── tests/
│   ├── astronomy.test.mts      # Solar/lunar zenith and boundary invariant tests
│   ├── config.test.mts         # Production deployment config safety tests
│   ├── data.test.mts           # Schema and completeness validation for data.ts
│   ├── landscapeBounds.test.mts# Visual viewport and aperture boundary tests
│   └── moonPhase.test.mts      # Epoch validation against real astronomical events
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and npm scripts
└── tsconfig.json               # TypeScript strict configuration
```

---

## ⚡ Getting Started Locally

### Prerequisites

- **Node.js**: `v20.x` or later (tested on Node `v26.13.1`)
- **Package Manager**: `npm`, `pnpm`, or `bun`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/itsVrushal/personal_portfolio-v2.git
cd personal_portfolio-v2

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Quality Assurance

The codebase includes an automated test suite verifying mathematical models, astronomical algorithms, lunar cycle epochs, and data integrity:

```bash
# Run all automated test suites
npm test
```

### Test Coverage Highlights:
- **Astronomical Trajectories**: Verifies zenith at noon, horizon crossings at sunrise/sunset, and coordinate bounds `[0, 100]`.
- **Moon Phase Epochs**: Benchmarks calculations against historical astronomical events (New Moon Jan 11, 2024; Full Moon Jan 25, 2024; Solar Eclipse Apr 8, 2024; Super Blue Moon Aug 19, 2024).
- **Data Integrity**: Validates every project, achievement, and experience entry in `lib/data.ts`.
- **Production Safety**: Verifies debug tools like `TimeScrubber` are safely disabled by default in production configurations.

---

## 🚀 Building for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 📬 Contact & Connect

- **Portfolio**: [vrushalpatil.vercel.app](https://vrushalpatil.vercel.app)
- **LinkedIn**: [linkedin.com/in/vrushal-patil](https://linkedin.com/in/vrushal-patil)
- **GitHub**: [@itsVrushal](https://github.com/itsVrushal)
- **Email**: [pvrushal.2005@gmail.com](mailto:pvrushal.2005@gmail.com)
- **Location**: Pune, Maharashtra, India

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
