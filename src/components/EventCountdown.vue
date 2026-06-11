<template>
    <div class="event-countdown">
        <template v-if="hasStartDate">
            <p class="event-countdown__label">Countdown until event</p>
            <div class="event-countdown__time" aria-live="polite">
                <span>
                    <strong>{{ remaining.days }}</strong>
                    days
                </span>
                <span>
                    <strong>{{ remaining.hours }}</strong>
                    hours
                </span>
                <span>
                    <strong>{{ remaining.minutes }}</strong>
                    minutes
                </span>
            </div>
            <p class="event-countdown__starts">Starts at {{ startsAtLabel }}</p>
        </template>

        <template v-else>
            <p class="event-countdown__label">Countdown until event</p>
            <p class="event-countdown__pending">Date to be announced</p>
        </template>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
    startsAt: {
        type: String,
        default: null
    },
    startsAtLabel: {
        type: String,
        default: ''
    }
})

const now = ref(Date.now())
let timer = null

const hasStartDate = computed(() => Boolean(props.startsAt))
const startMs = computed(() => (props.startsAt ? new Date(props.startsAt).getTime() : null))

const remaining = computed(() => {
    const diff = Math.max(0, (startMs.value || now.value) - now.value)
    const totalMinutes = Math.floor(diff / 60000)

    return {
        days: Math.floor(totalMinutes / 1440),
        hours: Math.floor((totalMinutes % 1440) / 60),
        minutes: totalMinutes % 60
    }
})

onMounted(() => {
    if (!hasStartDate.value) return

    now.value = Date.now()
    timer = window.setInterval(() => {
        now.value = Date.now()

        if (startMs.value && now.value >= startMs.value && timer) {
            window.clearInterval(timer)
            timer = null
        }
    }, 30000)
})

onUnmounted(() => {
    if (timer) window.clearInterval(timer)
})
</script>

<style scoped>
.event-countdown {
    width: min(340px, calc(100vw - 48px));
    padding: 1rem;
    color: white;
    background: rgba(48, 56, 65, 0.86);
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 10px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.event-countdown__label,
.event-countdown__starts,
.event-countdown__pending {
    margin: 0;
}

.event-countdown__label {
    color: rgb(246, 201, 14);
    font-size: 0.9rem;
}

.event-countdown__time {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin: 0.85rem 0;
}

.event-countdown__time span {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    font-size: 0.85rem;
    line-height: 1.05rem;
}

.event-countdown__time strong {
    font-family: 'Airstrike', sans-serif;
    font-size: 1.45rem;
    font-weight: 400;
    line-height: 1.2rem;
}

.event-countdown__starts,
.event-countdown__pending {
    font-size: 0.95rem;
    line-height: 1.2rem;
}

@media (min-width: 768px) {
    .event-countdown {
        padding: 1.25rem;
    }

    .event-countdown__time strong {
        font-size: 1.75rem;
    }
}
</style>
