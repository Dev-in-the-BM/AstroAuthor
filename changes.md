# Changes and New Features in the Blog Site

This document outlines the key modifications and new features implemented in this blog site repository, a significantly enhanced version of the default AstroWind template.
The core focus of these changes was to polish off what AstroWind offers out of the box and make it more feature-rich.
Substantial improvements include dynamic image controls, interactive content elements, rich link previews, and enhanced content navigation, alongside a transformed Markdown authoring experience.

## Summary of Changes

- **Sized and Aligned Inline Images:** Control image dimensions and alignment directly from Markdown using URL fragments.
- **Collapsible Content Blocks (`<details>`):** Create interactive, animated collapsible sections with simple Markdown.
- **Spoiler Tags:** Blur sensitive content until hovered, using both inline (`||text||`) and block (`:::spoiler`) syntax.
- **Automatic Rich Link Previews (Link Cards):** Transform URLs into visually appealing cards, with special optimizations for GitHub links.
- **Image Grids with Fancybox:** Arrange images in multi-column layouts, with click-to-enlarge gallery functionality.
- **Table of Contents (TOC):** A dynamic, left-sided navigation for blog posts.
- **Inline Code Styling:** Enhanced visual presentation for inline code snippets.

---

## Detailed Changes and New Features

### 1. Enhanced Markdown Authoring Experience (UI/UX/Functionality)

The most significant changes revolve around providing a more intuitive and concise Markdown syntax for common formatting needs, moving away from raw HTML or less "Markdown-native" approaches.

#### 1.1. Sized and Aligned Inline Images

- **Feature:** Images can now be embedded inline with specific dimensions and alignment directly from Markdown. This is particularly useful for small icons or images that should flow with text.
- **New Syntax:** `!Alt text`
- `#inline`: Ensures the image is `inline-block` and `align-middle`.
- `#WIDTHxHEIGHT`: Sets specific width and height (e.g., `#25x25`).
- `#SIZE`: Sets both width and height to `SIZE` (e.g., `#25` for 25x25px).
- **Example Usage:**
  ```markdown
  - **Windows:** Yes ![Check Mark Button](https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Check%20Mark%20Button.png#inline-30)
  ```
- **Benefit:** Improves readability of Markdown source, provides a concise way to control inline image presentation without resorting to HTML.

#### 1.2. Collapsible Content Blocks (`<details>`)

- **Feature:** A Markdown-native way to create collapsible sections, allowing users to hide and show content.
- **Enhancement:** Animated opening and closing for a smoother user experience.
- **New Syntax:**
  ```markdown
  :::details[Summary Title]
  Hidden content goes here.
  :::
  ```
- **Benefit:** Enhances content organization, reduces visual clutter, and improves user experience by allowing readers to expand only the sections they are interested in, with a smoother visual transition.

#### 1.3. Spoiler Tags

- **Feature:** Content can be marked as a spoiler, blurring it until the user hovers over it.
- **New Syntax:**
  - **Inline Spoiler:** `The killer was ||the butler||.`
  - **Block Spoiler:**
    ```markdown
    :::spoiler
    This entire block is a spoiler!
    :::
    ```
- **Benefit:** Prevents accidental disclosure of sensitive information (e.g., plot twists, answers) and provides an interactive element for readers.

#### 1.4. Automatic Rich Link Previews (Link Cards)

- **Feature:** URLs placed on their own line in Markdown are automatically transformed into visually appealing rich link cards, displaying the title, description, and a favicon/image from the linked page.
- **Enhancement:** Optimized for GitHub links, where the repository title is used as the card's title, and generic "contribute to {repo} by creating an account on GitHub" descriptions are removed for a cleaner presentation.
- **New Syntax:**
  ```markdown
  https://github.com/lightningbolt047/Android-Toolbox
  ```
- **Benefit:** Improves the visual presentation of external links, making them more engaging and informative for the reader, with specific improvements for common platforms like GitHub.

#### 1.5. Image Grids

- **Feature:** A Markdown syntax was introduced to arrange images in a multi-column grid layout.
- **New Syntax:**
  ```markdown
  :::grid[Optional Grid Title]
  ![Image 1](...)
  ![Image 2](...)
  :::
  ```
- **Enhancement:** Integrated with Fancybox, allowing images within a grid to be clicked and viewed in a full-screen gallery mode. Each grid also generates a unique ID for Fancybox grouping.
- **Benefit:** Provides a structured and visually appealing way to display multiple images, enhancing the media presentation and user interaction.

#### 1.6. Table of Contents (TOC)

- **Feature:** A dynamic Table of Contents is displayed on the left side of blog posts, providing quick navigation through the content.
- **Benefit:** Improves content discoverability and user navigation, especially for longer articles.

#### 1.7. Inline Code Styling

- **Feature:** Inline code blocks (e.g., `` `print("hello world")` ``) now have distinct styling for better readability and visual separation from regular text.
- **Benefit:** Enhances the presentation of technical content, making code snippets easier to identify and read.

### 2. Technical Foundations

These new features are built upon an extended Astro Markdown processing pipeline. This pipeline integrates several third-party Remark plugins and custom-developed Remark plugins. These plugins interpret specific Markdown syntax (such as URL fragments for images or `:::` directives) and transform them into the appropriate HTML structures, which are then styled using Tailwind CSS classes. The project's Astro and Tailwind configurations are set up to support these enhanced processing steps and ensure all necessary CSS utilities are available for the new features.

#### 2.1. Key Technical Components

- **Remark Plugins:** Several Remark plugins were utilized to extend Markdown's capabilities:
  - `remark-directive`: To enable the `:::` container and leaf directive syntax for features like `details`, `grid`, and block `spoiler`.
  - `remark-link-card`: For automatically generating rich link previews from URLs.
  - `remark-spoilers`: To support the `||spoiler||` inline syntax.
  - **Custom Remark Plugins (`remarkSmartImages`, `remarkCustomDirectives`):** These custom plugins interpret specific URL fragments for image sizing/alignment and handle the transformation of directives into styled HTML, including Fancybox integration for image grids.
- **Astro's Markdown Pipeline:** Configured to integrate and utilize these Remark plugins for processing Markdown content.
- **Tailwind CSS Framework:** Provides the styling for all new elements, with its configuration supporting the dynamic utility classes generated by the plugins.
- **Custom CSS & Components:** Specific CSS rules provide distinct styling for inline code blocks, and a custom Astro component dynamically generates the Table of Contents.
- **CSS Loading Management:** Ensures proper loading and functionality of external styling, such as for `remark-link-card`.
