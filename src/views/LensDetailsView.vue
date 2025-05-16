<template>
    <!-- HeroSection now shows the user’s own snapshot -->
    <HeroSection :desktopSrc="imageSrc" :mobileSrc="imageSrc" alt="Captured snapshot" customClass="portfolio-hero" />

    <section v-if="details.make" class="content container-pb">
        <h3 class="text-center h-yellow h-first">CAR DETAILS</h3>

        <h4 v-if="details.model" class="text-center h-white-small">{{ details.make + " " + details.model }}</h4>

        <ul class="details-list mx-auto">
            <li v-for="(value, key) in flatDetails" :key="key">
                <span class="detail-key">{{ key }}</span>
                <span class="detail-value">{{ value }}</span>
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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
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

// Flatten nested JSON into simple key/value pairs for display
const flatDetails = computed(() => {
    if (!details.value) return {}
    return {
        'Year': details.value.year,
        'Engine Type': details.value.engine.type,
        'Power (HP)': details.value.engine.power_hp,
        'Torque (Nm)': details.value.engine.torque_nm,
        'Exact Engine': details.value.engine["exact engine"],
        'Top Speed (km/h)': details.value.performance.top_speed_kmh,
        '0–100 km/h (sec)': details.value.performance.acceleration_0_100_kmh_sec,
        'Fun Fact': details.value.fun_fact
    }
})
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
