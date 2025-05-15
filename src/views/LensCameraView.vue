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

function capture() {
    const vid = video.value
    const canvas = document.createElement('canvas')
    canvas.width = vid.videoWidth
    canvas.height = vid.videoHeight
    canvas.getContext('2d').drawImage(vid, 0, 0)
    const dataUrl = canvas.toDataURL('image/png')

    // store it temporarily
    sessionStorage.setItem('capturedImage', dataUrl)

    // dummy JSON from “backend”
    const dummy = {
        model: 'Ferrari 488 GTB',
        engine: '3902 cc F154 CB twin-turbo V8',
        power: '661 HP',
        torque: '761 Nm',
        topSpeed: '330 km/h',
        acceleration: '3.0 s',
        type: 'Petrol',
        year: '2018',
        funFact: '"GTB" stands for Gran Turismo Berlinetta, a nod to Ferrari’s classic grand touring heritage.'
    }
    sessionStorage.setItem('capturedDetails', JSON.stringify(dummy))

    // show loader
    loading.value = true

    // fake network delay then navigate
    setTimeout(() => {
        router.push('/lens/details')
    }, 2000)
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
