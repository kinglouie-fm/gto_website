import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import { publicRoutes, seoRoutes, site, toCanonical } from '../src/data/seo.js'
import { getHeadMetadata, serializeJsonLd } from '../src/utils/seo.js'

const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')

// A production SSR build shares Vue's scoped style IDs with the client build.
await build({
    build: { ssr: 'src/entry-server.js', outDir: 'dist-ssr', copyPublicDir: false },
    // Bundle the Vue icon component so it shares the same ESM icon registry.
    ssr: { noExternal: ['gsap', '@fortawesome/vue-fontawesome'] }
})
const { renderPage } = await import('../dist-ssr/entry-server.js')

const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const metaTags = (path) => {
    const { title, canonical, meta, jsonLd } = getHeadMetadata(path)
    return [
        `<title>${escapeHtml(title)}</title>`,
        ...meta.map(attributes => `<meta ${Object.entries(attributes)
            .map(([key, value]) => `${key}="${escapeHtml(value)}"`).join(' ')}>`),
        ...(canonical ? [`<link rel="canonical" href="${escapeHtml(canonical)}">`] : []),
        ...(jsonLd.length ? [
            `<script id="page-structured-data" nonce="{{ csp_nonce }}" type="application/ld+json">${serializeJsonLd(jsonLd)}</script>`
        ] : [])
    ].join('\n  ')
}

for (const path of publicRoutes) {
    const { html: content, modals } = await renderPage(path)
    const html = template
        .replace(/<title>[\s\S]*?<\/title>/, '')
        .replace(/<meta name="description" content="[\s\S]*?">/, '')
        .replace('</head>', `  ${metaTags(path)}\n</head>`)
        .replace('<div id="app"></div>', () => `<div id="app" data-prerendered="${escapeHtml(path)}">${content}</div>`)
        .replace('<div id="modals"></div>', () => `<div id="modals">${modals}</div>`)
    const output = new URL(`../dist${path === '/' ? '' : path}/index.html`, import.meta.url)
    await mkdir(dirname(fileURLToPath(output)), { recursive: true })
    await writeFile(output, html, 'utf8')
}

const indexableRoutes = publicRoutes.filter(path => !seoRoutes[path].robots?.includes('noindex'))
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableRoutes.map(path => `  <url>
    <loc>${toCanonical(path)}</loc>
    <changefreq>${path.startsWith('/events') ? 'weekly' : 'monthly'}</changefreq>
  </url>`).join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`

const llms = `# ${site.name}

${site.name} is a non-profit car enthusiast organization in Luxembourg focused on supercar events, private tours, automotive photoshoots and GTO Lens.

## Main pages
${indexableRoutes.map(path => `- ${seoRoutes[path].title}: ${toCanonical(path)}`).join('\n')}

## Contact
- Email: ${site.email}
${site.sameAs.map(url => `- ${url}`).join('\n')}
`

await writeFile(new URL('../dist/sitemap.xml', import.meta.url), sitemap, 'utf8')
await writeFile(new URL('../dist/robots.txt', import.meta.url), robots, 'utf8')
await writeFile(new URL('../dist/llms.txt', import.meta.url), llms, 'utf8')

console.log(`Prerendered ${publicRoutes.length} Vue pages; ${indexableRoutes.length} indexable URLs.`)
