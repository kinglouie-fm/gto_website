<template>
    <div class="image-modal-overlay" @click.self="close">
        <div class="image-modal-content">
            <div class="image-modal-header">
                <span class="modal-title">{{ carName }}</span>
                <button type="button" class="btn-close btn-close-white" aria-label="Close" @click="close"></button>
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
    carName: { type: String, default: '' }
})

const emit = defineEmits(['close'])

const close = () => {
    emit('close')
}
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
    /* The modal is 90% of the viewport width and height */
    width: 90vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    background: transparent;
    /* Hide any overflow so there’s no scrollbar */
    overflow: hidden;
}

.image-modal-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 1rem;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 1.2rem;
}

.modal-title {
    font-family: 'Apercu Pro', sans-serif;
    padding-right: 3rem;
}

.modal-image-container {
    flex: 1;
    /* Occupies remaining vertical space */
    display: flex;
    justify-content: center;
    align-items: center;
    /* Hiding overflow ensures no scrolling */
    overflow: hidden;
}

.modal-image-container img {
    /* Constrain the image to the container */
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
</style>
