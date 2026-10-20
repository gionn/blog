# Blog

## Commands

```bash
bundle exec jekyll serve    # local dev server at http://localhost:4000
bundle exec jekyll build    # build static output to _site/
```

Pre-commit hooks run automatically on commit and optimize images via `jpegoptim` and `optipng`. If they modify an image, re-stage it and commit again.

## Architecture

Static Jekyll blog using the [Hydeout](https://github.com/fongandrew/hydeout) theme. Minimal customization — one layout override (`_layouts/post.html`, which also appends a muted "View source on GitHub" link after the tags) and four includes (`_includes/`).

`robots.txt`, `llms.txt`, and `404.html` are custom root-level files (not theme/plugin defaults): `robots.txt` explicitly allows known AI crawlers (GPTBot, ClaudeBot, etc.); `llms.txt` is a generated index of all posts per the [llms.txt](https://llmstxt.org) convention; `404.html` avoids Cloudflare Pages' default soft-404 (SPA-style homepage fallback) for unmatched paths. `jekyll-last-modified-at` is enabled so JSON-LD `dateModified` reflects real git history.

The heart in the sidebar footer (`_includes/copyright.html`) toggles a MySpace-era palette as an easter egg: `assets/css/_myspace.scss` holds the themed rules under `html[data-theme="myspace"]`, `assets/js/myspace.js` toggles the attribute and injects the marquee, `assets/js/myspace-song.js` synthesizes the chiptune loop with Web Audio, and the inline snippet in `_includes/custom-head.html` restores the saved choice before first paint. The preference lives in `localStorage` under `gionn:myspace`; keep that key in sync across the files. Sound is on by default once the egg is enabled and the ♪ button stores the choice under `gionn:myspace-sound`. A restored page tries to resume the tune immediately, falling back to the first click or keypress because browsers block audio without a gesture.

**Post frontmatter fields:**
- `layout: post` — always
- `title` — quoted if it contains special characters
- `permalink: /YYYY/slug/` — always set explicitly
- `image: /images/YYYY/filename.png` — optional hero image
- `excerpt` — optional HTML preview snippet
- `tags` — lowercase, hyphenated (e.g. `nextjs`, `open-source`)
- `hidden: true` — hides post from index listing

## Content conventions

- Blog is bilingual (English and Italian). Italian posts use the `italiano` tag; English posts have no language tag.
- No em-dashes (`—`). Use colons, commas, or parentheses instead.
- Use bold (`<strong>`) on 2-3 words at most, and use it freely every 2-3 lines to help readers skim.
- Images go in `images/YYYY/` and are auto-optimized by pre-commit hooks.
- Permalinks: prefer year-only for new posts (`/2026/slug/`), but many legacy posts use the default `/:year/:month/:day/:title/` pattern unless they set `permalink:` explicitly.
