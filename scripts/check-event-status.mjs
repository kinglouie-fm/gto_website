import assert from 'node:assert/strict'
import { getEventMeta, getEventStatus } from '../src/data/events.js'

const datedEvent = {
    startsAt: '2026-06-21T14:00:00+02:00',
    meta: '21.06.2026 · Mersch'
}

const undatedEvent = {
    startsAt: null,
    meta: 'Date to be announced · Luxembourg'
}

assert.equal(getEventStatus(datedEvent, new Date('2026-06-01T12:00:00+02:00')), 'upcoming')
assert.equal(getEventStatus(datedEvent, new Date('2026-07-12T12:00:00+02:00')), 'past')
assert.equal(getEventStatus(undatedEvent, new Date('2026-07-12T12:00:00+02:00')), 'to-be-announced')

assert.equal(getEventMeta(datedEvent, new Date('2026-06-01T12:00:00+02:00')), 'Upcoming event · 21.06.2026 · Mersch')
assert.equal(getEventMeta(datedEvent, new Date('2026-07-12T12:00:00+02:00')), 'Past event · 21.06.2026 · Mersch')
assert.equal(getEventMeta(undatedEvent, new Date('2026-07-12T12:00:00+02:00')), 'Date to be announced · Luxembourg')
