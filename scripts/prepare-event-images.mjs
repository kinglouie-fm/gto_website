import sharp from 'sharp'
import { createHash } from 'node:crypto'
import { access, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises'
import { basename, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif'])
const profiles = {
    thumb: { folder: 'thumbs', edge: 800, quality: 78, budget: 100 * 1024 },
    cover: { folder: 'covers', edge: 1600, quality: 80, budget: 250 * 1024 },
    full: { folder: 'full', edge: 2000, quality: 82, budget: 350 * 1024 }
}
const profileVersion = '2'

const exists = async (path) => {
    try { await access(path); return true } catch { return false }
}

const outputName = (file, buffer) => {
    const stem = basename(file, extname(file)).normalize('NFKD')
        .replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'photo'
    const hash = createHash('sha256').update(profileVersion).update(buffer).digest('hex').slice(0, 10)
    return `${stem}-${hash}.webp`
}

const convertVariant = async (buffer, path, profile) => {
    if (!(await exists(path))) {
        let encoded
        let edge = profile.edge
        while (!encoded || encoded.length > profile.budget) {
            for (let quality = profile.quality; ; quality = Math.max(63, quality - 5)) {
                encoded = await sharp(buffer, { failOn: 'none' }).rotate()
                    .resize({ width: edge, height: edge, fit: 'inside', withoutEnlargement: true })
                    .webp({ quality, effort: 5 }).toBuffer()
                if (encoded.length <= profile.budget || quality === 63) break
            }
            if (encoded.length > profile.budget) edge = Math.round(edge * 0.85)
        }
        await mkdir(resolve(path, '..'), { recursive: true })
        await writeFile(path, encoded)
    }
    const { width, height } = await sharp(path).metadata()
    return { width, height }
}

const removeObsoleteImages = async (previous, current, outputDir) => {
    for (const [folder, photos] of Object.entries(previous)) {
        if (basename(folder) !== folder || folder === '.' || folder === '..') continue
        const retained = new Set((current[folder] || []).map(photo => photo.asset))
        for (const photo of photos) {
            if (!/^[a-z0-9_-]+-[a-f0-9]{10}\.webp$/.test(photo.asset) || retained.has(photo.asset)) continue
            for (const profile of Object.values(profiles)) {
                await rm(join(outputDir, folder, profile.folder, photo.asset), { force: true })
            }
        }
    }
}

const convertPhoto = async (source, folder, outputDir) => {
    const buffer = await readFile(source)
    const fileName = outputName(source, buffer)
    const variants = {}
    for (const [name, profile] of Object.entries(profiles)) {
        const path = join(outputDir, folder, profile.folder, fileName)
        variants[name] = await convertVariant(buffer, path, profile)
    }
    return {
        file: basename(source),
        asset: fileName,
        thumbWidth: variants.thumb.width, thumbHeight: variants.thumb.height,
        coverWidth: variants.cover.width, coverHeight: variants.cover.height
    }
}

export const prepareEventImages = async ({
    sourceDir = join(projectRoot, 'image-sources/events'),
    outputDir = join(projectRoot, 'public/images/events'),
    manifestPath = join(projectRoot, 'src/data/event-images.json'),
    log = console.log
} = {}) => {
    const previous = await exists(manifestPath) ? JSON.parse(await readFile(manifestPath, 'utf8')) : {}
    const folders = (await readdir(sourceDir, { withFileTypes: true }))
        .filter(entry => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))
    const manifest = {}
    for (const folder of folders) {
        const entries = await readdir(join(sourceDir, folder.name), { withFileTypes: true })
        const photos = entries.filter(entry => entry.isFile() && supportedExtensions.has(extname(entry.name).toLowerCase()))
            .map(entry => entry.name).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
        manifest[folder.name] = []
        for (const file of photos) {
            try {
                manifest[folder.name].push(await convertPhoto(join(sourceDir, folder.name, file), folder.name, outputDir))
            } catch (error) {
                throw new Error(`Could not convert ${folder.name}/${file}: ${error.message}`, { cause: error })
            }
        }
        log(`${folder.name}: ${photos.length} photos${photos.length ? '' : ' (placeholder)'}`)
    }
    await mkdir(resolve(manifestPath, '..'), { recursive: true })
    const temporaryPath = `${manifestPath}.tmp`
    await writeFile(temporaryPath, JSON.stringify(manifest, null, 2) + '\n')
    await rename(temporaryPath, manifestPath)
    await removeObsoleteImages(previous, manifest, outputDir)
    return manifest
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        const manifest = await prepareEventImages()
        console.log(`Prepared ${Object.values(manifest).flat().length} photos. Originals are unchanged.`)
    } catch (error) {
        console.error(error.message)
        process.exitCode = 1
    }
}
