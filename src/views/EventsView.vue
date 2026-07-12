<template>
    <main>
        <HeroSection desktopSrc="/images/other/scs7_people.webp" mobileSrc="/images/other/scs7_people.webp"
            alt="Supercar Sunday #7 by GTO Luxembourg" customClass="events-hero" :desktopFramed="true"
            :showMobileFade="true" tablet-height="40svh" desktopHeight="60svh" mobileObjectPosition="50% 50%"
            tabletObjectPosition="50% 90%" desktopObjectPosition="50% 85%" />

        <VerticalSlider />

        <section class="content events text-center container-p">
            <h1 class="text-center h-yellow h-first">Upcoming Events</h1>

            <div class="upcoming-events">
                <UpcomingEventRow v-for="(event, index) in events" :key="event.slug" :event="event"
                    :reverse="index % 2 === 1"
                    @image-click="({ imageSrc, carName }) => openImageModal(imageSrc, carName)" />
            </div>
        </section>

        <section class="news text-center container-p">
            <h3 class="text-center h-white">News that helps</h3>
            <div class="news-row heading-pt" role="list">
                <article class="news-item" role="listitem">
                    <h4 class="h-yellow-small">Luxemburger Wort</h4>
                    <img class="img-fluid news-item-img border" src="/images/other/scs7_fordgt.webp"
                        alt="News article from Luxemburger Wort"
                        @click="openImageModal('/images/other/scs7_fordgt.webp', 'Ford GT')" />
                    <p class="news-item-text content-text">
                        Luxemburger Wort covered Supercar Sunday in Mersch in 2024, highlighting the dream cars that
                        visitors would rarely encounter on Luxembourg roads.
                    </p>
                    <ButtonFilled
                        href="https://www.wort.lu/panorama/neun-freunde-holen-die-supercars-nach-luxemburg/13661126.html"
                        class="news-button">Learn more</ButtonFilled>
                </article>

                <article class="news-item" role="listitem">
                    <h4 class="h-yellow-small">RTL Lëtzebuerg</h4>
                    <img class="img-fluid news-item-img border" src="/images/other/scs7_classic.webp"
                        alt="News article from RTL Lëtzebuerg"
                        @click="openImageModal('/images/other/scs7_classic.webp', 'Ford Mustang Fastback GT and Ferrari 512 Testarossa')" />
                    <p class="content-text news-item-text">
                        RTL Lëtzebuerg covered the first Supercar Sunday in Mersch in 2018, documenting the public event
                        and the cars brought together by GTO Luxembourg.
                    </p>
                    <ButtonFilled href="https://today.rtl.lu/pictures/30089.html" class="news-button">Learn more
                    </ButtonFilled>
                </article>
            </div>
        </section>
        <ImageModal v-if="selectedImage" :imageSrc="selectedImage" :carName="selectedCarName"
            @close="selectedImage = null" />
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeroSection from '@/components/HeroSection.vue';
import ImageModal from '@/components/ImageModal.vue';
import VerticalSlider from '@/components/VerticalSlider.vue';
import UpcomingEventRow from '@/components/UpcomingEventRow.vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ButtonFilled from '@/components/ButtonFilled.vue'
import { events } from '@/data/events'

gsap.registerPlugin(ScrollTrigger)

const selectedImage = ref(null);
const selectedCarName = ref('');

const openImageModal = (imageUrl, carName) => {
    selectedImage.value = imageUrl;
    selectedCarName.value = carName;
}

onMounted(() => {
    gsap.from('.news', {
        scrollTrigger: {
            trigger: '.news',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2
    });
});
</script>

<style scoped>
.img-fluid {
    cursor: pointer;
}

iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
}

.content {
    background-color: rgb(48, 56, 65);
    margin-top: -80px;
    padding-top: 80px;
    color: white;
}

p {
    margin-top: 0;
}

.events {
    background-color: rgb(48, 56, 65);
}

.upcoming-events {
    display: flex;
    flex-direction: column;
    gap: clamp(3rem, 7vw, 6rem);
    margin-top: 3rem;
}

.news {
    background-color: rgb(76, 84, 94);
}

/* ButtonFilled and Button have right margins. Remove these in this specific case. */
.news-button {
    margin-right: 0;
}

.heading-pt {
    padding-top: 1.25rem;
}

.news {
    background-color: rgb(76, 84, 94);

    /* CSS custom props to control the card width + gap per breakpoint */
    --news-card-w: 243px;
    /* base (mobile) */
    --news-gap: 24px;
}

/* Layout: stack + center on mobile */
.news-row {
    display: flex;
    flex-direction: column;
    gap: var(--news-gap);
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 1.25rem;
}

/* Card */
.news-item {
    display: flex;
    flex-direction: column;
    /* gap: 15px; */
    align-items: center;
    width: var(--news-card-w);
}

/* Keep headings on one line so both cards align nicely */
.news-item h4 {
    /* margin: 0; */
    line-height: 1.2;
    white-space: nowrap;
    /* overflow: hidden; */
    text-overflow: ellipsis;
}

/* Image scales with the card width */
.news-item-img {
    width: var(--news-card-w);
    aspect-ratio: 243 / 160;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
    display: block;
    margin-bottom: 1rem;
}

/* Text width follows card width; kill global margins inside cards */
.news-item-text {
    width: var(--news-card-w);
    max-width: var(--news-card-w);
    margin-left: 0;
    margin-right: 0;
}

@media (min-width: 576px) {
    .events .news .h-yellow .h-white {
        padding-bottom: 1.5rem;
    }

    .news {
        --news-card-w: min(40vw, 300px);
        --news-gap: 32px;
    }

    .heading-pt {
        padding-top: 1.5rem;
    }

    .content {
        margin-top: -100px;
        padding-top: 100px;
    }
}

@media (min-width: 768px) {
    .news {
        --news-card-w: min(35vw, 400px);
        --news-gap: 100px;
    }

    .news-row {
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        text-align: left;
    }

    .news-item {
        align-items: flex-start;
    }

    .content {
        margin-top: -120px;
        padding-top: 120px;
    }
}

@media (min-width: 992px) {
    .news-item-img {
        margin-bottom: 2rem;
    }

    .content {
        margin-top: -140px;
        padding-top: 140px;
    }
}
</style>
