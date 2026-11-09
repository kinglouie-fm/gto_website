<template>
    <main class="lens-page">
        <LensWebcam v-if="webcam" :preparing="preparing" @cancel="resetPhoto" @capture="selectImage" />
        <section v-else-if="photo">
            <button class="lens-back" type="button" :disabled="loading" @click="resetPhoto">‹ Back</button>
            <h1 class="h-yellow" tabindex="-1" ref="heading">Review your photo</h1>
            <img class="lens-photo" :src="photo.preview" alt="Your selected car photo">
            <button class="lens-change" type="button" :disabled="loading" @click="resetPhoto">Choose a different photo</button>
            <p class="lens-note">When you identify a car, GTO Lens sends the photo to OpenAI for analysis.</p>
            <button class="lens-action" type="button" :disabled="loading" @click="identify">
                {{ loading ? 'Identifying car…' : 'Identify this car' }}
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
                <font-awesome-icon :icon="faImages" />Choose from library
                <input type="file" accept="image/*" aria-label="Choose from library" @change="selectFile">
            </label>
            <button class="lens-action lens-outline" type="button" @click="openCamera">
                <font-awesome-icon :icon="faCamera" />Take a photo
            </button>
            <input ref="cameraInput" type="file" accept="image/*" capture="environment" hidden @change="selectFile">
        </section>
        <p v-if="preparing" role="status" class="lens-note">Preparing photo…</p>
        <p v-if="error" role="alert" class="lens-error">{{ error }}</p>
    </main>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref, shallowRef } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { faCamera, faImages } from '@fortawesome/free-solid-svg-icons'
import LensWebcam from '@/components/LensWebcam.vue'
import { analyzeLensPhoto, prepareLensPhoto, saveLensResult } from '@/utils/lens'
import '@/assets/css/lens.css'

const router = useRouter()
const cameraInput = ref(null)
const heading = ref(null)
const webcam = ref(false)
const photo = shallowRef(null)
const preparing = ref(false)
const loading = ref(false)
const error = ref('')
let selection = 0

function focusHeading() {
    nextTick(() => heading.value?.focus())
}

function resetPhoto() {
    selection++
    webcam.value = false
    photo.value = null
    error.value = ''
    preparing.value = false
    focusHeading()
}

function openCamera() {
    resetPhoto()
    if (window.matchMedia('(pointer: coarse)').matches) cameraInput.value.click()
    else webcam.value = true
}

async function selectImage(imageOrFile) {
    const attempt = ++selection
    preparing.value = true
    error.value = ''
    try {
        let image = imageOrFile
        if (imageOrFile instanceof File) {
            const source = await new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => resolve(reader.result)
                reader.onerror = () => reject(reader.error)
                reader.readAsDataURL(imageOrFile)
            })
            image = new Image()
            image.src = source
            await image.decode()
        }
        if (attempt !== selection) return
        const prepared = await prepareLensPhoto(image)
        if (attempt !== selection) return
        photo.value = prepared
        webcam.value = false
        focusHeading()
    } catch {
        if (attempt === selection) error.value = 'This photo could not be opened. Try a JPEG or PNG.'
    } finally {
        if (attempt === selection) preparing.value = false
    }
}

function selectFile(event) {
    const file = event.target.files[0]
    event.target.value = ''
    if (file) selectImage(file)
}

async function identify() {
    if (loading.value || !photo.value) return
    const attempt = selection
    loading.value = true
    error.value = ''
    try {
        const details = await analyzeLensPhoto(photo.value.blob)
        if (attempt !== selection) return
        saveLensResult(photo.value.preview, details)
        await router.push('/lens/details/')
    } catch (e) {
        if (attempt === selection) error.value = e.name === 'AbortError' ? 'Request timed out, please try again.' : e.message
    } finally {
        loading.value = false
    }
}

onBeforeRouteLeave(() => { selection++ })
onBeforeUnmount(() => { selection++ })
</script>
