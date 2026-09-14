# Architecture Decision: Hybrid Page-Segment Architecture

## 1. Executive Summary
This document outlines the revised architectural strategy for the cross-page syringe/tube concept for the QU-MED website. Based on client feedback, the proposal for a global persistent Three.js canvas has been **rejected** due to unnecessary scroll-sync complexity and layout interference risks. 

Instead, we will proceed with a **Hybrid Page-Segment Architecture**. This approach uses localized, page-specific components. It reserves Three.js WebGL strictly for the Home hero section (where it provides maximum visual impact), and relies on polished, lightweight SVG/CSS representations for subsequent page segments, mobile viewports, and fallback states. 

## 2. Assumptions & Constraints
- **Clinical Aesthetics:** The design remains blue and white. The syringe and tube must feel premium, sterile, and professional (no neon/sci-fi elements).
- **Usability First:** The tube acts as a restrained background thread (`z-index: 0`) in safe outer margins. It must never interfere with layout, text contrast, form inputs, or product filtering.
- **No Global Scroll Hijacking:** We will not use global DOM-to-3D scroll mapping (e.g., `ScrollControls`). Standard browser scrolling behavior is preserved.
- **No Three.js on Mobile:** Mobile and reduced-motion states strictly use static or CSS-animated SVGs.

---

## 3. The Page-Segment Visual Map & Safe Content Zones
Instead of a single continuous 3D tube spanning the entire application, each route will mount its own independent, visually connected segment.

| Route | Visual Concept | Safe Content Zone |
|---|---|---|
| **Home (Hero)** | 3D Syringe/Connector & WebGL Tube injecting fluid. | Hero text/CTAs on the left. The WebGL canvas is strictly constrained to the right 50% margin. |
| **Home (Sections)** | Localized SVG/CSS tube segments curving through white space. | Text and grid content centered. SVG accents reside in the far-left or far-right negative space. |
| **Products** | Restrained SVG/CSS tube accents. *No WebGL over product cards.* | Main product grid & filter tabs are fully protected. SVG tubes only flow down the extreme left/right margins behind the content container. |
| **About** | Static or lightweight SVG tube weaving near facility photos. | Tube visuals occupy negative space between photography and statistics blocks. |
| **Certificates** | Restrained static tube/medical-port terminating accent. | The tube fades into an abstract medical port at the bottom of the page grid. |
| **Contact** | The tube flows downwards and terminates near the CTA/Form. | The form is fully protected. The tube terminates in the background or adjacent visual slot. |

---

## 4. Technology Split: Three.js vs SVG/CSS
To guarantee performance and layout stability, the technology stack is split deliberately based on the segment's location and device capabilities.

- **Home Hero (Desktop/Tablet):** Uses **Three.js (WebGL)**. A dedicated `<Canvas>` component is mounted locally inside the hero section, rendering a procedural tube prototype (or future GLTF syringe model).
- **All Other Pages (Desktop/Tablet):** Uses **SVG/CSS**. Background SVGs mimic the clinical flow of the tube to maintain brand continuity without the heavy GPU overhead of multiple `<Canvas>` elements.
- **All Pages (Mobile):** Strictly uses **SVG/CSS**. The WebGL scene is completely unmounted or skipped, falling back to a polished SVG illustration to save battery and layout space.
- **Reduced Motion/Fallback:** Uses **Static SVG**. If WebGL fails, or if `prefers-reduced-motion: reduce` is active, no CSS fluid animation plays; the static SVG tube remains as a premium watermark/accent.

---

## 5. Route Transition Behavior
Because we are abandoning the persistent global canvas, navigating between routes (e.g., Home → Products) will cause the components of the current page to unmount, and the new page's components to mount. 
- There will be **no cross-page continuous animation**.
- Route transitions will be handled by standard React Router unmounting. The tube visuals are treated as static background assets native to each specific page. 
- The visual continuity is achieved through consistent design and placement of the SVG paths, not through a persistent rendering context.

---

## 6. Image-Loading and Layout-Shift Considerations
Since client photos (manufacturing facilities, products) are not yet available, we must prevent layout shifts when they eventually load, as a layout shift could misalign the background SVG tube segments.
- **Mitigation:** All image slots (`<img />` and `<picture>`) will be wrapped in containers with strict CSS aspect ratios (`aspect-ratio: 16/9`, etc.) or explicitly defined `width` and `height` attributes. The SVG paths will be positioned absolutely relative to these fixed-height sections, ensuring the tube path never breaks if an image loads slowly.

---

## 7. Performance and Cleanup Strategy
- **Three.js Unmounting:** The `HeroScene` `<Canvas>` is isolated. When the user navigates away from the Home page, React automatically unmounts the component. We will rely on `@react-three/fiber`'s native garbage collection to dispose of geometries and materials, ensuring zero WebGL memory leaks on other routes.
- **DPR Capping:** The WebGL hero will retain a strict `dpr={[1, 1.5]}` to cap pixel pushing on retina displays.
- **Zero Global State:** By avoiding global Zustand stores or scroll mappers, we eliminate constant re-renders and unnecessary React context propagation during scrolling.

---

## 8. Components and Files to Change
- **`src/components/3d/HeroScene.jsx`**: (Already implemented) Will continue to act as the WebGL hero prototype. Will eventually be updated to import a `.gltf` syringe.
- **`src/components/layout/TubeSegmentSVG.jsx` (NEW)**: A reusable component for rendering the SVG/CSS tube accents across the rest of the application.
- **`src/pages/Home.jsx`, `Products.jsx`, etc.**: Will be updated to import and absolutely position their respective `TubeSegmentSVG` components in the background.

---

## 9. Phased Implementation Plan

- **Phase 1 (Current Focus): Home Hero Prototype.**
  - Maintain the currently built Three.js procedural tube prototype in the Home hero.
  - Await client approval or a 3D asset for the actual Syringe/Connector.
  
- **Phase 2: Local SVG Accents (Home Sections).**
  - Implement `TubeSegmentSVG.jsx`.
  - Add restrained SVG tube accents to the About/Infrastructure sections of the Home page, testing the CSS fluid animation.

- **Phase 3: Route Integration.**
  - Add safe-margin SVG tube segments to `/products`, `/about`, `/certificates`, and `/contact`.
  - Verify layout stability and confirm 0 layout shifts.

- **Phase 4: Asset Integration.**
  - Replace placeholders with actual client imagery when delivered.
  - Swap the procedural WebGL tube for the final `.gltf` syringe/medical assembly if approved.

---

## 10. Required Client Approval
> [!IMPORTANT]
> **User Review Required:** Please review this revised architecture. This approach guarantees zero interference with the product grids and forms, eliminates global scroll hijacking, and provides a highly performant SVG fallback strategy. 
> 
> **Proposed Next Step:** If approved, no immediate cross-page Three.js work is required. We will keep the current Hero prototype unaltered and await either client imagery or a directive to begin Phase 2 (SVG segments on the Home page).
