# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

SKCET SGPA/CGPA calculator: a client-only React 18 + Vite 5 SPA for Sri Krishna College of Engineering and Technology students. Plain JSX, no TypeScript, no router, no state library, no test suite. Hosted on GitHub Pages at https://ran-gan.github.io/SKCET-CGPA/.

## Commands

```bash
npm install
npm run dev       # vite --host (exposed on LAN)
npm run build     # production build to dist/ (terser, drops console.* and debugger)
npm run preview   # serve the built dist/
npm run lint      # eslint, --max-warnings 0
```

`npm run lint` currently fails with many pre-existing errors (mostly `react/prop-types` and unused vars). CI does not run lint, so don't treat a failing lint as a regression unless your change adds errors.

## Deployment

The code deploys when you push to `main`, but only if the head commit message **starts with `deploy`** (`.github/workflows/cd.yml`). The workflow writes `VITE_BASE_API` from a repo secret into `.env.production`, runs `npm run build`, then `npm run deploy` (`gh-pages -d dist`), which publishes to the `gh-pages` branch. Commits without the `deploy` prefix never reach the live site.

`dist/` is committed to `main` but is stale and isn't what gets served, because the live site comes from the `gh-pages` branch. A local `npm run build` rewrites these tracked files. Don't commit that churn unless you mean to.

## Architecture

- **Navigation is state-driven, not routed.** `LandingPage.jsx` holds `selectedYear`, `selectedDept` and `containerVisible`, and conditionally renders one of `SubjectCalculator` (year + dept picked), `Calculate` ("Calculate Yourself" manual entry) or `GetResult` (roll number + DOB lookup). Child views return to the menu by calling the `setContainerVisible(false)` prop. The "Check Result" and "Subscribe" buttons are commented out. The `"student update"` branch renders `StudentResult`, which isn't imported and doesn't exist, so it's dead code.
- **`src/data/subjectsData.js` is the data model.** `subjectsByYear[year][dept]` maps subject name to credits. Year keys (`"1st Year"`…`"5th Year"`) and department keys drive the landing page menus directly (`Object.keys`), so a department or year with no sourced data simply doesn't appear in the menu. Most curriculum updates only edit this file. Credit `0` subjects are ignored in SGPA. A year key means "the semester you wrote the exam in", so each rollover shifts every batch up one key; the file header records which semester, batch and regulation each key currently holds. Electives are stored as generic slots ("Professional Elective I"), and listing a subject a student didn't take is harmless because ungraded rows are skipped.
- **Department icons are looked up by key.** The landing page renders `` `${department}.webp` `` from `public/`, so a new department key needs a matching `public/<KEY>.webp` (spaces included, e.g. `MTech CSE.webp`). The hardcoded `departments` array in `LandingPage.jsx` is unused. Menus come from the data file.
- **Grade scales differ by regulation, keyed off the year.** In `SubjectCalculator.jsx`, 1st and 2nd Year (the R2026 and R2025 batches) use S/A+/A/B+/B(6.5)/C+/C plus zero-point U/SA/WC. Later years (R2022) use O/A+/A/B+/B/C/U. When the data rolls forward a semester, this check moves with the batch. The manual `Calculate.jsx` and `getResult.jsx` (`getGradePoints`) only know the O-scale.
- **SGPA formula:** it's the same in all three views, Σ(points × credits) / Σcredits, rounded to 2 decimals. `ResultContainer.jsx` displays the result and plays `public/low-sgpa.mp3` when SGPA < 7.5.
- **External services:**
  - A Cloudflare Worker (`https://cold-sea-e845.pradeepmojo1708.workers.dev`) backs the "calculations done" counter. `Header` GETs the count and `ResultContainer` hits `/up` on every result.
  - `GetResult` POSTs `{roll, dob}` to `${VITE_BASE_API}/api/getResult`. That backend isn't in this repo (`/backend` is gitignored).
  - `GetResult` guesses the department from roll-number substrings and fuzzy-matches returned subject titles against `subjectsData` on the first word.

## Paths and base URL

Vite `base` is `/SKCET-CGPA/`. `public/` assets are referenced with relative paths (e.g. `calculator.png`, `${dept}.webp`) or with the explicit `/SKCET-CGPA/` prefix (the audio in `ResultContainer`). A root-absolute path such as `/low-sgpa.mp3` (used in `getResult.jsx`) breaks in production.

## Styling and SEO

- The root `styles.css` is the only stylesheet in use (linked from `index.html` and bundled by Vite). `styles-new.css` isn't referenced.
- `index.html` carries most of the SEO surface: title and meta tags, Open Graph and Twitter cards, FAQPage and WebApplication JSON-LD, and GA4 and Microsoft Clarity snippets. `App.jsx` and `index.html` also contain `visually-hidden` keyword blocks.
- `public/sitemap.xml` has a hand-maintained `<lastmod>`.
