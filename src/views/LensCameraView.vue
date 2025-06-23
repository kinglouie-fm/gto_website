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
        <div v-if="errorMsg" class="error-banner">{{ errorMsg }}</div>
    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const video = ref(null)
const loading = ref(false)
const errorMsg = ref('')
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

function dataURLtoBlob(dataURL) {
    const [header, base64] = dataURL.split(',')
    const mime = header.match(/:(.*?);/)[1]
    const bin = atob(base64)
    const arr = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) {
        arr[i] = bin.charCodeAt(i)
    }
    return new Blob([arr], { type: mime })
}

async function capture() {
    errorMsg.value = ''
    loading.value = true

    const vid = video.value
    const fullCanvas = document.createElement('canvas')
    fullCanvas.width = vid.videoWidth
    fullCanvas.height = vid.videoHeight
    fullCanvas.getContext('2d').drawImage(vid, 0, 0)
    const fullDataUrl = fullCanvas.toDataURL('image/jpeg', 1.0)

    // downscale & compress:
    const scale = 0.5
    const thumb = document.createElement('canvas')
    thumb.width = vid.videoWidth * scale; thumb.height = vid.videoHeight * scale
    thumb.getContext('2d').drawImage(vid, 0, 0, thumb.width, thumb.height)
    const blob = dataURLtoBlob(thumb.toDataURL('image/jpeg', 0.8))

    const form = new FormData()
    form.append('image', blob, 'snapshot.jpg')

    const controller = new AbortController()
    setTimeout(() => controller.abort(), 10000)

    try {
        // Send to backend
        const response = await fetch('/api/analyze', {
            method: 'POST',
            body: form,
            signal: controller.signal
        })

        if (!response.ok) {
            const err = await response.json().catch(() => ({}))
            let message = err.error || "Server error."
            if (err.code) message += ` (${err.code})`
            switch (response.status) {
                // case 400: throw new Error('Please upload a valid image.')
                // case 413: throw new Error('Image too large (max 5 MB).')
                // case 422:
                //     if (err.code === 'NO_CAR_DETECTED') throw new Error('No car detected.')
                // default: throw new Error(err.error || 'Server error.')
                case 400: throw new Error('Please upload a valid image.')
                case 413: throw new Error('Image too large (max 5 MB).')
                case 422:
                    if (err.code === 'NO_CAR_DETECTED') throw new Error('No car detected.')
                default: throw new Error(err.error || 'Server error.')
            }
        }

        const details = await response.json()
        sessionStorage.setItem('capturedImage', fullDataUrl)
        sessionStorage.setItem('capturedDetails', JSON.stringify(details))
        router.push('/lens/details')
    } catch (e) {
        errorMsg.value = e.name === 'AbortError'
            ? 'Request timed out, please try again.'
            : e.message
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

.error-banner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(200, 0, 0, 0.8);
    color: #fff;
    padding: .5rem;
    text-align: center;
    z-index: 20;
}
</style>
