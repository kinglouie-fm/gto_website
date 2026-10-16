# SEO and AEO maintenance

## Content and metadata

- Edit visible content in the existing Vue views and shared event data. The build renders those same components, so separate crawler summaries are no longer needed.
- Maintain titles, descriptions, images, indexing rules and JSON-LD in `src/data/seo.js`.
- `src/utils/seo.js` supplies metadata to both the build and the router. Successful navigation replaces the page's JSON-LD and removes stale schemas and canonical URLs from missing pages.
- New event entries automatically receive their own metadata and generated pages. Continue to distinguish past editions from future announcements and supply only confirmed dates and registration details.
- `/lens/camera`, `/lens/details`, legal pages and the error page are `noindex,follow` and excluded from the generated sitemap and `llms.txt`.

## Build and preview

```bash
npm run build
npm run preview
```

The build creates the browser bundle, compiles a production server renderer into
`dist-ssr/`, then renders each configured route into `dist/`. Only `dist/` is
deployed as frontend output. No renderer runs on the production server.

The generated pages contain real navigation links, headings, text and images
before JavaScript executes. JavaScript hydrates the matching page and enables
the existing interactions. Generic 404 HTML served at another URL is mounted
fresh to avoid hydrating a different route.

Gallery and press image modals use `#modals` in `index.html`. The generator
includes Vue's teleport anchors there so modal hydration remains consistent.
Keep this container when editing the HTML template.

The preview middleware serves the generated HTML for clean route URLs and
returns HTTP 404 for missing pages, matching the backend's route handling.
`npm run dev` remains a normal Vite development server.

`dist/sitemap.xml`, `dist/robots.txt` and `dist/llms.txt` are regenerated from the
SEO configuration on every build. They are the deployment outputs; the older
files in `public/` are not the production source of truth.

## Server requirements

Deploy the generated frontend and updated `backend/main.py` together. The
existing deployment workflow builds the frontend before deploying the backend.

The backend serves each generated route's `index.html` with the request's CSP
nonce. Missing paths, including unknown event slugs, receive `404/index.html`
with HTTP 404 and `X-Robots-Tag: noindex, follow`.

The reverse proxy must forward page requests to this backend so it can select
the correct HTML, inject the nonce and return the correct status. Do not rewrite
all page requests to the homepage or turn backend 404 responses into HTTP 200.
Static assets can continue to be served directly. Live reverse-proxy settings
are not stored in this repository.

## Verification

```bash
npm test
backend/venv/bin/python -m unittest discover -s tests -p 'test_frontend_routes.py'
```

`npm test` rebuilds before running the Node tests, including assertions against
the generated HTML, metadata transitions, utility indexing, preview routing,
images and event views. The Python tests use the backend environment and check
known routes, missing routes, crawler files and nonce substitution without
calling the car recognition API.

For browser checks, open the production preview. Navigate from Home to Events,
open an edition, return to another edition, and go back Home. Compare each
page's JSON-LD with a direct load and check for hydration errors. Open an unknown
path and an unknown event slug, verify the error page, and confirm the recovery
links work at desktop and mobile widths.
