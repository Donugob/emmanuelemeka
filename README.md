# emmanuelemeka.cv

Personal portfolio and interactive CV for **Emeka Emmanuel Ugonna (Ugo.B)** — full-stack engineer, founder, and legal scholar.

## Stack

- [Astro](https://astro.build) + TypeScript
- Tailwind CSS v4
- Design direction: editorial dark “Intersection Brief”

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Content source

Profile and project copy are derived from `context.md`. Update that file, then adjust components under `src/components/` as needed.

## Deploy

### Pxxl (pxxl.app)

This repo includes `pxxl.toml` for Pxxl’s install → build → start pipeline:

| Phase   | Command                                      |
| ------- | -------------------------------------------- |
| Install | `npm install`                                |
| Build   | `npm run build`                              |
| Start   | `npm start` → Astro preview on `0.0.0.0:$PORT` |

In the dashboard, ensure **Port** matches `4321` (or whatever `PORT` you set), or leave the app reading `process`/CLI `PORT` (already wired).

Alternatively, for pure static serving, leave **Start command** empty and set **output directory** to `dist` (per [Pxxl framework recipes](https://docs.pxxl.app/framework-recipes)).

### Other hosts

Static output from `npm run build` (in `dist/`) also works on Vercel, Coolify, or any static host.
