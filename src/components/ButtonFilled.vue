<template>
    <button class="btn" @click="handleClick">
        <slot></slot>
    </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
    to: {
        type: String,
    }
})

const router = useRouter()

const handleClick = () => {
    try {
        if (props.to) {
            router.push('/' + props.to)
        }
    } catch (error) {
        console.error("Route not provided/found")
    }
}
</script>

<style scoped>
.btn {
    width: 120px;
    height: 40px;
    color: rgb(48, 56, 65);
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s ease;
    background-color: white;
}

.btn:hover {
    color: white;
    border: 1px solid white;
    background-color: rgb(76, 84, 94);
}

/* For screens 576px and wider */
@media (min-width: 576px) {
    .btn {
        width: 135px;
        height: 45px;
        font-size: 16px;
    }
}

/* For screens 768px and wider */
@media (min-width: 768px) {
    .btn {
        width: 165px;
        height: 50px;
        font-size: 18px;
    }
}

/* For screens 992px and wider */
@media (min-width: 992px) {
    .btn {
        width: 180px;
        height: 70px;
        font-size: 20px;
    }
}
</style>