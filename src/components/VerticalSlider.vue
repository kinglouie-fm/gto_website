<template>
  <div
    ref="sliderEl"
    class="vertical-slider scroll-hint"
    :style="{ top: sliderTop + 'px' }"
    aria-hidden="true"
  >
    <div class="slider-track"></div>
    <div ref="thumbEl" class="slider-thumb"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const sliderTop = ref(0)
const sliderEl = ref(null)
const thumbEl = ref(null)
let ro // ResizeObserver

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

// Compute how far the thumb should travel (trackHeight - thumbHeight) and put it in a CSS var
const computeTravel = () => {
  const s = sliderEl.value
  const t = thumbEl.value
  if (!s || !t) return
  const sh = s.getBoundingClientRect().height
  const th = t.getBoundingClientRect().height
  const travel = Math.max(0, sh - th)
  s.style.setProperty('--travel', `${travel}px`)
}

const recalc = () => {
  updateSliderPosition()
  computeTravel()
}

onMounted(() => {
  nextTick(() => {
    recalc()
    // tiny settle delay in case of late layout/imagery
    setTimeout(recalc, 200)
  })

  window.addEventListener('resize', recalc)
  window.addEventListener('scroll', updateSliderPosition)
  window.addEventListener('load', recalc)

  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(() => computeTravel())
    if (sliderEl.value) ro.observe(sliderEl.value)
    if (thumbEl.value) ro.observe(thumbEl.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', recalc)
  window.removeEventListener('scroll', updateSliderPosition)
  window.removeEventListener('load', recalc)
  if (ro) ro.disconnect()
})
</script>

<style>
.vertical-slider {
  /* positioning from script */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  /* responsive size (kept from your version) */
  width: clamp(2px, 1vw, 10px);
  height: clamp(50px, 10vw, 100px);
  border-radius: 20px;

  /* animation tunables */
  --travel: 80px;                /* updated at runtime */
  --slide-duration: 2s;        /* glide down time */
  --pause-duration: 2s;          /* wait at top while invisible */
}

.scroll-hint,
.scroll-hint * {
  pointer-events: none; /* purely decorative */
}

.slider-track {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
}

.slider-thumb {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: clamp(10px, 2vw, 20px);
  background-color: white;
  border-radius: 20px;

  animation: hint-scroll calc(var(--slide-duration) + var(--pause-duration)) ease-in-out infinite;
  will-change: transform, opacity;
  transform: translateY(0);
}

/* Prefer reduced motion? Show static hint at top, no animation. */
@media (prefers-reduced-motion: reduce) {
  .slider-thumb {
    animation: none !important;
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
}

@keyframes hint-scroll {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(var(--travel));
    opacity: 1;
  }
  51% {
    /* hide */
    opacity: 0;
  }
  55% {
    /* jump back to top */
    transform: translateY(0);
  }
  90% {
    /* reappear at top */
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Breakpoints (kept, minor tidy) */
@media (min-width: 576px) {
  .vertical-slider {
    width: clamp(3px, 0.5vw, 6px);
    height: clamp(60px, 10vw, 120px);
  }
  .slider-thumb { height: clamp(12px, 2.2vw, 22px); }
}
@media (min-width: 768px) {
  .vertical-slider {
    width: clamp(4px, 0.5vw, 7px);
    height: clamp(70px, 10vw, 140px);
  }
  .slider-thumb { height: clamp(14px, 2.5vw, 24px); }
}
@media (min-width: 992px) {
  .vertical-slider {
    width: clamp(5px, 0.5vw, 8px);
    height: clamp(80px, 10vw, 160px);
  }
  .slider-thumb { height: clamp(16px, 2.8vw, 26px); }
}
@media (min-width: 1200px) {
  .vertical-slider {
    width: clamp(6px, 0.5vw, 9px);
    height: clamp(90px, 10vw, 180px);
  }
  .slider-thumb { height: clamp(18px, 3vw, 28px); }
}
@media (min-width: 1400px) {
  .vertical-slider {
    width: clamp(7px, 0.5vw, 10px);
    height: clamp(100px, 10vw, 200px);
  }
  .slider-thumb { height: clamp(20px, 3.2vw, 30px); }
}
</style>
