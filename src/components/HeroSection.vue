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
        default: 'auto',
    },
    desktopHeight: {
        type: String,
        default: '60svh',
    },
    mobileObjectPosition: {
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
    '--hero-desktop-height': props.desktopHeight,
    '--hero-mobile-object-position': props.mobileObjectPosition,
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

.hero-frame {
    height: var(--hero-mobile-height);
}

/* keep old full-bleed behavior below desktop */
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

@media (min-width: 992px) {
    .hero-img {
        object-position: var(--hero-desktop-object-position);
    }

    .hero-desktop-framed {
        padding-left: var(--hero-desktop-side-gap);
        padding-right: var(--hero-desktop-side-gap);
    }

    .hero-desktop-framed .hero-frame {
        border-radius: var(--hero-desktop-radius);
        height: var(--hero-desktop-height);
    }

    .hero-desktop-framed::after {
        content: none;
    }
}
</style>