# Design System Document: Automotive Editorial Minimalism

## 1. Overview & Creative North Star: "Community-Driven Performance"
This design language feels like a car-culture editorial translated into a clean, accessible website. Its Creative North Star is **Community-Driven Performance**. The experience combines the emotional pull of automotive photography with the clarity of a structured nonprofit/community platform. It should feel premium but not flashy, serious but still warm, and always rooted in passion for cars and the people behind them.

The site avoids unnecessary decoration and instead lets **large imagery, tonal section changes, and restrained interaction** do the work. Rather than feeling like a corporate automotive brand, it feels like a curated enthusiast platform: approachable, image-led, and built around trust, community, and events.

---

## 2. Colors & Tonal Depth
The palette is deliberately narrow and disciplined. It uses deep slate-gray surfaces, white typography, and a warm yellow accent to create a premium automotive mood without leaning on aggressive reds or glossy gradients.

### The "Layered Surface" Rule
**Sections are defined primarily through stacked background tones, not complex decoration.** Large content bands alternate between dark gray surfaces to separate narrative blocks such as intro content, team areas, portfolio sections, and news modules.

### Surface Hierarchy & Nesting
Treat the interface as a sequence of calm, matte panels.
*   **Primary Dark Surface:** `rgb(48, 56, 65)` — the main content background.
*   **Secondary Dark Surface:** `rgb(76, 84, 94)` — used for alternating sections to create rhythm and separation.
*   **Foreground Text:** `white` — the dominant reading color on dark surfaces.
*   **Accent Tone:** warm yellow, used in heading classes like `h-yellow` and `h-yellow-small`, reserved for emphasis and section anchors.

### The "Accent Sparingly" Rule
Accent color is not used everywhere. It is concentrated in section headings and select emphasis moments, which makes it feel intentional. White remains the default for body copy, buttons, and image-led content. This restraint helps the site feel mature and avoids the visual noise common in automotive websites.

---

## 3. Typography: Clean Enthusiast Editorial
Typography is straightforward, readable, and hierarchy-driven. It is not experimental; instead, it supports the imagery and content structure with dependable contrast and spacing.

*   **Section Headlines:** Used through classes like `h-yellow`, `h-white`, and `h-first`. These act as the main anchors of each section and are visually prominent without being oversized.
*   **Subheadings:** Classes like `h-white-small` and `h-yellow-small` introduce cards, people, and editorial snippets with a lighter but still clear hierarchy.
*   **Body Copy:** Standard paragraph styling around `1rem`, with centered alignment in many sections to keep the tone formal, balanced, and community-focused.
*   **Editorial Copy Blocks:** `content-text` is used for longer descriptive passages and event explanations, often with controlled widths for legibility.

### The "Readable First" Rule
Body text is designed to stay accessible across devices. Copy width is often constrained, and line breaks are used generously in emotionally important sections. The typographic system supports trust, story, and structure more than branding theatrics.

---

## 4. Elevation & Depth: Image-Led Depth
Depth is created more through **photography, modal behavior, and section stacking** than through heavy shadows or skeuomorphic effects.

*   **Rounded Imagery:** Repeated `border-radius: 10px` gives images and cards a consistent soft edge.
*   **Modal Enlargement:** Clickable images expand into modals, turning static gallery content into immersive detail views.
*   **Hero Overlap Technique:** Intro content sections use negative top margins and added top padding to pull upward into the hero image area, creating continuity between photography and text.
*   **Motion on Scroll:** GSAP fade-and-rise animations (`opacity: 0`, `y: 50`) gently reveal sections like team, portfolio, friend tribute, and news. Motion is understated and supports polish rather than spectacle.

### The "Photography Creates Prestige" Rule
The site’s premium feeling comes from strong automotive imagery, careful cropping, and generous image presence. Visual trust is created by showing the culture, not by overbuilding the interface.

---

## 5. Components & Interface Primitive

### Hero Sections
Hero blocks are large, immersive, and image-first. They establish mood immediately and often rely on precise `object-position` adjustments per breakpoint to keep the most important part of the photo visible.

### Content Bands
Primary narrative sections sit on dark matte backgrounds with centered headings and supporting text. These bands are used repeatedly across Team, Events, and Portfolio pages to create consistency.

### Cards & Grids
*   **Team Grid:** Responsive grid shifting from 2 columns on smaller screens to 3 and 4 columns on larger breakpoints. The layout prioritizes balance and recognition.
*   **Event Desktop Card:** Split layout with image on the left and explanatory text plus CTA on the right. This feels editorial and structured.
*   **Portfolio Grid:** Masonry-like multi-column rhythm created through alternating small and large thumbnails. This gives the gallery energy without losing order.
*   **News Cards:** Compact editorial modules with source heading, image, quote, and link CTA.

### Buttons
Two button styles define interaction:
*   **Outlined Button (`Button.vue`):** Transparent background, white border, inherits surrounding text color. On hover it inverts into a white-filled button with dark text. This keeps buttons integrated into dark sections.
*   **Filled Button (`ButtonFilled.vue`):** White background with dark text by default. On hover it darkens and flips to white text with a white border. This creates a clear secondary emphasis style for outbound links and actions.

Both button types share:
*   inline-flex alignment
*   rounded 5px corners
*   arrow icon with subtle horizontal hover movement
*   responsive scaling in width, height, and font size

### Modals & Embedded Interaction
The portfolio booking flow uses a modal with an embedded Typeform iframe. Image modals support gallery browsing and preload adjacent images to make navigation feel immediate and smooth.

---

## 6. Responsiveness & Layout Behavior
Responsiveness is central to the design. Layout changes are not minor tweaks; several sections meaningfully recompose across breakpoints.

*   **Mobile First:** Events begin as vertically stacked sections with centered imagery and text.
*   **Desktop Upgrade:** At larger breakpoints, Events switch into structured side-by-side editorial cards.
*   **Adaptive Grids:** Team and portfolio layouts expand progressively with breakpoints rather than simply scaling larger.
*   **Image Scaling:** Thumbnail and feature image sizes increase substantially at 576px, 768px, 992px, 1200px, and 1400px breakpoints.
*   **Content Overlap Adjustments:** Negative margin/padding combinations are increased at wider breakpoints to preserve the hero-to-content transition.

### The "Recompose, Don’t Just Resize" Rule
The website treats responsiveness as a design decision, not a technical afterthought. Mobile and desktop experiences share the same identity, but not always the same arrangement.

---

## 7. Motion & Interaction Principles
Interaction is clean and deliberate.

*   **Hover Feedback:** Buttons animate with subtle arrow movement and inversion of fill/border treatment.
*   **Scroll Reveal:** Key sections animate in only when they enter the viewport, making long pages feel lighter and more curated.
*   **Clickable Imagery:** Images are visibly interactive via cursor changes and modal behavior.
*   **Preloading Strategy:** High-quality hero images and adjacent modal images are preloaded to improve perceived smoothness.

### The "Subtle Performance" Rule
Animations should feel smooth, modern, and quality-driven. Nothing should bounce, overshoot, or distract from the cars and community content.

---

## 8. Do’s and Don’ts

### Do
*   **DO** let photography lead the experience.
*   **DO** use alternating dark surfaces to separate sections instead of adding visual clutter.
*   **DO** keep headings strong and accents selective.
*   **DO** preserve rounded corners and image consistency across all components.
*   **DO** maintain the premium-community balance: exclusive cars, approachable presentation.

### Don’t
*   **DON’T** overload the interface with extra colors, gradients, or glossy automotive clichés.
*   **DON’T** use aggressive animation or high-contrast visual effects that compete with the imagery.
*   **DON’T** break the established dark-surface rhythm with random light panels.
*   **DON’T** crowd body text; the design relies on breathing room and controlled widths.
*   **DON’T** turn the site into a luxury-sales experience. It should remain community-first, like @gto.lu translated into web form.
EOF