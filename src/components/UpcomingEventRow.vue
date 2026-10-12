<template>
    <article class="upcoming-event" :class="{ 'upcoming-event--featured': featured }">
        <RouterLink :to="`/events/${event.slug}`" class="event-photo" :aria-label="`View ${getEventTitle(event)}`">
            <EventImage :event="event" :eager="featured" />
        </RouterLink>
        <div class="upcoming-event__content">
            <p class="upcoming-event__meta">{{ getEventMeta(event) }}</p>
            <h3 class="h-white-small">{{ getEventTitle(event) }}</h3>
            <p class="upcoming-event__description">{{ event.shortDescription }}</p>
            <Button :to="`/events/${event.slug}`">View event</Button>
        </div>
    </article>
</template>

<script setup>
import EventImage from '@/components/EventImage.vue'
import Button from '@/components/Button.vue'
import { getEventMeta, getEventTitle } from '@/utils/events'
import '@/assets/css/event-controls.css'
defineProps({ event: { type: Object, required: true }, featured: Boolean })
</script>

<style scoped>
.upcoming-event {
    display: grid;
    gap: 1.75rem;
    text-align: left;
    align-items: center;
}

.event-photo {
    display: block;
    border-radius: 10px;
}

.upcoming-event__meta {
    color: rgb(246, 201, 14);
    margin: 0 0 1rem;
}

.upcoming-event h3 {
    margin: 0 0 1rem;
    line-height: 1.25;
}

.upcoming-event__description {
    max-width: 48ch;
    margin: 0 0 1.75rem;
    line-height: 1.65;
}

@media (min-width: 992px) {
    .upcoming-event--featured {
        grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
        gap: clamp(2rem, 5vw, 5rem);
    }
    .upcoming-event--featured h3 {
        font-size: clamp(1.75rem, 2.5vw, 2.5rem);
    }
}
</style>
