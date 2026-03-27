<template>
    <section :class="['hero-shell', customClass]">
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
defineProps({
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
    }
})
</script>

<style scoped>
.hero-shell {
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
    object-position: 50% 70%;
}

/* Home hero base */
.home-hero .hero-frame {
    height: 58svh;
    min-height: 420px;
}

.home-hero .hero-img {
    object-position: 60% 60%;
}

/* laptop range only */
@media (min-width: 992px) and (max-width: 1500px) {
    .home-hero {
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 0px;
    }

    .home-hero .hero-frame {
        border-radius: 24px;
        height: 60svh;
        min-height: 440px;
    }
}

.portfolio-hero .hero-img {
    object-position: 50% 40%;
}
</style>