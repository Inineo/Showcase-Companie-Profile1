# KIBI — Cinematic Digital Solutions Prototype

A polished, single-page company-profile prototype for **KIBI**, a studio that helps businesses turn ideas, problems, and opportunities into practical digital products.

This prototype explores a cinematic landing-page experience: the hero cube responds to which half of the viewport the user is exploring, creating a tactile visual introduction without conventional video scrubbing.

## Prototype Purpose

The website demonstrates how a digital studio or technology consultancy can present its positioning through a minimal, premium visual system.

It focuses on:

- A strong hero message with a clear business proposition.
- A dark, editorial design language with restrained purple accents.
- A responsive company-profile layout.
- A high-performance interactive hero visual that runs reliably in both directions.

## Features

### Cinematic Hero Cube

The central cube animation is rendered from a WebP image sequence rather than a continuously scrubbed HTML video.

- Mouse on the **right half** of the viewport advances the cube animation.
- Mouse on the **left half** reverses the cube animation.
- The animation pauses at its first or last frame.
- All frames are preloaded and decoded before interaction starts, avoiding video-decoder switching, reverse-seek glitches, and missing frames.
- A static cube poster is displayed while frames are loading.

### Premium Visual Treatment

- Dark cinematic background and screen-blended cube visual.
- Glass-style philosophy panel for large screens.
- Animated sine-wave accent.
- Refined load-in motion for the content and navigation.
- Custom cursor on devices that do not request reduced motion.

### Responsive Layout

- Hero copy is prioritized on smaller screens.
- The philosophy panel appears on larger desktop breakpoints.
- Cube container scales down across desktop and mobile sizes while retaining its central visual role.

### Accessibility and Motion Preferences

- Respects `prefers-reduced-motion`.
- Uses semantic `main`, a primary page heading, descriptive fallback image text, and a canvas label.

## Technology

| Area | Technology |
| --- | --- |
| Structure | HTML5 |
| Interactivity | Vanilla JavaScript |
| Styling | Vanilla CSS + Tailwind CSS CDN utility classes |
| Hero animation | Canvas 2D + preloaded WebP image sequence |
| Fonts | Google Fonts — Inter |
| Asset preparation | FFmpeg used to extract and optimize the original cube video into frames |

## How the Cube Animation Works

The original 3.59-second, 59.94 FPS cube animation was converted into **215 WebP frames** in `assets/frames`.

`assets/js/script.js` loads and decodes every frame into memory, then uses one `<canvas>` element to render frame indices:

```text
left viewport  → frame index decreases → cube moves backwards
right viewport → frame index increases → cube moves forwards
```

This removes the need to swap separate forward/reverse video decoders during interaction. The result is deterministic direction changes using the same source frames in either direction.

## Use Cases

This prototype is well suited for:

- Digital agency or consultancy landing pages.
- Creative studio company profiles.
- Product design, branding, and technology showcase sites.
- Interactive portfolio homepages.
- Campaign microsites that require a high-impact but lightweight hero interaction.

## Project Structure

```text
.
├── index.html
└── assets
    ├── css/styles.css
    ├── frames/cube-001.webp … cube-215.webp
    ├── images/hero-cube.jpg
    ├── js/script.js
    └── videos
        ├── hero-video.mp4
        └── hero-video-reverse.mp4
```

> **Note:** The MP4 files are retained as source/production assets. The live hero interaction uses the WebP frame sequence and Canvas renderer.

## Run Locally

Because the prototype loads image assets at runtime, serve it from a local HTTP server rather than opening `index.html` directly.

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Browser Support

The experience targets modern browsers with Canvas 2D and WebP support, including current Chrome, Edge, Firefox, and Safari releases.
