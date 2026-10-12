<template>
    <main class="events-page">
        <HeroSection desktop-src="/images/other/scs7_people.webp" mobile-src="/images/other/scs7_people.webp"
            alt="The GTO community at Supercar Sunday" :desktop-framed="true" :show-mobile-fade="false"
            mobile-height="30svh" tablet-height="36svh" desktop-height="42svh" mobile-object-position="50% 50%"
            tablet-object-position="50% 80%" desktop-object-position="50% 80%" />

        <section class="events-intro events-wrap">
            <h1 class="h-yellow">Events</h1>
        </section>

        <section class="events-upcoming events-wrap" aria-labelledby="upcoming-heading">
            <div class="events-heading">
                <h2 id="upcoming-heading" class="h-white">Upcoming events</h2>
                <p v-if="!nextEvents.length" class="events-empty">
                    Our next events will be announced here.
                    Follow <a class="event-link" href="https://www.instagram.com/gto.lu/" target="_blank"
                        rel="noopener noreferrer">@gto.lu</a> for updates.
                </p>
            </div>
            <template v-if="nextEvents.length">
                <UpcomingEventRow :event="nextEvents[0]" featured />
                <div v-if="nextEvents.length > 1" class="events-upcoming__more">
                    <UpcomingEventRow v-for="event in nextEvents.slice(1)" :key="event.slug" :event="event" />
                </div>
            </template>
        </section>

        <section v-if="groups.past.length" class="events-archive" aria-labelledby="past-heading">
            <div class="events-wrap">
                <div class="events-heading">
                    <h2 id="past-heading" class="h-white">Past events</h2>
                </div>
                <div id="past-events-grid" ref="archiveGrid" class="events-archive__grid">
                    <PastEventCard v-for="event in visiblePastEvents" :key="event.slug" :event="event" />
                </div>
                <div v-if="visibleCount < groups.past.length" class="events-archive__more">
                    <Button aria-controls="past-events-grid" @click="showMoreEvents">
                        Show more events
                    </Button>
                </div>
            </div>
        </section>

        <EventPress />
    </main>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import UpcomingEventRow from '@/components/UpcomingEventRow.vue'
import PastEventCard from '@/components/PastEventCard.vue'
import EventPress from '@/components/EventPress.vue'
import Button from '@/components/Button.vue'
import { useEvents } from '@/composables/useEvents'
import '@/assets/css/event-controls.css'

const { groups } = useEvents()
const nextEvents = computed(() => [...groups.value.upcoming, ...groups.value.announced])
const visibleCount = ref(6)
const archiveGrid = ref(null)
const visiblePastEvents = computed(() => groups.value.past.slice(0, visibleCount.value))

const showMoreEvents = async () => {
    const firstNewIndex = visibleCount.value
    visibleCount.value += 6
    await nextTick()
    archiveGrid.value.children[firstNewIndex]?.querySelector('a')?.focus({ preventScroll: true })
}
</script>

<style scoped>
.events-page {
    color: white;
}

.events-wrap {
    width: min(1180px, calc(100% - 40px));
    margin-inline: auto;
}

.events-intro {
    padding-block: clamp(2.5rem, 5vw, 4rem) 0;
}

.events-intro h1 {
    margin: 0;
    text-align: center;
    font-size: clamp(2rem, 4vw, 3.25rem);
    line-height: 1.2;
}

.events-upcoming {
    padding-block: clamp(2.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem);
}

.events-heading {
    margin-bottom: 2.5rem;
}

.events-heading h2 {
    margin: 0 0 1rem;
    line-height: 1.3;
}

.events-heading p {
    margin: 0;
    max-width: 60ch;
    line-height: 1.65;
    color: #e0e3e7;
}

.events-heading:has(.events-empty) {
    margin-bottom: 0;
}

.events-upcoming__more {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 3rem;
    margin-top: 4rem;
}

.events-archive {
    background: rgb(76, 84, 94);
    padding-block: clamp(3rem, 7vw, 6rem);
}

.events-archive__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 3.5rem 2.5rem;
}

.events-archive__more {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
}

@media (max-width: 991.98px) {
    .events-archive__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 3rem 2rem;
    }
}

@media (max-width: 575.98px) {
    .events-wrap {
        width: calc(100% - 40px);
    }

    .events-archive__grid,
    .events-upcoming__more {
        grid-template-columns: 1fr;
    }

    .events-heading {
        margin-bottom: 2rem;
    }
}
</style>
