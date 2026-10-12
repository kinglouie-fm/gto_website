<template>
    <article class="past-event">
        <RouterLink :to="`/events/${event.slug}`" class="event-photo" :aria-label="`View ${getEventTitle(event)}`">
            <EventImage :event="event" />
        </RouterLink>
        <p class="past-event__meta">{{ getEventMeta(event) }}</p>
        <h3 class="h-white-small">{{ event.title }}</h3>
        <p class="past-event__recap">{{ event.shortDescription }}</p>
        <Button :to="`/events/${event.slug}`" class="past-event__button">
            {{ event.gallery?.length ? 'View photos' : 'View recap' }}
        </Button>
    </article>
</template>

<script setup>
import EventImage from '@/components/EventImage.vue'
import Button from '@/components/Button.vue'
import { getEventMeta, getEventTitle } from '@/utils/events'
import '@/assets/css/event-controls.css'
defineProps({ event: { type: Object, required: true } })
</script>

<style scoped>
.past-event {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
}

.event-photo {
    width: 100%;
    display: block;
    border-radius: 10px;
}

.past-event__meta {
    color: #e0e3e7;
    margin: 1.5rem 0 0.65rem;
    font-size: 0.9rem;
}

.past-event h3 {
    margin: 0 0 0.75rem;
    font-size: 1.35rem;
    line-height: 1.3;
}

.past-event__recap {
    margin: 0 0 1rem;
    line-height: 1.6;
    max-width: 45ch;
}

.past-event__button {
    margin-top: auto;
}
</style>
