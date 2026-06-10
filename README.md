# Prathamesh Berad — Portfolio

An interactive 3D portfolio for **Prathamesh Berad**, Associate Product Manager.
Built with React + TypeScript + Vite, GSAP (ScrollSmoother / SplitText) for the
scroll choreography, and Three.js / react-three-fiber for the hero avatar and the
physics-based toolkit scene.

Design and interaction model are adapted from the reference
[`akashrmalhotra/3d-portfolio`](https://github.com/akashrmalhotra/3d-portfolio);
**all content, projects, avatar, and identity are Prathamesh's own.**

## Tech stack

- **React 18 + TypeScript + Vite**
- **GSAP** — `ScrollSmoother`, `ScrollTrigger`, `SplitText` (free in GSAP ≥ 3.13)
- **three / @react-three/fiber / @react-three/drei** — hero avatar scene
- **@react-three/rapier / @react-three/postprocessing** — toolkit physics balls + N8AO
- **react-fast-marquee**, **react-icons**

## Local development

```bash
npm install
npm run gen:assets   # builds tool tokens, project cards, favicon, and the hero avatar
npm run dev          # http://localhost:5173
```

`npm install` runs the asset generation automatically (see `postinstall` note in
Scripts), but you can re-run `npm run gen:assets` any time you change the source
photo at `scripts/source-photo.jpg`.

## Build

```bash
npm run build      # type-checks then outputs to dist/
npm run preview    # serve the production build locally
```

## The hero avatar (Phase 4 note)

The reference portfolio uses a **bespoke, fully-rigged 3D character model**. The
hero here is a **stylized full-body 3D character render of Prathamesh** standing
in the scene — the same standing-character layout as the reference:

- `scripts/gen-avatar.mjs` takes the source render (`scripts/avatar_cutout.png`),
  **keys out the light-grey backdrop + white podium** (luminance/saturation key),
  keeps the largest connected component, erodes the halo, feathers the edge, and
  trims to the figure → `public/images/avatar.png`.
- `src/components/Avatar/` renders it on a plane that **idle-floats**,
  **parallax-tilts toward the cursor**, and sits inside an ambient particle
  field with a cyan rim-glow — fully GPU-accelerated and lightweight.

To swap the character, replace `scripts/avatar_cutout.png` (or set
`AVATAR_SRC=path`) and re-run `npm run gen:avatar` (tune `SAT_FG` / `LUM_FG` at
the top of the script if the background key needs adjusting).

## Deployment — GitHub Pages

This repo is configured to deploy to
`https://prathameshberad.github.io/Prathamesh-Berad.github.io/`.

Because that is a **project page** (the repo name is not `prathameshberad.github.io`),
the Vite `base` is set to `/Prathamesh-Berad.github.io/` for production builds
(`vite.config.ts`). If you move to a user page or custom domain, set
`VITE_BASE=/` (or your sub-path) at build time.

### Automatic (recommended)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.
Enable it once:

1. Push this project to `https://github.com/PrathameshBerad/Prathamesh-Berad.github.io`.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`; the site publishes automatically.

### Manual

```bash
npm run build
npx gh-pages -d dist        # or commit dist/ to a gh-pages branch
```

## Project structure

```
public/
  images/            project cards + hero avatar (generated)
  images/tools/      toolkit tokens (generated)
  Prathamesh_Berad_Resume.pdf
scripts/
  gen-svgs.mjs       tool tokens, project cards, favicon
  gen-avatar.mjs     photo → feathered hero portrait
  source-photo.jpg   avatar source
src/
  components/
    Avatar/          3D hero (floating parallax portrait + particles)
    TechStack.tsx    physics-driven toolkit balls
    Landing, About, WhatIDo, Career, Work, Contact, Navbar, SocialIcons, Loading, Cursor
    utils/           GSAP scroll choreography, split-text, initial FX
  context/LoadingProvider.tsx
```
