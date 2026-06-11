<template>
    <article class="upcoming-event-row" :class="{ 'upcoming-event-row--reverse': reverse }">
        <button type="button" class="upcoming-event-row__image-button" @click="handleImageClick">
            <img :src="event.imageSrc" :alt="event.imageAlt" class="upcoming-event-row__image border" />
        </button>

        <div class="upcoming-event-row__content">
            <p class="upcoming-event-row__meta">{{ event.meta }}</p>
            <h4 class="h-white-small upcoming-event-row__title">{{ event.title }}</h4>
            <p class="content-text upcoming-event-row__text">{{ event.shortDescription }}</p>
            <ButtonFilled :to="`/events/${event.slug}`" class="upcoming-event-row__button">Learn more</ButtonFilled>
        </div>
    </article>
</template>

<script setup>
import ButtonFilled from '@/components/ButtonFilled.vue'

const props = defineProps({
    event: {
        type: Object,
        required: true
    },
    reverse: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['image-click'])

const handleImageClick = () => {
    emit('image-click', {
        imageSrc: props.event.imageSrc,
        carName: props.event.modalCarName
    })
}
</script>

<style scoped>
.upcoming-event-row {
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(280px, 0.85fr);
    align-items: center;
    gap: clamp(2rem, 5vw, 5rem);
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto;
    text-align: left;
}

.upcoming-event-row--reverse {
    grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.45fr);
}

.upcoming-event-row--reverse .upcoming-event-row__image-button {
    order: 2;
}

.upcoming-event-row--reverse .upcoming-event-row__content {
    order: 1;
}

.upcoming-event-row__image-button {
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
}

.upcoming-event-row__image {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: 10px;
}

.upcoming-event-row__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-width: 0;
}

.upcoming-event-row__meta {
    margin: 0 0 0.75rem;
    color: rgb(246, 201, 14);
    font-size: 0.95rem;
    line-height: 1.25rem;
}

.upcoming-event-row__title {
    margin: 0 0 1rem;
    text-align: left;
}

.upcoming-event-row__text {
    margin: 0 0 1.5rem;
    padding: 0;
    max-width: 520px;
    text-align: left;
}

.upcoming-event-row__button {
    margin-right: 0;
}

@media (max-width: 991.98px) {

    .upcoming-event-row,
    .upcoming-event-row--reverse {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        width: min(680px, calc(100% - 40px));
    }

    .upcoming-event-row--reverse .upcoming-event-row__image-button,
    .upcoming-event-row--reverse .upcoming-event-row__content {
        order: initial;
    }

    .upcoming-event-row__content {
        align-items: center;
        text-align: center;
    }

    .upcoming-event-row__title,
    .upcoming-event-row__text {
        text-align: center;
    }

    .upcoming-event-row__text {
        max-width: 100%;
    }
}

@media (max-width: 575.98px) {

    .upcoming-event-row,
    .upcoming-event-row--reverse {
        width: min(100% - 32px, 420px);
    }

    .upcoming-event-row__image {
        aspect-ratio: 243 / 160;
    }
}
</style>
