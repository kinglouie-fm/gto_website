import assert from 'node:assert/strict'
import test from 'node:test'
import { getHeadMetadata, serializeJsonLd, updateSeoHead } from '../src/utils/seo.js'

// A small DOM fixture keeps the head lifecycle tests independent of a browser package.
const createDocument = () => {
    const elements = []
    const querySelectorAll = (selector) => {
        const [, tag, attribute, value] = selector.match(/^(\w+)\[(\w+)(?:="([^"]+)")?\]$/)
        return elements.filter(element => element.tag === tag && element.attributes.has(attribute)
            && (value === undefined || element.attributes.get(attribute) === value))
    }
    const head = {
        querySelectorAll,
        querySelector: selector => querySelectorAll(selector)[0] || null,
        appendChild: element => { elements.push(element); element.parentNode = head }
    }
    return {
        title: '',
        head,
        querySelector: head.querySelector,
        createElement: tag => ({
            tag,
            attributes: new Map(),
            textContent: '',
            setAttribute(key, value) { this.attributes.set(key, value) },
            get nonce() { return this.attributes.get('nonce') },
            remove() { elements.splice(elements.indexOf(this), 1); this.parentNode = null }
        })
    }
}

test('navigation replaces JSON-LD with the destination page data without duplicates', () => {
    const document = createDocument()
    const nonceScript = document.createElement('script')
    nonceScript.setAttribute('nonce', 'fixture-csp-nonce')
    document.head.appendChild(nonceScript)

    for (const path of ['/', '/events/supercar-sunday', '/events/supercar-sunday-2025', '/']) {
        updateSeoHead(path, document)
        updateSeoHead(path, document)
        const scripts = document.head.querySelectorAll('script[type="application/ld+json"]')
        assert.equal(scripts.length, 1)
        assert.equal(scripts[0].nonce, 'fixture-csp-nonce')
        assert.deepEqual(JSON.parse(scripts[0].textContent),
            JSON.parse(JSON.stringify(getHeadMetadata(path).jsonLd)))
        assert.equal(document.title, getHeadMetadata(path).title)
    }
})

test('utility and missing pages clear stale schemas, canonical URLs and indexing settings', () => {
    const document = createDocument()
    updateSeoHead('/events/supercar-sunday', document)
    updateSeoHead('/lens/details', document)
    assert.equal(document.head.querySelectorAll('script[type="application/ld+json"]').length, 0)
    assert.equal(document.head.querySelector('meta[name="robots"]').attributes.get('content'), 'noindex,follow')
    updateSeoHead('/missing', document)
    assert.equal(document.head.querySelectorAll('link[rel="canonical"]').length, 0)
    assert.equal(document.head.querySelector('meta[property="og:url"]'), null)
    updateSeoHead('/', document)
    assert.equal(document.head.querySelector('meta[name="robots"]').attributes.get('content'), 'index,follow')
    assert.equal(document.head.querySelectorAll('link[rel="canonical"]').length, 1)
    assert.equal(document.head.querySelectorAll('script[type="application/ld+json"]').length, 1)
})

test('duplicate initial JSON-LD scripts are consolidated when navigation occurs', () => {
    const document = createDocument()
    for (let index = 0; index < 2; index++) {
        const script = document.createElement('script')
        script.setAttribute('type', 'application/ld+json')
        script.textContent = '[{"name":"stale"}]'
        document.head.appendChild(script)
    }
    updateSeoHead('/team', document)
    assert.equal(document.head.querySelectorAll('script[type="application/ld+json"]').length, 1)
})

test('JSON-LD serialization safely preserves text containing HTML delimiters', () => {
    const value = [{ description: '</script><script>alert("fixture")</script>' }]
    const serialized = serializeJsonLd(value)
    assert.equal(serialized.includes('<'), false)
    assert.deepEqual(JSON.parse(serialized), value)
})
