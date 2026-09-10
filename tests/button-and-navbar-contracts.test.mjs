import assert from 'node:assert/strict'
import test from 'node:test'
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createMemoryHistory, createRouter, RouterLink } from 'vue-router'
import { createServer } from 'vite'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFacebook, faInstagram, faTiktok)

const vite = await createServer({
  appType: 'custom',
  server: { middlewareMode: true, hmr: false }
})

const renderComponent = async (component, props = {}, slot = 'Book') => {
  const app = createSSRApp({
    render: () => h(component, props, { default: () => slot })
  })
  app.component('router-link', RouterLink)
  app.component('font-awesome-icon', FontAwesomeIcon)

  return renderToString(app)
}

test('fallback buttons are inert inside forms', async () => {
  const { default: Button } = await vite.ssrLoadModule('/src/components/Button.vue')
  const { default: ButtonFilled } = await vite.ssrLoadModule('/src/components/ButtonFilled.vue')

  for (const Component of [Button, ButtonFilled]) {
    const html = await renderComponent(Component)
    assert.match(html, /<button\b[^>]*\btype="button"/)
  }
})

test('button labels render an incoming character layer beneath the visible layer', async () => {
  const { default: Button } = await vite.ssrLoadModule('/src/components/Button.vue')
  const html = await renderComponent(Button, {}, 'Drive')

  assert.match(html, /btn__label-window/)
  assert.match(html, /btn__char-track/)
  assert.equal((html.match(/>D</g) ?? []).length, 2)
})

test('buttons use a vector arrow instead of a text glyph', async () => {
  const { default: Button } = await vite.ssrLoadModule('/src/components/Button.vue')
  const html = await renderComponent(Button)

  assert.doesNotMatch(html, />→</)
  assert.match(html, /<svg\b/)
})

test('desktop navigation marks a section route without marking Home', async () => {
  const { default: Navbar } = await vite.ssrLoadModule('/src/components/Navbar.vue')
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/team', component: { template: '<div />' } },
      { path: '/portfolio', component: { template: '<div />' } },
      { path: '/events/:slug?', component: { template: '<div />' } }
    ]
  })
  await router.push('/events/autumn-drive')
  await router.isReady()

  const app = createSSRApp({ render: () => h(Navbar, { navigationComplete: true }) })
  app.use(router)
  app.component('font-awesome-icon', FontAwesomeIcon)
  const html = await renderToString(app)

  assert.match(html, /href="\/events"[^>]*nav-link--current/)
  assert.doesNotMatch(html, /href="\/"[^>]*nav-link--current/)
})

test.after(async () => {
  await vite.close()
})
