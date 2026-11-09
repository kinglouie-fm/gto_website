<template>
    <section>
        <button class="lens-back" type="button" @click="$emit('cancel')">‹ Back</button>
        <h1 class="h-yellow">Take a photo</h1>
        <video ref="video" class="lens-photo" autoplay playsinline muted @loadeddata="ready = true"></video>
        <p v-if="error" role="alert">{{ error }}</p>
        <button v-if="error" class="lens-action" @click="$emit('cancel')">Back to photo options</button>
        <button v-else class="lens-action" :disabled="!ready || preparing" @click="$emit('capture', video)">
            <LensActionLabel :busy="preparing" label="Take photo" busy-label="Preparing photo…" />
        </button>
    </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import LensActionLabel from '@/components/LensActionLabel.vue'

defineEmits(['cancel', 'capture'])
defineProps({ preparing: Boolean })
const video = ref(null)
const ready = ref(false)
const error = ref('')
let stream
let closed = false

function stopCamera() {
    stream?.getTracks().forEach(track => track.stop())
}

onMounted(async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        if (closed) stopCamera()
        else video.value.srcObject = stream
    } catch {
        if (!closed) error.value = 'The camera is unavailable. You can still choose a photo from your library.'
    }
})

onBeforeUnmount(() => {
    closed = true
    stopCamera()
})
</script>
