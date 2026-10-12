import assert from 'node:assert/strict'
import test from 'node:test'
import { getEventStatus, getEventGroups, getEventMeta, getEventTitle, getEventImageSrc } from '../src/utils/events.js'

const now = new Date('2026-10-12T12:00:00+02:00')

test('an event stays upcoming until its supplied end time', () => {
    const event = { startsAt: '2026-10-12T10:00:00+02:00', endsAt: '2026-10-12T14:00:00+02:00' }
    assert.equal(getEventStatus(event, now), 'upcoming')
    assert.equal(getEventStatus(event, new Date(event.endsAt)), 'past')
})

test('date-only events remain upcoming throughout their Luxembourg calendar day', () => {
    const event = { startsAt: '2026-10-12' }
    assert.equal(getEventStatus(event, new Date('2026-10-12T22:30:00+02:00')), 'upcoming')
    assert.equal(getEventStatus(event, new Date('2026-10-13T00:01:00+02:00')), 'past')
})

test('historical editions need no invented full date; undated announcements stay separate', () => {
    assert.equal(getEventStatus({ status: 'past', year: 2024 }, now), 'past')
    assert.equal(getEventStatus({}, now), 'to-be-announced')
    assert.equal(getEventStatus({ startsAt: 'invalid' }, now), 'to-be-announced')
})

test('events are grouped and sorted without depending on file order or mutating it', () => {
    const events = [
        { slug: 'old', status: 'past', year: 2018 },
        { slug: 'later', startsAt: '2027-08-20' },
        { slug: 'announced' },
        { slug: 'recent', startsAt: '2026-09-13' },
        { slug: 'next', startsAt: '2027-06-20' }
    ]
    const original = events.slice()
    const groups = getEventGroups(events, now)
    assert.deepEqual(groups.upcoming.map(event => event.slug), ['next', 'later'])
    assert.deepEqual(groups.announced.map(event => event.slug), ['announced'])
    assert.deepEqual(groups.past.map(event => event.slug), ['recent', 'old'])
    assert.deepEqual(events, original)
})

test('a minimal entry supplies display metadata without redundant fields', () => {
    assert.equal(getEventTitle({ title: 'Supercar Sunday', year: 2024 }), 'Supercar Sunday 2024')
    assert.equal(getEventMeta({ status: 'past', year: 2024, location: 'Mersch' }, now), '2024 · Mersch')
    assert.equal(getEventMeta({ location: 'Luxembourg' }, now), 'Date to be announced · Luxembourg')
    assert.equal(getEventMeta({ year: 2027, location: 'Luxembourg' }), '2027 · Date to be announced · Luxembourg')
    assert.equal(getEventMeta({ startsAt: '2027-06-20', location: 'Mersch' }), '20 June 2027 · Mersch')
    assert.equal(getEventMeta({ startsAt: '2027-06-20T23:00:00Z', location: 'Mersch' }), '21 June 2027 · Mersch')
})

test('a gallery photo serves as the cover unless an explicit cover is supplied', () => {
    const gallery = [{ src: '/images/events/first.webp', alt: 'First photograph' }]
    assert.equal(getEventImageSrc({ gallery }), gallery[0].src)
    assert.equal(getEventImageSrc({ imageSrc: '/images/events/cover.webp', gallery }), '/images/events/cover.webp')
    assert.equal(getEventImageSrc({ gallery: [] }), undefined)
})

test('year-only tours sort after the same-year gathering without fabricated dates', () => {
    const catalog = [
        { slug: 'scs-2025', startsAt: '2025-06-29', year: 2025 },
        { slug: 'tour-2024', status: 'past', year: 2024, orderInYear: 1 },
        { slug: 'scs-2024', startsAt: '2024-06-16', year: 2024 },
        { slug: 'tour-2025', status: 'past', year: 2025, orderInYear: 1 },
        { slug: 'spring-2019', startsAt: '2019-04-28', year: 2019 },
        { slug: 'summer-2019', startsAt: '2019-07-21', year: 2019 }
    ]
    assert.deepEqual(getEventGroups(catalog, now).past.map(event => event.slug),
        ['tour-2025', 'scs-2025', 'tour-2024', 'scs-2024', 'summer-2019', 'spring-2019'])
})
