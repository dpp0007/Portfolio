# Deepankar Patel — Vol. 01

An interactive, manga-styled personal portfolio. It's a static site with no build step and no dependencies: plain HTML, CSS and JavaScript.

## The story, chapter by chapter

| # | Chapter | What it does |
|---|---------|--------------|
| 00 | Prologue (hero) | "Start the story" opening that tears into panels, a cursor-tracking manga eye, and a typewriter speech bubble |
| 01 | Character Profile | Status screen, real-number stats, backstory narration boxes, traits |
| 02 | The Chapters | Projects as manga panels. Clicking one opens a full chapter reader (←/→ to turn pages, Esc to close) |
| 03 | The Journey | Desktop: a horizontal manga read pinned to scroll. Mobile: a vertical webtoon strip |
| 04 | Ability Tree | Skills with evidence (where each was used). Filter by project/role; each ability links back to its project |
| 05 | Arcs Cleared | Hackathon wins and recognitions with stamp animations |
| 06 | The Studio | A live halftone-brush canvas plus sketch cards of experiments |
| 07 | Current Arc | What's being built, learned and explored right now |
| 08 | Final Chapter | Contact panels, "To be continued", and an ending credits roll |

Light/dark mode, `prefers-reduced-motion`, keyboard navigation and touch are all supported.

## Editing content

**All content lives in [`assets/js/data.js`](assets/js/data.js).** Edit that file and refresh the page.

- **Projects**: add an object to `projects`. Set `links.live` / `links.source` to URLs; while they're `null`, the site shows "soon". Add `image: "assets/img/elixra.png"` to replace the built-in illustration with a screenshot, and `outcome` to show an Outcome panel.
- **Portrait**: set `person.portrait` to an image path to replace the silhouette.
- **Journey / achievements / lab / current arc**: append entries to the matching arrays.
- **Skills**: every skill lists `used: [...]` evidence ids (`elixra`, `mensa`, `peerq`, `maskard`, `ardent`, `technojam`, `hackathons`, `galgotias`). Add a new id to `evidence` when you add a new project or role.

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
assets/img/           favicon, and your screenshots/portrait
```
