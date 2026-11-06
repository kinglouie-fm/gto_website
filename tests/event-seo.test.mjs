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
        location: '33, rue de la Gare, L-7535 Mersch',
        shortDescription: 'Test fixture.', gallery: [{ src, alt: 'Fixture image' }] })
    try {
        const { seoRoutes: fixtureRoutes } = await import('../src/data/seo.js?gallery-only-test')
        const seo = fixtureRoutes['/events/gallery-only-test']
        assert.equal(seo.image, src)
        assert.deepEqual(seo.jsonLd.find(item => item['@type'] === 'Event').image,
            ['https://gto-luxembourg.lu/images/events/test-cover.webp'])
    } finally { events.pop() }
})

test('only individual pages with confirmed dates and locations publish Event markup', () => {
    assert.equal(seoRoutes['/events'].jsonLd.some(item => item['@type'] === 'Event'), false)
    const missingVenue = seoRoutes['/events/supercar-sunday-2018-july']
    assert.equal(missingVenue.jsonLd.some(item => item['@type'] === 'Event'), false)
    assert.ok(missingVenue.jsonLd.some(item => item['@type'] === 'BreadcrumbList'))
    for (const [path, seo] of Object.entries(seoRoutes)) {
        const schema = seo.jsonLd.find(item => item['@type'] === 'Event')
        if (!schema) continue
        assert.ok(path.startsWith('/events/'))
        assert.ok(schema.name)
        assert.ok(!Number.isNaN(Date.parse(schema.startDate)))
        assert.equal(schema.location['@type'], 'Place')
        assert.equal(schema.location.address['@type'], 'PostalAddress')
        assert.ok(schema.location.address.addressLocality || schema.location.address.name)
        assert.equal(schema.organizer.name, 'GTO Luxembourg')
        assert.equal(schema.organizer.url, 'https://gto-luxembourg.lu')
    }
})

test('known venue details are structured without inventing historical optional fields', () => {
    const schema = seoRoutes['/events/supercar-sunday'].jsonLd.find(item => item['@type'] === 'Event')
    assert.deepEqual(schema.location.address, {
        '@type': 'PostalAddress', streetAddress: '33, rue de la Gare', postalCode: 'L-7535',
        addressLocality: 'Mersch', addressCountry: 'LU'
    })
    assert.ok(schema.image[0].includes('/supercar-sunday-2026/'))
    assert.equal(schema.performer, undefined)
    const older = seoRoutes['/events/supercar-sunday-2019-july'].jsonLd.find(item => item['@type'] === 'Event')
    assert.equal(older.location.address.addressLocality, 'Nommern')
    assert.equal(older.location.address.streetAddress, undefined)
    assert.equal(older.endDate, undefined)
    assert.equal(older.image, undefined)
    assert.equal(older.offers, undefined)
})

test('private, undated and incomplete events stay indexable without invalid Event markup', async () => {
    const fixtures = [
        { slug: 'private-fixture', startsAt: '2099-06-21', location: 'Confirmed venue', isPublic: false },
        { slug: 'undated-fixture', location: 'Confirmed venue' },
        { slug: 'invalid-date-fixture', startsAt: 'not-a-date', location: 'Confirmed venue' },
        { slug: 'year-only-fixture', startsAt: '2099', location: 'Confirmed venue' },
        { slug: 'blank-venue-fixture', startsAt: '2099-06-21', location: '   ' }
    ]
    events.push(...fixtures.map(event => ({ title: 'Fixture event', ...event })))
    try {
        const { seoRoutes: fixtureRoutes } = await import('../src/data/seo.js?incomplete-events')
        for (const event of fixtures) {
            const seo = fixtureRoutes[`/events/${event.slug}`]
            assert.ok(seo)
            assert.equal(seo.robots, undefined)
            assert.equal(seo.jsonLd.some(item => item['@type'] === 'Event'), false)
            assert.ok(seo.jsonLd.some(item => item['@type'] === 'BreadcrumbList'))
        }
    } finally { events.splice(-fixtures.length) }
})
