# QU-MED Disposable — Project Master Reference & Learnings

This document is the living reference for the QU-MED Disposable website upgrade project. It captures project goals, architecture decisions, data structures, common gotchas, and ongoing learnings.

---

## 1. Project Background & Client Requirements

- **Client**: QU-MED Disposable (medical disposable manufacturer, established 2012 in Gurugram, Haryana).
- **Previous Site**: Legacy WordPress site (`qumed.in`).
- **Objective**: Modernize the digital presence into a fast, high-performance web experience that communicates clinical precision, regulatory compliance, and trust.
- **Signature Visual Concept**:
  - A realistic medical syringe and fluid tube that flows down through the website.
  - As the user scrolls down, liquid progresses through the tube connecting different narrative sections of the page.
- **Design Guidelines**:
  - **Clinical & Professional**: Medical deep navy (`#1A3468`), brand clinical blue (`#0067FF`), soft backgrounds (`#F4F7FD`), crisp white (`#FFFFFF`).
  - **No Sci-Fi / Neon**: Avoid dark cyberpunk aesthetics or video-game glows; preserve medical authority and sterility.
  - **Performance First**: Smooth 60fps on desktop and mobile, respecting `prefers-reduced-motion` and battery life.

---

## 2. Technology Stack

| Layer | Technology | Details / Version |
|---|---|---|
| **Framework** | React 19.2 + React Router 7 | Client-side routing with clean URLs |
| **Bundler** | Vite 8.1.5 | Ultra-fast HMR and optimized production builds |
| **3D Graphics** | Three.js 0.185 + @react-three/fiber 9.7 | Procedural 3D tube geometry + custom GLSL fluid shader |
| **Animation** | GSAP 3.15 + ScrollTrigger | Scroll-driven timeline reveals and section transitions |
| **Icons** | Phosphor Icons React | Lightweight clinical iconography |
| **Linter** | Oxlint 1.71 | High-speed linting ensuring zero warnings/errors |
| **Styling** | Vanilla CSS Modules | Scoped component styling with shared design tokens in `index.css` |

---

## 3. Architecture & Key Patterns

### 3.1 Hybrid Animation Architecture
To achieve the flowing tube effect without crippling mobile devices or low-end laptops, the project uses a **hybrid architecture** (documented in `threejs_architecture_decision.md`):
1. **Hero Section (WebGL / Three.js)**:
   - File: `src/components/3d/HeroScene.jsx`
   - Renders a 3D procedural medical tube with a custom GLSL fluid shader (`FluidFlow`).
   - Automatically disabled on mobile screens (`< 768px`) or when `prefers-reduced-motion` is active, falling back smoothly to `HeroVisualFallback.jsx` (SVG).
   - Wrapped in an `ErrorBoundary` to gracefully degrade if WebGL context is lost.
2. **Page Sections (Modular SVG `TubeSegmentSVG`)**:
   - File: `src/components/layout/TubeSegmentSVG.jsx`
   - Lightweight, purely vector-based SVG tubes placed alongside content sections.
   - Includes realistic double-layer stroke (plastic tube + fluid pulse + gloss highlight).
   - Eliminates the need for a global, scroll-hijacking WebGL canvas.

### 3.2 Directory Structure
```
src/
├── assets/          # Static images, logos, media
├── components/
│   ├── 3d/          # HeroScene.jsx, ErrorBoundary.jsx, HeroVisualFallback.jsx
│   ├── layout/      # Navbar.jsx, Footer.jsx, TubeSegmentSVG.jsx
│   ├── sections/    # Hero, TrustStrip, AboutSnapshot, ProductCategories,
│   │                # CertificationsSection, ManufacturingSection, CoreValues, ContactStrip
│   └── ui/          # Badge.jsx, Button.jsx, ProductCard.jsx, CertCard.jsx, SectionHeading.jsx
├── data/
│   ├── certifications.json  # 6 regulatory credentials (ISO 13485, CE, etc.)
│   ├── nav.json             # Navigation links
│   └── products.json        # 26 product SKUs across 5 clinical categories
├── hooks/
│   ├── useGsapReveal.js     # ScrollTrigger fade-up reveal hook
│   └── useProductFilter.js  # Category filtering and tab management
├── pages/           # Home, Products, About, Certificates, Contact
├── styles/          # index.css (tokens & reset), animations.css
└── utils/           # gsap.config.js (registered plugins)
```

---

## 4. Critical Learnings & Debugging Gotchas

### 1. Vite Dependency Pre-bundling Cache
- **Issue**: Installing new npm packages (such as `@react-three/fiber`) while the Vite dev server is running can cause `Failed to resolve import ...` errors because Vite has not pre-bundled the new module.
- **Solution**: Touching `vite.config.js` or restarting `npm run dev` immediately forces Vite to re-scan `package.json` and build `.vite/deps`.

### 2. Shader Animation Frame Loop
- In `src/components/3d/HeroScene.jsx`, `useFrame((_state, delta) => ...)` requires `delta` to advance `materialRef.current.uniforms.time.value += delta;`. Never rename `delta` to `_delta` without updating references.

### 3. Symlink File Handling on macOS
- Workspace path: `/Users/chiragrawat/Desktop/2026_Projects/QUMED` is a symlink to `/Users/chiragrawat/Desktop/2026 Projects/QUMED` (with a space).
- Direct IDE file tool permissions may block the path due to symlink expansion. Always use terminal commands (`run_command`) for guaranteed file reads/writes.

### 4. Zero Lint / Clean Code Rule
- Oxlint is configured and must remain at **0 warnings and 0 errors** (`npm run lint`).
- Prefix intentionally unused function parameters with `_` (e.g. `_state`, `_error`).

---

## 5. Next Steps & Feature Roadmap

1. **Realistic 3D Syringe Asset**:
   - Model or import a realistic GLTF/GLB medical syringe at the hero top right, with plunger and calibrated volume markings.
2. **Continuous Liquid Flow on Scroll**:
   - Link the scroll position to the shader liquid uniform so scrolling drives liquid forward along the catheter/tube.
3. **Connect Hero Tube to Next Section**:
   - Seamless visual transition from the Hero 3D tube outlet to the `TubeSegmentSVG` in the `TrustStrip` and `AboutSnapshot`.
4. **Enhanced Product Filters & Detail View**:
   - Modal or expandable drawer for full clinical specs, packaging quantities, and sterilisability details.

---

## 7. Implementation Progress & Milestones

### Phase 1 Completed (Syringe Asset & Responsive Layouts)
- **Procedural 3D Syringe (`HeroScene.jsx`)**:
  - Medical glass barrel (`cylinderGeometry` + glass specular highlight).
  - Volumetric graduation tick marks (`LineSegments`/`boxGeometry`) along barrel.
  - Interactive plunger assembly (rubber stopper + cross-shaft + thumb press flange).
  - Luer lock nose cone + needle hub + stainless steel cannula needle.
  - Plunger Y-position and internal fluid column dynamically driven by scroll progress.
  - Idle floating oscillation and subtle tilt rotation.
- **Mobile SVG Syringe (`SyringeSVG.jsx`)**:
  - High-performance vector syringe illustration for mobile (< 768px) and fallback.
  - Scaled graduation marks (`1ml`, `2ml`, `3ml`, `4ml`, `5ml`), rubber piston, and silicone tube exit.
  - Driven by scroll progress with zero WebGL overhead.
- **Hero Visual Fallback (`HeroVisualFallback.jsx`)**:
  - Gracefully renders `SyringeSVG` when WebGL is unmounted or suspended.
- **Hero Responsive Layouts (`Hero.jsx`, `Hero.module.css`)**:
  - Desktop: 3D procedural syringe positioned in right column.
  - Mobile: Cleanly integrated horizontal syringe centered above badge and headline.
  - Verified with `oxlint` (0 warnings, 0 errors) and `npm run build` (clean exit 0).
