<template>
    <main class="not-found">
        <section class="not-found__content" aria-labelledby="not-found-title">
            <h1 id="not-found-title" class="h-yellow">{{ title }}</h1>
            <p>This page may have moved, or the address may be incorrect.</p>
            <div class="not-found__actions">
                <Button to="/">Back to home</Button>
                <Button to="/events">Explore events</Button>
            </div>
        </section>
    </main>
</template>

<script setup>
import Button from '@/components/Button.vue'

defineProps({ title: { type: String, default: 'Page not found' } })
</script>

<style scoped>
.not-found {
    display: grid;
    place-items: center;
    min-height: calc(100svh - var(--navbar-height));
    padding: calc(var(--navbar-height) + 3rem) 20px 4rem;
    color: white;
    text-align: center;
}

.not-found__content {
    max-width: 60ch;
}

.not-found__content p {
    margin-block: 1.5rem 2rem;
    font-size: clamp(1rem, 2vw, 1.25rem);
    line-height: 1.65;
}

.not-found__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
}
</style>
