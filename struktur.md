# Projektstruktur – MyFirstRepository

## 📁 Überblick
VitePress-basiertes statisches Portfolio mit Vue.js Komponenten, Tailwind CSS Styling und GitHub Pages Deployment.

---

## 🎯 Root-Verzeichnis

### Konfigurationsdateien
- **`package.json`**
  - Projektmetadaten und Abhängigkeitsmanagement
  - Scripts: `docs:dev`, `docs:build`, `docs:preview`
  - Dependencies: Vue 3, p5.js, three.js, GSAP
  - DevDependencies: VitePress, Tailwind CSS, PostCSS, gh-pages

- **`tailwind.config.js`**
  - Tailwind CSS Konfiguration
  - Content-Pfade für Vue & Markdown Dateien
  - Theme-Customization möglich

- **`postcss.config.cjs`**
  - PostCSS Konfiguration
  - Tailwind CSS Processing

- **`Readme.md`**
  - Projekt-Dokumentation
  - Setup-Anleitung für Nutzer

- **`.gitignore`**
  - Git Ignore Rules (node_modules, build outputs etc.)

---

## 📂 `/docs/` – Hauptinhalt & VitePress

### Seiten
- **`index.md`**
  - Home-Seite / Landing Page
  - Layout: `home`
  - Rendert `WorkStack` Komponente

- **`about.md`**
  - About/Info Seite
  - Layout: `about`
  - Workshop-Dokumentation & Git-Anleitung
  - Struktur & Konzepte erklären

### Verzeichnisse
- **`/documentation/`**
  - **`RoutingOnGithub.md`**: Anleitung für Routing, Glob-Import und `withBase()` Verwendung

- **`/works/`**
  - Portfolio-Projekte (Arbeiten)
  - Jedes Projekt: `<slug>/index.md` + `cover.{jpg|png|webp|jpeg}`
  - Beispiele:
    - `NoiseMachine/` – Soundprojekt
    - `work1/` – Beispiel-Arbeit

---

## 🎨 `/.vitepress/` – VitePress Konfiguration & Theme

### Hauptkonfiguration
- **`config.mts`**
  - VitePress Konfiguration (TypeScript)
  - Site Title, Description, Base Path (GitHub Pages)
  - Navigation Menu (Nav Array)
  - Font Imports (IBM Plex Sans/Serif)

### `/theme/` – Custom Vue Theme
- **`Layout.vue`**
  - Haupt-Layout Komponente
  - Rendert NavBar, WorkPage, WorkStack, AboutPage oder Content
  - Responsive Container: `max-w-6xl`, `px-4 sm:px-6 lg:px-8`
  - Basisstile: Dark Text, Transparent BG

- **`index.ts` / `index.js`**
  - Theme Entry Point
  - Exports Layout & Komponenten

- **`/components/` – Vue Komponenten**
  - **`NavBar.vue`**
    - Navigation Header für Home und About Pages
    - Links zu Home, About, Works
    - `withBase()` für GitHub Pages Kompatibilität
    - Dynamische Sichtbarkeit (StopMotion-Event gesteuert)
    - Fixed Position, transparent Background

  - **`NavBarLanding.vue`**
    - Navigation Header für Landing Page (home layout)
    - Identische Funktionalität wie NavBar.vue
    - Spezifisch für StopMotion-Animation Seite
    - Event-Listener für Frame-Animation

  - **`WorkStack.vue`**
    - Landing Page mit Stop-Motion Animation
    - Rendert StopMotion Komponente
    - Lädt Frames: 01.png bis 04.png

  - **`WorkPage.vue`**
    - Portfolio Werke-Ansicht
    - Sidebar mit Projekt-Liste (Thumbnails)
    - Content Area mit Markdown-Rendering
    - Glob-Import für Works Discovery: `import.meta.glob('../../../works/**/index.md')`
    - URL-basierte Selektion: `?id=slug`
    - SPA Navigation mit `router.go()` + `@click.prevent`

  - **`AboutPage.vue`**
    - About/Info Seite Komponente
    - Markdown Content Rendering

  - **`StopMotion.vue`**
    - Stop-Motion Animation Player
    - Props: `frames` (Array), `fps`, `width`
    - Custom Events: `stopmotion:frame`

  - **`P5Sketch.vue`**
    - Wrapper für p5.js Sketches
    - Creative Coding Integration

  - **`ThreeScene.vue`**
    - Wrapper für Three.js Szenen
    - 3D Graphics Integration

- **`/home-page-components/`**
  - **`common/`**: Shared UI-Komponenten
  - **`frameworks-section/`**: Framework-Übersichts-Komponenten

- **`/styles/`**
  - **`tailwind.css`**: Tailwind CSS Import & Custom Utilities
  - **`vars.css`**: CSS Custom Properties / Design Variables
  - **`landing.css`**: Landing Page spezifische Stile

- **`exampleSketch.js`**
  - Beispiel p5.js Sketch Code

- **`exampleScene.js`**
  - Beispiel Three.js Szenen Code

### `/public/` – Statische Assets
- **`/stopmotion/`**
  - Stop-Motion Animation Frames
  - Dateien: `01.png`, `02.png`, `03.png`, `04.png`

### `/images/`
- Placeholder für weitere Bilder/Assets

### `/cache/`
- VitePress Build Cache (wird auto-generiert)

---

## 🔧 `/.github/` – GitHub Actions & Konfiguration

- **`copilot-instructions.md`**
  - Copilot AI Anleitung für dieses Projekt
  - Repository-spezifische Patterns & Conventions
  - Glob-Imports, Routing, `withBase()` Konzepte

- **`/workflows/`**
  - **`deploy.yml`**
    - GitHub Actions Workflow
    - Triggers: Push auf Main Branch
    - Node 24 LTS
    - Steps:
      1. Checkout Repo
      2. Install Dependencies (`npm install`)
      3. Build Site (`npm run docs:build`)
      4. Deploy to GitHub Pages (publiziert `/docs/.vitepress/dist`)

---

## 📊 Abhängigkeiten & Technologie-Stack

### Runtime Dependencies
- **Vue 3.5.27** – UI Framework
- **p5.js 2.1.1** – Creative Coding Sketches
- **Three.js 0.181.2** – 3D Graphics
- **GSAP 3.13.0** – Animation Library

### Build & Styling
- **VitePress 1.6.4** – Static Site Generator
- **Tailwind CSS 4.1.17** – Utility-first CSS Framework
- **@tailwindcss/postcss 4.1.17** – Tailwind PostCSS Plugin
- **@tailwindcss/typography 0.5.13** – Prose Styling

### Development
- **PostCSS 8.5.6** – CSS Transformation
- **Autoprefixer 10.4.22** – Browser Prefix Addition
- **gh-pages 6.3.0** – GitHub Pages Deployment Helper

### TypeScript
- **@types/node 24.10.1** – Node.js Type Definitions
- **@vue/compiler-sfc 3.5.27** – Vue Single File Component Compiler

---

## 🚀 Workflows & Scripts

### Development
```bash
npm run docs:dev      # Start Dev Server (localhost:5173)
npm run docs:build    # Build Static Site → docs/.vitepress/dist
npm run docs:preview  # Preview Built Site Locally
```

### Deployment
- Automatisch via GitHub Actions (`.github/workflows/deploy.yml`)
- Publiziert zu GitHub Pages unter `https://<user>.github.io/MyFirstRepository/`

---

## 📋 Dateibaum (Zusammengefasst)

```
MyFirstRepository/
├── package.json                          # Dependencies & Scripts
├── tailwind.config.js                    # Tailwind Config
├── postcss.config.cjs                    # PostCSS Config
├── Readme.md                             # Projekt Dokumentation
├── struktur.md                           # Diese Datei (optional)
│
├── docs/                                 # VitePress Content Root
│   ├── index.md                          # Home Page
│   ├── about.md                          # About Page
│   ├── documentation/
│   │   └── RoutingOnGithub.md           # Routing Guide
│   │
│   ├── works/                            # Portfolio Projekte
│   │   ├── NoiseMachine/
│   │   │   ├── index.md
│   │   │   └── cover.png
│   │   └── work1/
│   │       ├── index.md
│   │       └── cover.png
│   │
│   └── .vitepress/                       # VitePress Config & Theme
│       ├── config.mts                    # Main Config
│       ├── public/
│       │   └── stopmotion/               # Animation Frames
│       │       ├── 01.png
│       │       ├── 02.png
│       │       ├── 03.png
│       │       └── 04.png
│       │
│       └── theme/
│           ├── Layout.vue                # Haupt-Layout
│           ├── index.ts                  # Theme Export
│           ├── exampleSketch.js          # p5.js Example
│           ├── exampleScene.js           # Three.js Example
│           │
│           ├── components/               # Vue Komponenten
│           │   ├── NavBar.vue
│           │   ├── NavBarLanding.vue
│           │   ├── WorkStack.vue
│           │   ├── WorkPage.vue
│           │   ├── AboutPage.vue
│           │   ├── StopMotion.vue
│           │   ├── P5Sketch.vue
│           │   └── ThreeScene.vue
│           │
│           ├── home-page-components/     # Home Page Components
│           │   ├── common/

│           │   └── frameworks-section/
│           │
│           └── styles/
│               ├── tailwind.css
│               ├── vars.css
│               └── landing.css
│
└── .github/                              # GitHub Config
    ├── copilot-instructions.md           # AI Anleitung
    └── workflows/
        └── deploy.yml                    # GitHub Actions Workflow
```

---

## 🎯 Wichtige Konzepte

### Filesystem-driven Content
- Works werden via Glob-Import auto-discovered
- Pattern: `import.meta.glob('../../../works/**/index.md')`
- Jedes Work braucht: `works/<slug>/index.md` + Cover-Bild

### Responsives Design
- Tailwind Breakpoints: `sm:`, `md:`, `lg:`
- Container: `max-w-6xl` mit `px-4 sm:px-6 lg:px-8`
- FlexLayout für Mobile: `flex-col lg:flex-row`

### GitHub Pages Handling
- Base Path: `/MyFirstRepository/` (nur in Production)
- Helper: `withBase()` für Links & Routen
- SPA Navigation: `router.go(withBase(path))` + `@click.prevent`

### Creative Coding Integration
- p5.js Sketches via `P5Sketch.vue`
- Three.js Szenen via `ThreeScene.vue`
- Animation mit GSAP

