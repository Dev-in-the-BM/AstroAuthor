# Project Summary: Custom Markdown Formatting

This document summarizes the work done to enhance the Markdown authoring experience for your AstroWind site.

## 1. The Goal: A "Markdownian" Authoring Experience

The primary objective was to move away from writing raw HTML (`<img ...>`, `<details>`) inside Markdown files. We wanted to implement a simple, concise, and intuitive syntax for advanced formatting features that felt like a natural extension of Markdown itself, rather than code.

The target features were:

- Sized and aligned inline images
- Collapsible content blocks (`<details>`)
- Spoiler tags (for blurred text)
- Image grids
- Automatic rich link previews (link cards)

---

## 2. Progress Report

We have successfully implemented most of the desired features.

### What's Working ✅

| Feature | New Syntax | Status |
| :--- | :--- | :--- |
| **Sized Images** | `!alt` | Working |
| **Collapsibles** | `:::details[Summary]...:::` | Working |
| **Spoilers** | `:spoiler[text]` or `:::spoiler...:::` | Working |
| **Link Cards** | `https://example.com` (on its own line) | Working |
| **Inline Code** | `` `code` `` | Styled |

### What's Not Working ❌

| Feature | New Syntax | Status |
| :--- | :--- | :--- |
| **Image Grids** | `:::grid...:::` | **Broken** |

**The Issue:** Images placed inside a `:::grid` block are still rendering vertically, one after another, instead of in a multi-column grid. This is due to a conflict between how the Markdown processor wraps images in `<p>` tags and how the `@tailwindcss/typography` plugin styles content.

---

## 3. How We Got Here: A Summary of Changes

To achieve the current state, we performed the following steps:

1. **Installed New Dependencies**: We added `remark-directive` (for `:::` syntax), `remark-link-card` (for link previews), and `unist-util-visit` (a helper for our custom code).
2. **Created a Custom Plugin (`remark-custom-plugins.mjs`)**: This file contains the core logic that translates our new Markdown syntax into the correct HTML and CSS classes.
   
   - `remarkSmartImages()`: Handles the `!alt` syntax.
   - `remarkCustomDirectives()`: Handles `:::details`, `:::grid`, and `:spoiler`.
3. **Updated Astro Configuration (`astro.config.ts`)**: We registered all the new remark plugins and removed older, conflicting ones (`remark-attributes`, `remark-spoilers`).
4. **Updated Tailwind Configuration (`tailwind.config.cjs`)**: We created this file and configured it to scan our custom plugin, ensuring that the utility classes we added (like `grid`, `blur-sm`, etc.) were included in the final CSS build.
5. **Fixed CSS Loading**: We resolved errors by moving the `remark-link-card` CSS import from `tailwind.css` into the main Astro layout file, which is a more robust method.



