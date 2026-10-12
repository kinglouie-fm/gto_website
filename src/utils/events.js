const luxembourgDay = (date) => new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Luxembourg', year: 'numeric', month: '2-digit', day: '2-digit'
}).format(date)

export const getEventStatus = (event, now = new Date()) => {
    if (event.status === 'past') return 'past'
    if (!event.startsAt || Number.isNaN(Date.parse(event.startsAt))) return 'to-be-announced'

    const boundary = event.endsAt || event.startsAt
    if (/^\d{4}-\d{2}-\d{2}$/.test(boundary)) {
        return boundary < luxembourgDay(now) ? 'past' : 'upcoming'
    }
    return new Date(boundary).getTime() > now.getTime() ? 'upcoming' : 'past'
}

export const getEventTitle = (event) => [event.title, event.year].filter(Boolean).join(' ')
export const getEventImageSrc = (event) => event.imageSrc || event.gallery?.[0]?.src

export const getEventMeta = (event) => {
    const startDate = event.startsAt && !Number.isNaN(Date.parse(event.startsAt))
        ? new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Luxembourg', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(event.startsAt))
        : null
    const undatedLabel = event.status === 'past' ? event.year : [event.year, 'Date to be announced'].filter(Boolean).join(' · ')
    const date = event.date || startDate || undatedLabel
    return [date, event.locationLabel || event.location].filter(Boolean).join(' · ')
}

const eventSortTime = (event) => Date.parse(event.startsAt) || 0
const eventYear = (event) => event.year || (event.startsAt ? new Date(event.startsAt).getFullYear() : 0)
const comparePastEvents = (a, b) => eventYear(b) - eventYear(a)
    || (b.orderInYear || 0) - (a.orderInYear || 0)
    || eventSortTime(b) - eventSortTime(a)

export const getEventGroups = (events, now = new Date()) => {
    const groups = { upcoming: [], announced: [], past: [] }
    for (const event of events) {
        const status = getEventStatus(event, now)
        groups[status === 'to-be-announced' ? 'announced' : status].push(event)
    }
    groups.upcoming.sort((a, b) => eventSortTime(a) - eventSortTime(b))
    groups.past.sort(comparePastEvents)
    return groups
}
