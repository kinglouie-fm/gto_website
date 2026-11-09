<template>
    <span v-if="busy" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <font-awesome-icon v-else-if="icon" :icon="icon" aria-hidden="true" />
    <span aria-live="polite" aria-atomic="true">{{ busy ? busyLabel : label }}</span>
</template>

<script setup>
defineProps({
    busy: Boolean,
    label: { type: String, required: true },
    busyLabel: { type: String, required: true },
    icon: Object
})
</script>

<style scoped>
@media (prefers-reduced-motion: reduce) {
    .spinner-border { animation: none; }
}
</style>
