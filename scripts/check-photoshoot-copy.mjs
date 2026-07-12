import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'

const portfolio = readFileSync('src/views/PortfolioView.vue', 'utf8')
const seo = readFileSync('src/data/seo.js', 'utf8')

assert.match(portfolio, /Book a free photoshoot/, 'Portfolio heading should use photoshoot')
assert.match(
    portfolio,
    /selected supercars and high-end sportscars/,
    'Portfolio copy should limit free photoshoots to selected supercars and high-end sportscars'
)
assert.match(
    seo,
    /selected supercars and high-end sportscars/,
    'SEO copy should match the photoshoot eligibility wording'
)
