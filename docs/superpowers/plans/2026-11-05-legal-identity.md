# Legal identity implementation plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task by task.

**Goal:** Make the registered association and its official domain easy to verify.

**Architecture:** Extend the existing footer, contact-form component, Vue router and prerendered SEO configuration. Reuse the Privacy Policy page's layout for a Legal Notice.

**Tech stack:** Vue 3, Vue Router, Vite, Node tests and the existing FastAPI server.

**Spec:** The user approved the exact footer, Legal Notice and Privacy Policy proposal in this chat on 5 November 2026.

## Constraints

- Preserve the existing footer design and keep unrelated legal provisions unchanged.
- Use GTO Luxembourg, ASBL, RCS Luxembourg F11601 and the verified registered office: 4, Lengerwiss, L-9184 Schrondweiler, Luxembourg.
- Address source: https://www.lbr.lu/mjrcs-web-front/consult-company/F11601?tab=deposit (checked 5 November 2026).
- Reproduce the existing Team description in the Legal Notice.
- Legal Notice and Privacy Policy must be public, prerendered and indexable.
- Work in the existing clean `fix/asbl` checkout; leave changes available for the user's review and deployment.

## Task 1: Legal identity and discovery

**Files:** `src/views/LegalNoticeView.vue`, `src/views/PrivacyView.vue`, `src/router/index.js`, `src/data/seo.js`, `tests/seo-build.test.mjs`, `docs/seo-aeo.md`.

- [x] Add a build integration test for public legal/privacy HTML, canonical URLs, indexing and sitemap inclusion; watch it fail.
- [x] Add the approved Legal Notice, update only the Privacy Policy controller identity and revision date, and register the route.
- [x] Add the verified registration/address to Organization JSON-LD, preserving the official legal name. Enable indexing for legal/privacy and update SEO maintenance documentation.
- [x] Verify the generated pages and production preview responses with the full test suite.

## Task 2: Footer contact and identity

**Files:** `src/components/Footer.vue`, `src/components/GetInTouchButton.vue`.

- [x] Extend the existing contact component with a trigger slot while retaining its default button.
- [x] Add Contact, Legal Notice and the exact identification line to the footer with existing link styling and responsive wrapping.
- [x] Verify the popup opens/closes from multiple pages, desktop/mobile layouts remain compact, and no hydration errors occur.

## Verification results

- Baseline: all 37 existing frontend tests passed.
- New integration test failed before implementation because Legal Notice HTML did not exist.
- Final `npm test`: all 38 tests passed; 25 pages prerendered and 20 indexable URLs generated.
- Backend route suite: all 3 tests passed. Additional checks against the real generated legal/privacy HTML returned HTTP 200 and indexable metadata, with and without trailing slashes.
- Browser: Legal Notice direct load, navigation to Privacy Policy, existing YouForm load, Contact open/close from both pages, keyboard activation, desktop and mobile widths (390px and 320px) checked. No browser console errors or horizontal overflow found.
- Independent read-only review found no blockers; 14 SEO tests also passed independently.
- Changes remain uncommitted on the user's existing `fix/asbl` branch, ready for deployment through the usual workflow.

## Review focus and completion

- Direct loads and client-side navigation must agree on metadata and content.
- Footer contact must open the existing form without submitting data or navigating away.
- Check keyboard use and modal stacking; preserve existing contact triggers.
- Check generated HTML is readable without JavaScript, has no `noindex` or authentication requirement, and is present in the sitemap.
- Run `npm test`, backend route tests, and review the final diff. Explain Search Console's optional indexing request after deployment using Google's documentation.
