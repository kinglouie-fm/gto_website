# SEO and AEO checklist

- [ ] Update structured data during navigation.
  - The router hook updates page metadata but leaves the initial JSON-LD unchanged.
  - Update or replace page-specific JSON-LD when navigating between routes, removing data that no longer applies.
  - Verify that navigating from the homepage to an event, between events, and back produces the same structured data as directly loading each page, without duplicate scripts.
  - Relevant files: `src/router/index.js`, `src/data/seo.js`, `scripts/generate-seo-pages.mjs`.

- [ ] Handle utility and missing pages explicitly.
  - `/lens/camera`, `/lens/details`, and unknown paths currently fall back to homepage SEO settings.
  - Give utility pages explicit metadata and indexing rules.
  - Add missing-page handling for unknown routes and unknown event slugs, with an HTTP 404 response and appropriate metadata.
  - Verify direct requests and in-app navigation, while preserving working public routes and utility pages.
  - Relevant files: `src/router/index.js`, `src/data/seo.js`, `src/views/EventDetailView.vue`, `backend/main.py`.

- [ ] Expand the generated HTML.
  - Generated pages currently contain short summaries rather than rendered Vue pages, without internal navigation links.
  - Include more of the actual visible content and useful internal links, using shared data to keep generated HTML and Vue views consistent.
  - Keep completed events distinct from future announcements and include only confirmed event details.
  - Verify that built pages expose meaningful headings, content, and crawlable links without JavaScript, and that their metadata and structured data match the visible content.
  - Relevant files: `scripts/generate-seo-pages.mjs`, `src/data/seo.js`, `src/data/events.js`, `src/views/`.
  - Reference: [Google's JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).
