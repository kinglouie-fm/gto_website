export const attachEventImages = (event, manifest) => {
    if (!event.imageFolder) return event

    const imageRoot = `/images/events/${encodeURIComponent(event.imageFolder)}`
    const photos = (manifest[event.imageFolder] || []).map(photo => ({
        ...photo,
        src: `${imageRoot}/full/${photo.asset}`,
        thumb: `${imageRoot}/thumbs/${photo.asset}`,
        cover: `${imageRoot}/covers/${photo.asset}`
    }))
    const byFile = new Map(photos.map(photo => [photo.file, photo]))
    const order = [...new Set(event.photoOrder || [])]
    const ordered = [
        ...order.map(file => byFile.get(file)).filter(Boolean),
        ...photos.filter(photo => !order.includes(photo.file))
    ]
    const title = [event.title, event.year].filter(Boolean).join(' ')
    const gallery = ordered.map((photo, index) => ({
        ...photo,
        alt: event.photoCaptions?.[photo.file] || `${title}, event photograph ${index + 1}`
    }))
    const cover = gallery.find(photo => photo.file === event.coverPhoto) || gallery[0]
    return {
        ...event,
        gallery,
        imageSrc: cover?.cover,
        imageThumbSrc: cover?.thumb,
        imageWidth: cover?.coverWidth,
        imageHeight: cover?.coverHeight,
        imageThumbWidth: cover?.thumbWidth,
        imageAlt: cover?.alt
    }
}
