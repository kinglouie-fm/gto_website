<template>
    <section class="event-gallery" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" class="h-white-small">Event photos</h2>
        <div class="event-gallery__grid">
            <button v-for="(photo, index) in photos" :key="photo.src" type="button"
                class="event-gallery__photo event-photo" :aria-label="`Enlarge photo ${index + 1}: ${photo.alt}`"
                @click="selectedIndex = index">
                <img :src="photo.thumb || photo.src" :alt="photo.alt" loading="lazy" decoding="async"
                    :width="photo.thumbWidth || 1200" :height="photo.thumbHeight || 800" />
            </button>
        </div>
        <Teleport to="#modals">
            <ImageModal v-if="selectedPhoto" :image-src="selectedPhoto.src" :image-alt="selectedPhoto.alt"
                :car-name="`${title} — ${selectedIndex + 1} / ${photos.length}`" :show-navigation="photos.length > 1"
                static-display @close="selectedIndex = null" @prev="navigate(-1)" @next="navigate(1)" />
        </Teleport>
    </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import ImageModal from '@/components/ImageModal.vue'
import '@/assets/css/event-controls.css'
const props = defineProps({ photos: { type: Array, required: true }, title: { type: String, required: true } })
const selectedIndex = ref(null)
const selectedPhoto = computed(() => selectedIndex.value === null ? null : props.photos[selectedIndex.value])
const navigate = (direction) => {
    selectedIndex.value = (selectedIndex.value + direction + props.photos.length) % props.photos.length
}
</script>

<style scoped>
.event-gallery h2 {
    margin: 0 0 2rem;
    line-height: 1.3;
}

.event-gallery__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
}

.event-gallery__photo {
    border: 0;
    background: transparent;
    border-radius: 10px;
    padding: 0;
    cursor: pointer;
    overflow: hidden;
}

.event-gallery__photo img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    aspect-ratio: 3 / 2;
}

@media (max-width: 991.98px) {
    .event-gallery__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 575.98px) {
    .event-gallery__grid {
        grid-template-columns: 1fr;
    }
}
</style>
