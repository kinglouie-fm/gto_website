<template>
    <!-- Bind the slider’s top style dynamically -->
    <div class="vertical-slider" :style="{ top: sliderTop + 'px' }">
        <div class="slider-track"></div>
        <div class="slider-thumb" :style="{ top: thumbTop + 'px' }"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// Controls the thumb’s movement based on scroll progress.
const thumbTop = ref(0)
const updateThumb = () => {
    const scrollY = window.scrollY
    const scrollableHeight = 200
    const progress = scrollableHeight ? scrollY / scrollableHeight : 0

    // Adjust multiplier based on screen width.
    let multiplier = 45 // default for screens smaller than 576px
    if (window.innerWidth >= 1400) {
        multiplier = 60
    } else if (window.innerWidth >= 1200) {
        multiplier = 70
    } else if (window.innerWidth >= 992) {
        multiplier = 140
    } else if (window.innerWidth >= 768) {
        multiplier = 120
    } else if (window.innerWidth >= 576) {
        multiplier = 70
    }

    // Get the slider and thumb elements to calculate maximum travel.
    const sliderEl = document.querySelector('.vertical-slider')
    const thumbEl = document.querySelector('.slider-thumb')
    let maxTravel = 0
    if (sliderEl && thumbEl) {
        const sliderRect = sliderEl.getBoundingClientRect()
        const thumbRect = thumbEl.getBoundingClientRect()
        maxTravel = sliderRect.height - thumbRect.height
    }

    // Calculate new thumb position and cap it at maxTravel.
    thumbTop.value = Math.min(progress * multiplier, maxTravel)
}

// sliderTop is calculated as the midpoint between hero bottom and content top.
const sliderTop = ref(0)
const updateSliderPosition = () => {
    const hero = document.querySelector('.hero')
    const content = document.querySelector('.content')
    if (hero && content) {
        const heroRect = hero.getBoundingClientRect()
        const contentRect = content.getBoundingClientRect()
        const heroBottom = heroRect.bottom + window.scrollY
        const contentTop = contentRect.top + window.scrollY
        sliderTop.value = (heroBottom + contentTop) / 2
    }
}

const recalcPositions = () => {
    updateSliderPosition()
    updateThumb()
}

onMounted(() => {
    nextTick(() => {
        recalcPositions()
        // Also add a slight delay in case images/layout are still settling.
        setTimeout(recalcPositions, 200)
    })
    window.addEventListener('resize', recalcPositions)
    window.addEventListener('scroll', updateSliderPosition)
    window.addEventListener('scroll', updateThumb)
    window.addEventListener('load', recalcPositions)
})

onUnmounted(() => {
    window.removeEventListener('resize', recalcPositions)
    window.removeEventListener('scroll', updateSliderPosition)
    window.removeEventListener('scroll', updateThumb)
    window.removeEventListener('load', recalcPositions)
})
</script>

<style>
.vertical-slider {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    /* Base dimensions for extra-small devices */
    width: clamp(2px, 1vw, 10px);
    height: clamp(50px, 10vw, 100px);
    z-index: 1000;
    border-radius: 20px;
}

.slider-track {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
}

.slider-thumb {
    position: absolute;
    width: 100%;
    /* Base thumb size using clamp */
    height: clamp(10px, 2vw, 20px);
    background-color: white;
    transition: top 0.2s ease;
    border-radius: 20px;
}

/* Increase dimensions for screens 576px and wider */
@media (min-width: 576px) {
    .vertical-slider {
        width: clamp(3px, 0.5vw, 6px);
        height: clamp(60px, 10vw, 120px);
    }

    .slider-thumb {
        height: clamp(12px, 2.2vw, 22px);
    }
}

/* For screens 768px and wider */
@media (min-width: 768px) {
    .vertical-slider {
        width: clamp(4px, 0.5vw, 7px);
        height: clamp(70px, 10vw, 140px);
    }

    .slider-thumb {
        height: clamp(14px, 2.5vw, 24px);
    }
}

/* For screens 992px and wider */
@media (min-width: 992px) {
    .vertical-slider {
        width: clamp(5px, 0.5vw, 8px);
        height: clamp(80px, 10vw, 160px);
    }

    .slider-thumb {
        height: clamp(16px, 2.8vw, 26px);
    }
}

/* For screens 1200px and wider */
@media (min-width: 1200px) {
    .vertical-slider {
        width: clamp(6px, 0.5vw, 9px);
        height: clamp(90px, 10vw, 180px);
    }

    .slider-thumb {
        height: clamp(18px, 3vw, 28px);
    }
}

/* For screens 1400px and wider */
@media (min-width: 1400px) {
    .vertical-slider {
        width: clamp(7px, 0.5vw, 10px);
        height: clamp(100px, 10vw, 200px);
    }

    .slider-thumb {
        height: clamp(20px, 3.2vw, 30px);
    }
}
</style>
