<template>
    <!-- Overlay that covers the whole viewport -->
    <div class="image-modal-overlay" @click.self="close">
        <div class="image-modal-content">
            <div class="image-modal-header">
                <span class="modal-title">{{ carName }}</span>
                <button type="button" class="btn btn-close btn-close-white" @click="close"></button>
            </div>
            <div class="modal-image-container">
                <img :src="imageSrc" alt="Enlarged image" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    imageSrc: {
        type: String,
        required: true
    },
    carName: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['close'])
const close = () => {
    emit('close')
}
</script>

<style scoped>
.image-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.image-modal-content {
    width: 90vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    background: transparent;
    /* No white background */
}

.image-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background: rgba(0, 0, 0, 0.5);
    /* Semi-transparent header */
    color: white;
    font-size: 1.2rem;
}

.close-button {
    background: transparent;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
}

.modal-image-container {
    flex: 1;
    /* Occupy remaining space */
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-image-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.modal-title {
    font-family: 'Apercu Pro', sans-serif;
}
</style>
