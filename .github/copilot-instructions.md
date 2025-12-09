Purpose
-------
This file gives concise, repository-specific guidance to AI coding agents so they can be productive immediately.

**Big picture**
- **Type:** VitePress-based static portfolio (docs site lives in `docs/`).
- **Build & dev:** `npm run docs:dev`, `npm run docs:build`, `npm run docs:preview` (see `package.json`).
- **Deploy:** GitHub Actions deploys the generated site to GitHub Pages; see `.github/workflows/deploy.yml` (artifact path: `docs/.vitepress/dist`).

**Key architectural patterns**
- **Filesystem-driven works:** project entries live under `works/<slug>/index.md`. The site loads them with `import.meta.glob('../../../works/**/index.md', { eager: true })` (see `docs/documentation/RoutingOnGithub.md`).
- **Image convention:** cover images are named `cover.{jpg,jpeg,png,webp}` and are imported with `import: 'default'` in image globs.
- **Base handling for GitHub Pages:** `config.ts` sets `base` to `/${repoName}/` in production; UI code always builds routes without the base (e.g. `/works/?id=slug`) and uses `withBase()` when rendering links.
- **SPA-like work navigation:** `WorkPage.vue` reads `?id=slug` on mount, updates `currentSlug`, and uses `router.go(withBase(routePath))` together with `@click.prevent` to change the URL without a full reload.

**Developer workflows (exact commands)**
- Install deps: `npm install` (CI uses `node 24` and `npm install`; see `.github/workflows/deploy.yml`).
- Local dev server: `npm run docs:dev` → open `http://localhost:5173`.
- Build for production: `npm run docs:build` → outputs to `docs/.vitepress/dist`.
- Preview production build: `npm run docs:preview`.

**How to add a new work (concrete steps)**
1. Create a folder: `works/<your-slug>/`.
2. Add `index.md` (copy an existing `works/*/index.md` as a template).
3. Add a cover image named `cover.png` (or `jpg`, `webp`).
4. `git add . && git commit -m "Add work: <your-slug>" && git push`.

**Conventions and gotchas for code edits**
- Never hardcode the repo name or GitHub Pages base; use `withBase()` for rendering `href` values.
- When updating discovery logic, follow the existing globs in `RoutingOnGithub.md` (they rely on the relative import path `../../../works/**/index.md`).
- When changing link generation, ensure links are written without the base (e.g. `/works/?id=slug`) and wrapped in `withBase()` in templates.
- UI navigation relies on `@click.prevent` + `router.go()`; preserve this pattern to keep SPA behavior.

**Dependencies and runtime notes**
- Uses creative-coding libraries: `p5`, `three`, `gsap` (declared in `package.json`).
- Tailwind CSS + PostCSS are configured (`tailwind.config.js`, `postcss.config.cjs`) — follow existing utility-first classes.

**Files to inspect for context or examples**
- `package.json` — scripts and dependencies.
- `docs/documentation/RoutingOnGithub.md` — explicit code examples for routing, discovery, and `withBase()` usage.
- `docs/about.md` and `docs/index.md` — examples of frontmatter `layout: home` and content structure.
- `.github/workflows/deploy.yml` — CI/CD and Pages deployment steps.

Questions for the maintainer (please answer to reduce guesswork)
- Preferred local Node version for contributors (CI uses `24`)?
- Do you prefer `npm` or another package manager (pnpm / yarn)?
- Any private assets or secrets used during deploy that agents must not attempt to recreate?

If you'd like, I can also:
- Add a short PR template or CONTRIBUTING.md with the "add a work" checklist.
- Create a small test harness that validates `import.meta.glob` discovery for `works/**`.
