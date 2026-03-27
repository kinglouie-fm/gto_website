<template>
    <section :class="[
        'hero-shell',
        customClass,
        {
            'hero-desktop-framed': desktopFramed,
            'hero-mobile-fade': showMobileFade
        }
    ]" :style="heroVars">
        <div class="hero-frame">
            <picture>
                <source :srcset="desktopSrc" media="(min-width: 768px)" />
                <img :src="mobileSrc" :alt="alt" class="hero-img" decoding="async" fetchpriority="high"
                    loading="eager" />
            </picture>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    desktopSrc: {
        type: String,
        required: true,
    },
    mobileSrc: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
    customClass: {
        type: String,
        default: '',
    },
    desktopFramed: {
        type: Boolean,
        default: false,
    },
    showMobileFade: {
        type: Boolean,
        default: true,
    },
    mobileHeight: {
        type: String,
        default: '56svh',
    },
    tabletHeight: {
        type: String,
        default: '58svh',
    },
    desktopHeight: {
        type: String,
        default: '60svh',
    },
    mobileObjectPosition: {
        type: String,
        default: '50% 70%',
    },
    tabletObjectPosition: {
        type: String,
        default: '50% 70%',
    },
    desktopObjectPosition: {
        type: String,
        default: '50% 70%',
    },
    desktopRadius: {
        type: String,
        default: '24px',
    },
    desktopSideGap: {
        type: String,
        default: '20px',
    }
})

const heroVars = computed(() => ({
    '--hero-mobile-height': props.mobileHeight,
    '--hero-tablet-height': props.tabletHeight,
    '--hero-desktop-height': props.desktopHeight,
    '--hero-mobile-object-position': props.mobileObjectPosition,
    '--hero-tablet-object-position': props.tabletObjectPosition,
    '--hero-desktop-object-position': props.desktopObjectPosition,
    '--hero-desktop-radius': props.desktopRadius,
    '--hero-desktop-side-gap': props.desktopSideGap,
}))
</script>

<style scoped>
.hero-shell {
    position: relative;
    margin-top: var(--navbar-height);
}

.hero-frame {
    width: 100%;
    overflow: hidden;
    height: var(--hero-mobile-height);
}

.hero-frame picture,
.hero-img {
    display: block;
    width: 100%;
    height: 100%;
}

.hero-img {
    object-fit: cover;
    object-position: var(--hero-mobile-object-position);
}

.hero-mobile-fade::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to bottom, transparent, rgb(48, 56, 65));
    pointer-events: none;
}

@media (min-width: 768px) {
    .hero-frame {
        height: var(--hero-tablet-height);
    }

    .hero-img {
        object-position: var(--hero-tablet-object-position);
    }
}

@media (min-width: 992px) {
    .hero-img {
        object-position: var(--hero-desktop-object-position);
    }

    .hero-desktop-framed {
        padding-left: var(--hero-desktop-side-gap);
        padding-right: var(--hero-desktop-side-gap);
    }

    .hero-desktop-framed .hero-frame {
        position: relative;
        height: var(--hero-desktop-height);
        border-radius: var(--hero-desktop-radius);
        overflow: hidden;
        background: rgb(38, 45, 54);
    }

    .hero-desktop-framed .hero-frame::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        z-index: 2;
        box-shadow:
            inset 0 0 34px 14px rgba(0, 0, 0, 0.34),
            inset 0 0 90px 24px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.03);
    }

    .hero-desktop-framed .hero-img {
        border-radius: var(--hero-desktop-radius);
        filter: brightness(0.97);
    }

    .hero-desktop-framed::after {
        content: none;
    }
}
</style>