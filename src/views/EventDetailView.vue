<template>
    <main v-if="event" class="event-detail-page">
        <div class="event-detail__inner">
            <RouterLink to="/events" class="event-link event-detail__back">Back to events</RouterLink>
            <header class="event-detail__header">
                <h1 class="h-yellow">{{ getEventTitle(event) }}</h1>
            </header>
            <EventImage :event="event" eager class="event-detail__cover" />

            <div class="event-detail__layout" :class="{ 'event-detail__layout--map': !isPast && event.mapQuery }">
                <div>
                    <section class="event-detail__block">
                        <h2 class="h-white-small">{{ isPast ? 'Event recap' : 'The experience' }}</h2>
                        <p>{{ event.explanation || event.shortDescription }}</p>
                        <a v-if="event.sourceUrl" :href="event.sourceUrl" class="event-link event-detail__source"
                            target="_blank" rel="noopener noreferrer">View Facebook event</a>
                    </section>
                    <template v-if="!isPast">
                        <section v-if="event.duration" class="event-detail__block">
                            <h2 class="h-white-small">When</h2>
                            <p>{{ event.duration }}</p>
                        </section>
                        <section v-if="event.faqs?.length" class="event-detail__block">
                            <h2 class="h-white-small">FAQ</h2>
                            <FaqAccordion :items="event.faqs" />
                        </section>
                        <Button v-if="event.registration && status === 'upcoming'" :href="event.registration.url">
                            {{ event.registration.label || 'Register your car' }}
                        </Button>
                    </template>
                </div>
                <aside v-if="!isPast && event.mapQuery" class="event-detail__map">
                    <iframe v-if="mapLoaded" :title="`Meeting point for ${getEventTitle(event)}`" :src="mapEmbedUrl"
                        loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <div v-else class="event-detail__map-placeholder">
                        <h2 class="h-white-small">Meeting point</h2>
                        <p>{{ event.location }}</p>
                        <p>Load Google Maps to view the location. Google may receive technical data when the map is
                            loaded.</p>
                        <Button @click="mapLoaded = true">Load Google Maps</Button>
                    </div>
                </aside>
            </div>

            <EventGallery v-if="event.gallery?.length" :key="event.slug" :photos="event.gallery"
                :title="getEventTitle(event)" />
        </div>
    </main>
    <NotFoundView v-else title="Event not found" />
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EventImage from '@/components/EventImage.vue'
import Button from '@/components/Button.vue'
import EventGallery from '@/components/EventGallery.vue'
import FaqAccordion from '@/components/FaqAccordion.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { findEventBySlug } from '@/data/events'
import { getEventMeta, getEventStatus, getEventTitle } from '@/utils/events'
import { useEvents } from '@/composables/useEvents'
import '@/assets/css/event-controls.css'

const route = useRoute()
const { now } = useEvents()
const event = computed(() => findEventBySlug(route.params.slug))
const status = computed(() => event.value ? getEventStatus(event.value, now.value) : null)
const isPast = computed(() => status.value === 'past')
const statusLabel = computed(() => isPast.value ? 'Past event' : status.value === 'upcoming' ? 'Upcoming event' : 'Event announcement')
const mapLoaded = ref(false)
const mapEmbedUrl = computed(() => `https://www.google.com/maps?q=${encodeURIComponent(event.value?.mapQuery || '')}&output=embed`)
watch(() => route.params.slug, () => { mapLoaded.value = false })
</script>

<style scoped>
.event-detail-page {
    color: white;
    padding-top: calc(var(--navbar-height) + 2rem);
    padding-bottom: clamp(3rem, 7vw, 6rem);
}

.event-detail__inner {
    width: min(1180px, calc(100% - 40px));
    margin-inline: auto;
}

.event-detail__back {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    margin-bottom: 2rem;
}

.event-detail__header {
    max-width: 900px;
    margin-bottom: 2.5rem;
}

.event-detail__meta {
    color: #e0e3e7;
    margin: 0 0 1rem;
    line-height: 1.5;
}

.event-detail__header h1 {
    margin: 0;
    font-size: clamp(1.75rem, 4vw, 3rem);
    line-height: 1.2;
}

.event-detail__cover {
    aspect-ratio: 16 / 7;
    max-height: 560px;
}

.event-detail__layout {
    margin-block: 3rem 4rem;
}

.event-detail__layout--map {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr);
    gap: 4rem;
}

.event-detail__block {
    margin-bottom: 2rem;
}

.event-detail__block h2 {
    margin: 0 0 1rem;
    line-height: 1.3;
}

.event-detail__block p {
    max-width: 65ch;
    margin: 0;
    line-height: 1.7;
}

.event-detail__source {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    margin-top: 1rem;
}

.event-detail__map {
    background: rgb(76, 84, 94);
    border-radius: 10px;
    overflow: hidden;
    min-height: 350px;
}

.event-detail__map iframe {
    display: block;
    border: 0;
    height: 100%;
    width: 100%;
    min-height: 350px;
}

.event-detail__map-placeholder {
    padding: 2rem;
}

.event-detail__map-placeholder p {
    line-height: 1.6;
}

@media (max-width: 767.98px) {
    .event-detail__cover {
        aspect-ratio: 3 / 2;
    }

    .event-detail__layout--map {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
}
</style>
