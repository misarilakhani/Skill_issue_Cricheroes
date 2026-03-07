# 🏏 Cricentrix — Cricket Impact Analytics Platform

> **A hybrid analytics platform that delivers real-time and offline cricket player impact scoring, powered by a multi-layer data architecture combining Supabase cloud database, local CSV ingestion, and static demo datasets.**

---

## 🌟 Overview

**Cricentrix** is a full-stack React web application built for the HackNUthon hackathon. It calculates and visualizes a **Player Impact Score (0–100)** by analyzing IPL/cricket match data across multiple dimensions: performance, match context, and pressure handling.

Unlike a purely database-driven tool, Cricentrix is a **hybrid model** — it can operate in three distinct data modes, making it resilient, flexible, and demo-ready without any backend dependency.

---

## 🧠 Hybrid Data Architecture

Cricentrix does **not** rely solely on Supabase. It features a **three-tier hybrid data model**:

| Layer | Source | Description |
|---|---|---|
| **Tier 1 — Cloud DB** | Supabase (PostgreSQL) | Live IPL match data fetched remotely from a hosted database |
| **Tier 2 — Local CSV** | PapaParse | Allows users to upload and parse local `.csv` match datasets directly in the browser |
| **Tier 3 — Demo Fallback** | `demoPlayers.js` / `demoDataset.js` | Static, curated built-in datasets that activate automatically when no DB/CSV is available |

This means the app works **100% offline** in demo mode, supports **custom local datasets** via CSV upload, and optionally connects to a **live Supabase backend** for real-time data.

---

## ✨ Features

### 📊 Core Analytics
- **Player Impact Score** — Rolling weighted score (0–100) based on Performance, Context, and Pressure dimensions
- **Impact Meter** — Animated radial gauge showing overall impact in real time
- **Trend Chart** — Recharts-powered line chart of rolling impact across recent innings
- **Profile Radar** — Spider/radar chart visualizing the six batting dimensions (Consistency, Strike Rate, Clutch, etc.)

### 🔍 Deep Analysis Tools
- **Pressure Analysis Card** — Quantifies performance under high-pressure scenarios (death overs, chases, etc.)
- **Turning Point Detector** — Identifies the exact innings/moment a player's form shifted
- **Score Story Generator** — Narrative text summarizing a player's performance arc
- **Highlight Detector** — Automatically surfaces the most impactful single innings
- **Scenario Analyzer** — Simulates hypothetical match conditions and projects impact

### 🗄️ Data Explorer
- **Database Explorer Page** — Browse live Supabase tables, run filters, and inspect raw match data
- **Local CSV Ingestion** — Upload any IPL-format `.csv` and analyze it instantly without backend setup
- **Impact Leaderboard** — Persistent local leaderboard (via `localStorage`) that stores and ranks analyzed players

### 🎨 Premium UI/UX
- **Dark Mode Design** — Deep gradient backgrounds with glassmorphism cards
- **CricketBackground** — Animated SVG cricket-themed particle canvas background
- **Custom Cricket Ball Cursor** — Global custom cursor replacing the browser default
- **Cricentrix Logo** — Custom SVG brand mark in the navigation bar
- **HowTo Modal** — Guided walkthrough for first-time users
- **History Modal** — Session history of all previously analyzed players

---

## 🏗️ Project Structure

```
src/
├── components/           # All reusable UI components
│   ├── Navbar.jsx            # Top navigation bar with logo
│   ├── Hero.jsx              # Landing hero section
│   ├── ImpactMeter.jsx       # Animated radial impact gauge
│   ├── TrendChart.jsx        # Recharts rolling impact line chart
│   ├── ProfileRadar.jsx      # Radar/spider chart for batting profile
│   ├── PressureAnalysisCard.jsx  # Pressure scenario breakdown
│   ├── ScenarioAnalyzer.jsx  # What-if scenario simulator
│   ├── TurningPointSection.jsx   # Turning point detection display
│   ├── ImpactHighlights.jsx  # Best innings highlights
│   ├── ImpactLeaderboard.jsx # Persistent ranked leaderboard
│   ├── ScoreStoryCard.jsx    # Narrative performance summary
│   ├── HistoryModal.jsx      # Session analysis history
│   ├── HowToModal.jsx        # User guide modal
│   ├── CricketBackground.jsx # Animated particle canvas
│   ├── ParticleBackground.jsx# Secondary background effect
│   ├── Cursor.jsx            # Custom cricket ball cursor
│   └── Logo.jsx              # SVG Cricentrix brand mark
│
├── pages/                # Top-level page components (routed)
│   ├── Landing.jsx           # Homepage / entry point
│   ├── ImpactCalculator.jsx  # Main analysis page
│   └── DatabaseExplorer.jsx  # Raw data browser
│
├── lib/                  # Core business logic
│   ├── impactLogic.js        # Impact Score calculation engine
│   ├── datasetAdapter.js     # Normalizes different CSV schemas
│   ├── datasetMapping.js     # Field mapping for CSV ingestion
│   ├── loadDataset.js        # Dataset loading orchestration
│   ├── demoDataset.js        # Built-in fallback dataset
│   └── historyStore.js       # In-memory session history store
│
├── services/
│   └── supabaseClient.js     # Supabase JS client initialization
│
├── data/
│   └── demoPlayers.js        # Curated demo player records
│
├── utils/                # Utility functions
│   ├── generateScoreStory.js # Narrative text engine
│   ├── highlightDetector.js  # Best innings identifier
│   ├── pressureAnalysis.js   # Pressure metric calculator
│   ├── scenarioAnalyzer.js   # Scenario simulation logic
│   ├── turningPointDetector.js # Momentum shift detection
│   └── leaderboardStorage.js # localStorage leaderboard manager
│
├── App.jsx               # Root component with routing
├── main.jsx              # React entry point
└── index.css             # Global styles & design tokens
```

---

## 🚀 Quick Start

You'll need **Node.js v18+** installed on your machine.

### 1. Clone & Install
```bash
git clone https://github.com/misarilakhani/Skill_issue_Cricheroes.git
cd Skill_issue_Cricheroes
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The app will be live at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```
Output goes to the `dist/` folder.

---

## ⚙️ Environment Variables (Optional — Supabase Tier)

The app works in **demo mode without any environment variables**. To connect to the live Supabase database (Tier 1), create a `.env` file in the root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note:** If these variables are missing or the connection fails, the app automatically falls back to the built-in demo dataset — no crash, no blank screen.

---

## 🗃️ Supabase Data Schema

When using the Supabase tier, the application expects a table named **`ipl_match_data`** with (at minimum) the following columns:

| Column | Type | Description |
|---|---|---|
| `player_name` | text | Full player name |
| `runs` | integer | Runs scored in the innings |
| `balls` | integer | Balls faced |
| `strike_rate` | float | Strike rate (runs/balls × 100) |
| `match_phase` | text | `powerplay`, `middle`, or `death` |
| `is_chase` | boolean | Whether it was a chase innings |
| `match_id` | text | Unique match identifier |
| `innings_date` | date | Date of the innings |

---

## 🧮 Impact Algorithm

The Player Impact Score is calculated as a **rolling weighted composite**:

```
Impact Score = (Performance × 0.5) + (Context × 0.3) + (Pressure × 0.2)
```

- **Performance** — Strike rate, runs relative to match average, boundary rate
- **Context** — Phase of game (powerplay/middle/death), innings role
- **Pressure** — Chasing low totals, wickets fallen, overs remaining

Each innings is weighted by recency, so recent form has a higher influence on the final score.

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **React 18** | UI framework |
| **Vite 5** | Build tool & dev server |
| **Tailwind CSS 3** | Utility-first styling |
| **Recharts** | Data visualization (charts) |
| **Supabase JS v2** | Cloud PostgreSQL client |
| **PapaParse** | Client-side CSV parsing |
| **Lucide React** | Icon system |
| **clsx + tailwind-merge** | Conditional class utilities |

---

## ☁️ Deployment

The app is deploy-ready for **Vercel** or **Netlify**:

1. Push this repository to GitHub (already done).
2. Link the repo to your Vercel/Netlify account.
3. Set the following build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in the dashboard (optional).
5. Deploy — the app works out of the box in demo mode even without Supabase credentials.

---

## 👨‍💻 Team

Built with ❤️ at **HackNUthon** by Team Skill Issue.

---

## 📄 License

MIT — free to use, fork, and extend.
