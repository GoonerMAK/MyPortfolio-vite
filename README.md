# My Portfolio

My personal site: who I am, what I've built, and how I think about building it.

**Live:** https://goonermak.github.io/

## What's on it

- **Home**: about me, skills, work experience, projects and contact.
- **Deep Dive** (`/deepdive`): features I've shipped and decisions I stand by, each with a small flow diagram. Also field notes on concepts I've learned on the job.
- **Game** (`/game`): a quick dispatch game. Read each request and send the right team (frontend, backend, DevOps or security) before time runs out.

Press `?` anywhere to see keyboard shortcuts.

## Built with

React, TypeScript, Vite, Tailwind CSS and Motion.

## Run it locally

You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Change the content

All text lives in `src/data/`, so you rarely need to touch components:

| File | What it holds |
|---|---|
| `portfolio.ts` | About, skills, experience, projects, contact |
| `highlights.ts` | Deep Dive features and decisions |
| `highlightDiagrams.ts` | The flow diagram for each highlight |
| `myStuff.ts` | Deep Dive field notes |

Colours are defined once in `src/index.css`. Use them as Tailwind classes (`text-primary`, `bg-bg-alt`) or through `src/lib/colors.ts` in inline styles.

## Deploy

```bash
npm run deploy
```

This builds the site and publishes it to GitHub Pages. Pushing to `main` does not update the live site.
