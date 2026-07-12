<template>
    <main>
        <HeroSection desktopSrc="/images/other/ben911.jpg" mobileSrc="/images/other/rollsroyce.webp" alt="Rolls Royce"
            customClass="home-hero" :desktopFramed="true" :showMobileFade="true" desktopHeight="60svh"
            mobileObjectPosition="50% 80%" desktopObjectPosition="60% 60%" />
        <VerticalSlider />
        <section class="content container-pb">
            <h1 class="text-center h-yellow h-first">We share passion!</h1>
            <p class="text-center content-text">
                We are a small passionate group of car enthusiasts from Luxembourg dedicated to sharing our love for
                the automobile world through events, photoshoots, and prestige car tours.
            </p>
            <div class="container home-cta">
                <div class="home-cta__buttons">
                    <Button to="events">Events</Button>
                    <Button to="portfolio">Portfolio</Button>
                </div>
                <SocialIcons />
            </div>
        </section>
    </main>
</template>

<script setup>
import VerticalSlider from '@/components/VerticalSlider.vue';
import Button from '@/components/Button.vue';
import SocialIcons from '@/components/SocialIcons.vue';
import HeroSection from '@/components/HeroSection.vue';
</script>

<style scoped>
.home-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.home-cta__buttons {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
}

.home-cta :deep(.btn) {
    margin-right: 0;
}

@media (min-width: 768px) {
    .home-cta {
        flex-direction: row;
        justify-content: center;
    }

    .home-cta__buttons {
        width: auto;
    }
}
</style>
