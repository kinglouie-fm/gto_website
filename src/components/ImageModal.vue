<template>
    <div class="image-modal-overlay pt-5" @click.self="close">
        <div class="image-modal-content">
            <div class="image-modal-header">
                <span class="modal-title text-center">{{ carName }}</span>
                <button type="button" class="btn-close btn-close-white" aria-label="Close" @click="close"></button>
            </div>

            <div v-if="showNavigation" class="navigation">
                <button class="arrow prev" @click="prev" aria-label="Previous image">&#10094;</button>
                <button class="arrow next" @click="next" aria-label="Next image">&#10095;</button>
            </div>

            <div class="modal-image-container">
                <img class="modal-img modal-img--full" :class="{ 'is-loaded': isFullLoaded }" :src="imageSrc"
                    alt="Enlarged image" decoding="async" @load="onFullLoad" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
    imageSrc: { type: String, required: true },
    carName: { type: String, default: '' },
    showNavigation: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'prev', 'next'])

const isFullLoaded = ref(false)

const close = () => emit('close')
const prev = () => emit('prev')
const next = () => emit('next')

const onFullLoad = () => {
    isFullLoaded.value = true
}

watch(
    () => props.imageSrc,
    () => {
        // reset loaded state when switching images
        isFullLoaded.value = false
    }
)

const onKeydown = (e) => {
    if (e.key === 'Escape') close()
    if (!props.showNavigation) return
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
}

onMounted(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.image-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.image-modal-content {
    position: relative;
    width: 90vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    background: transparent;
    overflow: hidden;
    min-height: 0;
}

/* Header stays at the top */
.image-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 1.2rem;
}

.modal-image-container {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    min-height: 0;
}

/* both images share sizing rules */
.modal-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

/* full image fades in */
.modal-img--full {
    position: relative;
    opacity: 0;
    transition: opacity 220ms ease;
}

.modal-img--full.is-loaded {
    opacity: 1;
}

/* Desktop: for screens 576px and up, position navigation absolutely over image */
@media (min-width: 576px) {
    .navigation {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
        pointer-events: none;
        z-index: 10;
    }

    .arrow {
        pointer-events: all;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 1rem;
        z-index: 11;
    }

    .image-modal-header {
        font-size: 1.5rem;
    }
}

/* Mobile: below 576px, display navigation as a row between header and image container */
@media (max-width: 575px) {
    :root {
        --modal-chrome: 120px;
    }

    .navigation {
        display: flex;
        justify-content: center;
        gap: 4rem;
        padding: 0.5rem 0;
    }

    .arrow {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 1rem;
    }

    .modal-image-container {
        align-items: flex-start;
        justify-content: center;
        padding-top: 0.5rem;
    }

    .modal-img {
        max-height: calc(100% - var(--modal-chrome));
    }
}
</style>