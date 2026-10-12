import { computed, onMounted, onUnmounted, ref } from 'vue'
import { events } from '@/data/events'
import { getEventGroups } from '@/utils/events'

export const useEvents = () => {
    const now = ref(new Date())
    const groups = computed(() => getEventGroups(events, now.value))
    let timer

    onMounted(() => {
        timer = window.setInterval(() => { now.value = new Date() }, 60000)
    })
    onUnmounted(() => window.clearInterval(timer))

    return { groups, now }
}
