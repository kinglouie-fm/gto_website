import assert from 'node:assert/strict'
import test from 'node:test'
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createServer } from 'vite'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const vite = await createServer({ appType: 'custom', server: { middlewareMode: true, hmr: false, ws: false } })
const render = async (path, componentPath) => {
    const { default: Component } = await vite.ssrLoadModule(componentPath)
    const router = createRouter({ history: createMemoryHistory(), routes: [
        { path: '/events', component: Component }, { path: '/events/:slug', component: Component }
    ] })
    await router.push(path)
    const app = createSSRApp({ render: () => h(Component) })
    app.use(router)
    app.component('font-awesome-icon', FontAwesomeIcon)
    return renderToString(app)
}

test('completed editions appear in the archive and the upcoming section has an honest empty state', async () => {
    const { events } = await vite.ssrLoadModule('/src/data/events.js')
    const original = events.slice()
    events.splice(0, events.length, { slug: 'past-fixture', title: 'Past drive', status: 'past', year: 2024 })
    try {
        const html = await render('/events', '/src/views/EventsView.vue')
        assert.match(html, /Past events/)
        assert.match(html, /Our next events will be announced here/)
        assert.equal((html.match(/class="past-event"/g) || []).length, 1)
        assert.doesNotMatch(html, /class="upcoming-event[ "]/)
    } finally { events.splice(0, events.length, ...original) }
})

test('a future entry added only to the data file becomes the featured event', async () => {
    const { events } = await vite.ssrLoadModule('/src/data/events.js')
    events.push({ slug: 'test-future', title: 'Test future event', startsAt: '2099-06-21', shortDescription: 'A test fixture.' })
    try {
        const html = await render('/events', '/src/views/EventsView.vue')
        assert.match(html, /upcoming-event--featured/)
        assert.match(html, /href="\/events\/test-future"/)
        assert.doesNotMatch(html, /Our next events will be announced here/)
    } finally { events.pop() }
})

test('past detail pages show a recap and placeholder without participation controls', async () => {
    const html = await render('/events/supercar-sunday-2019-july', '/src/views/EventDetailView.vue')
    assert.match(html, /Event recap/)
    assert.match(html, /Photo placeholder/)
    assert.doesNotMatch(html, /<iframe|Meeting point|FAQ|Get in touch|Countdown|Register/)
})

test('an edition with photos provides a gallery with meaningful accessible labels', async () => {
    const html = await render('/events/supercar-sunday-2025', '/src/views/EventDetailView.vue')
    assert.match(html, /Event photos/)
    const { events } = await vite.ssrLoadModule('/src/data/events.js')
    assert.equal((html.match(/class="event-gallery__photo event-photo"/g) || []).length,
        events.find(event => event.slug === 'supercar-sunday-2025').gallery.length)
    assert.match(html, /alt="A white Ford GT at Supercar Sunday"/)
    assert.match(html, /\/thumbs\//)
    assert.doesNotMatch(html, /\/full\//)
})

test('a minimal future detail entry supports optional participation fields', async () => {
    const { events } = await vite.ssrLoadModule('/src/data/events.js')
    events.push({ slug: 'future-detail', title: 'Future test event', startsAt: '2099-06-21',
        shortDescription: 'Fixture description.', location: 'Fixture location', mapQuery: 'Fixture location',
        registration: { url: 'https://example.com/register', label: 'Register your car' } })
    try {
        const html = await render('/events/future-detail', '/src/views/EventDetailView.vue')
        assert.match(html, /Fixture description/)
        assert.match(html, /Meeting point/)
        assert.match(html, /href="https:\/\/example.com\/register"/)
        assert.doesNotMatch(html, /<iframe|>FAQ</)
    } finally { events.pop() }
})

test('the current catalog features the undated 2027 announcement and paginates the archive', async () => {
    const html = await render('/events', '/src/views/EventsView.vue')
    assert.match(html, /Supercar Sunday #9 2027/)
    assert.match(html, /2027 · Date to be announced/)
    assert.doesNotMatch(html, /Exceptional cars\. Shared moments/)
    assert.equal((html.match(/class="past-event"/g) || []).length, 6)
    assert.match(html, /Show more events/)
})

test.after(() => vite.close())
