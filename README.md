# Take Flight Birding Website

A beautiful, fast-loading one-page website for Take Flight Birding and Nature Adventures built with Next.js and TypeScript.

## Features

- 🎨 **Easily Customizable**: All colors, fonts, and content managed through config files
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ⚡ **Performance Optimized**: Fast loading with Next.js Image optimization
- 🎯 **Smooth Navigation**: Sticky header with smooth scrolling to sections
- 🎭 **Modern Styling**: Styled-components with beautiful animations

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Colors & Theme
Edit `/config/theme.ts` to update:
- Brand colors (primary, secondary, accent)
- Typography settings
- Spacing and breakpoints

### Images
- Add your images to `/public/images/`
- Update paths in `/config/images.ts`

### Content
- Edit `/data/content.json` to update all text content
- Or modify individual section components in `/sections/`

### Fonts
Current setup uses:
- **Dancing Script** for headings (cursive)
- **Open Sans** for body text (sans-serif)

To change fonts, update:
1. Google Fonts link in `pages/_document.tsx`
2. Font family names in `config/theme.ts`

## Folder Structure 