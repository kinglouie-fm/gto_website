<template>
    <div>
        <ButtonFilled @click="openModal" class="get-in-touch-button">
            Get in touch
        </ButtonFilled>

        <Modal v-if="showModal" :show-header="false" @close="closeModal">
            <iframe title="Get in touch form" :src="formUrl" allow="camera; microphone; autoplay; encrypted-media" />
        </Modal>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ButtonFilled from '@/components/ButtonFilled.vue'
import Modal from '@/components/Modal.vue'

const props = defineProps({
    formUrl: {
        type: String,
        default: 'https://cxgwixcj505.typeform.com/to/eRlQG98c'
    },
    analyticsEvent: {
        type: String,
        default: 'get_in_touch_click'
    },
    analyticsPlacement: {
        type: String,
        default: 'events_section'
    }
})

const showModal = ref(false)

const openModal = () => {
    window.gtag?.('event', props.analyticsEvent, {
        placement: props.analyticsPlacement
    })
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
}

watch(showModal, (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<style scoped>
.get-in-touch-button {
    margin-right: 0;
}

iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
}
</style>