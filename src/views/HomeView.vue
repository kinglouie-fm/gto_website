<template>
    <section class="hero">
        <picture>
            <source media="(min-width: 768px)" srcset="/images/other/ben911.jpg" class="hero-img" />
            <img src="/images/other/rollsroyce.webp" alt="Rolls Royce" class="hero-img" />
        </picture>
    </section>
    <VerticalSlider />
    <section class="content">
        <h3 class="text-center h-yellow">We share passion!</h3>
        <p class="text-center home-text">
            We are a small passionate group of car enthusiasts dedicated to sharing our love for
            the automobile world through events, photoshoots, and prestige car tours.
        </p>
        <div class="container d-flex justify-content-center align-items-center">
            <Button to="team" class="me-5">Our Passion</Button>
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
.hero {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.hero-img {
    width: 100%;
    height: 100%;
    max-height: 900px;
    object-fit: cover;
    object-position: 50% 100%;
}

/* Create the gradient fade at the bottom of the hero */
.hero::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to bottom, transparent, rgb(48, 56, 65));
}

/* Content section overlaps the hero by 80px */
.content {
    background-color: rgb(48, 56, 65);
    margin-top: -80px;
    padding-top: 80px;
    color: white;
}

.home-text {
    margin: 1.5rem 2rem;
}

.content .container {
    margin-bottom: 2.5rem;
}

@media (min-width: 576px) {
    .hero-img {
        object-position: 50% 70%;
    }

    .home-text {
        margin: 1.5rem 5rem;
    }

    .content .container {
        margin-bottom: 3rem;
    }
}

@media (min-width: 768px) {
    .home-text {
        margin: 2rem 7rem;
    }
}

@media (min-width: 992px) {
    .home-text {
        margin: 2.5rem 10rem;
    }
}

@media (min-width: 1200px) {
    .home-text {
        margin: 3rem 15rem;
    }
}

@media (min-width: 1400px) {
    .home-text {
        margin: 0 20rem;
        margin-top: 3rem;
        margin-bottom: 3rem;
    }

    .h-yellow {
        margin-top: 5rem;
    }
}
</style>
