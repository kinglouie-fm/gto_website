<template>
    <section class="event-press" aria-labelledby="press-heading">
        <div class="event-press__inner">
            <h2 id="press-heading" class="h-white">In the press</h2>
            <div class="event-press__grid">
                <article v-for="article in articles" :key="article.name">
                    <h3 class="h-white-small">{{ article.name }}</h3>
                    <button type="button" class="event-press__photo event-photo" :aria-label="`Enlarge ${article.imageAlt}`"
                        @click="selectedArticle = article">
                        <img :src="article.imageSrc" :alt="article.imageAlt" width="1200" height="800"
                            loading="lazy" decoding="async" />
                    </button>
                    <p>{{ article.text }}</p>
                    <Button :href="article.href">Read coverage</Button>
                </article>
            </div>
        </div>
        <Teleport to="body">
            <ImageModal v-if="selectedArticle" :image-src="selectedArticle.imageSrc" :image-alt="selectedArticle.imageAlt"
                :car-name="selectedArticle.imageAlt" static-display @close="selectedArticle = null" />
        </Teleport>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import ImageModal from '@/components/ImageModal.vue'
import '@/assets/css/event-controls.css'
const selectedArticle = ref(null)
const articles = [
    {
        name: 'Luxemburger Wort',
        imageSrc: '/images/other/scs7_fordgt.webp',
        imageAlt: 'Ford GT from the GTO event gallery',
        text: 'A look at Supercar Sunday in Mersch and the cars brought together in 2024.',
        href: 'https://www.wort.lu/panorama/neun-freunde-holen-die-supercars-nach-luxemburg/13661126.html'
    },
    {
        name: 'RTL Lëtzebuerg',
        imageSrc: '/images/other/scs7_classic.webp',
        imageAlt: 'Ford Mustang and Ferrari from the GTO event gallery',
        text: 'Photos and coverage of the first Supercar Sunday in Mersch in 2018.',
        href: 'https://today.rtl.lu/pictures/30089.html'
    }
]
</script>

<style scoped>
.event-press {
    padding-block: clamp(3rem, 6vw, 5rem);
    color: white;
}

.event-press__inner {
    width: min(1180px, calc(100% - 40px));
    margin-inline: auto;
}

.event-press h2 {
    margin: 0 0 2rem;
}

.event-press__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2.5rem 5rem;
}

.event-press h3 {
    font-size: 1.25rem;
    line-height: 1.3;
    margin: 0 0 1rem;
}

.event-press p {
    max-width: 48ch;
    line-height: 1.65;
    color: #e0e3e7;
    margin-bottom: 1rem;
}

.event-press__photo {
    display: block;
    width: 100%;
    margin-bottom: 1.25rem;
    padding: 0;
    border: 0;
    border-radius: 10px;
    overflow: hidden;
    background: transparent;
    cursor: pointer;
}

.event-press__photo img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 243 / 160;
    object-fit: cover;
}

@media (max-width: 575.98px) {
    .event-press__grid {
        grid-template-columns: 1fr;
    }
}
</style>
