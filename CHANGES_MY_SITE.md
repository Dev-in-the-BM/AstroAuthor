# Changes Made to Support `src/my-site`

To make the Astro site more portable and customizable for forks, we extracted user-specific and site-specific configuration files, content, and assets into a dedicated `src/my-site` folder. This leaves the core components and "engine" intact while providing a clear place for users to modify their data.

## 1. Moved Site Data to `src/my-site/`

The following site-specific files and directories were moved from the root `src/` folder to `src/my-site/`:

- `src/config.yaml` -> `src/my-site/config.yaml`
- `src/navigation.ts` -> `src/my-site/navigation.ts`
- `src/assets/` -> `src/my-site/assets/`
- `src/data/` -> `src/my-site/data/` (Contains blog posts and authors)

## 2. Updated Astro Configuration

- `astro.config.ts`: Updated the `astrowind` integration config to point to `./src/my-site/config.yaml`.
- Removed `remarkSpoilers` from `astro.config.ts` due to compatibility and build issues preventing the site from building properly.

## 3. Updated Content Schemas

- `src/content/config.ts`: Left this file in `src/content/` (as Astro hardcodes this requirement for the Content Layer schema) but updated the `base` path for the `glob` loader to read from `src/my-site/data/post`.

## 4. Updated Components & Utils Paths

Updated various components, layouts, and utility scripts to import from `~/my-site/...` instead of `~/...`:

- `src/components/Favicons.astro` (Moved favicons import)
- `src/utils/images.ts` (Pointed `import.meta.glob` to the new assets folder)
- `src/layouts/Layout.astro` (Imported tailwind CSS from the new assets folder)
- `src/layouts/PageLayout.astro` and `src/layouts/LandingLayout.astro` (Updated navigation imports)
- `src/my-site/navigation.ts` (Fixed relative path to `~/utils/permalinks`)

## 5. Extracted Sensitive Data into `.env`

- Removed the hardcoded `googleSiteVerificationId` from `src/my-site/config.yaml`.
- Added a `PUBLIC_SITE_VERIFICATION` variable in `.env`.
- Updated `src/components/common/SiteVerification.astro` to use `import.meta.env.PUBLIC_SITE_VERIFICATION` instead of reading from `config.yaml`.
- Provided a `.env.example` file so new users can easily add their own environment variables.

## 6. Integrations & Third-Party Configs

- `.vscode/settings.json`: Updated JSON schema mapping to point to `src/my-site/config.yaml`.
- `vendor/integration/index.ts`: Updated the default config fallback.
- `public/decapcms/config.yml`: Updated Decap CMS folder paths for `media_folder` and `folder`.
- `frontmatter.json`: Updated the path for frontmatter GUI tools.

---

_Note: Ensure to duplicate `.env.example` to `.env` and fill in your values before deploying to production._
