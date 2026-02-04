Purpose
-------
This file gives concise, repository-specific guidance to AI coding agents so they can be productive immediately.

Key Points
----------
- **Project type:** VitePress-based static portfolio. Content and site sources live under `docs/`.
- **Primary pattern:** Filesystem-driven content: each work is a folder under `works/<slug>/` with an `index.md` and a cover image.

Developer workflows (exact commands)
----------------------------------
- Install dependencies: `npm install` (CI uses Node 24; see `.github/workflows/deploy.yml`).
- Dev server: `npm run docs:dev` (runs `vitepress dev docs`) — open `http://localhost:5173`.
- Build: `npm run docs:build` (runs `vitepress build docs`) — output: `docs/.vitepress/dist`.
- Preview built site: `npm run docs:preview` (runs `vitepress preview docs`).

Architecture & Conventions
--------------------------
- Filesystem discovery: the site imports works using the glob
	`import.meta.glob('../../../works/**/index.md', { eager: true })`. Keep new work folders following this layout so they are auto-discovered.
- Cover image convention: name images `cover.jpg|jpeg|png|webp` and import them via the image globs (use `import: 'default'` when consuming the glob result).
- GitHub Pages base handling: `config.ts` sets a `base` in production. UI code should build paths without the base (e.g. `/works/?id=slug`) and call `withBase()` when rendering links or passing paths to the router. Do NOT hardcode the repo name or base path.
- SPA-like navigation: the `WorkPage.vue` pattern reads `?id=slug` on mount, updates `currentSlug`, and navigates using `router.go(withBase(routePath))` combined with `@click.prevent` to avoid full reloads. Preserve `@click.prevent` + `router.go()` when adjusting nav behavior.

Where to change or add content
-----------------------------
- Add a work: create `works/<your-slug>/index.md` (copy a nearby example), add `cover.png` (or other supported format), then commit.
- Discovery code: see `docs/documentation/RoutingOnGithub.md` for the exact glob and route handling examples.

Dependencies & build notes
-------------------------
- Key libraries: `p5`, `three`, `gsap` (runtime). Tailwind and PostCSS are configured (`tailwind.config.js`, `postcss.config.cjs`).
- Scripts in `package.json` (examples):
	- `docs:dev`: `vitepress dev docs`
	- `docs:build`: `vitepress build docs`
	- `docs:preview`: `vitepress preview docs`

CI / Deployment
---------------
- GitHub Actions builds the site and publishes the `docs/.vitepress/dist` artifact to GitHub Pages (see `.github/workflows/deploy.yml`). Keep the `base` handling logic in `config.ts` intact — it mirrors the Pages deployment path.

Quick examples (copy/paste safe)
-------------------------------
- Add a new work folder:

	works/my-new-piece/index.md

	- cover.png

- Use discovery glob (example found in `docs/documentation/RoutingOnGithub.md`):

	const modules = import.meta.glob('../../../works/**/index.md', { eager: true })

Notes / gotchas
---------------
- Do not hardcode the repository name or Pages base — always use `withBase()` when rendering links that will be served from GitHub Pages.
- Keep the `@click.prevent` + `router.go()` pattern for SPA navigation to avoid breaking the intended in-place transition.

Files to inspect
----------------
- `package.json` — scripts and deps.
- `docs/documentation/RoutingOnGithub.md` — canonical examples for the glob, importing works, and `withBase()` usage.
- `docs/index.md`, `docs/about.md` — frontmatter and layout examples.
- `.github/workflows/deploy.yml` — CI build + deploy steps.

Questions for the maintainer
---------------------------
- Preferred local Node version for contributors (CI uses `24`).
- Preferred package manager (npm / pnpm / yarn).
- Any private assets or secrets used during deploy agents must not attempt to recreate?

If helpful I can:
- Add a small `CONTRIBUTING.md` or PR template describing "how to add a work".
- Add a tiny test harness that asserts `import.meta.glob` finds every `works/**/index.md`.
