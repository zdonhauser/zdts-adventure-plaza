# ZDT's Adventure Plaza

A modern, sophisticated marketing website for ZDT's Adventure Plaza - a community entertainment hub and commercial real estate destination in Seguin, Texas. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4.

**Live Site:** [zdtamusement.com](https://www.zdtamusement.com)

## Overview

This single-page application showcases:
- Current community members (tenants/businesses)
- Available commercial spaces for lease
- Former attractions and rides
- Contact information and location details

The site emphasizes a sophisticated, monochromatic design system that balances professionalism with creative energy, celebrating transformation and reinvention while honoring heritage.

---

## Tech Stack

### Core Framework
- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - UI library with latest concurrent features
- **React DOM 19.1.0** - React rendering for web

### Language & Type Safety
- **TypeScript 5** - Static typing with strict mode enabled
- Full type coverage across components, data, and utilities

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework with inline theme configuration
- **@tailwindcss/postcss** - PostCSS integration
- Custom CSS for carousel styling and global overrides

### Components & UI
- **react-responsive-carousel 3.2.23** - Image carousel for space listings
- Custom UI components (Button, Badge, SectionHeader)
- Responsive grid layouts

### Development Tools
- **ESLint 9** - Code linting with Next.js plugin
- **@typescript-eslint/parser** - TypeScript ESLint integration
- **eslint-plugin-react-hooks** - React Hooks linting rules

### Fonts
- **Geist Sans** - Primary sans-serif font (via next/font/google)
- **Geist Mono** - Monospace font (via next/font/google)

### Package Manager
- **Yarn 4.9.1** (Plug'n'Play mode) - Fast, reliable dependency management

### SEO & Analytics
- Google Analytics 4 integration with custom event tracking
- Dynamic sitemap generation
- robots.txt configuration
- Open Graph and Twitter Card metadata
- JSON-LD structured data for LocalBusiness schema

---

## Project Structure

```
zdtsAdventurePlaza/
├── public/
│   └── images/
│       ├── tenants/           # Tenant logos and photos
│       ├── spaces/            # Available space photos + concept renders
│       ├── rides/             # Former attraction photos
│       ├── og-image.jpg       # Social sharing image
│       └── Circle-Logo-one-color.png
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with metadata, fonts, analytics
│   │   ├── page.tsx           # Main home page (single-page app)
│   │   ├── globals.css        # Tailwind imports + custom styles
│   │   ├── sitemap.ts         # Dynamic sitemap generation
│   │   ├── robots.ts          # robots.txt configuration
│   │   ├── icon.png           # Favicon
│   │   └── apple-icon.png     # Apple touch icon
│   ├── components/
│   │   ├── analytics/
│   │   │   ├── GoogleAnalytics.tsx    # GA4 integration + tracking helpers
│   │   │   └── SectionTracker.tsx     # Scroll tracking for sections
│   │   ├── community/
│   │   │   ├── CommunityGrid.tsx      # Grid layout for members
│   │   │   ├── CommunityMemberCard.tsx # Individual member cards
│   │   │   └── MemberCarousel.tsx     # Image carousel for members
│   │   ├── contact/
│   │   │   └── ContactSection.tsx     # Contact form and info
│   │   ├── hero/
│   │   │   └── HeroSection.tsx        # Hero banner with CTA
│   │   ├── layout/
│   │   │   ├── Navigation.tsx         # Desktop navigation bar
│   │   │   ├── MobileMenu.tsx         # Mobile hamburger menu
│   │   │   └── Footer.tsx             # Site footer
│   │   ├── rides/
│   │   │   ├── RidesSection.tsx       # Former rides showcase
│   │   │   ├── RideCard.tsx           # Individual ride cards
│   │   │   └── FeaturedRide.tsx       # Featured ride component
│   │   ├── spaces/
│   │   │   ├── SpacesGrid.tsx         # Grid layout for spaces
│   │   │   ├── SpaceCard.tsx          # Individual space cards
│   │   │   └── ImageGallery.tsx       # Image gallery with labels
│   │   └── ui/
│   │       ├── Button.tsx             # Reusable button component
│   │       ├── Badge.tsx              # Badge/tag component
│   │       └── SectionHeader.tsx      # Section heading component
│   └── data/
│       ├── types.ts                   # TypeScript interfaces
│       ├── communityMembers.ts        # Community member data
│       ├── availableSpaces.ts         # Available space listings
│       └── rides.ts                   # Former rides data
├── .claude/
│   └── CLAUDE.md              # Claude Code design guide
├── CLAUDE.md                  # Claude Code project instructions
├── SEO.md                     # SEO strategy documentation
├── ICONS-NEEDED.md           # Icon requirements
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── postcss.config.mjs
```

---

## Architecture

### Design Pattern: Component-Based Single-Page Application

The site follows a modular component architecture organized by feature:

1. **Page Structure** (`src/app/page.tsx`)
   - Single-page application with anchor navigation
   - Composed of feature components wrapped in SectionTracker
   - Sections: Hero → Community → Spaces → Rides → Contact → Footer

2. **Data Layer** (`src/data/`)
   - Typed data models (types.ts)
   - Centralized data files for easy content updates
   - Type-safe interfaces for all content

3. **Component Organization**
   - **Feature components** - Organized by domain (community, spaces, rides, etc.)
   - **Layout components** - Navigation, footer, mobile menu
   - **UI components** - Reusable primitives (buttons, badges, headers)
   - **Analytics components** - Tracking and measurement

4. **Responsive Design**
   - Mobile-first approach with Tailwind breakpoints
   - Responsive navigation (desktop bar + mobile menu)
   - Grid layouts adapt from 1 column (mobile) to 2-3 columns (desktop)

5. **Client-Side Features**
   - IntersectionObserver for scroll-based section tracking
   - Auto-cycling image carousels
   - Hover states and animations
   - Mobile menu toggle

---

## Key Features

### SEO Optimization
- **Metadata**: Comprehensive title, description, keywords
- **Open Graph**: Social sharing optimization for Facebook/LinkedIn
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: LocalBusiness JSON-LD schema
- **Sitemap**: Dynamically generated sitemap.xml
- **Robots.txt**: Search engine crawler directives

### Analytics
- Google Analytics 4 integration
- Custom event tracking helpers
- Section view tracking with IntersectionObserver
- Page view and virtual page view tracking

### Image Optimization
- Next.js Image component for automatic optimization
- Local static images in `/public/images/`
- Organized by category (tenants, spaces, rides)
- Concept renders for available spaces

### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Proper heading hierarchy
- Alt text for all images

---

## Getting Started

### Prerequisites
- Node.js 20+ (for @types/node compatibility)
- Yarn 4.9.1 (included via packageManager field)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/zdtsAdventurePlaza.git
cd zdtsAdventurePlaza

# Install dependencies (Yarn 4 will be used automatically)
yarn install
```

### Development

```bash
# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

The page auto-reloads when you edit files. Changes are instantly reflected.

### Build & Deploy

```bash
# Build for production
yarn build

# Start production server
yarn start

# Run linter
yarn lint
```

---

## Configuration

### Environment Variables

Create a `.env.local` file for local development:

```bash
# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Path Aliases

TypeScript is configured with path mapping:
- `@/*` maps to `./src/*`

Example:
```typescript
import { communityMembers } from "@/data/communityMembers";
```

### Image Domains

Next.js image optimization is configured for:
- Unsplash (`images.unsplash.com`) - though currently using local images

To add more domains, update `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'example.com' }
  ]
}
```

---

## Content Management

### Updating Community Members

Edit `src/data/communityMembers.ts`:

```typescript
export const communityMembers: CommunityMember[] = [
  {
    name: "Business Name",
    category: "Business Category",
    description: "Brief description...",
    address: "1234 Street, Seguin, TX",
    images: ["/images/tenants/folder/image.jpg"],
    logo: "/images/tenants/folder/logo.jpg",
    website: "https://example.com"
  }
];
```

### Updating Available Spaces

Edit `src/data/availableSpaces.ts`:

```typescript
export const availableSpaces: AvailableSpace[] = [
  {
    title: "1234 Street Name",
    sqft: "1,000 sq ft",
    features: "Key features...",
    description: "Detailed description...",
    images: [
      { src: "/images/spaces/folder/photo.jpg", label: "Main View" },
      { src: "/images/spaces/folder/concept.jpg", label: "Concept Render" }
    ]
  }
];
```

### Updating Former Rides

Edit `src/data/rides.ts` for the rides section.

### Adding Images

1. Add images to appropriate `/public/images/` subdirectory
2. Reference with absolute path: `/images/category/filename.jpg`
3. Images are automatically optimized by Next.js

---

## Styling

### Design System

The site uses a sophisticated monochromatic design with:
- High contrast black/white/gray palette
- Bold typography with clear hierarchy
- Grid-based layouts with generous white space
- Subtle animations on hover/scroll

See `.claude/CLAUDE.md` for complete design philosophy and guidelines.

### Tailwind Configuration

Tailwind CSS 4 uses inline theme configuration in `globals.css`:

```css
@import "tailwindcss";

@theme inline {
  /* Custom theme values */
}
```

### Custom Styles

Global styles and carousel overrides are in `src/app/globals.css`:
- Smooth scrolling behavior
- Custom carousel styling (arrows, dots, transitions)
- Base typography and spacing

---

## TypeScript

### Strict Mode

TypeScript is configured with strict type checking:
- `strict: true`
- No implicit any
- Strict null checks
- All data models are fully typed

### Type Definitions

All data types are defined in `src/data/types.ts`:
- `CommunityMember` - Tenant/business information
- `AvailableSpace` - Space listing data
- `SpaceImage` - Image with label
- `Ride` - Former attraction data
- `FeaturedRide` - Featured ride information

---

## Performance

### Optimization Strategies
- Static image optimization with Next.js Image
- Lazy loading images below the fold
- Minimal JavaScript bundle size
- Fast initial page load with App Router
- Efficient CSS with Tailwind (utility classes are tree-shaken)

### Bundle Analysis

To analyze bundle size:
```bash
yarn build
# Review output for page sizes
```

---

## Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment:

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables (GA measurement ID)
4. Deploy

Vercel automatically detects Next.js and configures build settings.

### Other Platforms

Standard Next.js build process works on any Node.js host:
```bash
yarn build
yarn start
```

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- ES2017+ JavaScript features

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is proprietary and confidential.

---

## Contact

**ZDT's Adventure Plaza**
1115 N Bowie St
Seguin, TX 78155

For inquiries about available spaces or business opportunities, visit the contact section on the website.

---

## Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

For development with Claude Code, see `CLAUDE.md` and `.claude/CLAUDE.md` for project-specific guidelines and design philosophy.
