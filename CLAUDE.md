# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bundle exec jekyll serve    # local dev server at http://localhost:4000
bundle exec jekyll build    # build static output to _site/
```

Pre-commit hooks run automatically on commit and optimize images via `jpegoptim` and `optipng`. If they modify an image, re-stage it and commit again.

## Architecture

Static Jekyll blog using the [Hydeout](https://github.com/fongandrew/hydeout) theme. Minimal customization — one layout override (`_layouts/post.html`) and five includes (`_includes/`), one of which (`post-meta.html`) overrides the theme's version to add a "View source on GitHub" link.

`robots.txt` and `llms.txt` are custom root-level files (not theme/plugin defaults): `robots.txt` explicitly allows known AI crawlers (GPTBot, ClaudeBot, etc.); `llms.txt` is a generated index of all posts per the [llms.txt](https://llmstxt.org) convention. `jekyll-last-modified-at` is enabled so JSON-LD `dateModified` reflects real git history.

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
- Images go in `images/YYYY/` and are auto-optimized by pre-commit hooks.
- Permalinks use the year only: `/2026/slug/`, not the full date.
