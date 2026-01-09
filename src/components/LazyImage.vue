<template>
    <img ref="imgEl" v-bind="attrs" :src="currentSrc" :alt="alt" :class="imgClass" :style="styleObj" :loading="loading"
        decoding="async" @load="onLoad" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })
const attrs = useAttrs()

const props = defineProps({
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    imgClass: { type: [String, Array, Object], default: '' },

    // optional placeholder (tiny thumb or blurred data URL)
    placeholder: { type: String, default: '' },

    // load before it enters viewport
    rootMargin: { type: String, default: '300px 0px' },

    // native lazy hint
    loading: { type: String, default: 'lazy' }
})

const imgEl = ref(null)
const isVisible = ref(false)
const isLoaded = ref(false)
let io = null

const currentSrc = computed(() => {
    if (isVisible.value) return props.src
    return props.placeholder || props.src
})

const styleObj = computed(() => {
    // If you have a placeholder, we can show it immediately
    // If you don't, we fade in when visible+loaded to prevent popping
    const shouldShow = props.placeholder ? true : (isVisible.value && isLoaded.value)

    return {
        opacity: shouldShow ? 1 : 0,
        transition: 'opacity 220ms ease'
    }
})

const onLoad = () => {
    isLoaded.value = true
}

onMounted(() => {
    io = new IntersectionObserver(
        (entries) => {
            if (entries[0]?.isIntersecting) {
                isVisible.value = true
                io?.disconnect()
                io = null
            }
        },
        { root: null, threshold: 0.01, rootMargin: props.rootMargin }
    )

    if (imgEl.value) io.observe(imgEl.value)
})

onBeforeUnmount(() => {
    io?.disconnect()
    io = null
})
</script>
