import assert from 'node:assert/strict'
import { getEventMeta, getEventStatus } from '../src/utils/events.js'

const datedEvent = {
    startsAt: '2026-06-21T14:00:00+02:00',
    date: '21.06.2026', location: 'Mersch'
}

const undatedEvent = {
    startsAt: null,
    location: 'Luxembourg'
}

assert.equal(getEventStatus(datedEvent, new Date('2026-06-01T12:00:00+02:00')), 'upcoming')
assert.equal(getEventStatus(datedEvent, new Date('2026-07-12T12:00:00+02:00')), 'past')
assert.equal(getEventStatus(undatedEvent, new Date('2026-07-12T12:00:00+02:00')), 'to-be-announced')

assert.equal(getEventMeta(datedEvent), '21.06.2026 · Mersch')
assert.equal(getEventMeta(undatedEvent), 'Date to be announced · Luxembourg')
