<template>
    <article class="event-desktop-card">
        <div class="event-desktop-card__image-wrap">
            <img :src="imageSrc" :alt="imageAlt" class="event-desktop-card__image border" @click="handleImageClick" />
        </div>

        <div class="event-desktop-card__content">
            <h4 class="h-white-small event-desktop-card__title">{{ title }}</h4>

            <p class="content-text event-desktop-card__text">
                {{ text }}
            </p>

            <GetInTouchButton :form-url="formUrl" analytics-event="event_get_in_touch_click"
                :analytics-placement="title" />
        </div>
    </article>
</template>

<script setup>
import GetInTouchButton from '@/components/GetInTouchButton.vue'

const props = defineProps({
    imageSrc: {
        type: String,
        required: true
    },
    imageAlt: {
        type: String,
        required: true
    },
    modalCarName: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    formUrl: {
        type: String,
        default: 'https://app.youform.com/forms/qg1axr1r'
    }
})

const emit = defineEmits(['image-click'])

const handleImageClick = () => {
    emit('image-click', {
        imageSrc: props.imageSrc,
        carName: props.modalCarName
    })
}
</script>

<style scoped>
.event-desktop-card {
    display: flex;
    align-items: flex-start;
    gap: 2.5rem;
    width: min(1100px, 100%);
    margin: 0 auto;
    text-align: left;
}

.event-desktop-card__image-wrap {
    flex: 0 0 420px;
}

.event-desktop-card__image {
    width: 100%;
    aspect-ratio: 243 / 160;
    object-fit: cover;
    border-radius: 10px;
    display: block;
    cursor: pointer;
}

.event-desktop-card__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    min-width: 0;
    flex: 1;
}

.event-desktop-card__title {
    margin: 0 0 1rem 0;
    text-align: left;
}

.event-desktop-card__text {
    margin: 0 0 1.5rem 0;
    padding: 0;
    text-align: left;
    max-width: 650px;
}

/* Small desktop */
@media (min-width: 992px) and (max-width: 1199.98px) {
    .event-desktop-card {
        gap: 2rem;
        width: min(900px, 100%);
    }

    .event-desktop-card__image-wrap {
        flex: 0 0 320px;
    }

    .event-desktop-card__text {
        max-width: 420px;
    }
}

/* Medium desktop */
@media (min-width: 1200px) and (max-width: 1399.98px) {
    .event-desktop-card__image-wrap {
        flex: 0 0 380px;
    }

    .event-desktop-card__text {
        max-width: 520px;
    }
}

/* Large desktop */
@media (min-width: 1400px) {
    .event-desktop-card__image-wrap {
        flex: 0 0 420px;
    }

    .event-desktop-card__text {
        max-width: 650px;
    }
}
</style>