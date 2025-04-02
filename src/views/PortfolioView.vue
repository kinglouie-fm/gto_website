<template>
    <HeroSection desktopSrc="/images/other/rollsroyce_cut.jpeg" mobileSrc="/images/portfolio/Gwagon.webp"
        alt="Mercedes G63 AMG" customClass="portfolio-hero" />
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
        <PortfolioGrid :images="portfolioImages" @image-click="openImageModal" />
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
import HeroSection from '@/components/HeroSection.vue';
import VerticalSlider from '@/components/VerticalSlider.vue';
import PortfolioGrid from '@/components/PortfolioGrid.vue'
import SocialIcons from '@/components/SocialIcons.vue';
import Button from '@/components/Button.vue';
import Modal from '@/components/Modal.vue';
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
const openImageModal = (image) => {
    selectedImage.value = image.src;
    selectedCarName.value = image.carName;
}

const portfolioImages = [
    { src: '/images/portfolio/Lamborghini_purplemante.webp', alt: 'Lamborghini Huracan Performante', carName: 'Lamborghini Huracan Performante', size: 'small', customClass: 'img-1' },
    { src: '/images/other/rollsroyce.webp', alt: 'Rolls Royce Phantom', carName: 'Rolls Royce Phantom', size: 'large', customClass: 'img-2' },
    { src: '/images/portfolio/Porsche_Dakar.webp', alt: 'Porsche 911 Dakar', carName: 'Porsche 911 Dakar', size: 'small', customClass: 'img-3' },
    { src: '/images/portfolio/Gwagon.webp', alt: 'Mercedes-Benz G63 AMG', carName: 'Mercedes-Benz G63 AMG', size: 'large', customClass: 'img-4' },
    { src: '/images/portfolio/Lamborghini_aventador.webp', alt: 'Lamborghini Aventador LP700', carName: 'Lamborghini Aventador LP700', size: 'small', customClass: 'img-5' },
    { src: '/images/portfolio/Audi_R8.webp', alt: 'Audi R8 V10 Plus', carName: 'Audi R8 V10 Plus', size: 'small', customClass: 'img-6' },
    { src: '/images/portfolio/Porsche_GT4RS.webp', alt: 'Porsche 718 Cayman GT4 RS', carName: 'Porsche 718 Cayman GT4 RS', size: 'small', customClass: 'img-7' },
    { src: '/images/portfolio/Bmw_m2g87.webp', alt: 'BMW M2 G87', carName: 'BMW M2 G87', size: 'small', customClass: 'img-8' },
    { src: '/images/portfolio/McLaren_765LT.webp', alt: 'McLaren 765LT', carName: 'McLaren 765LT', size: 'large', customClass: 'img-9' }
]

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

@media (min-width: 576px) {
    .portfolio-hero .hero-img {
        object-position: 50% 40%;
    }
}
</style>
