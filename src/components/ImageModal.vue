<template>
    <div class="image-modal-overlay" @click.self="close">
        <div class="image-modal-content">
            <div class="image-modal-header">
                <span class="modal-title text-center">{{ carName }}</span>
                <button type="button" class="btn-close btn-close-white" aria-label="Close" @click="close"></button>
            </div>
            <div v-if="showNavigation" class="navigation">
                <button class="arrow prev" @click="prev">&#10094;</button>
                <button class="arrow next" @click="next">&#10095;</button>
            </div>
            <div class="modal-image-container">
                <img :src="imageSrc" alt="Enlarged image" />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    imageSrc: { type: String, required: true },
    carName: { type: String, default: '' },
    showNavigation: { type: Boolean, default: false }
});
const emit = defineEmits(['close', 'prev', 'next']);

const close = () => {
    emit('close');
};
const prev = () => {
    emit('prev');
};
const next = () => {
    emit('next');
};
</script>

<style scoped>
.image-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
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
    }

    .arrow {
        pointer-events: all;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 1rem;
    }
}

/* Mobile: below 576px, display navigation as a row between header and image container */
@media (max-width: 575px) {
    .navigation {
        display: flex;
        justify-content: center;
        gap: 1rem;
        padding: 0.5rem 0;
    }

    .arrow {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
}

.modal-image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.modal-image-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
</style>