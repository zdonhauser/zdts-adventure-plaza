# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 marketing website for ZDT's Adventure Plaza - a local entertainment hub and small business community in Seguin, Texas. The site showcases current tenants, available spaces for lease, and former attractions. Built with TypeScript, React 19, and Tailwind CSS 4.

## Commands

### Development
```bash
yarn dev          # Start development server (runs on http://localhost:3000)
yarn build        # Build production bundle
yarn start        # Start production server
yarn lint         # Run ESLint
```

### Package Manager
This project uses **Yarn 4.9.1** (Plug'n'Play mode). Always use `yarn` commands, not `npm`.

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **React**: v19 with client-side components
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS 4 with inline theme configuration
- **Fonts**: Geist Sans and Geist Mono (next/font/google)
- **Image Carousel**: react-responsive-carousel library

### Project Structure
```
src/
  app/
    layout.tsx    # Root layout with metadata and font setup
    page.tsx      # Main page - single-page application with all sections
    globals.css   # Tailwind imports + custom carousel styles
public/
  images/         # All static images organized by category
    tenants/      # Tenant logos and photos
    spaces/       # Available space photos (including concept renders)
    rides/        # Former attraction photos
```

### Key Architectural Patterns

**Single-Page Application**: The entire site is in `src/app/page.tsx` (535 lines) as a single scrollable page with anchor navigation. Sections include: Hero, Current Tenants, Available Spaces, Rides, Contact, and Footer.

**Client Component Architecture**: Main page uses `"use client"` directive with React hooks:
- `IntersectionObserver` for scroll-based tenant highlighting
- Auto-cycling image carousels for space listings
- Hover states for interactive tenant cards

**Data-Driven Content**: Tenants and spaces are defined as JavaScript arrays within the component. To add/update content, modify the `tenants` and `availableSpaces` arrays in `page.tsx`.

**Image Strategy**: Uses Next.js Image component with local static images. All images stored in `/public/images/` subdirectories.

**Responsive Design**: Mobile-first approach with Tailwind breakpoints. Grid layouts adapt from 1 column (mobile) to 2-3 columns (desktop).

### Styling Approach

The site follows a sophisticated, monochromatic design system (detailed in `.claude/CLAUDE.md`):
- High contrast black/white/gray palette
- Bold typography with clear hierarchy
- Grid-based layouts with generous white space
- Subtle animations on hover/scroll
- Custom carousel styling in `globals.css`

## Path Alias
- `@/*` maps to `./src/*` for imports

## Important Notes

- **CSS Configuration**: Uses Tailwind v4 with inline theme via `@theme inline` in globals.css
- **Image Optimization**: Next.js images configured for unsplash.com (though currently using local images)
- **Smooth Scrolling**: Implemented via CSS (`scroll-behavior: smooth` in globals.css)
- **Tenant Highlighting**: Uses IntersectionObserver with different thresholds for mobile vs desktop
- **Carousel Customization**: Extensive CSS overrides for react-responsive-carousel in globals.css
- **TypeScript Config**: Uses path mapping, strict mode, and Next.js plugin

## Content Management

To update site content, modify arrays in `src/app/page.tsx`:
- **Tenants**: Update `tenants` array (lines 57-110) with name, category, description, images, logo, and website
- **Available Spaces**: Update `availableSpaces` array (lines 112-159) with title, sqft, features, description, and images
- **Contact Info**: Update email/phone in Contact section (lines 503-512)
