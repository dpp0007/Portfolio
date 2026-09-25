# Deepankar Patel — Vol. 01

An interactive, manga-styled personal portfolio. It's a static site with no build step and no dependencies: plain HTML, CSS and JavaScript.

## The story, chapter by chapter

| # | Chapter | What it does |
|---|---------|--------------|
| 00 | Prologue (key visual) | "Start the story" opening, then a minimal key visual: the protagonist before a sun (light theme) or moon (dark theme). His eye follows the cursor; click or tap him to power up and switch class |
| 01 | Character Profile | Status screen, real-number stats, backstory narration boxes, traits |
| 02 | The Chapters | Projects as manga panels. Clicking one opens a full chapter reader (←/→ to turn pages, Esc to close) |
| 03 | The Journey | Desktop: a horizontal manga read pinned to scroll. Mobile: a vertical webtoon strip |
| 04 | Ability Tree | Skills with evidence (where each was used). Filter by project/role; each ability links back to its project |
| 05 | Arcs Cleared | Hackathon wins and recognitions with stamp animations |
| 06 | The Studio | A live halftone-brush canvas plus sketch cards of experiments |
| 07 | Current Arc | What's being built, learned and explored right now |
| 08 | Final Chapter | Contact panels, "To be continued", and an ending credits roll |

Light/dark mode, `prefers-reduced-motion`, keyboard navigation and touch are all supported.

**On phones** the layouts recompose rather than shrink:
- A thumb-reachable chapter dock with prev/next buttons and a tap-to-open index.
- The key visual recomposes for portrait: character and moon above, title card below.
- Abilities collapse into an accordion; achievements become a swipeable card deck; lab sketches go two-up.
- In the project reader, swipe sideways to turn pages and pull down to close.
- Taps leave a small ink burst.

## Editing content

**All content lives in [`assets/js/data.js`](assets/js/data.js).** Edit that file and refresh the page.

- **Projects**: add an object to `projects`. Set `links.live` / `links.source` to URLs; while they're `null`, the site shows "soon". Add `image: "assets/img/elixra.png"` to replace the built-in illustration with a screenshot, and `outcome` to show an Outcome panel.
- **Portrait**: set `person.portrait` to an image path to replace the silhouette.
- **Journey / achievements / lab / current arc**: append entries to the matching arrays.
- **Skills**: every skill lists `used: [...]` evidence ids (`elixra`, `mensa`, `peerq`, `maskard`, `ardent`, `technojam`, `hackathons`, `galgotias`). Add a new id to `evidence` when you add a new project or role.

> **Adding Japanese text?** `shippori-mincho-subset.woff2` only contains the characters the site uses today. Regenerate it with Google Fonts' `&text=` parameter, or new characters will render in a fallback font.

## Run locally

```bash
npx serve .          # or: python3 -m http.server 8000
```

## Deploy

It's a static folder, so any static host works. For **GitHub Pages**: Settings → Pages → deploy from branch → root. For Netlify or Vercel, drag and drop the folder.

## Structure

```
index.html            page shell and section markup
assets/css/style.css  design tokens, manga panel system, all layouts
assets/js/data.js     ← content
assets/js/main.js     rendering and interactions (vanilla JS)
assets/fonts/         self-hosted fonts (SIL OFL); the Japanese fonts are subset to the characters used
assets/img/           favicon, and your screenshots/portrait
```
