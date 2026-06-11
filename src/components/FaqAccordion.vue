<template>
    <div class="faq-accordion">
        <article v-for="(item, index) in items" :key="item.question" class="faq-accordion__item">
            <button type="button" class="faq-accordion__trigger" :aria-expanded="openIndex === index"
                :aria-controls="`faq-panel-${index}`" @click="toggle(index)">
                <span>{{ item.question }}</span>
                <span class="faq-accordion__icon" aria-hidden="true"></span>
            </button>

            <div v-show="openIndex === index" :id="`faq-panel-${index}`" class="faq-accordion__panel">
                <p>{{ item.answer }}</p>
            </div>
        </article>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    items: {
        type: Array,
        required: true
    }
})

const openIndex = ref(0)

const toggle = (index) => {
    openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.faq-accordion {
    display: grid;
    gap: 0.85rem;
}

.faq-accordion__item {
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 10px;
    background: rgba(76, 84, 94, 0.46);
    overflow: hidden;
}

.faq-accordion__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    color: rgb(246, 201, 14);
    background: transparent;
    border: 0;
    text-align: left;
    font-size: 1rem;
    line-height: 1.25rem;
    cursor: pointer;
}

.faq-accordion__trigger:hover {
    background: rgba(255, 255, 255, 0.04);
}

.faq-accordion__icon {
    position: relative;
    flex: 0 0 18px;
    width: 18px;
    height: 18px;
}

.faq-accordion__icon::before,
.faq-accordion__icon::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 14px;
    height: 2px;
    background: white;
    border-radius: 999px;
    transform: translate(-50%, -50%);
    transition: transform 0.2s ease;
}

.faq-accordion__icon::after {
    transform: translate(-50%, -50%) rotate(90deg);
}

.faq-accordion__trigger[aria-expanded="true"] .faq-accordion__icon::after {
    transform: translate(-50%, -50%) rotate(0deg);
}

.faq-accordion__panel {
    padding: 0 1rem 1rem;
    color: white;
}

.faq-accordion__panel p {
    margin: 0;
}

@media (min-width: 768px) {
    .faq-accordion__trigger {
        padding: 1.1rem 1.25rem;
        font-size: 1.05rem;
    }

    .faq-accordion__panel {
        padding: 0 1.25rem 1.25rem;
    }
}
</style>
