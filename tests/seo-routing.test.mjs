import assert from 'node:assert/strict'
import test from 'node:test'
import { getSeoForPath, seoRoutes } from '../src/data/seo.js'

test('Lens utility pages have their own metadata and are excluded from indexing', () => {
    for (const path of ['/lens/camera', '/lens/details']) {
        const seo = getSeoForPath(path)
        assert.equal(seo.robots, 'noindex,follow')
        assert.notEqual(seo.title, seoRoutes['/'].title)
        assert.deepEqual(seo.jsonLd, [])
    }
})

test('missing pages and unknown event slugs never inherit homepage SEO', () => {
    for (const path of ['/does-not-exist', '/events/does-not-exist', '/404']) {
        const seo = getSeoForPath(path)
        assert.equal(seo.status, 404)
        assert.equal(seo.robots, 'noindex,follow')
        assert.deepEqual(seo.jsonLd, [])
    }
})

test('trailing slashes and query strings resolve to the same SEO entry', () => {
    assert.equal(getSeoForPath('/team/?source=test#people'), seoRoutes['/team'])
})
