<template>
    <div class="modal-backdrop" @click.self="close">
        <div class="book-modal-content">
            <div v-if="showHeader" class="book-modal-header">
                <h3 v-if="title" class="modal-title">{{ title }}</h3>
                <div v-else></div>
                <button type="button" class="btn btn-close" @click="close"></button>
            </div>

            <button v-else type="button" class="btn btn-close modal-close-only" @click="close"
                aria-label="Close"></button>

            <div class="modal-body" :class="{ 'modal-body--no-header': !showHeader }">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'Booking Form'
    },
    showHeader: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['close'])

const close = () => {
    emit('close')
}
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2002;
    padding: 24px;
}

.book-modal-content {
    background: white;
    width: min(1280px, 100%);
    height: min(86dvh, 820px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    border-radius: 20px;
}

.book-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 16px 20px 8px;
    flex: 0 0 auto;
}

.modal-title {
    font-family: 'Apercu Pro', sans-serif;
    margin: 0;
}

.modal-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow: hidden;
    padding: 0 0 12px;
}

.modal-body--no-header {
    padding-top: 0;
}

.modal-close-only,
.book-modal-header .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 5;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 1px solid black;
    border-radius: 8px;
    background-size: 20px;
}

.btn {
    border: 1px solid black;
    flex: 0 0 auto;
}

@media (max-width: 768px) {
    .modal-backdrop {
        padding: 12px;
    }

    .book-modal-content {
        height: min(88dvh, 900px);
        border-radius: 12px;
    }

    .book-modal-header {
        padding: 12px 14px 6px;
    }

    .modal-title {
        font-size: 1rem;
    }

    .modal-close-only,
    .book-modal-header .btn-close {
        top: 8px;
        right: 8px;
        width: 32px;
        height: 32px;
    }
}
</style>