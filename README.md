# eXobe Africa — Marketplace Build (Phase 2 Technical Assessment)

## 1. How to run it
**Live:** (https://exobe-market-ochre.vercel.app/)
**Locally:**
```bash
npm install
cp .env.example .env        # fill in Supabase DATABASE_URL, DIRECT_URL, anon key
npx prisma generate
npx prisma db push          # creates tables in your Supabase project
npm run db:seed             # optional: seeds 3 demo vendors + 5 listings
npm run dev
```
Requires a free Supabase project (Postgres connection string + API keys from Project Settings) and a public Storage bucket named `product-images` for image uploads. Without Storage configured, listings still work — they fall back to a placeholder image.

## 2. Stack and AI tools used
**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, Zustand (cart), Prisma ORM + Supabase Postgres, Supabase Storage (images), Zod (validation), deployed on Vercel.
**AI tools used:** Claude (Sonnet) for scaffolding the Next.js project, generating the Prisma schema, API routes, and page components from a spec I directed; for catching lint/type issues during the build; and as a sounding board on the marketplace data model (e.g. why stock-decrement needs to be transactional). I reviewed, ran, and tested every file — see decisions below for where I overrode or adjusted what was generated. AI was not used to write the README's commercial reasoning (sections 3–6) without my own judgment behind it.

## 3. Key decisions made
- **Next.js API routes instead of a separate NestJS service.** The brief lists NestJS/Fastify in the stack, but for a 48-hour single-developer build, splitting frontend/backend into two deployable services adds coordination overhead without adding correctness. Next.js Route Handlers + Prisma give the same REST surface with one deploy target. I'd reach for NestJS once the team and request volume justify a separate service boundary.
- **Atomic checkout via `prisma.$transaction`.** Even without real payments, two buyers should never be able to "buy" the last unit of the same product. Order creation and stock decrement happen in one transaction so a race condition can't oversell stock.
- **No vendor authentication.** Vendors are identified by the ID returned at registration (shown on-screen, used in the dashboard URL). This is a deliberate, named gap — see "what I chose not to build" — not an oversight.

## 4. What I chose not to build
- **Vendor login/auth** — registering and managing a session (password reset, magic links) is its own scoped piece of work. I prioritized getting the core listing → discovery → cart → checkout loop working end-to-end over partial auth.
- **Multi-currency/cross-border UI** — speculative continental features without the South-Africa-first core solid would be decoration over substance, given the brief's own "build for South Africa today" instruction.
- **Real payment integration** — explicitly out of scope per the brief.
- **AI recommendation engine / smart search** — a real recommender needs real interaction data; faking one would be decorative rather than functional.

## 5. What I would build next
Vendor email-based magic-link auth (so the dashboard isn't just a guessable URL), real review/rating storage to back the verification badge with actual buyer feedback, and a request-for-quote path for service listings (like the phone repair example) where checkout doesn't make sense.

## 6. Most critical observation about eXobe
[This is the section the panel will discuss with you directly — write this one yourself based on what you actually noticed on www.exobe.africa and while building. A few honest angles worth considering, pick the one you actually believe: the live site's metadata reads as a fairly standard multi-vendor storefront template without a visible trust/verification layer for vendors — which is the exact gap this build's verification badge + dashboard targets; or: there's no visible vendor-side performance feedback loop on the live site, which is what the dashboard's views/units-sold stats address.]
