import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { publicRoutes, seoRoutes, site, toAbsoluteAsset, toCanonical } from '../src/data/seo.js'

const distDir = new URL('../dist/', import.meta.url)
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')

const escapeHtml = (value = '') =>
    String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')

const escapeAttr = escapeHtml

const stripUndefined = (value) => {
    if (Array.isArray(value)) return value.map(stripUndefined)
    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value)
                .filter(([, entryValue]) => entryValue !== undefined)
                .map(([key, entryValue]) => [key, stripUndefined(entryValue)])
        )
    }
    return value
}

const metaTags = (path, seo) => {
    const canonical = toCanonical(path)
    const image = toAbsoluteAsset(seo.image || site.image)
    const robots = seo.robots || 'index,follow'
    const jsonLd = JSON.stringify(stripUndefined(seo.jsonLd || []))

    return [
        `<title>${escapeHtml(seo.title)}</title>`,
        `<meta name="description" content="${escapeAttr(seo.description)}">`,
        `<meta name="robots" content="${escapeAttr(robots)}">`,
        `<link rel="canonical" href="${escapeAttr(canonical)}">`,
        `<meta property="og:type" content="website">`,
        `<meta property="og:site_name" content="${escapeAttr(site.name)}">`,
        `<meta property="og:title" content="${escapeAttr(seo.title)}">`,
        `<meta property="og:description" content="${escapeAttr(seo.description)}">`,
        `<meta property="og:url" content="${escapeAttr(canonical)}">`,
        `<meta property="og:image" content="${escapeAttr(image)}">`,
        `<meta name="twitter:card" content="summary_large_image">`,
        `<meta name="twitter:title" content="${escapeAttr(seo.title)}">`,
        `<meta name="twitter:description" content="${escapeAttr(seo.description)}">`,
        `<meta name="twitter:image" content="${escapeAttr(image)}">`,
        `<script nonce="{{ csp_nonce }}" type="application/ld+json">${jsonLd.replaceAll('</script', '<\\/script')}</script>`
    ].join('\n  ')
}

const staticContent = (seo) => `
    <article class="seo-prerender" aria-label="${escapeAttr(seo.staticTitle)}">
      <h1>${escapeHtml(seo.staticTitle)}</h1>
      <p>${escapeHtml(seo.description)}</p>
      ${(seo.staticSections || []).map((section) => `
      <section>
        <h2>${escapeHtml(section.heading)}</h2>
        <p>${escapeHtml(section.text)}</p>
      </section>`).join('')}
    </article>`

const renderHtml = (path, seo) => {
    let html = template
        .replace(/<title>[\s\S]*?<\/title>/, '')
        .replace(/<meta name="description" content="[\s\S]*?">/, '')
        .replace('</head>', `  ${metaTags(path, seo)}\n</head>`)
        .replace('<div id="app"></div>', `<div id="app">${staticContent(seo)}\n  </div>`)

    return html
}

const routeOutputPath = (path) => {
    if (path === '/') return new URL('../dist/index.html', import.meta.url)
    return new URL(`../dist${path}/index.html`, import.meta.url)
}

for (const path of publicRoutes) {
    const outputUrl = routeOutputPath(path)
    await mkdir(dirname(outputUrl.pathname), { recursive: true })
    await writeFile(outputUrl, renderHtml(path, seoRoutes[path]), 'utf8')
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicRoutes
    .filter((path) => seoRoutes[path].robots !== 'noindex,follow')
    .map((path) => `  <url>
    <loc>${toCanonical(path)}</loc>
    <changefreq>${path.startsWith('/events') ? 'weekly' : 'monthly'}</changefreq>
  </url>`)
    .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`

const llms = `# ${site.name}

${site.name} is a non-profit car enthusiast organization in Luxembourg focused on supercar events, private tours, automotive photoshoots and GTO Lens.

## Main pages
${publicRoutes.map((path) => `- ${seoRoutes[path].title}: ${toCanonical(path)}`).join('\n')}

## Contact
- Email: ${site.email}
- Instagram: https://www.instagram.com/gto.lu/
- TikTok: https://www.tiktok.com/@gto.lu
- Facebook: https://www.facebook.com/GTOLuxembourg
`

await writeFile(new URL('../dist/sitemap.xml', import.meta.url), sitemap, 'utf8')
await writeFile(new URL('../dist/robots.txt', import.meta.url), robots, 'utf8')
await writeFile(new URL('../dist/llms.txt', import.meta.url), llms, 'utf8')

console.log(`Generated SEO HTML for ${publicRoutes.length} routes.`)
