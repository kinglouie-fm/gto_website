<template>
    <section class="hero">
        <picture>
            <source media="(min-width: 768px)" srcset="/images/other/ben911.jpg" class="hero-img" />
            <img src="/images/other/rollsroyce.webp" alt="Rolls Royce" class="hero-img" />
        </picture>
    </section>
    <VerticalSlider />
    <section class="content container-pb">
        <h3 class="text-center h-yellow h-first">We share passion!</h3>
        <p class="text-center content-text">
            We are a small passionate group of car enthusiasts from Luxembourg dedicated to sharing our love for
            the automobile world through events, photoshoots, and prestige car tours.
        </p>
        <div class="container d-flex justify-content-center align-items-center">
            <Button to="team">Our Passion</Button>
            <SocialIcons />
        </div>
    </section>
</template>

<script setup>
import VerticalSlider from '@/components/VerticalSlider.vue';
import Button from '@/components/Button.vue';
import SocialIcons from '@/components/SocialIcons.vue';
</script>

<style scoped>
/* ---------------------- Base Styles (for screens below 576px) ---------------------- */

.hero-img {
    object-position: 50% 100%;
}

@media (min-width: 576px) {
    .hero-img {
        object-position: 50% 70%;
    }
}
</style>
