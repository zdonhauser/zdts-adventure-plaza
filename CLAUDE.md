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
- **Framework**: Next.js 15.5.4 (App Router)
- **React**: v19.1.0 with client-side components
- **TypeScript**: v5 with strict mode enabled
- **Styling**: Tailwind CSS 4 with inline theme configuration
- **Fonts**: Geist Sans and Geist Mono (next/font/google)
- **Carousel**: react-responsive-carousel library
- **Analytics**: Google Analytics 4 with custom event tracking
- **SEO**: Dynamic sitemap, robots.txt, Open Graph, Twitter Cards, JSON-LD structured data

### Project Structure
```
src/
  app/
    layout.tsx                # Root layout with metadata, fonts, and analytics
    page.tsx                  # Main page - single-page app composition
    globals.css               # Tailwind imports + custom carousel styles
    sitemap.ts                # Dynamic sitemap generation
    robots.ts                 # robots.txt configuration
    icon.png                  # Favicon
    apple-icon.png            # Apple touch icon
  components/
    analytics/
      GoogleAnalytics.tsx     # GA4 integration with tracking helpers
      SectionTracker.tsx      # IntersectionObserver for section tracking
    community/
      CommunityGrid.tsx       # Grid layout for community members
      CommunityMemberCard.tsx # Individual member card with carousel
      MemberCarousel.tsx      # Image carousel component
    contact/
      ContactSection.tsx      # Contact information and form
    hero/
      HeroSection.tsx         # Hero banner with CTA
    layout/
      Navigation.tsx          # Desktop navigation bar
      MobileMenu.tsx          # Mobile hamburger menu
      Footer.tsx              # Site footer
    rides/
      RidesSection.tsx        # Former rides showcase section
      RideCard.tsx            # Individual ride card
      FeaturedRide.tsx        # Featured ride component
    spaces/
      SpacesGrid.tsx          # Grid layout for available spaces
      SpaceCard.tsx           # Individual space card with gallery
      ImageGallery.tsx        # Image gallery with labels and carousel
    ui/
      Button.tsx              # Reusable button component
      Badge.tsx               # Badge/tag component
      SectionHeader.tsx       # Section heading component
  data/
    types.ts                  # TypeScript interfaces
    communityMembers.ts       # Community member data array
    availableSpaces.ts        # Available space listings array
    rides.ts                  # Former rides data array
public/
  images/
    tenants/                  # Tenant logos and photos
    spaces/                   # Available space photos (including concept renders)
    rides/                    # Former attraction photos
    og-image.jpg              # Social sharing image
    Circle-Logo-one-color.png # Site logo
```

### Key Architectural Patterns

**Component-Based Single-Page Application**: The main page (`src/app/page.tsx`) is a single scrollable page with anchor navigation. It composes feature components organized by domain (community, spaces, rides, contact).

**Data-Driven Content**: All content (community members, spaces, rides) is defined in typed data files in `src/data/`. To add/update content, modify these TypeScript arrays.

**Feature-Based Component Organization**: Components are organized by feature/domain:
- `analytics/` - Tracking and measurement
- `community/` - Community member display
- `contact/` - Contact section
- `hero/` - Hero banner
- `layout/` - Navigation, footer, mobile menu
- `rides/` - Former rides showcase
- `spaces/` - Available space listings
- `ui/` - Reusable UI primitives (buttons, badges, headers)

**Client Component Architecture**: Main page uses `"use client"` directive with React hooks:
- `IntersectionObserver` for scroll-based section tracking (analytics)
- Auto-cycling image carousels for member and space listings
- Mobile menu toggle state management
- Hover states for interactive cards

**TypeScript Type Safety**: All data models are fully typed in `src/data/types.ts`:
- `CommunityMember` - Tenant/business information
- `AvailableSpace` - Space listing data
- `SpaceImage` - Image with label
- `Ride` - Former attraction data
- `FeaturedRide` - Featured ride information

**Image Strategy**: Uses Next.js Image component with local static images. All images stored in `/public/images/` subdirectories organized by category (tenants, spaces, rides).

**Responsive Design**: Mobile-first approach with Tailwind breakpoints:
- Navigation switches between desktop bar and mobile hamburger menu
- Grid layouts adapt from 1 column (mobile) to 2-3 columns (desktop)
- Touch-friendly interactions on mobile devices

**SEO Optimization**:
- Comprehensive metadata in `layout.tsx` (title, description, keywords)
- Open Graph and Twitter Card tags for social sharing
- JSON-LD structured data for LocalBusiness schema
- Dynamic sitemap generation (`sitemap.ts`)
- robots.txt configuration (`robots.ts`)
- Optimized images with alt text

**Analytics Integration**:
- Google Analytics 4 via `GoogleAnalytics.tsx` component
- Custom event tracking helpers (`trackEvent`, `trackPageView`, `trackSectionView`)
- Section view tracking with `SectionTracker` wrapper component
- IntersectionObserver for scroll-based tracking

### Styling Approach

The site follows a sophisticated, monochromatic design system (detailed in `.claude/CLAUDE.md`):
- High contrast black/white/gray palette
- Bold typography with clear hierarchy
- Grid-based layouts with generous white space
- Subtle animations on hover/scroll
- Custom carousel styling in `globals.css`

### TypeScript Configuration
- Strict mode enabled (`strict: true`)
- Path mapping: `@/*` maps to `./src/*`
- Next.js plugin for type checking
- Target: ES2017

## Path Alias
- `@/*` maps to `./src/*` for imports

## Important Notes

- **CSS Configuration**: Uses Tailwind v4 with inline theme via `@theme inline` in globals.css
- **Image Optimization**: Next.js images configured for unsplash.com (though currently using local images from `/public/images/`)
- **Smooth Scrolling**: Implemented via CSS (`scroll-behavior: smooth` in globals.css)
- **Section Tracking**: Uses IntersectionObserver in `SectionTracker` component to track section views
- **Carousel Customization**: Extensive CSS overrides for react-responsive-carousel in globals.css
- **Mobile Navigation**: Separate mobile menu component with hamburger toggle
- **Analytics**: GA4 integration with environment variable `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **TypeScript**: Uses path mapping, strict mode, and Next.js plugin

## Content Management

### To Update Community Members
Edit `src/data/communityMembers.ts` - modify the `communityMembers` array with:
- `name`: Business name
- `category`: Business category
- `description`: Brief description
- `address`: Physical address
- `images`: Array of image paths
- `logo`: Logo image path (or `null`)
- `website`: Website URL (or `null`)

Example:
```typescript
{
  name: "Example Business",
  category: "Entertainment",
  description: "Brief description of the business...",
  address: "1234 Street, Seguin, TX",
  images: ["/images/tenants/folder/image1.jpg"],
  logo: "/images/tenants/folder/logo.jpg",
  website: "https://example.com"
}
```

### To Update Available Spaces
Edit `src/data/availableSpaces.ts` - modify the `availableSpaces` array with:
- `title`: Address/space name
- `sqft`: Square footage
- `features`: Key features
- `description`: Detailed description
- `images`: Array of objects with `src` and `label` properties

Example:
```typescript
{
  title: "1234 Street Name",
  sqft: "1,000 sq ft",
  features: "Great location, high ceilings",
  description: "Perfect for...",
  images: [
    { src: "/images/spaces/folder/photo.jpg", label: "Main View" },
    { src: "/images/spaces/folder/concept.jpg", label: "Concept Render" }
  ]
}
```

### To Update Former Rides
Edit `src/data/rides.ts` - modify ride data arrays

### To Add Images
1. Add images to appropriate `/public/images/` subdirectory:
   - `/public/images/tenants/` for community members
   - `/public/images/spaces/` for available spaces
   - `/public/images/rides/` for former attractions
2. Reference with absolute path: `/images/category/filename.jpg`
3. Images are automatically optimized by Next.js

### To Update Contact Information
Edit `src/components/contact/ContactSection.tsx` to update email, phone, or address

### To Update Site Metadata (SEO)
Edit `src/app/layout.tsx` to update:
- Page title and description
- Keywords
- Open Graph settings
- Twitter Card settings
- Structured data (JSON-LD)

## Component Development Guidelines

### When Creating New Components:
1. **Location**: Place in appropriate feature folder (`analytics/`, `community/`, `spaces/`, etc.)
2. **Naming**: Use PascalCase for component files (e.g., `MyComponent.tsx`)
3. **Types**: Import types from `@/data/types` or define inline
4. **Styling**: Use Tailwind utility classes, reference design system in `.claude/CLAUDE.md`
5. **Client vs Server**: Add `"use client"` directive only when using hooks, state, or browser APIs
6. **Imports**: Use `@/*` path alias for all internal imports

### Reusable UI Components
Use existing UI components from `src/components/ui/`:
- `Button` - Primary/secondary button styles
- `Badge` - Tag/badge component
- `SectionHeader` - Consistent section headings

### Adding Analytics Tracking
1. Import tracking helpers from `@/components/analytics/GoogleAnalytics`:
   - `trackEvent(eventName, eventParams)`
   - `trackPageView(pageTitle, pagePath)`
   - `trackSectionView(sectionName, sectionId)`
2. Wrap sections in `SectionTracker` for automatic scroll tracking

## Design System Reference

For detailed design guidelines, see `.claude/CLAUDE.md` which includes:
- Color palette and contrast guidelines
- Typography hierarchy and spacing
- Layout and composition patterns
- Animation and interaction principles
- Voice and tone guidelines
- Component architecture patterns

## Environment Variables

To enable Google Analytics, create `.env.local`:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Deployment

This project is optimized for Vercel deployment:
1. Push to GitHub repository
2. Import in Vercel dashboard
3. Configure environment variables (GA measurement ID)
4. Deploy (automatic on push to main branch)

Build output is optimized for static generation where possible with Next.js App Router.
