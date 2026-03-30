# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual (Spanish/English) documentation site for Swift and SwiftUI, built with **Astro Starlight**. Spanish is the default locale (`root`), English lives under `en/`.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Architecture

- **Framework:** Astro 5.5 + @astrojs/starlight 0.33
- **Content:** MDX files in `src/content/docs/` (Spanish) and `src/content/docs/en/` (English)
- **Sidebar:** Defined manually in `astro.config.mjs` — new pages must be added there
- **Content config:** `src/content.config.ts` uses Starlight's `docsLoader` and `docsSchema`
- **No custom components or layouts** — purely Starlight defaults

## Content Structure

Docs are organized into three sections (defined in sidebar config):
- **Swift** (`swift/`) — language fundamentals (variables, types, control flow, functions, structs/classes, optionals, protocols, enums)
- **SwiftUI** (`swiftui/`) — UI components grouped by category (text/images, controls, layout, lists/navigation, presentation)
- **Guías Prácticas** (`guias-practicas/`) — practical guides (MVVM, API integration, assets, project architecture)

## Adding Content

1. Create an `.mdx` file in the appropriate `src/content/docs/` subdirectory
2. Create the English translation at the mirrored path under `src/content/docs/en/`
3. Add the `slug` entry to the sidebar in `astro.config.mjs`
