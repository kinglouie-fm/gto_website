<template>
    <main class="lens-page lens-results">
        <RouterLink class="lens-back" to="/lens/camera/">‹ Photo options</RouterLink>
        <section v-if="details?.make" class="lens-result">
            <img v-if="result.photo" class="lens-photo" :src="result.photo" alt="Your car photo">
            <div>
                <p v-if="!inconclusive" class="lens-note lens-match">Likely match</p>
                <h1 class="h-yellow" aria-live="polite">{{ inconclusive ? 'Model uncertain' : [details.make, details.model].join(' ') }}</h1>
                <p v-if="note" class="lens-note" role="status">{{ note }}</p>
                <section aria-labelledby="lens-specifications">
                    <h2 id="lens-specifications" class="h-white-small">Vehicle specifications</h2>
                    <dl class="lens-specs">
                        <div v-for="(value, key) in flatDetails" :key="key" :class="{ 'lens-fact': key === 'Fun Fact' }">
                            <dt>{{ key }}</dt>
                            <dd>{{ inconclusive ? 'Unconfirmed' : value }}</dd>
                        </div>
                    </dl>
                </section>
                <LensRefineMatch v-if="result.photo" :result="result" @update="updateResult" />
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
import LensRefineMatch from '@/components/LensRefineMatch.vue'
import { getLensResult, saveLensResult } from '@/utils/lens'
import '@/assets/css/lens.css'

const result = ref(null)
const ready = ref(false)
onMounted(() => {
    result.value = getLensResult()
    ready.value = true
})

const details = computed(() => result.value?.details)
const inconclusive = computed(() => result.value?.review?.status === 'inconclusive')
const note = computed(() => {
    const review = result.value?.review || {}
    if (inconclusive.value) return 'The available clues are inconclusive. Try a clearer rear badge photo.'
    if (review.status === 'trim_uncertain') return 'Exact trim uncertain. A clearer rear badge may help.'
    if (review.status === 'trim_supported') return review.rear ? 'Reviewed using both photos.' : 'Photo and web clues support this match.'
    if (review.evidence === null) return 'Google was unavailable. This match is based on the photo.'
    if (review.usedClues === false && review.evidence?.labels) return 'The combined review could not finish. Showing the initial photo match.'
    if (review.evidence && !review.evidence.labels?.length && !review.evidence.matching_page_titles?.length)
        return 'Google found no identifying clues. Try a rear badge photo.'
    return 'A rear badge photo can help verify the trim.'
})
function updateResult(details, review) {
    const photo = result.value.photo
    saveLensResult(photo, details, review)
    result.value = { photo, details, review }
}
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
