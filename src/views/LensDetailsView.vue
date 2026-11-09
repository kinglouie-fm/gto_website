<template>
    <main class="lens-page lens-results">
        <RouterLink class="lens-back" to="/lens/camera/">‹ Photo options</RouterLink>
        <section v-if="details?.make" class="lens-result">
            <img v-if="result.photo" class="lens-photo" :src="result.photo" alt="Your car photo">
            <div>
                <p class="lens-note lens-match">Likely match</p>
                <h1 class="h-yellow">{{ details.make }} {{ details.model }}</h1>
                <dl class="lens-specs">
                    <div v-for="(value, key) in flatDetails" :key="key" :class="{ 'lens-fact': key === 'Fun Fact' }">
                        <dt>{{ key }}</dt>
                        <dd>{{ value }}</dd>
                    </div>
                </dl>
                <RouterLink class="lens-action" to="/lens/camera/">Scan Again</RouterLink>
                <p class="lens-note">AI can make mistakes. Check important info.</p>
            </div>
        </section>
        <section v-else-if="ready">
            <h1 class="h-yellow">Identify a car</h1>
            <p>Choose a car photo to see its details.</p>
            <RouterLink class="lens-action" to="/lens/camera/">Add a car photo</RouterLink>
        </section>
    </main>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { getLensResult } from '@/utils/lens'
import '@/assets/css/lens.css'

const result = ref(null)
const ready = ref(false)
onMounted(() => {
    result.value = getLensResult()
    ready.value = true
})

const details = computed(() => result.value?.details)
const flatDetails = computed(() => {
    const car = details.value
    if (!car) return {}
    return {
        'Year': car.year,
        'Engine Type': car.engine?.type,
        'Power (HP)': car.engine?.power_hp,
        'Torque (Nm)': car.engine?.torque_nm,
        'Exact Engine': car.engine?.['exact engine'],
        'Top Speed (km/h)': car.performance?.top_speed_kmh,
        '0–100 km/h (sec)': car.performance?.acceleration_0_100_kmh_sec,
        'Fun Fact': car.fun_fact
    }
})
</script>
