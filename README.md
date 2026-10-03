# KIBI — Cinematic Digital Solutions Showcase

A polished, modern company-profile showcase built with **Next.js 16** for **KIBI**, a digital studio that transforms business challenges into practical digital solutions.

This showcase demonstrates a premium cinematic landing experience with interactive hero cube, floating glass navigation, gradient breathing borders, and comprehensive service pricing.

## Showcase Purpose

The website demonstrates how a digital studio can present its positioning through a minimal, premium visual system with cutting-edge animations and interactions.

It focuses on:

- Strong hero message with interactive 3D cube visualization
- Dark editorial design language with refined purple accents
- Floating glass navbar with gradient glow effects
- Gradient breathing animations on section borders
- Comprehensive service and pricing sections
- High-performance Next.js + React architecture

## Features

### Interactive Hero Cube

The central cube animation renders from a WebP image sequence with bidirectional control:

- Mouse on **right half** advances the cube animation forward
- Mouse on **left half** reverses the cube animation backward
- Animation pauses at first or last frame
- All 215 frames preloaded and decoded before interaction
- Static poster displays during loading
- Automatic fade detection stops animation when section scrolls out

### Premium Visual Treatment

- **Floating Glass Navbar**: Rounded glass-morphism design with gradient pulse glow
- **Gradient Breathing Borders**: Animated section borders with smooth opacity transitions
- **Pricing Section**: Gradient breathing effect on curtain borders
- **Dark cinematic background** with strategic purple accents
- **Custom cursor** with interaction feedback
- **Micro-animations** and smooth transitions throughout
- Refined load-in motion for content and navigation

### Section Features

#### What We Do
- Sticky header with navbar visibility tracking
- Overlapping card stack with hover interactions
- Service capability cards with metrics
- Static purple border (80% opacity)

#### Pricing
- Development packages with pricing tiers
- Recurring retainer packages with breathing gradient borders
- Hanging price tag animations
- Contact form integration
- Thousand/million suffixes (RB/JT) for Indonesian currency

### Responsive Layout

- Mobile-first responsive design
- Navbar adapts to scroll position
- Philosophy panel appears on larger breakpoints
- Cube scales appropriately across all devices
- Touch-friendly interactions

### Accessibility and Motion

- Respects `prefers-reduced-motion`
- Semantic HTML5 structure
- Proper heading hierarchy
- ARIA labels and descriptive text
- Keyboard navigation support

## Technology Stack

| Area | Technology | Purpose |
| --- | --- | --- |
| Framework | Next.js 16.3.6 (Turbopack) | React framework with SSR/SSG capabilities |
| UI Library | React 19 | Component-based architecture |
| Styling | Tailwind CSS v4 | Utility-first CSS framework |
| TypeScript | TypeScript 5 | Type-safe development |
| Fonts | Google Fonts (Inter) | Premium typography |
| Hero Animation | Canvas 2D + WebP sequence | 215-frame bidirectional animation |
| Asset Prep | FFmpeg | Frame extraction and optimization |

## Project Structure

```text
.
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main page composition
│   │   └── globals.css         # Global styles and animations
│   └── components/
│       ├── Navbar.tsx          # Floating glass navbar
│       ├── CustomCursor.tsx    # Custom cursor component
│       ├── HeroSection.tsx     # Hero with text content
│       ├── HeroCube.tsx        # Interactive cube animation
│       ├── WhatWeDo.tsx        # Services section
│       ├── SelectedWork.tsx    # Portfolio carousel
│       └── PricingSection.tsx  # Pricing with breathing effect
├── public/
│   └── assets/
│       ├── frames/             # 215 WebP frames
│       └── images/             # Static assets
└── package.json
```

## Key Animations

### Breathing Border Animation
Pricing section features gradient breathing effect:
- Gradient: `from-black via-purple-400 to-black`
- Opacity: 0.3 → 1 → 0.3 (3s ease-in-out infinite)
- Creates organic, living border effect

### Navbar Glow Animation
Floating navbar with gradient pulse:
- Top/bottom rim light with gradient
- Smooth opacity transitions
- Responsive to scroll position

### Curtain Section Transitions
Sections overlap with:
- Rounded top borders (`rounded-t-[3rem]`)
- Deep shadows for depth
- Gradient rim lights
- Z-index stacking context

## Run Locally

Install dependencies and start development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## Browser Support

Targets modern browsers with:
- ES2020+ JavaScript support
- Canvas 2D API
- WebP image format
- CSS Grid and Flexbox
- CSS backdrop-filter

Tested on latest versions of Chrome, Edge, Firefox, and Safari.

## Performance

- Static generation with Next.js SSG
- Optimized WebP frames (215 × ~30KB)
- GPU-accelerated animations
- Lazy loading for images
- Font optimization with next/font

## License

Prototype showcase for portfolio demonstration.

