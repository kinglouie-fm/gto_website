import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { seoPreview } from '../scripts/preview-seo.mjs'

const readBuilt = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8')
const schemas = (html) => JSON.parse(html.match(/type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || '[]')

test('built homepage contains the actual view and crawlable navigation', async () => {
    const html = await readBuilt('index.html')
    assert.match(html, /We share passion!/)
    assert.match(html, /small passionate group of car enthusiasts/)
    assert.match(html, /href="\/events"/)
    assert.match(html, /href="\/team"/)
    assert.match(html, /data-prerendered="\/"/)
    assert.doesNotMatch(html, /seo-prerender/)
    assert.equal((html.match(/<title>/g) || []).length, 1)
    assert.equal((html.match(/application\/ld\+json/g) || []).length, 1)
    assert.match(html, /<svg[^>]+data-icon="instagram"/)
})

test('built team and portfolio pages use the content and images from their Vue views', async () => {
    const team = await readBuilt('team/index.html')
    assert.match(team, /Julien Imhoff/)
    assert.match(team, /Ben Thillen/)
    const portfolio = await readBuilt('portfolio/index.html')
    assert.match(portfolio, /Book a free photoshoot/)
    assert.match(portfolio, /selected supercars and high-end sportscars/)
    assert.match(portfolio, /Lamborghini Huracan Performante/)
    assert.doesNotMatch(portfolio, /opacity:0/)
})

test('built event pages retain honest announcements, recaps and links to the archive', async () => {
    const announcement = await readBuilt('events/supercar-sunday-2027/index.html')
    assert.match(announcement, /Supercar Sunday #9 2027/)
    assert.equal(schemas(announcement).some(item => item['@type'] === 'Event'), false)
    const past = await readBuilt('events/supercar-sunday/index.html')
    assert.match(past, /Event recap/)
    assert.match(past, /href="\/events"/)
    assert.match(past, /Event photos/)
    assert.match(past, /data-prerendered="\/events\/supercar-sunday"/)
    assert.match(past, /<div id="modals"><!--teleport start anchor-->/)
    assert.doesNotMatch(past, /Register your car/)
    assert.equal(schemas(past).find(item => item['@type'] === 'Event').offers, undefined)
})

test('utility and error HTML is noindex and excluded from discovery files', async () => {
    const sitemap = await readBuilt('sitemap.xml')
    const llms = await readBuilt('llms.txt')
    for (const path of ['lens/camera', 'lens/details', '404']) {
        const html = await readBuilt(`${path}/index.html`)
        assert.match(html, /name="robots" content="noindex,follow"/)
        assert.equal(schemas(html).length, 0)
        assert.doesNotMatch(sitemap, new RegExp(`/${path}[<\\s]`))
        assert.doesNotMatch(llms, new RegExp(`/${path}[\\s]`))
    }
    const missing = await readBuilt('404/index.html')
    assert.match(missing, /Page not found/)
    assert.doesNotMatch(missing, /rel="canonical"/)
})

test('production preview serves the generated route HTML and real 404 responses', async () => {
    let middleware
    seoPreview().configurePreviewServer({
        config: { root: fileURLToPath(new URL('../', import.meta.url)), build: { outDir: 'dist' } },
        middlewares: { use: handler => { middleware = handler } }
    })
    for (const [url, status, expected] of [
        ['/events?source=test', 200, 'events-page'],
        ['/events/supercar-sunday', 200, 'Event recap'],
        ['/missing', 404, 'Page not found'],
        ['/old-page.php', 404, 'Page not found'],
        ['/events/missing.v2', 404, 'Page not found']
    ]) {
        const headers = {}
        const response = {
            setHeader: (key, value) => { headers[key] = value },
            end: body => { response.body = body }
        }
        await middleware({ method: 'GET', url }, response, error => { throw error || new Error('Unexpected fallback') })
        assert.equal(response.statusCode, status)
        assert.ok(response.body.includes(expected))
        assert.equal(headers['Content-Type'], 'text/html; charset=utf-8')
        if (status === 404) assert.equal(headers['X-Robots-Tag'], 'noindex, follow')
    }
})
