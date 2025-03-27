<template>
    <section class="hero">
        <picture>
            <source media="(min-width: 768px)" srcset="/images/other/rollsroyce_cut.jpeg" class="hero-img" />
            <img src="/images/portfolio/Gwagon.webp" alt="Mercedes G-Wagon" class="hero-img" />
        </picture>
    </section>
    <VerticalSlider />
    <section class="content">
        <h3 class="text-center h-yellow">Book a photoshooting</h3>
        <p class="text-center content-text">
            We'd love to capture your car! Reach out through the contact form below or connect with us on social media.
        </p>
        <div class="container d-flex justify-content-center align-items-center">
            <Button class="me-5" @click="book()">Book</Button>
            <SocialIcons />
        </div>
    </section>

    <section class="portfolio text-center pb-5">
        <h3 class="text-center h-white">Our portfolio</h3>
        <!-- Portfolio grid as three columns -->
        <div class="portfolio-grid">
            <!-- Column 1: small, large, small -->
            <div class="portfolio-column">
                <img src="/images/portfolio/Lamborghini_purplemante.webp" alt="Image 1" class="grid-img small img-1" />
                <img src="/images/other/rollsroyce.webp" alt="Image 2" class="grid-img large img-2" />
                <img src="/images/portfolio/Porsche_Dakar.webp" alt="Image 3" class="grid-img small img-3" />
            </div>
            <!-- Column 2: large, small, small -->
            <div class="portfolio-column">
                <img src="/images/portfolio/Gwagon.webp" alt="Image 4" class="grid-img large img-4" />
                <img src="/images/portfolio/Lamborghini_aventador.webp" alt="Image 5" class="grid-img small img-5" />
                <img src="/images/portfolio/Audi_R8.webp" alt="Image 6" class="grid-img small img-6" />
            </div>
            <!-- Column 3: small, small, large -->
            <div class="portfolio-column">
                <img src="/images/portfolio/Porsche_GT4RS.webp" alt="Image 7" class="grid-img small img-7" />
                <img src="/images/portfolio/Bmw_m2g87.webp" alt="Image 8" class="grid-img small img-8" />
                <img src="/images/portfolio/McLaren_765LT.webp" alt="Image 9" class="grid-img large img-9" />
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';
import VerticalSlider from '@/components/VerticalSlider.vue';
import Button from '@/components/Button.vue';
import SocialIcons from '@/components/SocialIcons.vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const book = () => {
    window.alert('Not available yet. For any concerns, please contact us via social media or gto.luxembourg@hotmail.com');
}

onMounted(() => {
    // Animate .photoshooting when it scrolls into view
    gsap.from('.portfolio', {
        scrollTrigger: {
            trigger: '.portfolio',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2
    })
});
</script>

<style scoped>
/* ---------------------- Base Styles ---------------------- */
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

.hero::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to bottom, transparent, rgb(48, 56, 65));
}

.content {
    background-color: rgb(48, 56, 65);
    margin-top: -80px;
    padding-top: 80px;
    color: white;
}

.content-text {
    margin: 1.5rem 2.5rem;
}

.content .container {
    margin-bottom: 2.5rem;
}

.portfolio {
    background-color: rgb(76, 84, 94);
    color: white;
}

.h-white {
    padding-top: 3rem;
}

/* ---------------------- Portfolio Grid ---------------------- */
/* Portfolio grid container: three columns with an 11px gap between columns and 20px horizontal padding */
.portfolio-grid {
    display: flex;
    gap: 11px;
    padding: 0 20px;
    justify-content: center;
    margin-top: 24px;
}

/* Each column is a vertical flex container with an 11px gap between items */
.portfolio-column {
    display: flex;
    flex-direction: column;
    gap: 11px;
}

/* Base mobile sizes for the images (for a 393px wide design):
   - Small images: 110px × 89px
   - Large images: 110px × 139px */
.grid-img {
    object-fit: cover;
    display: block;
}

.grid-img.small {
    width: 110px;
    height: 89px;
}

.grid-img.large {
    width: 110px;
    height: 139px;
}

.img-1 {
    object-position: 80% 0%;
}

.img-4 {
    object-position: 50% 90%;
}

.img-8 {
    object-position: 50% 70%;
}

/* Responsive scaling */

/* For screens 576px and wider, scale up by a factor of 1.2 */
@media (min-width: 576px) {
    .grid-img.small {
        width: calc(110px * 1.2);
        height: calc(89px * 1.2);
    }

    .grid-img.large {
        width: calc(110px * 1.2);
        height: calc(139px * 1.2);
    }

    .hero-img {
        object-position: 50% 40%;
    }

    .content-text {
        margin: 1.5rem 5rem;
    }

    .content .container {
        margin-bottom: 3rem;
    }
}

/* For screens 768px and wider, scale up by a factor of 1.4 */
@media (min-width: 768px) {
    .grid-img.small {
        width: calc(110px * 1.4);
        height: calc(89px * 1.4);
    }

    .grid-img.large {
        width: calc(110px * 1.4);
        height: calc(139px * 1.4);
    }

    .content-text {
        margin: 2rem 7rem;
    }

    .content .container {
        margin-bottom: 4rem;
    }
}

/* For screens 992px and wider, scale up by a factor of 1.6 */
@media (min-width: 992px) {
    .grid-img.small {
        width: calc(110px * 2);
        height: calc(89px * 2);
    }

    .grid-img.large {
        width: calc(110px * 2);
        height: calc(139px * 2);
    }

    .content-text {
        margin: 2.5rem 10rem;
    }

    .content .container {
        margin-bottom: 5rem;
    }
}

@media (min-width: 1200px) {
    .grid-img.small {
        width: calc(110px * 3);
        height: calc(89px * 3);
    }

    .grid-img.large {
        width: calc(110px * 3);
        height: calc(139px * 3);
    }

    .content-text {
        margin: 3rem 15rem;
    }

    .content .container {
        margin-bottom: 5rem;
    }
}

@media (min-width: 1400px) {
    .h-yellow {
        margin-top: 5rem;
    }

    .content-text {
        margin: 3rem 20rem;
    }

    .content .container {
        margin-bottom: 7rem;
    }
}
</style>
