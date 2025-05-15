<template>
    <!-- HeroSection now shows the user’s own snapshot -->
    <HeroSection :desktopSrc="imageSrc" :mobileSrc="imageSrc" alt="Captured snapshot" customClass="portfolio-hero" />

    <section class="content container-pb">
        <h3 class="text-center h-yellow h-first">CAR DETAILS</h3>

        <h4 class="text-center h-white-small">{{ details.model }}</h4>

        <ul class="details-list mx-auto">
            <li>
                <span class="detail-key">Engine:</span>
                <span class="detail-value">{{ details.engine }}</span>
            </li>
            <li>
                <span class="detail-key">Power:</span>
                <span class="detail-value">{{ details.power }}</span>
            </li>
            <li>
                <span class="detail-key">Torque:</span>
                <span class="detail-value">{{ details.torque }}</span>
            </li>
            <li>
                <span class="detail-key">Top Speed:</span>
                <span class="detail-value">{{ details.topSpeed }}</span>
            </li>
            <li>
                <span class="detail-key">0–100 km/h:</span>
                <span class="detail-value">{{ details.acceleration }}</span>
            </li>
            <li>
                <span class="detail-key">Type:</span>
                <span class="detail-value">{{ details.type }}</span>
            </li>
            <li>
                <span class="detail-key">Year:</span>
                <span class="detail-value">{{ details.year }}</span>
            </li>
            <li>
                <span class="detail-key">Fun Fact:</span>
                <span class="detail-value">{{ details.funFact }}</span>
            </li>
        </ul>

        <!-- scan again -->
        <div class="text-center mt-4">
            <ButtonFilled @click="scanAgain">Scan Again</ButtonFilled>
        </div>

        <p class="text-center terms-text mt-2">
            AI can make mistakes. Check important info.
        </p>
    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection from '@/components/HeroSection.vue'
import ButtonFilled from '@/components/ButtonFilled.vue'

const imageSrc = ref('')
const details = ref({})
const router = useRouter()

onMounted(() => {
    imageSrc.value = sessionStorage.getItem('capturedImage') || ''
    details.value = JSON.parse(sessionStorage.getItem('capturedDetails') || '{}')
})

// onBeforeUnmount(() => {
//     // clear everything
//     sessionStorage.removeItem('capturedImage')
//     sessionStorage.removeItem('capturedDetails')
// })

function scanAgain() {
    router.push('/lens/camera')
}
</script>

<style scoped>
.details-list {
    list-style: none;
    padding: 0;
    max-width: 300px;
    /* or whatever width you need */
    width: 100%;
}

.details-list li {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0;
    color: white;
    font-size: 1rem;
}

.detail-key {
    font-weight: 600;
}

.detail-value {
    text-align: right;
}

.terms-text {
    font-size: 0.7rem;
}
</style>
