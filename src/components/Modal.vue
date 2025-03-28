<template>
    <div class="modal-backdrop" @click.self="close">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Booking Form</h3>
                <button type="button" class="btn btn-close" @click="close"></button>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['close'])
const close = () => {
    emit('close')
}
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

.modal-content {
    background: white;
    padding: 1rem;
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
    position: relative;
}

.modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
}

.btn {
    border: 1px solid black
}

.modal-title {
    font-family: 'Apercu Pro', sans-serif;
}
</style>
