<template>
    <div class="portfolio-grid">
        <div v-for="(column, colIndex) in columns" :key="colIndex" class="portfolio-column">
            <img v-for="(image, idx) in column" :key="idx" :src="image.src" :alt="image.alt"
                :class="['grid-img', image.size, image.customClass]" @click="() => onImageClick(image)" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    images: {
        type: Array,
        required: true
    },
    columnsCount: {
        type: Number,
        default: 3
    }
})

const emits = defineEmits(['image-click'])

const columns = computed(() => {
    const cols = Array.from({ length: props.columnsCount }, () => [])
    props.images.forEach((img, index) => {
        cols[index % props.columnsCount].push(img)
    })
    return cols
})

const onImageClick = (image) => {
    emits('image-click', image)
}
</script>

<style scoped>
.portfolio-grid {
    display: flex;
    gap: 11px;
    padding: 0 20px;
    justify-content: center;
    margin-top: 24px;
}

.portfolio-column {
    display: flex;
    flex-direction: column;
    gap: 11px;
}

.grid-img {
    object-fit: cover;
    display: block;
    cursor: pointer;
    background-color: rgb(48, 56, 65);
    border-radius: 10px;
}

.grid-img.small {
    width: 110px;
    height: 89px;
}

.grid-img.large {
    width: 110px;
    height: 139px;
}

.img-1 {
    object-position: 80% 0%;
}

.img-2 {
    object-position: 50% 90%;
}

.img-6 {
    object-position: 50% 70%;
}

.img-13 {
    object-position: 50% 10%;
}

.img-14 {
    object-position: 20% 0%;
}

.img-16 {
    object-position: 50% 70%;
}

.img-20 {
    object-position: 50% 70%;
}

.img-23 {
    object-position: 50% 0%;
}

.img-24 {
    object-position: 50% 70%;
}

@media (min-width: 576px) {
    .grid-img.small {
        width: calc(110px * 1.2);
        height: calc(89px * 1.2);
    }

    .grid-img.large {
        width: calc(110px * 1.2);
        height: calc(139px * 1.2);
    }
}

@media (min-width: 768px) {
    .grid-img.small {
        width: calc(110px * 1.4);
        height: calc(89px * 1.4);
    }

    .grid-img.large {
        width: calc(110px * 1.4);
        height: calc(139px * 1.4);
    }
}

@media (min-width: 992px) {
    .grid-img.small {
        width: calc(110px * 2);
        height: calc(89px * 2);
    }

    .grid-img.large {
        width: calc(110px * 2);
        height: calc(139px * 2);
    }
}

@media (min-width: 1200px) {
    .grid-img.small {
        width: calc(110px * 3);
        height: calc(89px * 3);
    }

    .grid-img.large {
        width: calc(110px * 3);
        height: calc(139px * 3);
    }
}
</style>
