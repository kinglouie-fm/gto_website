<template>
    <details class="lens-disclosure" ref="panel">
        <summary>Refine this match</summary>
        <p class="lens-note">A clear rear badge can help identify the exact trim.</p>
        <div class="lens-rear-options">
            <label v-for="option in photoOptions" :key="option.source" class="lens-action lens-picker lens-outline">
                <LensActionLabel :busy="busy === option.source" :label="option.label" busy-label="Preparing…" />
                <input type="file" accept="image/*" :aria-label="option.label" :capture="option.capture"
                    :disabled="!!busy" @change="pickRear($event, option.source)">
            </label>
        </div>
        <div v-if="rear" class="lens-rear-preview">
            <img :src="rear" alt="Selected rear photo">
            <span>Rear photo</span>
            <button v-if="draftRear" type="button" class="lens-change" :disabled="!!busy" @click="draftRear = ''; error = ''">Discard</button>
        </div>
        <p v-if="rear || pendingClues" class="lens-note">OpenAI reviews your photos and any available Google clues together.</p>
        <button v-if="draftRear || pendingClues" class="lens-action" type="button" :disabled="!!busy" @click="runReview">
            <LensActionLabel :busy="busy === 'review'" :label="rear ? 'Review both photos' : 'Retry match review'" busy-label="Reviewing…" />
        </button>
        <p v-if="error" role="alert" class="lens-error">{{ error }}</p>
    </details>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import LensActionLabel from './LensActionLabel.vue'
import { lensPreview, readLensFile } from '@/utils/lens'
import { hasWebClues, reviewMatch } from '@/utils/lensReview'

const props = defineProps({ result: { type: Object, required: true } })
const emit = defineEmits(['update'])
const review = computed(() => props.result.review || {})
const draftRear = ref('')
const rear = computed(() => draftRear.value || review.value.rear)
const pendingClues = computed(() => hasWebClues(review.value.evidence) && !review.value.usedClues)
const busy = ref('')
const error = ref('')
const panel = ref(null)
const lifetime = new AbortController()
const photoOptions = [
    { source: 'camera', label: 'Take rear photo', capture: 'environment' },
    { source: 'library', label: 'Choose from library' }
]

onBeforeUnmount(() => lifetime.abort())

async function pickRear(event, source) {
    const file = event.target.files[0]
    event.target.value = ''
    if (!file || busy.value) return
    error.value = ''
    busy.value = source
    try {
        draftRear.value = lensPreview(await readLensFile(file))
    } catch {
        error.value = 'This photo could not be opened. Try a JPEG or PNG.'
    } finally {
        busy.value = ''
    }
}

async function runReview() {
    if (busy.value) return
    busy.value = 'review'
    error.value = ''
    const current = props.result
    const state = { ...review.value }
    const second = rear.value
    state.originalCandidate ||= [current.details.make, current.details.model].join(' ').trim()
    try {
        const updated = await reviewMatch(current.photo, second, state.originalCandidate, state.evidence, lifetime.signal)
        if (updated.status === 'different_vehicle') {
            error.value = 'These photos appear to show different cars. Choose another rear photo.'
            return
        }
        state.status = updated.status
        state.rear = second
        state.usedClues = hasWebClues(state.evidence)
        emit('update', updated.details || current.details, state)
        draftRear.value = ''
        panel.value.open = false
    } catch (failure) {
        if (!lifetime.signal.aborted) error.value = failure.message
    } finally {
        busy.value = ''
    }
}
</script>
