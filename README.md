# eXobe Africa — Marketplace Build (Phase 2 Technical Assessment)
## 1. How to run it Live: (https://exobe-market-ochre.vercel.app/)  
### Locally:
```bash
npm install
cp .env.example .env        # fill in Supabase DATABASE_URL, DIRECT_URL, anon key
npx prisma generate
npx prisma db push          # creates tables in your Supabase project
npm run db:seed             # optional: seeds 3 demo vendors + 5 listings
npm run dev
## 2. Stack and AI tools used
Stack: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, Zustand (cart), Prisma ORM + Supabase Postgres, Supabase Storage (images), Zod (validation), deployed on Vercel. AI tools used: I used Claude on the Next.js project I built to generate the Prisma schema, API routes, and page components from a spec I directed, and as a sounding board on the marketplace data model. I then used v0 to revamp my frontend.
## 3. Key decisions made
•	Next.js API routes instead of a separate NestJS service – I noticed you use it, and although I attempted it I thought Next.js API  was a safer option. 
•	Atomic checkout via Prisma transaction - Even without real payments, two buyers should never be able to "buy" the last unit of the same product.
•	trust and credibility layer  -  all relevant vendors were verified with badge
•	Category intelligence 
## 4. What I chose not to build
•	Vendor login/auth - (I prioritized getting the core listing → discovery → cart → checkout)
•	Multi-currency/cross-border 
•	Real payment integration 
•	AI recommendation engine / smart search 
## 5. What I would build next
Vendor email-based magic-link auth (so the dashboard isn't just a guessable URL), real review/rating storage to back the verification badge with actual buyer feedback, and a request-for-quote path for service listings (like the phone repair example) where checkout doesn't make sense.
## 6. Most critical observation about eXobe
Exobe’s current build has no verification badge for vendors, which is a key component I chose to tackle for my build version. Other than that, it is a well-thought-out, structured platform that is competitive and has minor faults. I also ensured to make my build as frictionless as possible, especially on the vendor registration and listing, and ease of use. 
