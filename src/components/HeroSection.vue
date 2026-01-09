<template>
    <section :class="['hero', customClass]">
        <picture>
            <source :srcset="desktopSrc" media="(min-width: 768px)" />
            <img :src="mobileSrc" :alt="alt" class="hero-img" decoding="async" fetchpriority="high" loading="eager" />
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
