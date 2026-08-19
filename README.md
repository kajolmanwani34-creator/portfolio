# Kajol Davda — Portfolio

A minimal, single-page portfolio built with Next.js 16, Tailwind CSS v4 and Motion.

**Direction:** the layout and typographic rhythm follow [emilkowal.ski](https://emilkowal.ski)
(692px column, 16px base, quiet greys), project rows reveal a screenshot on hover in the
style of [brianlovin.com/sites](https://brianlovin.com/sites), and a vibrant blue accent
(`#3d8bff` dark / `#0a6cff` light) carries hover, focus and link states.

## Run it

```bash
npm install
npm run dev
```

## Where the content lives

| What | File |
| --- | --- |
| Projects, craft, previews, links | `src/lib/content.ts` |
| Name, role, bio, Connect copy | `src/app/page.tsx` |
| Colors, type, motion tokens | `src/app/globals.css` |
| Page title / OG metadata | `src/app/layout.tsx` |
| Hover-preview behaviour | `src/components/ProjectList.tsx` |

Screenshots live in `public/work/` as 1600×1000 (16:10) WebP. To add one, drop the file
in and list it under a project's `previews` array — a project with more than one image
cycles through them while hovered.

All previews are real screenshots. Nothing in `public/work/` is an SVG any more, so the
`images` block in `next.config.ts` can be removed whenever you like.

## Notes

- Dark by default, follows the system preference on first visit, and the toggle in the
  header persists a choice to `localStorage` (applied before paint, so no flash).
- Hover previews run above 1024px on fine pointers. Below that, each row shows its
  screenshot inline instead, so touch users see the work without hovering.
- Respects `prefers-reduced-motion`.

## Deploy

Push to a Git repo and import it on Vercel — the defaults work as-is. Update `siteUrl`
in `src/app/layout.tsx` to the production domain before launch.
