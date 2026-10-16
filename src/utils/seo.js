import { getSeoForPath, normalizePath, site, toAbsoluteAsset, toCanonical } from '../data/seo.js'

export const serializeJsonLd = (value) => JSON.stringify(value).replaceAll('<', '\\u003c')

export const getHeadMetadata = (path) => {
    const seo = getSeoForPath(path)
    const canonical = seo.status === 404 ? null : toCanonical(normalizePath(path))
    const image = toAbsoluteAsset(seo.image || site.image)

    return {
        title: seo.title,
        canonical,
        jsonLd: seo.jsonLd || [],
        meta: [
            { name: 'description', content: seo.description },
            { name: 'robots', content: seo.robots || 'index,follow' },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: site.name },
            { property: 'og:title', content: seo.title },
            { property: 'og:description', content: seo.description },
            ...(canonical ? [{ property: 'og:url', content: canonical }] : []),
            { property: 'og:image', content: image },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: seo.title },
            { name: 'twitter:description', content: seo.description },
            { name: 'twitter:image', content: image }
        ]
    }
}

export const updateSeoHead = (path, document) => {
    const metadata = getHeadMetadata(path)
    document.title = metadata.title

    for (const attributes of metadata.meta) {
        const key = attributes.name ? 'name' : 'property'
        const selector = `meta[${key}="${attributes[key]}"]`
        const element = document.head.querySelector(selector) || document.createElement('meta')
        for (const [attribute, value] of Object.entries(attributes)) element.setAttribute(attribute, value)
        if (!element.parentNode) document.head.appendChild(element)
    }

    const canonicals = [...document.head.querySelectorAll('link[rel="canonical"]')]
    if (metadata.canonical) {
        const canonical = canonicals.shift() || document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        canonical.setAttribute('href', metadata.canonical)
        if (!canonical.parentNode) document.head.appendChild(canonical)
    } else {
        document.head.querySelector('meta[property="og:url"]')?.remove()
    }
    canonicals.forEach(element => element.remove())

    const scripts = [...document.head.querySelectorAll('script[type="application/ld+json"]')]
    if (metadata.jsonLd.length) {
        const script = scripts.shift() || document.createElement('script')
        script.setAttribute('id', 'page-structured-data')
        script.setAttribute('type', 'application/ld+json')
        const nonce = document.querySelector('script[nonce]')?.nonce
        if (nonce) script.setAttribute('nonce', nonce)
        script.textContent = serializeJsonLd(metadata.jsonLd)
        if (!script.parentNode) document.head.appendChild(script)
    }
    scripts.forEach(element => element.remove())
}
