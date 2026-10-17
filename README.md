# Manan Singla Portfolio — Build Log

## Setup
```
npm install
npm run dev
```
Visit http://localhost:3000

## Architecture
- `lib/site-config.ts` — **single source of truth** for all facts (name, titles, descriptions, venture stage, book status). Edit here first, always.
- `lib/schema.ts` — JSON-LD builders, all keyed off stable `@id`s so Google resolves one Person entity, not duplicates.
- `lib/seo.ts` — `buildMetadata()` — call this in every page for consistent title/OG/Twitter tags.
- `app/sitemap.ts` / `app/robots.ts` — auto-generated, always valid (fixes the 404 sitemap/robots issue flagged on the old ECTO site).

## TODO before any page goes live (from the brief's verification rules)
- [ ] Confirm ECTO stage (`lib/site-config.ts` → `ecto.stage`)
- [ ] Confirm book status (`lib/site-config.ts` → `book.status`)
- [ ] Confirm founder/co-founder wording (Manan vs Vansh Gehlot)
- [ ] Confirm DPIIT/Startup India recognition status before using either term
- [ ] Get permanent hosted URL for primary portrait → `lib/site-config.ts` → `person.primaryPortraitUrl`
- [ ] Get real `sameAs` profile URLs (LinkedIn, ORCID, etc.) → `person.sameAs`

## Day-by-day progress
- [x] Day 1 — scaffold, SEO infra, schema infra, sitemap/robots, homepage shell
- [ ] Day 2 — design system wired in, Homepage + About finished
- [ ] Day 3 — Ventures + ECTO + S.S. Solutions
- [ ] Day 4 — Writing (book) + Research
- [ ] Day 5 — Logic + Press + Media Kit + Contact
- [ ] Day 6 — OG images, internal linking, schema validation
- [ ] Day 7 — QA, deploy, Search Console submission
