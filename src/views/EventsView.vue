<template>
    <HeroSection desktopSrc="/images/other/rollsroyce_cut.jpeg" mobileSrc="/images/portfolio/Gwagon.webp"
        alt="Mercedes G63 AMG" customClass="portfolio-hero" />
    
    <VerticalSlider />

    <section class="content events text-center container-p">
        <h3 class="text-center h-yellow h-first">Events</h3>

        <div class="scs-container">
            <div class="scs-img-container">
                <img src="/images/other/gto_scs6.webp" alt="Porsche 992 GT3" class="img-fluid gto_scs6 border"
                    @click="openImageModal('/images/other/gto_scs6.webp', 'Porsche 992 GT3')" />
            </div>
            <h4 class="text-center h-white-small heading-pt">Supercar Sunday</h4>
            <p class="text-center content-text">
                Our main event is the Supercar Sunday (SCS) by GTO Luxembourg. Once a year, we bring together car
                enthusiasts to share their passion, to check out some cool cars, and spend a great day in good company.
            </p>
        </div>

        <div class="tour-container">
            <div class="tour-img-container">
                <img src="/images/other/gto_tours.webp" alt="GTO goes Luxembourg" class="img-fluid gto_tour border"
                    @click="openImageModal('/images/other/gto_tours.webp', 'GTO goes Luxembourg')" />
            </div>
            <h4 class="text-center h-white-small heading-pt">GTO goes Luxembourg</h4>
            <p class="text-center content-text">
                GTO goes Luxembourg is our smaller car tour that we organize a few times a year. It's usually held in a
                more private and relaxed setting, giving everyone a chance to enjoy the drive, have some fun, and
                connect with other car enthusiasts along the way.
            </p>
        </div>
    </section>

    <section class="news text-center container-p">
        <h3 class="text-center h-white">News that helps</h3>
        <div class="news-row heading-pt" role="list">
            <article class="news-item" role="listitem">
                <h4 class="h-yellow-small">Luxemburger Wort</h4>
                <img class="img-fluid news-item-img border" src="/images/other/gto_scs6.webp" alt="First news image" />
                <p class="news-item-text content-text">
                “In Mersch on Sunday, 'Supercar Sunday' will showcase dream cars that one would hardly encounter on the roads of the Grand Duchy.” <br> — <i>Translated from Luxemburger Wort, 2024</i>
                </p>
                <ButtonFilled href="https://www.wort.lu/panorama/neun-freunde-holen-die-supercars-nach-luxemburg/13661126.html" class="news-button">Learn more</ButtonFilled>
            </article>

            <article class="news-item" role="listitem">
                <h4 class="h-yellow-small">RTL Lëtzebuerg</h4>
                <img class="img-fluid news-item-img border" src="/images/other/gto_tours.webp" alt="Second news image" />
                <p class="content-text news-item-text">
                “This Sunday in Mersch, under good weather, the first edition of 'Supercar Sunday' took place.” <br> — <i>Translated from RTL Lëtzebuerg, 2018</i>
                </p>
                <ButtonFilled href="https://today.rtl.lu/pictures/30089.html" class="news-button">Learn more</ButtonFilled>
            </article>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeroSection from '@/components/HeroSection.vue';
import VerticalSlider from '@/components/VerticalSlider.vue';
import ButtonFilled from '@/components/ButtonFilled.vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {

});
</script>

<style scoped>
.hero {
    margin-top: var(--navbar-height);
}

.img-fluid {
    cursor: pointer;
}

.content {
    background-color: rgb(48, 56, 65);
    margin-top: -80px;
    padding-top: 80px;
    color: white;
}

.events {
    background-color: rgb(48, 56, 65);
}

.news {
    background-color: rgb(76, 84, 94);
}

/* Container to center the image using flexbox */
.scs-img-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Base styles for the Ferrari image on mobile (e.g. ~393px width screens) */
.gto_scs6 {
    width: 243px;
    height: 160px;
    object-fit: cover;
    border-radius: 10px;
}

/* Container to center the image using flexbox */
.tour-img-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Base styles for the Ferrari image on mobile (e.g. ~393px width screens) */
.gto_tour {
    width: 243px;
    height: 160px;
    object-fit: cover;
    border-radius: 10px;
}

.heading-pt {
    padding-top: 1.25rem;
}

.news {
  background-color: rgb(76, 84, 94);

  /* CSS custom props to control the card width + gap per breakpoint */
  --news-card-w: 243px;  /* base (mobile) */
  --news-gap: 24px;
}

/* Layout: stack + center on mobile */
.news-row {
  display: flex;
  flex-direction: column;
  gap: var(--news-gap);
  justify-content: center;  /* main axis (vertical on mobile) */
  align-items: center;      /* cross-axis center for the cards */
  text-align: left;         /* keep card content left-aligned */
  margin-top: 1.25rem;      /* keep your heading-pt rhythm */
}

/* Card */
.news-item {
  display: flex;
  flex-direction: column;
  /* gap: 15px; */
  align-items: flex-start;
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
}

/* Text width follows card width; kill global margins inside cards */
.news-item-text {
  width: var(--news-card-w);
  max-width: var(--news-card-w);
  margin-left: 0;
}

@media (min-width: 576px) {
    .gto_scs6,
    .gto_tour {
        width: 40%;
        max-width: 300px;
        height: auto;
        max-height: 160px;
    }

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
    .hero-img {
        object-position: 50% 10%;
    }

    .gto_scs6,
    .gto_tour {
        width: 35%;
        max-width: 400px;
        max-height: 200px;
    }

    .news {
        --news-card-w: min(35vw, 400px);
        --news-gap: 100px;
    }

    .news-row {
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
    }

    .content {
        margin-top: -120px;
        padding-top: 120px;
    }
}

@media (min-width: 992px) {
    .gto_scs6,
    .gto_tour {
        width: 35%;
        max-width: 600px;
        max-height: 350px;
    }

    .content {
        margin-top: -140px;
        padding-top: 140px;
    }
}
</style>