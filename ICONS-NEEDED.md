# Icons and Social Images Needed

## Required Files

### 1. Favicon (Browser Tab Icon)
**File:** `src/app/icon.png`
- **Size:** 32x32px (or larger, Next.js will resize)
- **Format:** PNG with transparent background
- **Source:** Use `/public/images/Circle-Logo-one-color.png` and resize
- **Tool:** Use an image editor or online tool like https://www.favicon-generator.org/

### 2. Apple Touch Icon (iOS Home Screen)
**File:** `src/app/apple-icon.png`
- **Size:** 180x180px
- **Format:** PNG
- **Source:** Use `/public/images/Circle-Logo-one-color.png` and resize
- **Note:** This appears when users save your site to their iPhone/iPad home screen

### 3. Open Graph Image (Social Media Sharing)
**File:** `/public/images/og-image.jpg`
- **Size:** 1200x630px (Facebook/LinkedIn/Twitter recommended size)
- **Format:** JPG or PNG
- **Content:** Should feature:
  - ZDT's Adventure Plaza branding
  - Hero image of the property
  - Optional tagline: "Community Entertainment Hub in Seguin, TX"
- **Tool:** Use Canva, Figma, or Photoshop
- **Reference:** Look at hero image: `/public/images/tenants/Jungle-Jam-Xtreme/MainBldg2.jpg`

## Quick Steps

### Create Favicons (Easiest Method)

1. Open `/public/images/Circle-Logo-one-color.png` in an image editor
2. Resize and export:
   - 32x32px → Save as `src/app/icon.png`
   - 180x180px → Save as `src/app/apple-icon.png`
3. Ensure transparent background for best results
4. Next.js will automatically generate all favicon sizes

### Create Open Graph Image

**Option 1: Quick Version**
```bash
# Just copy an existing hero image if you're in a hurry
cp public/images/tenants/Jungle-Jam-Xtreme/MainBldg2.jpg public/images/og-image.jpg
```

**Option 2: Professional Version** (Recommended)
1. Use Canva with their "Facebook Post" template (1200x630px)
2. Add your hero image as background
3. Add text overlay:
   - Title: "ZDT's Adventure Plaza"
   - Subtitle: "Community Entertainment Hub • Seguin, TX"
4. Export as JPG
5. Save to: `/public/images/og-image.jpg`

## After Adding Files

Once you add these files, they will automatically work:
- **Favicon**: Appears in browser tabs, bookmarks
- **Apple Icon**: Shows when users add to iOS home screen
- **OG Image**: Shows when sharing on Facebook, Twitter, LinkedIn, etc.

## Testing Your Icons

### Test Favicon
1. Run `yarn dev`
2. Open http://localhost:3000
3. Check browser tab for icon

### Test Social Sharing
1. Deploy to production
2. Test with these tools:
   - **Facebook**: https://developers.facebook.com/tools/debug/
   - **Twitter**: https://cards-dev.twitter.com/validator
   - **LinkedIn**: https://www.linkedin.com/post-inspector/

## Current Status

- ❌ `src/app/icon.png` - Not created yet
- ❌ `src/app/apple-icon.png` - Not created yet
- ❌ `public/images/og-image.jpg` - Not created yet
- ✅ Source logo available: `/public/images/Circle-Logo-one-color.png`
- ✅ Hero images available for OG image creation
