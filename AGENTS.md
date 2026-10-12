# GTO Luxembourg project context

Read `.agents/product-marketing.md` before drafting or editing GTO Luxembourg
communications, sponsorship material, event descriptions, or website copy.
It contains the organisation's identity, activities, communication preferences,
and historical sponsorship information supplied by the user.

Follow the user's latest instructions when they differ from that reference.
Keep completed events and past sponsor packages distinct from future plans.
Do not invent attendance figures, reach, sponsor commitments, or event dates.

## Design guidance

Read `Design.md` before creating or changing UI, layouts, styling, typography,
imagery, responsive behaviour, or animations. Use it as the project's design
reference and check the existing implementation for reusable components and
styles before making changes.

Preserve its photography-led, community-focused identity, alternating dark
surfaces, restrained yellow accents, and subtle motion. Project-specific design
guidance takes precedence over generic design skill defaults; follow the user's
latest instructions when they request a different direction.

## Code organisation and maintainability

- Aim to keep source files under 300 lines. Treat this as a guideline, not a hard
  limit; split larger files when they contain distinct responsibilities.
- Extract UI reused across multiple views or components into shared components
  when it represents the same responsibility, rather than merely looking similar.
- Extract repeated business logic into utilities or Vue composables as appropriate.
- Keep each component focused on one responsibility.
- Check existing components, utilities, composables, and styles before creating
  new ones. Reuse or extend suitable existing implementations.
- Avoid abstractions that make the code harder to understand. Create shared APIs
  around concrete reuse needs rather than speculative future uses.
- Keep refactoring relevant to the requested change; do not split unrelated files
  solely to meet the line-count guideline.
