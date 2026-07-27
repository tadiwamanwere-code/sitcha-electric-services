# Images

Drop the client's photos here. Referenced from `src/data.ts` as absolute paths
(`/images/hero.jpg`) — Vite copies `public/` verbatim.

## Required files

| File | Aspect | Notes |
|------|--------|-------|
| `hero.jpg` | 16:9 landscape | ~1920px wide, **< 300KB**. Visual interest on the RIGHT, calm on the left (text sits over the left third). Mid-to-dark tones hold white text. The only image without `loading="lazy"`. |
| `services-banner.jpg` | wide landscape | Can reuse a strong project photo. |
| `project-1.jpg` … `project-3.jpg` | 4:3 landscape | Crops to `aspect-[4/3]` on the card. |
| `gallery-1.jpg` … `gallery-6.jpg` | square-ish | Crops to `aspect-square` — keep the subject centred. |

One photo can legitimately serve several slots.

## Also needed in `public/` (one level up)

`favicon.svg` (shipped), plus generated PNGs: `favicon-32.png`, `favicon-64.png`,
`apple-touch-icon.png` (180×180), `icon-512.png`.

```bash
npx sharp-cli --input public/favicon.svg --output public resize 180 180
mv public/favicon.png public/apple-touch-icon.png
```

## Asking the client for photos

> "Six to nine photos of finished work — taken in daylight, whole room in frame rather than
> close-ups, phone held horizontally, lights on. Please send them at original size (email or
> Drive), not compressed through WhatsApp."

WhatsApp compresses to ~800px. If it's the only option, ask them to send as "Document".

## Naming

Descriptive and kebab-case — small ranking signal, and it keeps the codebase readable.
`ceiling-livingroom.jpg` ✅  `IMG_4821.jpg` ❌

## Optimization

`vite-plugin-image-optimizer` compresses everything here at build time (quality 72,
typically 50–70% smaller). No manual step needed unless a source file is enormous:

```bash
npx sharp-cli --input "raw/*.jpg" --output public/images resize 1920 --withoutEnlargement
```

## Stock photography

Unsplash and Pexels are free for commercial use, no attribution required. Search the
**specific trade term** ("suspended ceiling office", "roof truss installation"), not
"construction".

Keep the stock-photo comment in `src/data.ts` so the next person knows to swap them, keep
stock in the **Gallery** ("styles we install"), and keep **Projects** for real jobs only.
