<template>
    <section :class="['hero', customClass]">
        <picture>
            <source media="(min-width: 768px)" :srcset="desktopSrc" class="hero-img" />
            <img :src="mobileSrc" :alt="alt" class="hero-img" />
        </picture>
    </section>
</template>

<script setup>
defineProps({
    desktopSrc: {
        type: String,
        required: true,
    },
    mobileSrc: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
    customClass: {
        type: String,
        default: '',
    }
})
</script>

<style scoped>
.hero-img {
    object-position: 50% 70%;
}

.portfolio-hero .hero-img {
    object-position: 50% 40%;
}
</style>
