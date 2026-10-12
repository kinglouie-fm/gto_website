<template>
    <div class="event-image">
        <img v-if="getEventImageSrc(event)"
            :src="eager ? getEventImageSrc(event) : event.imageThumbSrc || getEventImageSrc(event)"
            :srcset="imageSources" :sizes="imageSizes"
            :alt="event.imageAlt || event.gallery?.[0]?.alt || getEventTitle(event)" :loading="eager ? 'eager' : 'lazy'"
            :fetchpriority="eager ? 'high' : 'auto'" decoding="async" :width="event.imageWidth || 1200"
            :height="event.imageHeight || 800" />
        <div v-else class="event-image__placeholder" role="img"
            :aria-label="`Photo placeholder for ${getEventTitle(event)}`">
            <span class="event-image__year" aria-hidden="true">{{ event.year || 'GTO' }}</span>
            <span class="event-image__note">No photos available yet</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { getEventImageSrc, getEventTitle } from '@/utils/events'
const props = defineProps({ event: { type: Object, required: true }, eager: Boolean })
const imageSources = computed(() => props.event.imageThumbSrc && props.event.imageWidth > props.event.imageThumbWidth
    ? `${props.event.imageThumbSrc} ${props.event.imageThumbWidth}w, ${props.event.imageSrc} ${props.event.imageWidth}w`
    : undefined)
const imageSizes = computed(() => props.eager
    ? '(min-width: 1220px) 1180px, calc(100vw - 40px)'
    : '(min-width: 1220px) 367px, (min-width: 992px) calc((100vw - 120px) / 3), (min-width: 576px) calc((100vw - 72px) / 2), calc(100vw - 40px)')
</script>

<style scoped>
.event-image {
    width: 100%;
    aspect-ratio: 3 / 2;
    overflow: hidden;
    border-radius: 10px;
}

.event-image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.event-image__placeholder {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background: rgb(42, 50, 59);
    color: white;
    text-align: center;
    padding: 1.5rem;
}

.event-image__year {
    font-family: 'Airstrike', sans-serif;
    font-size: clamp(2.5rem, 6vw, 5rem);
    line-height: 1;
    color: rgba(255, 255, 255, 0.3);
}

.event-image__note {
    font-family: 'Apercu Pro', sans-serif;
    font-size: 0.875rem;
}
</style>
