import assert from 'node:assert/strict'
import test from 'node:test'
import { events } from '../src/data/events.js'
import { seoRoutes } from '../src/data/seo.js'

test('every minimal event entry gets a generated detail route', () => {
    for (const event of events) {
        const seo = seoRoutes[`/events/${event.slug}`]
        assert.ok(seo)
        if (event.year) assert.ok(seo.title.includes(String(event.year)))
        assert.equal(seo.description, event.shortDescription)
    }
})

test('past editions do not publish open-registration offers or fabricated dates', () => {
    const past = seoRoutes['/events/supercar-sunday'].jsonLd.find(item => item['@type'] === 'Event')
    assert.equal(past.endDate, '2026-06-21T17:00:00+02:00')
    assert.equal(past.offers, undefined)
    assert.equal(seoRoutes['/events/gto-goes-luxembourg-2024'].jsonLd.some(item => item['@type'] === 'Event'), false)
    assert.equal(seoRoutes['/events'].title, 'Events | GTO Luxembourg')
})

test('gallery-only entries use their first photo in social previews and structured data', async () => {
    const src = '/images/events/test-cover.webp'
    events.push({ slug: 'gallery-only-test', title: 'Gallery test', startsAt: '2099-06-21',
        shortDescription: 'Test fixture.', gallery: [{ src, alt: 'Fixture image' }] })
    try {
        const { seoRoutes: fixtureRoutes } = await import('../src/data/seo.js?gallery-only-test')
        const seo = fixtureRoutes['/events/gallery-only-test']
        assert.equal(seo.image, src)
        assert.deepEqual(seo.jsonLd.find(item => item['@type'] === 'Event').image,
            ['https://gto-luxembourg.lu/images/events/test-cover.webp'])
    } finally { events.pop() }
})
