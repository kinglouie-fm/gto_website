<template>
    <section class="hero">
        <picture>
            <source media="(min-width: 768px)" srcset="/images/other/rollsroyce_cut.jpeg" class="hero-img" />
            <img src="/images/portfolio/Gwagon.webp" alt="Mercedes G-Wagon" class="hero-img" />
        </picture>
    </section>
    <VerticalSlider />
    <section class="content container-pb">
        <h3 class="text-center h-yellow h-first">Book a photoshooting</h3>
        <p class="text-center content-text">
            We'd love to capture your car! Reach out through the contact form below or connect with us on social media.
        </p>
        <div class="container d-flex justify-content-center align-items-center">
            <Button @click="openForm">Book</Button>
            <SocialIcons />
        </div>
    </section>

    <section class="portfolio text-center container-p">
        <h3 class="text-center h-white">Our portfolio</h3>
        <!-- Portfolio grid as three columns -->
        <div class="portfolio-grid">
            <!-- Column 1: small, large, small -->
            <div class="portfolio-column">
                <img src="/images/portfolio/Lamborghini_purplemante.webp" alt="Image 1" class="grid-img small img-1"
                    @click="openImageModal('/images/portfolio/Lamborghini_purplemante.webp', 'Lamborghini Huracan Performante')" />
                <img src="/images/other/rollsroyce.webp" alt="Image 2" class="grid-img large img-2"
                    @click="openImageModal('/images/other/rollsroyce.webp', 'Rolls Royce Phantom')" />
                <img src="/images/portfolio/Porsche_Dakar.webp" alt="Image 3" class="grid-img small img-3"
                    @click="openImageModal('/images/portfolio/Porsche_Dakar.webp', 'Porsche 911 Dakar')" />
            </div>
            <!-- Column 2: large, small, small -->
            <div class="portfolio-column">
                <img src="/images/portfolio/Gwagon.webp" alt="Image 4" class="grid-img large img-4"
                    @click="openImageModal('/images/portfolio/Gwagon.webp', 'Mercedes-Benz G63 AMG')" />
                <img src="/images/portfolio/Lamborghini_aventador.webp" alt="Image 5" class="grid-img small img-5"
                    @click="openImageModal('/images/portfolio/Lamborghini_aventador.webp', 'Lamborghini Aventador LP700')" />
                <img src="/images/portfolio/Audi_R8.webp" alt="Image 6" class="grid-img small img-6"
                    @click="openImageModal('/images/portfolio/Audi_R8.webp', 'Audi R8 V10 Plus')" />
            </div>
            <!-- Column 3: small, small, large -->
            <div class="portfolio-column">
                <img src="/images/portfolio/Porsche_GT4RS.webp" alt="Image 7" class="grid-img small img-7"
                    @click="openImageModal('/images/portfolio/Porsche_GT4RS.webp', 'Porsche 718 Cayman GT4 RS')" />
                <img src="/images/portfolio/Bmw_m2g87.webp" alt="Image 8" class="grid-img small img-8"
                    @click="openImageModal('/images/portfolio/Bmw_m2g87.webp', 'BMW M2 G87')" />
                <img src="/images/portfolio/McLaren_765LT.webp" alt="Image 9" class="grid-img large img-9"
                    @click="openImageModal('/images/portfolio/McLaren_765LT.webp', 'McLaren 765LT')" />
            </div>
        </div>
    </section>

    <!-- Image Modal: Opens when selectedImage is set -->
    <ImageModal v-if="selectedImage" :imageSrc="selectedImage" :carName="selectedCarName"
        @close="selectedImage = null" />

    <Modal v-if="showModal" @close="closeForm">
        <iframe title="Booking Form" :src="typeformEmbedUrl" style="width: 100%; height: 500px; border: 0;"
            allow="camera; microphone; autoplay; encrypted-media">
        </iframe>
    </Modal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Modal from '@/components/Modal.vue';
import VerticalSlider from '@/components/VerticalSlider.vue';
import Button from '@/components/Button.vue';
import SocialIcons from '@/components/SocialIcons.vue';
import ImageModal from '@/components/ImageModal.vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

const showModal = ref(false)
// Replace the URL below with your actual Typeform embed URL.
const typeformEmbedUrl = "https://cxgwixcj505.typeform.com/to/eRlQG98c"

const openForm = () => {
    showModal.value = true
}

const closeForm = () => {
    showModal.value = false
}

// Reactive property to hold the URL of the clicked image
const selectedImage = ref(null);
const selectedCarName = ref('');

// Function to open the image modal
const openImageModal = (imageUrl, carName) => {
    selectedImage.value = imageUrl;
    selectedCarName.value = carName;
}

onMounted(() => {
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
/* Your existing portfolio styles remain here */
.hero-img {
    object-position: 50% 100%;
}

.portfolio {
    background-color: rgb(76, 84, 94);
    color: white;
}

/* Portfolio Grid */
.portfolio-grid {
    display: flex;
    gap: 11px;
    padding: 0 20px;
    justify-content: center;
    margin-top: 24px;
}

.portfolio-column {
    display: flex;
    flex-direction: column;
    gap: 11px;
}

.grid-img {
    object-fit: cover;
    display: block;
    cursor: pointer;
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

/* Responsive scaling for the grid */
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
}

@media (min-width: 768px) {
    .grid-img.small {
        width: calc(110px * 1.4);
        height: calc(89px * 1.4);
    }

    .grid-img.large {
        width: calc(110px * 1.4);
        height: calc(139px * 1.4);
    }
}

@media (min-width: 992px) {
    .grid-img.small {
        width: calc(110px * 2);
        height: calc(89px * 2);
    }

    .grid-img.large {
        width: calc(110px * 2);
        height: calc(139px * 2);
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
}
</style>
