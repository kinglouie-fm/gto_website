<template>
    <main>
        <HeroSection desktopSrc="/images/other/rollsroyce_cut.jpeg" mobileSrc="/images/portfolio/Gwagon.webp"
            alt="Mercedes G63 AMG" customClass="portfolio-hero" />

        <VerticalSlider />

        <section class="content container-pb">
            <h3 class="text-center h-yellow h-first">Book a free photoshooting</h3>
            <p class="text-center content-text">
                We'd love to capture your car for free! Reach out through the contact form below or connect with us on
                social media.
            </p>
            <div class="container d-flex justify-content-center align-items-center">
                <Button @click="openForm">Book</Button>
                <SocialIcons />
            </div>
        </section>

        <section class="portfolio text-center container-p">
            <h3 class="text-center h-white">Our portfolio</h3>

            <!-- Grid uses thumbs -->
            <PortfolioGrid :images="portfolioImages" @image-click="openImageModal" />
        </section>

        <!-- Modal uses FULL image, with THUMB as placeholder -->
        <ImageModal v-if="selectedImageIndex !== null" :imageSrc="selectedFullImage" :thumbSrc="selectedThumbImage"
            :carName="selectedCarName" :showNavigation="true" @close="selectedImageIndex = null" @prev="prevImage"
            @next="nextImage" />

        <Modal v-if="showModal" @close="closeForm">
            <iframe title="Booking Form" :src="typeformEmbedUrl"
                allow="camera; microphone; autoplay; encrypted-media" />
        </Modal>
    </main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import VerticalSlider from '@/components/VerticalSlider.vue'
import PortfolioGrid from '@/components/PortfolioGrid.vue'
import SocialIcons from '@/components/SocialIcons.vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import ImageModal from '@/components/ImageModal.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const showModal = ref(false)
const typeformEmbedUrl = 'https://cxgwixcj505.typeform.com/to/eRlQG98c'

const openForm = () => {
    window.gtag?.('event', 'book_button_click', { placement: 'portfolio_section' })
    showModal.value = true
}

const closeForm = () => {
    showModal.value = false
}

watch(showModal, (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
})

const selectedImageIndex = ref(null)

const openImageModal = (image) => {
    const idx = portfolioImages.findIndex((img) => img.full === image.full)
    selectedImageIndex.value = idx >= 0 ? idx : null
}

const selectedFullImage = computed(() =>
    selectedImageIndex.value !== null ? portfolioImages[selectedImageIndex.value].full : null
)

const selectedThumbImage = computed(() =>
    selectedImageIndex.value !== null ? portfolioImages[selectedImageIndex.value].thumb : null
)

const selectedCarName = computed(() =>
    selectedImageIndex.value !== null ? portfolioImages[selectedImageIndex.value].carName : ''
)

const prevImage = () => {
    if (selectedImageIndex.value > 0) selectedImageIndex.value--
}

const nextImage = () => {
    if (selectedImageIndex.value < portfolioImages.length - 1) selectedImageIndex.value++
}

// Preload next/prev FULL when modal is open (makes navigation feel instant)
watch(selectedImageIndex, (idx) => {
    if (idx === null) return

    const preload = (src) => {
        if (!src) return
        const img = new Image()
        img.src = src
    }

    preload(portfolioImages[idx + 1]?.full)
    preload(portfolioImages[idx - 1]?.full)
})

// ✅ THUMBS + FULLS
// Keep thumbs small (e.g. 300–500px wide) to make the grid fast.
const portfolioImages = [
    {
        thumb: '/images/portfolio/thumbs/Lamborghini_purplemante.webp',
        full: '/images/portfolio/Lamborghini_purplemante.webp',
        alt: 'Lamborghini Huracan Performante',
        carName: 'Lamborghini Huracan Performante',
        size: 'small',
        customClass: 'img-1'
    },
    {
        thumb: '/images/portfolio/thumbs/Gwagon.webp',
        full: '/images/portfolio/Gwagon.webp',
        alt: 'Mercedes-Benz G63 AMG',
        carName: 'Mercedes-Benz G63 AMG',
        size: 'large',
        customClass: 'img-2'
    },
    {
        thumb: '/images/portfolio/thumbs/Porsche_GT4RS.webp',
        full: '/images/portfolio/Porsche_GT4RS.webp',
        alt: 'Porsche 718 Cayman GT4 RS',
        carName: 'Porsche 718 Cayman GT4 RS',
        size: 'small',
        customClass: 'img-3'
    },
    {
        thumb: '/images/other/thumbs/rollsroyce.webp',
        full: '/images/other/rollsroyce.webp',
        alt: 'Rolls Royce Phantom',
        carName: 'Rolls Royce Phantom',
        size: 'large',
        customClass: 'img-4'
    },
    {
        thumb: '/images/portfolio/thumbs/Lamborghini_aventador.webp',
        full: '/images/portfolio/Lamborghini_aventador.webp',
        alt: 'Lamborghini Aventador LP700',
        carName: 'Lamborghini Aventador LP700',
        size: 'small',
        customClass: 'img-5'
    },
    {
        thumb: '/images/portfolio/thumbs/Bmw_m2g87.webp',
        full: '/images/portfolio/Bmw_m2g87.webp',
        alt: 'BMW M2 G87',
        carName: 'BMW M2 G87',
        size: 'small',
        customClass: 'img-6'
    },
    {
        thumb: '/images/portfolio/thumbs/Porsche_Dakar.webp',
        full: '/images/portfolio/Porsche_Dakar.webp',
        alt: 'Porsche 911 Dakar',
        carName: 'Porsche 911 Dakar',
        size: 'small',
        customClass: 'img-7'
    },
    {
        thumb: '/images/portfolio/thumbs/Audi_R8.webp',
        full: '/images/portfolio/Audi_R8.webp',
        alt: 'Audi R8 V10 Plus',
        carName: 'Audi R8 V10 Plus',
        size: 'small',
        customClass: 'img-8'
    },
    {
        thumb: '/images/portfolio/thumbs/Alpine_A110.webp',
        full: '/images/portfolio/Alpine_A110.webp',
        alt: 'Alpine A110',
        carName: 'Alpine A110',
        size: 'large',
        customClass: 'img-9'
    },
    {
        thumb: '/images/portfolio/thumbs/Bugatti_Veyron.webp',
        full: '/images/portfolio/Bugatti_Veyron.webp',
        alt: 'Bugatti Veyron',
        carName: 'Bugatti Veyron',
        size: 'small',
        customClass: 'img-10'
    },
    {
        thumb: '/images/portfolio/thumbs/Ferrari_F8Tributo_2.webp',
        full: '/images/portfolio/Ferrari_F8Tributo_2.webp',
        alt: 'Ferrari F8 Tributo',
        carName: 'Ferrari F8 Tributo',
        size: 'large',
        customClass: 'img-11'
    },
    {
        thumb: '/images/portfolio/thumbs/Ferrari_430Scud.webp',
        full: '/images/portfolio/Ferrari_430Scud.webp',
        alt: 'Ferrari 430 Scuderia',
        carName: 'Ferrari 430 Scuderia',
        size: 'small',
        customClass: 'img-12'
    },
    {
        thumb: '/images/portfolio/thumbs/GWagon2.webp',
        full: '/images/portfolio/GWagon2.webp',
        alt: 'Mercedes-Benz G63 AMG',
        carName: 'Mercedes-Benz G63 AMG',
        size: 'large',
        customClass: 'img-13'
    },
    {
        thumb: '/images/portfolio/thumbs/Bugatti_Veyron_2.webp',
        full: '/images/portfolio/Bugatti_Veyron_2.webp',
        alt: 'Bugatti Veyron',
        carName: 'Bugatti Veyron',
        size: 'small',
        customClass: 'img-14'
    },
    {
        thumb: '/images/portfolio/thumbs/SpaClassic-1.webp',
        full: '/images/portfolio/SpaClassic-1.webp',
        alt: 'Spa Classic',
        carName: 'Spa Classic',
        size: 'large',
        customClass: 'img-15'
    },
    {
        thumb: '/images/portfolio/thumbs/McLaren_765LT.webp',
        full: '/images/portfolio/McLaren_765LT.webp',
        alt: 'McLaren 765LT',
        carName: 'McLaren 765LT',
        size: 'small',
        customClass: 'img-16'
    },
    {
        thumb: '/images/portfolio/thumbs/SpaClassic-2.webp',
        full: '/images/portfolio/SpaClassic-2.webp',
        alt: 'Spa Classic',
        carName: 'Spa Classic',
        size: 'large',
        customClass: 'img-17'
    },
    {
        thumb: '/images/portfolio/thumbs/Ferrari_430Scud_2.webp',
        full: '/images/portfolio/Ferrari_430Scud_2.webp',
        alt: 'Ferrari 430 Scuderia',
        carName: 'Ferrari 430 Scuderia',
        size: 'large',
        customClass: 'img-18'
    },
    {
        thumb: '/images/portfolio/thumbs/Audi_R8_2.webp',
        full: '/images/portfolio/Audi_R8_2.webp',
        alt: 'Audi R8 V10 Plus',
        carName: 'Audi R8 V10 Plus',
        size: 'large',
        customClass: 'img-19'
    },
    {
        thumb: '/images/portfolio/thumbs/Alpine_A110_2.webp',
        full: '/images/portfolio/Alpine_A110_2.webp',
        alt: 'Alpine A110',
        carName: 'Alpine A110',
        size: 'small',
        customClass: 'img-20'
    },
    {
        thumb: '/images/portfolio/thumbs/Porsche_GT4RS_2.webp',
        full: '/images/portfolio/Porsche_GT4RS_2.webp',
        alt: 'Porsche 718 Cayman GT4 RS',
        carName: 'Porsche 718 Cayman GT4 RS',
        size: 'large',
        customClass: 'img-21'
    },
    {
        thumb: '/images/portfolio/thumbs/Porsche_GModel_964RS.webp',
        full: '/images/portfolio/Porsche_GModel_964RS.webp',
        alt: 'Porsche GModel and 964 RS',
        carName: 'Porsche GModel and 964 RS',
        size: 'large',
        customClass: 'img-22'
    },
    {
        thumb: '/images/portfolio/thumbs/Ferrari_F8Tributo.webp',
        full: '/images/portfolio/Ferrari_F8Tributo.webp',
        alt: 'Ferrari F8 Tributo',
        carName: 'Ferrari F8 Tributo',
        size: 'large',
        customClass: 'img-23'
    },
    {
        thumb: '/images/portfolio/thumbs/SpaClassic-3.webp',
        full: '/images/portfolio/SpaClassic-3.webp',
        alt: 'Spa Classic',
        carName: 'Spa Classic',
        size: 'small',
        customClass: 'img-24'
    }
]

onMounted(() => {
    gsap.from('.portfolio', {
        scrollTrigger: {
            trigger: '.portfolio',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2
    })
})
</script>

<style scoped>
iframe {
    width: 100%;
    height: calc(100dvh - 80px);
    border: 0;
}

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
