<template>
    <section class="camera-view">
        <!-- live camera feed -->
        <video ref="video" autoplay playsinline class="camera-feed"></video>

        <div class="camera-button-container">
            <button class="camera-btn" @click="capture">
                <img src="/icons/camera.svg" alt="Camera Icon" width="20" height="20" />
            </button>
        </div>

        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
            <p class="loading-text">Loading</p>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const video = ref(null)
const loading = ref(false)
const router = useRouter()
let stream = null

onMounted(async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        })
        video.value.srcObject = stream
    } catch (err) {
        console.error('Camera access denied:', err)
        alert('Please allow camera access to use this feature. Navigate to the Lens page to try again.')
    }
})

async function capture() {
    const vid = video.value
    const canvas = document.createElement('canvas')
    canvas.width = vid.videoWidth
    canvas.height = vid.videoHeight
    canvas.getContext('2d').drawImage(vid, 0, 0)
    // downscale & compress:
    const scale = 0.5              // 10% of original size
    const w = vid.videoWidth * scale
    const h = vid.videoHeight * scale

    const thumb = document.createElement('canvas')
    thumb.width = w
    thumb.height = h
    thumb
        .getContext('2d')
        .drawImage(vid, 0, 0, w, h)

    // quality: 0.3 (30%)
    const dataUrl = thumb.toDataURL('image/jpeg', 0.8)

    try {
        // 2) convert dataURL → Blob
        const res = await fetch(dataUrl)
        const blob = await res.blob()

        // 3) build FormData
        const form = new FormData()
        form.append('image', blob, 'snapshot.png')

        // 4) send to your Flask backend
        const response = await fetch('http://localhost:8000/api/analyze', {
            method: 'POST',
            body: form
        })

        if (!response.ok) {
            const err = await response.json().catch(() => null)
            throw new Error(err?.error || response.statusText)
        }

        // 5) get JSON payload
        const details = await response.json()

        // 6) store for LensDetailsView and navigate
        sessionStorage.setItem('capturedImage', dataUrl)
        sessionStorage.setItem('capturedDetails', JSON.stringify(details))
        router.push('/lens/details')

    } catch (error) {
        console.error('Analysis error:', error)
        // alert(`Could not analyze image: ${error.message}`)
    } finally {
        loading.value = false
    }
}

onBeforeUnmount(() => {
    if (stream) stream.getTracks().forEach((t) => t.stop())
})
</script>

<style scoped>
.camera-view {
    position: fixed;
    top: var(--navbar-height);
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    overflow: hidden;
}

.camera-feed {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.camera-button-container {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
}

.camera-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    border: none;
}

.camera-btn:hover {
    background: rgb(26, 28, 32);
    color: white;
}

.loading-overlay {
    position: absolute;
    inset: 0;
    /* shorthand for top/right/bottom/left: 0 */
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

/* CSS spinner */
.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-text {
    margin-top: 1rem;
    color: white;
    font-size: 1rem;
}
</style>
