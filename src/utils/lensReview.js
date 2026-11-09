export function hasWebClues(evidence) {
    return Boolean(evidence?.labels?.length || evidence?.matching_page_titles?.length)
}

function appendPhoto(form, name, preview) {
    const [header, encoded] = preview.split(',')
    if (header !== 'data:image/jpeg;base64' || !encoded) {
        throw new Error('Please start a new scan to review this photo.')
    }
    const bytes = Uint8Array.from(atob(encoded), char => char.charCodeAt(0))
    form.append(name, new Blob([bytes], { type: 'image/jpeg' }), name + '.jpg')
}

async function postReview(path, form, signal) {
    const response = await fetch('/api/lens/' + path, { method: 'POST', body: form, signal })
    if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || 'The check could not finish. Please try again.')
    }
    return response.json()
}

export function googleCheck(photo, signal) {
    const form = new FormData()
    appendPhoto(form, 'image', photo)
    return postReview('web-check', form, signal)
}

export function reviewMatch(photo, rear, candidate, evidence, signal) {
    const form = new FormData()
    appendPhoto(form, 'image', photo)
    if (rear) appendPhoto(form, 'rear', rear)
    form.append('candidate', candidate)
    form.append('evidence', JSON.stringify(evidence || {}))
    return postReview('review', form, signal)
}
