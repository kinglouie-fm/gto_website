<template>
    <main v-if="event">
        <section class="event-detail-hero">
            <div class="event-detail-hero__frame">
                <img :src="event.imageSrc" :alt="event.imageAlt" class="event-detail-hero__image" />
                <div class="event-detail-hero__countdown">
                    <EventCountdown :starts-at="event.startsAt" :starts-at-label="event.startsAtLabel" />
                </div>
            </div>
        </section>

        <section class="event-detail content container-p">
            <div class="event-detail__inner">
                <h3 class="h-yellow h-first event-detail__title">{{ event.title }}</h3>

                <div class="event-detail__grid" :class="{ 'event-detail__grid--single': !event.mapQuery }">
                    <div class="event-detail__main">
                        <section class="event-detail__block">
                            <h4 class="h-white-small">The Experience</h4>
                            <p class="content-text">{{ event.explanation }}</p>
                        </section>

                        <section v-if="event.duration" class="event-detail__block">
                            <h4 class="h-white-small">Duration</h4>
                            <p class="content-text">{{ event.duration }}</p>
                        </section>

                        <section class="event-detail__block">
                            <h4 class="h-white-small">FAQ</h4>
                            <FaqAccordion :items="event.faqs" />
                        </section>

                        <section class="event-detail__block">
                            <GetInTouchButton analytics-placement="event_detail_page" />
                        </section>
                    </div>

                    <aside v-if="event.mapQuery" class="event-detail__aside">
                        <div class="event-detail__map border">
                            <iframe v-if="mapLoaded" title="Supercar Sunday meeting point" :src="mapEmbedUrl"
                                loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                            <div v-else class="event-detail__map-placeholder">
                                <h4 class="h-white-small">Meeting point</h4>
                                <p>
                                    Load Google Maps to view the event location. Google may receive technical data when
                                    the map is loaded.
                                </p>
                                <ButtonFilled class="event-detail__map-button" @click="mapLoaded = true">Load Google
                                    Maps</ButtonFilled>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>

    </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ButtonFilled from '@/components/ButtonFilled.vue'
import EventCountdown from '@/components/EventCountdown.vue'
import FaqAccordion from '@/components/FaqAccordion.vue'
import GetInTouchButton from '@/components/GetInTouchButton.vue'
import { findEventBySlug } from '@/data/events'

const route = useRoute()
const event = computed(() => findEventBySlug(route.params.slug))
const mapLoaded = ref(false)
const mapEmbedUrl = computed(() =>
    event.value?.mapQuery
        ? `https://www.google.com/maps?q=${encodeURIComponent(event.value.mapQuery)}&output=embed`
        : ''
)
</script>

<style scoped>
.event-detail-hero {
    position: relative;
    margin-top: var(--navbar-height);
}

.event-detail-hero__frame {
    position: relative;
    width: 100%;
    height: 58svh;
    min-height: 420px;
    overflow: hidden;
}

.event-detail-hero__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 65%;
}

.event-detail-hero__frame::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(to bottom, transparent 65%, rgb(48, 56, 65));
}

.event-detail-hero__countdown {
    position: absolute;
    right: 20px;
    bottom: 20px;
    z-index: 2;
}

.event-detail {
    margin-top: -80px;
    padding-top: 80px;
}

.event-detail__inner {
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto;
}

.event-detail__title {
    margin: 0 0 2.5rem;
    text-align: center;
}

.event-detail__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(300px, 0.78fr);
    gap: clamp(2rem, 5vw, 4rem);
    align-items: start;
}

.event-detail__grid--single {
    grid-template-columns: minmax(0, 760px);
    justify-content: center;
}

.event-detail__block {
    margin-bottom: 2rem;
}

.event-detail__block h4,
.event-detail__aside h4 {
    margin: 0 0 1rem;
}

.event-detail .content-text {
    margin: 0;
    padding: 0;
    text-align: left;
}

.event-detail__aside {
    color: white;
}

.event-detail__meeting {
    margin-bottom: 1.25rem;
}

.event-detail__map {
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: 10px;
    background: rgb(76, 84, 94);
}

.event-detail__map iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
}

.event-detail__map-placeholder {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    color: white;
}

.event-detail__map-placeholder h4,
.event-detail__map-placeholder p {
    margin: 0;
}

.event-detail__map-placeholder p {
    max-width: 420px;
}

.event-detail__map-button {
    margin-right: 0;
}

.event-detail__directions {
    margin-top: 1.5rem;
    margin-right: 0;
}

.event-contact {
    background: rgb(76, 84, 94);
    color: white;
}

.event-contact__text {
    margin-left: auto;
    margin-right: auto;
    max-width: 680px;
}

@media (min-width: 992px) {
    .event-detail-hero {
        padding-left: 20px;
        padding-right: 20px;
    }

    .event-detail-hero__frame {
        height: 60svh;
        border-radius: 24px;
        background: rgb(38, 45, 54);
    }

    .event-detail-hero__frame::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        z-index: 1;
        box-shadow:
            inset 0 0 34px 14px rgba(0, 0, 0, 0.34),
            inset 0 0 90px 24px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.03);
    }

    .event-detail-hero__frame::after {
        content: none;
    }

    .event-detail-hero__image {
        border-radius: 24px;
        filter: brightness(0.97);
    }

    .event-detail-hero__countdown {
        right: 32px;
        bottom: 32px;
    }
}

@media (max-width: 991.98px) {
    .event-detail__grid {
        grid-template-columns: 1fr;
    }

    .event-detail__aside {
        margin-top: 0.5rem;
    }
}

@media (max-width: 575.98px) {
    .event-detail-hero__frame {
        height: 58svh;
        min-height: 430px;
    }

    .event-detail-hero__countdown {
        left: 50%;
        right: auto;
        bottom: 16px;
        transform: translateX(-50%);
    }

    .event-detail__inner {
        width: min(100% - 32px, 420px);
    }

    .event-detail__title {
        margin-bottom: 2rem;
    }
}
</style>
