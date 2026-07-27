# Sitcha Electric Services — Website

Marketing site for **Sitcha Electric Services**, an electrical and solar contractor based in
Masvingo, Zimbabwe, serving Masvingo, Zvishavane, and Chiredzi.

Single scrolling page: Hero → About → Services → Projects → Gallery → Process → Contact,
plus a grounded AI chat assistant.

**Stack:** React 19, Vite 6, Tailwind CSS v4, `motion/react`, `lucide-react`, TypeScript.
An Express server mounts the API routes for local dev and self-hosting; the same handlers
deploy to Vercel as serverless functions (`api/chat.ts`, `api/quote.ts`).

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
cp .env.example .env     # optional — see below
npm run dev              # → http://localhost:3000
```

The AI chat assistant works **without** an API key (it falls back to canned replies).
Set `GEMINI_API_KEY` in `.env` for live AI responses.

## Editing content

Almost everything lives in two files:

- **`src/data.ts`** — all copy, services, projects, gallery, contact details
- **`src/index.css`** — the `@theme` block: brand colours and fonts

Also check: `src/components/Logo.tsx`, `index.html` (title + meta description),
`api/_prompt.ts` (the chatbot's grounding), and `public/favicon.svg`.

### Photos

`public/images/` currently holds **stock photography from Unsplash**, chosen to match the
services actually offered. These should be replaced with real Sitcha job photos as they
become available — real photos are the single biggest quality lever on a site like this.
The stock placeholders are flagged in comments in `src/data.ts`.

### Logo

`src/components/Logo.tsx` is the "SA" monogram rebuilt as inline SVG from the client's
supplied artwork (`brand/logo-original-mockup.png`, a 3D mockup render with no extractable
transparent layer). The vector version is transparent, resolution-independent, and used for
the nav, footer, and favicon.

After changing the mark, regenerate the PNG icons:

```bash
node scripts/gen-favicons.mjs
```

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Express + Vite dev server with the API routes mounted |
| `npm run lint` | `tsc --noEmit` |
| `npm run build` | Vite client build → `dist/`, plus a bundled Node server |
| `npm start` | Serve the production build (`NODE_ENV=production`) |
| `node scripts/gen-favicons.mjs` | Regenerate PNG favicons from `public/favicon.svg` |

## Lead delivery

The quote form uses a **WhatsApp deep link**: on submit it opens WhatsApp with the enquiry
pre-filled and addressed to the number in `CONTACT_INFO.whatsapp`. Chosen because WhatsApp is
already Sitcha's primary customer channel, it needs no email provider or domain verification,
and there is no backend that can silently swallow a lead.

Note the visitor still has to press **send** inside WhatsApp — the success panel says so
rather than claiming the message was received.

To switch to email instead: POST `formState` to `/api/quote` in `Contact.tsx`'s `handleSubmit`
(the route is still in `api/quote.ts`) and set the three `QUOTE_*` env vars below. Then send a
real test submission and confirm it arrives.

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `GEMINI_API_KEY` | no | Live AI chat; falls back to canned replies without it |
| `RESEND_API_KEY` | only if using the email quote route | Quote-form email delivery |
| `QUOTE_TO_EMAIL` | only if using the email quote route | Where leads land |
| `QUOTE_FROM_EMAIL` | only if using the email quote route | Verified sender on your domain |
| `PORT` | no | Defaults to 3000 |

## Deployment

**Vercel** — static Vite build plus `api/*.ts` as serverless functions.
Build command `npm run build`, output directory `dist`. Add every env var to
**Production, Preview, and Development**.

**Node / VPS** —
```bash
npm run build
NODE_ENV=production node dist/server.cjs
```
Put nginx or Caddy in front for TLS; run under pm2 or systemd.

## Outstanding

- Replace stock photography with real job photos (`public/images/`).
- Confirm weekday working hours with the client — see the note on `CONTACT_INFO.hours`
  in `src/data.ts`. Weekend availability is taken from their existing site.
- The supplied logo artwork reads "Sitcha Electric **Service**"; the live site and Facebook
  page both use "Sitcha Electric **Services**". The site uses "Services" — confirm which is
  correct.
