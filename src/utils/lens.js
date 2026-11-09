export async function readLensFile(file) {
    const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file)
    })
    const image = new Image()
    image.src = dataUrl
    await image.decode()
    return image
}

// Keep the same half-resolution JPEG input for both capture and library photos.
function drawPhoto(image, width, height) {
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.floor(width))
    canvas.height = Math.max(1, Math.floor(height))
    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
    return canvas
}

export function lensPreview(image) {
    const width = image.naturalWidth || image.videoWidth
    const height = image.naturalHeight || image.videoHeight
    const scale = Math.min(1, 1200 / Math.max(width, height))
    return drawPhoto(image, width * scale, height * scale).toDataURL('image/jpeg', 0.86)
}

export async function prepareLensPhoto(image) {
    const width = image.naturalWidth || image.videoWidth
    const height = image.naturalHeight || image.videoHeight
    if (!width || !height) throw new Error('The photo is not ready yet.')
    const thumbnail = drawPhoto(image, width * 0.5, height * 0.5)
    // Draw both canvases before yielding so a webcam produces the same frame in each.
    const preview = lensPreview(image)
    const blob = await new Promise(resolve => thumbnail.toBlob(resolve, 'image/jpeg', 0.8))
    if (!blob) throw new Error('Could not read this photo. Please choose another.')
    return { blob, preview }
}

export async function analyzeLensPhoto(blob) {
    const form = new FormData()
    form.append('image', blob, 'snapshot.jpg')

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000)

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            body: form,
            signal: controller.signal
        })

        if (!response.ok) {
            const err = await response.json().catch(() => ({}))
            switch (err.code) {
                case 'NO_CAR_DETECTED':
                    throw new Error('No car detected. Please take a full shot of the vehicle.')
            }

            if (response.status === 400) {
                throw new Error('Please upload a valid image.')
            }

            if (response.status === 413) {
                throw new Error('Image too large (max 5 MB).')
            }

            throw new Error(err.error || 'Server error.')
        }

        return await response.json()
    } finally {
        clearTimeout(timeout)
    }
}

let latestResult = null

export function saveLensResult(photo, details, review = {}) {
    latestResult = { photo, details, review }
    try {
        // Release older photos before saving the new scan against the tab's storage quota.
        sessionStorage.removeItem('capturedImage')
        sessionStorage.removeItem('capturedDetails')
        sessionStorage.removeItem('lensResult')
        sessionStorage.setItem('lensResult', JSON.stringify(latestResult))
    } catch {
        // The current scan still works when browser storage is full or disabled.
    }
}

export function getLensResult() {
    if (latestResult) return latestResult
    try {
        return JSON.parse(sessionStorage.getItem('lensResult')) || {
            photo: sessionStorage.getItem('capturedImage'),
            details: JSON.parse(sessionStorage.getItem('capturedDetails'))
        }
    } catch {
        return null
    }
}
