---
title: "Moving the portfolio to Astro"
date: 2026-09-20
summary: "Swapped one hand-written HTML file for components, a layout, and a content collection."
---

The single-file version of this site was getting hard to edit — every change
meant scrolling past the whole page to find the bit I wanted.

Astro splits it into a layout and a page, and gives me content collections for
free, which is what the diary you're reading now is built on. Each entry is a
Markdown file with typed frontmatter, so a missing `title` fails the build
instead of silently rendering nothing.
