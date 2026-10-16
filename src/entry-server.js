import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory } from 'vue-router'
import { createSiteApp } from './app.js'

export const renderPage = async (path) => {
    const { app, router } = createSiteApp({ history: createMemoryHistory(), hydrate: true })
    await router.push(path)
    await router.isReady()
    const context = {}
    const html = await renderToString(app, context)
    return { html, modals: context.teleports?.['#modals'] || '' }
}
