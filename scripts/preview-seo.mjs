import { readFile, stat } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'
import { getSeoForPath, normalizePath } from '../src/data/seo.js'

export const seoPreview = () => ({
    name: 'gto-seo-preview',
    configurePreviewServer(server) {
        const dist = resolve(server.config.root, server.config.build.outDir)
        server.middlewares.use(async (request, response, next) => {
            if (!['GET', 'HEAD'].includes(request.method)) return next()
            let path
            try {
                path = normalizePath(decodeURIComponent(request.url.split('?')[0]))
            } catch {
                return next()
            }
            // Only existing assets bypass page handling; missing dotted URLs are 404s too.
            if (extname(path) && extname(path) !== '.html') {
                const asset = resolve(dist, `.${path}`)
                const insideDist = asset.startsWith(`${dist}${sep}`)
                if (insideDist && await stat(asset).then(file => file.isFile()).catch(() => false)) return next()
            }
            const seo = getSeoForPath(path)
            const route = seo.status === 404 ? '/404' : path
            try {
                const html = await readFile(resolve(dist, `.${route}/index.html`), 'utf8')
                response.statusCode = seo.status || 200
                response.setHeader('Content-Type', 'text/html; charset=utf-8')
                response.setHeader('Cache-Control', 'no-cache')
                if (seo.status === 404) response.setHeader('X-Robots-Tag', 'noindex, follow')
                response.end(request.method === 'HEAD' ? undefined : html)
            } catch (error) {
                next(error)
            }
        })
    }
})
