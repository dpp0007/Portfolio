# Deepankar Patel — Vol. 01

An interactive, manga-styled personal portfolio. It's a static site with no build step and no dependencies: plain HTML, CSS and JavaScript.

## The story, chapter by chapter

| # | Chapter | What it does |
|---|---------|--------------|
| 00 | Prologue | **Start the story** plays a ~9s anime-style opening cut to a synthesised 150 BPM soundtrack: DESIGN / CODE / SHIP word slams, project strips that whip-pan off, the record smashed in number by number, the robot's hero pose over speed streaks, a strobe title drop, then the sun flies to the homepage and an iris wipe reveals it. **Skip** lifts the cover like a curtain instead. On the homepage, the robot companion's lens follows the cursor; click or tap it to power up and switch class |
| 01 | Character Profile | Status screen, real-number stats, backstory narration boxes, traits |
| 02 | The Chapters | Projects as manga panels. Clicking one opens a full chapter reader (←/→ to turn pages, Esc to close) |
| 03 | The Journey | Desktop: a horizontal manga read pinned to scroll. Mobile: a vertical webtoon strip |
| 04 | Ability Tree | Skills with evidence (where each was used). Filter by project/role; each ability links back to its project |
| 05 | Arcs Cleared | Hackathon wins and recognitions with stamp animations |
| 06 | The Studio | A live halftone-brush canvas plus sketch cards of experiments |
| 07 | Current Arc | What's being built, learned and explored right now |
| 08 | Final Chapter | Contact panels, "To be continued", and an ending credits roll |

**Chapter transitions:** every in-page jump (nav rail, index, phone dock, homepage buttons) plays a manga-panel wipe with a chapter title card.

Light/dark mode, `prefers-reduced-motion`, keyboard navigation and touch are all supported.

**Sound and haptics:** the story and interactions have sound effects synthesised live with Web Audio (no audio files), toggled from the cover or the top bar and remembered per browser. On Android, key beats also vibrate; iOS Safari doesn't support web vibration.

**On phones** the layouts recompose rather than shrink:
- A thumb-reachable chapter dock with prev/next buttons and a tap-to-open index.
- The key visual recomposes for portrait: robot and moon above, title card below.
- Abilities collapse into an accordion; achievements become a swipeable card deck; lab sketches go two-up.
- In the project reader, swipe sideways to turn pages and pull down to close.
- Taps leave a small ink burst.

## Editing content

Everything on the site comes from one file, [`assets/js/data.js`](assets/js/data.js). That includes your name everywhere it appears, the landing stats, the opening's words and numbers, projects, timeline, skills, achievements and the Current Arc. You can change it two ways.

### Option 1 — the visual editor (recommended)

Open **`/edit.html`** on the site (or locally, see *Run locally*).

- **Every field is a form input**, grouped by section, with hints. Lists have add, duplicate, reorder and delete controls.
- **Live preview:** the right-hand side shows the real site updating as you type, in desktop or phone size. On small screens, switch between the *Edit* and *Preview* tabs.
- **Autosave:** your draft is kept in this browser until you publish or discard it. Fields that differ from the live site are marked in red.
- **Publish:** commits the draft straight to GitHub as `assets/js/data.js`, and the live site updates within a minute or two. It needs a fine-grained GitHub token with *Contents: read and write* on this repository only. The token is stored only in your browser, never in the site.
- **Download data.js:** if you'd rather not use a token, download the file and replace `assets/js/data.js` yourself.
- **Import:** loads a `data.js` or `.json` file into the editor.

The editor builds its form from the data itself, so a new field you add to `data.js` shows up in the editor automatically.

### Option 2 — edit `data.js` by hand

It's plain JavaScript/JSON, so edit and refresh.

- **Projects:** set `links.live` / `links.source` to URLs (while they're `null`, the site shows "soon"). Add `image: "assets/img/elixra.png"` to replace the built-in illustration, and `outcome` to show an Outcome panel.
- **Skills:** each skill's `used: [...]` lists ids from `evidence`. Add a new id there when you add a new project or role.
- **Landing stats** (`person.heroStats`) drive both the stats line under your name and the numbers in the opening.

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
assets/js/preview.js  lets the editor preview a draft (index.html?preview)
edit.html             the visual content editor
assets/editor/        editor styles and logic
assets/fonts/         self-hosted fonts (SIL OFL); the Japanese fonts are subset to the characters used
assets/img/           favicon, and your screenshots/portrait
```
