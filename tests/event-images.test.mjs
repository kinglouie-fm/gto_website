import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import sharp from 'sharp'
import { prepareEventImages } from '../scripts/prepare-event-images.mjs'
import { attachEventImages } from '../src/utils/event-images.js'

test('conversion preserves originals, rotates EXIF images, and creates bounded WebP sizes', async () => {
    const root = await mkdtemp(join(tmpdir(), 'gto-photo-test-'))
    try {
        const sourceDir = join(root, 'sources')
        const outputDir = join(root, 'public')
        await mkdir(join(sourceDir, 'edition'), { recursive: true })
        await mkdir(join(sourceDir, 'empty'), { recursive: true })
        const original = await sharp({ create: { width: 2400, height: 1200, channels: 3, background: '#405060' } })
            .jpeg().withMetadata({ orientation: 6 }).toBuffer()
        const path = join(sourceDir, 'edition', 'Photo.JPG')
        await writeFile(path, original)
        const manifest = await prepareEventImages({ sourceDir, outputDir, manifestPath: join(root, 'manifest.json'), log: () => {} })
        assert.deepEqual(await readFile(path), original)
        assert.deepEqual(manifest.empty, [])
        const photo = manifest.edition[0]
        const full = await sharp(join(outputDir, 'edition', 'full', photo.asset)).metadata()
        assert.ok(full.width < full.height)
        assert.equal(Math.max(full.width, full.height), 2000)
        assert.equal(Math.max(photo.thumbWidth, photo.thumbHeight), 800)
        assert.equal(Math.max(photo.coverWidth, photo.coverHeight), 1600)
        for (const variant of ['full', 'thumbs', 'covers']) {
            const metadata = await sharp(join(outputDir, 'edition', variant, photo.asset)).metadata()
            assert.equal(metadata.format, 'webp')
            assert.equal(metadata.exif, undefined)
        }
        const again = await prepareEventImages({ sourceDir, outputDir, manifestPath: join(root, 'manifest.json'), log: () => {} })
        assert.deepEqual(again, manifest)
        assert.equal((await readdir(join(outputDir, 'edition', 'thumbs'))).length, 1)
        await writeFile(path, await sharp({ create: { width: 30, height: 20, channels: 3, background: 'red' } }).jpeg().toBuffer())
        const changed = await prepareEventImages({ sourceDir, outputDir, manifestPath: join(root, 'manifest.json'), log: () => {} })
        assert.notEqual(changed.edition[0].asset, photo.asset)
        const resized = await sharp(join(outputDir, 'edition', 'full', changed.edition[0].asset)).metadata()
        assert.equal(resized.width, 30)
        assert.equal((await readdir(join(outputDir, 'edition', 'full'))).length, 1)
    } finally { await rm(root, { recursive: true, force: true }) }
})

test('an empty source folder yields a placeholder without borrowing another edition’s photos', () => {
    const result = attachEventImages({ imageFolder: 'empty', title: 'Past event', year: 2025 }, { empty: [] })
    assert.deepEqual(result.gallery, [])
    assert.equal(result.imageSrc, undefined)
})

test('cover choice, ordering, and captions come from the editable event record', () => {
    const photos = [
        { file: 'a.jpg', asset: 'a.webp' },
        { file: 'b.jpg', asset: 'b.webp' }
    ]
    const result = attachEventImages({ imageFolder: 'edition', title: 'Sunday', year: 2025,
        coverPhoto: 'b.jpg', photoOrder: ['b.jpg'], photoCaptions: { 'b.jpg': 'A convoy on the road' } }, { edition: photos })
    assert.equal(result.imageSrc, '/images/events/edition/covers/b.webp')
    assert.equal(result.imageThumbSrc, '/images/events/edition/thumbs/b.webp')
    assert.deepEqual(result.gallery.map(photo => photo.file), ['b.jpg', 'a.jpg'])
    assert.equal(result.gallery[0].alt, 'A convoy on the road')
    assert.equal(result.imageAlt, 'A convoy on the road')
})

test('folder names containing spaces and punctuation remain valid image URLs', () => {
    const folder = 'Supercar Sunday #9'
    const event = attachEventImages({ imageFolder: folder, title: 'Sunday' }, {
        [folder]: [{ file: 'photo.jpg', asset: 'photo-aabbccddee.webp' }]
    })
    const url = new URL(event.gallery[0].src, 'https://gto-luxembourg.lu')
    assert.equal(url.hash, '')
    assert.equal(url.pathname, '/images/events/Supercar%20Sunday%20%239/full/photo-aabbccddee.webp')
})
