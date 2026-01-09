<template>
    <CookieBanner />
    <Navbar />

    <!-- Logo overlay on route change -->
    <Transition name="logo-overlay">
        <div v-if="isNavigating" class="logo-overlay" aria-hidden="true">
            <div class="logo-overlay__inner">
                <img src="/images/gto_logo.png" alt="" class="logo-overlay__logo" />
                <div class="logo-overlay__bar"></div>
            </div>
        </div>
    </Transition>

    <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
            <!-- wrapper ensures a real element root (prevents your warning) -->
            <div class="page-wrap" :key="route.fullPath">
                <component :is="Component" />
            </div>
        </Transition>
    </RouterView>

    <Footer v-if="route.path !== '/lens/camera'" :bgColor="bgColor" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CookieBanner from './components/CookieBanner.vue'

const route = useRoute()
const router = useRouter()

const bgColor = computed(() =>
    route.path === '/portfolio' || route.path === '/events'
        ? 'rgb(76, 84, 94)'
        : 'rgb(48, 56, 65)'
)

const isNavigating = ref(false)
let overlayTimer = null

router.beforeEach(() => {
    isNavigating.value = true

    // clear any previous timers
    if (overlayTimer) {
        clearTimeout(overlayTimer)
        overlayTimer = null
    }
})

router.afterEach(() => {
    // hold the overlay longer on purpose
    overlayTimer = setTimeout(() => {
        isNavigating.value = false
        overlayTimer = null
    }, 750) // 👈 adjust duration here (ms)
})
</script>

<style>
/* === Page transition (content) === */
.page-enter-active,
.page-leave-active {
    transition: opacity 240ms ease, transform 240ms ease;
}

.page-enter-from {
    opacity: 0;
    transform: translateY(6px);
}

.page-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

/* Optional wrapper (helps layout stability) */
.page-wrap {
    min-height: calc(100vh - var(--navbar-height, 0px));
}

/* === Logo overlay transition === */
.logo-overlay-enter-active,
.logo-overlay-leave-active {
    transition: opacity 320ms ease;
}

.logo-overlay-enter-from,
.logo-overlay-leave-to {
    opacity: 0;
}

.logo-overlay {
    position: fixed;
    inset: 0;
    z-index: 3000;
    /* above navbar/drawer */
    display: grid;
    place-items: center;
    background: rgba(48, 56, 65, 0.55);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    pointer-events: none;
    /* don’t block clicks */
}

.logo-overlay__inner {
    display: grid;
    place-items: center;
    gap: 12px;
    transform-origin: center;
    animation: logo-pop 420ms ease;
}

.logo-overlay__logo {
    width: clamp(84px, 16vw, 130px);
    height: auto;
    filter: drop-shadow(0 10px 18px rgba(0, 0, 0, .25));
}

/* Small branded loading bar (optional) */
.logo-overlay__bar {
    width: clamp(140px, 30vw, 240px);
    height: 3px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.18);
    overflow: hidden;
    position: relative;
}

.logo-overlay__bar::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-60%);
    background: rgb(246, 201, 14);
    /* your yellow */
    animation: bar-move 2200ms ease-in-out infinite;
}

@keyframes logo-pop {
    from {
        transform: scale(0.94);
        opacity: 0.6;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes bar-move {
    0% {
        transform: translateX(-80%);
    }

    40% {
        transform: translateX(0%);
    }

    100% {
        transform: translateX(120%);
    }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {

    .page-enter-active,
    .page-leave-active,
    .logo-overlay-enter-active,
    .logo-overlay-leave-active {
        transition: opacity 1ms linear;
    }

    .page-enter-from,
    .page-leave-to {
        transform: none;
    }

    .logo-overlay__inner,
    .logo-overlay__bar::after {
        animation: bar-move 2200ms ease-in-out infinite;
    }
}
</style>
