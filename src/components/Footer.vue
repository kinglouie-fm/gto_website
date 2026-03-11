<template>
    <section class="footer text-center" :style="{ backgroundColor: bgColor }">
        <div class="sponsor-marquee" aria-label="Sponsors">
            <div class="marquee-track">
                <a class="marquee-item" href="https://www.reinert.lu" target="_blank" rel="noopener">
                    <img src="/images/reinert_logo.png" alt="Reinert Logo" class="logo logo--reinert" />
                </a>
                <a class="marquee-item" href="https://www.vinsmoselle.lu/en" target="_blank" rel="noopener">
                    <img src="/images/dvm-logo-white.svg" alt="Domaine Vinsmoselle Logo" class="logo logo--dvm" />
                </a>
                <a class="marquee-item" href="https://www.aral.de/de_lu/luxembourg/home.html" target="_blank"
                    rel="noopener">
                    <img src="/images/aral.webp" alt="Aral Luxembourg Logo" class="logo logo--aral" />
                </a>

                <a class="marquee-item" href="https://www.reinert.lu" target="_blank" rel="noopener">
                    <img src="/images/reinert_logo.png" alt="Reinert Logo" class="logo logo--reinert" />
                </a>
                <a class="marquee-item" href="https://www.vinsmoselle.lu/en" target="_blank" rel="noopener">
                    <img src="/images/dvm-logo-white.svg" alt="Domaine Vinsmoselle Logo" class="logo logo--dvm" />
                </a>
                <a class="marquee-item" href="https://www.aral.de/de_lu/luxembourg/home.html" target="_blank"
                    rel="noopener">
                    <img src="/images/aral.webp" alt="Aral Luxembourg Logo" class="logo logo--aral" />
                </a>
            </div>
        </div>
        <p class="routerlinks my-0">
            <RouterLink class="routerlink me-4" to="/terms">Terms and Conditions</RouterLink>
            <RouterLink class="routerlink me-4" to="/privacy">Privacy Policy</RouterLink>
            <RouterLink class="routerlink" to="/cookie-policy">Cookie Policy</RouterLink>
        </p>
        <p class="copyright my-0 pb-1">
            &copy; 2025 GTO Luxembourg. All rights reserved.
        </p>
    </section>
</template>

<script setup>
const props = defineProps({
    bgColor: {
        type: String,
        default: 'rgb(48, 56, 65)'
    }
})
</script>

<style scoped>
/* Footer wrapper */
.footer {
    text-align: center;
}

/* Base text styles */
.text-center {
    font-size: clamp(10px, 1.2vw, 20px);
}

/* Shared logo rules */
.logo {
    display: block;
    height: auto;
    /* keep aspect ratio */
    max-width: 100%;
}

/* Individual logo sizing (fluid with clamp) */
.logo--reinert {
    width: clamp(135px, 45vw, 170px);
}

/* .logo--wot {
    width: clamp(125px, 40vw, 160px);
} */

.logo--dvm {
    width: clamp(135px, 45vw, 170px);
}

.logo--aral {
    width: clamp(100px, 30vw, 130px);
}

/* ===== Mobile flowing carousel (default) ===== */
.sponsor-marquee {
    overflow: hidden;
    position: relative;
    width: 100%;
    padding-top: 0.75rem;
    padding-bottom: 0.5rem;

    /* soft edge fade (optional, looks nice) */
    -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
    mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
}

.marquee-track {
    display: flex;
    align-items: center;
    width: max-content;
    gap: clamp(1.25rem, 4vw, 3rem);
    animation: sponsor-marquee 18s linear infinite;
}

.marquee-item {
    display: inline-flex;
    align-items: center;
}

/* Pause on hover (desktop users / accessibility) */
.sponsor-marquee:hover .marquee-track {
    animation-play-state: paused;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
    .marquee-track {
        animation: none;
    }
}

/* This assumes track contains two identical sets */
@keyframes sponsor-marquee {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}

/* ===== Switch to static centered row on bigger screens ===== */
@media (min-width: 576px) {
    .sponsor-marquee {
        overflow: visible;
        -webkit-mask-image: none;
        mask-image: none;
    }

    .marquee-track {
        animation: none;
        width: 100%;
        justify-content: center;
        flex-wrap: nowrap;
        transform: none;
        gap: clamp(1rem, 3vw, 8rem);
    }

    /* hide duplicates on larger screens so you don't see 6 logos */
    .marquee-item:nth-child(n + 4) {
        display: none;
    }

    /* allow larger max sizes on bigger screens */
    .logo--reinert {
        width: clamp(150px, 18vw, 250px);
    }

    /* .logo--wot {
        width: clamp(140px, 16vw, 230px);
    } */

    .logo--dvm {
        width: clamp(150px, 18vw, 200px);
    }

    .logo--aral {
        width: clamp(100px, 14vw, 150px);
    }
}

/* Router links */
.routerlink {
    position: relative;
    color: white;
    text-decoration: none;
}

.routerlink::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: rgb(246, 201, 14);
    transition: width 0.3s ease;
}

.routerlink:hover::after {
    width: 100%;
}

.copyright {
    color: white;
}

.routerlinks,
.copyright {
    font-size: clamp(0.75rem, 1vw, 1rem);
}

@media (min-width: 1400px) {
    .routerlinks {
        margin-bottom: 1rem !important;
    }
}
</style>
