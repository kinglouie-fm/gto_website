<template>
    <main class="lens-page">
        <LensWebcam v-if="webcam" :preparing="preparingSource === 'camera'" @cancel="resetPhoto" @capture="selectImage($event, 'camera')" />
        <section v-else-if="photo">
            <button class="lens-back" type="button" :disabled="loading" @click="resetPhoto">‹ Back</button>
            <h1 class="h-yellow" tabindex="-1" ref="heading">Review your photo</h1>
            <img class="lens-photo" :src="photo.preview" alt="Your selected car photo">
            <button class="lens-change" type="button" :disabled="loading" @click="resetPhoto">Choose a different photo</button>
            <p class="lens-note">When you identify a car, we check your photo with OpenAI and Google Cloud Vision.</p>
            <button class="lens-action" type="button" :disabled="loading" @click="identify">
                <LensActionLabel :busy="loading" label="Identify this car" busy-label="Identifying car…" />
            </button>
        </section>
        <section v-else>
            <RouterLink class="lens-back" to="/lens/">‹ GTO Lens</RouterLink>
            <h1 class="h-yellow" tabindex="-1" ref="heading">Add a car photo</h1>
            <p>Choose a photo you already have or take one where you are.</p>
            <figure>
                <div class="lens-guide">
                    <img src="/images/portfolio/thumbs/Audi_R8.webp" alt="An entire Audi R8 seen from the front and side, with space around the car.">
                    <span aria-hidden="true"></span>
                </div>
                <figcaption class="lens-note">Step back until the whole car fits, with a little space around it.</figcaption>
            </figure>
            <label class="lens-action lens-picker">
                <LensActionLabel :busy="preparingSource === 'library'" :icon="faImages" label="Choose from library" busy-label="Preparing photo…" />
                <input type="file" accept="image/*" :disabled="!!preparingSource" @change="selectFile($event, 'library')">
            </label>
            <button class="lens-action lens-outline" type="button" :disabled="!!preparingSource" @click="openCamera">
                <LensActionLabel :busy="preparingSource === 'camera'" :icon="faCamera" label="Take a photo" busy-label="Preparing photo…" />
            </button>
            <input ref="cameraInput" type="file" accept="image/*" capture="environment" hidden @change="selectFile($event, 'camera')">
        </section>
        <p v-if="error" role="alert" class="lens-error">{{ error }}</p>
    </main>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref, shallowRef } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { faCamera, faImages } from '@fortawesome/free-solid-svg-icons'
import LensWebcam from '@/components/LensWebcam.vue'
import LensActionLabel from '@/components/LensActionLabel.vue'
import { analyzeLensPhoto, prepareLensPhoto, readLensFile, saveLensResult } from '@/utils/lens'
import { googleCheck, hasWebClues, reviewMatch } from '@/utils/lensReview'
import '@/assets/css/lens.css'

const router = useRouter()
const cameraInput = ref(null)
const heading = ref(null)
const webcam = ref(false)
const photo = shallowRef(null)
const preparingSource = ref(null)
const loading = ref(false)
const error = ref('')
let selection = 0
let webLookup
const lifetime = new AbortController()

function focusHeading() {
    nextTick(() => heading.value?.focus())
}

function resetPhoto() {
    selection++
    webLookup = null
    webcam.value = false
    photo.value = null
    error.value = ''
    preparingSource.value = null
    focusHeading()
}

function openCamera() {
    resetPhoto()
    if (window.matchMedia('(pointer: coarse)').matches) cameraInput.value.click()
    else webcam.value = true
}

async function selectImage(imageOrFile, source) {
    const attempt = ++selection
    preparingSource.value = source
    error.value = ''
    try {
        const image = imageOrFile instanceof File ? await readLensFile(imageOrFile) : imageOrFile
        if (attempt !== selection) return
        const prepared = await prepareLensPhoto(image)
        if (attempt !== selection) return
        photo.value = prepared
        webcam.value = false
        focusHeading()
    } catch {
        if (attempt === selection) error.value = 'This photo could not be opened. Try a JPEG or PNG.'
    } finally {
        if (attempt === selection) preparingSource.value = null
    }
}

function selectFile(event, source) {
    const file = event.target.files[0]
    event.target.value = ''
    if (file) selectImage(file, source)
}

async function identify() {
    if (loading.value || !photo.value) return
    const attempt = selection
    loading.value = true
    error.value = ''
    try {
        const { preview, blob } = photo.value
        // Retrying the same photo after an AI error reuses its Google lookup.
        webLookup ??= googleCheck(preview, lifetime.signal).catch(() => null)
        const [firstMatch, evidence] = await Promise.all([analyzeLensPhoto(blob), webLookup])
        if (attempt !== selection) return
        const review = { originalCandidate: [firstMatch.make, firstMatch.model].join(' ').trim(), evidence }
        let details = firstMatch
        if (hasWebClues(evidence)) {
            try {
                const match = await reviewMatch(preview, null, review.originalCandidate, evidence, lifetime.signal)
                review.status = match.status === 'different_vehicle' ? 'inconclusive' : match.status
                review.usedClues = true
                details = match.details || firstMatch
            } catch {
                review.usedClues = false
            }
        }
        if (attempt !== selection) return
        saveLensResult(preview, details, review)
        await router.push('/lens/details/')
    } catch (e) {
        if (attempt === selection) error.value = e.name === 'AbortError' ? 'Request timed out, please try again.' : e.message
    } finally {
        loading.value = false
    }
}

onBeforeRouteLeave(() => { selection++ })
onBeforeUnmount(() => { selection++; lifetime.abort() })
</script>
