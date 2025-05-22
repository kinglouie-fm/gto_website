<template>
    <section class="content container-pb">
        <img src="/images/other/gto-lens.png" alt="Welcome to GTO Lens" class="lens-hero mx-auto d-block" />

        <h3 class="text-center h-yellow h-first">
            WELCOME TO <br>GTO LENS
        </h3>

        <p class="text-center content-text mb-0">
            Discover car details instantly using your phone camera – powered by AI.
        </p>

        <p class="text-center terms-text mt-1">
            By continuing, you agree to our <RouterLink to="/terms">Terms and Conditions</RouterLink>.
        </p>

        <div class="text-center mt-4">
            <ButtonFilled @click="onGetStarted">Get Started</ButtonFilled>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ButtonFilled from '@/components/ButtonFilled.vue'

const router = useRouter()

function onGetStarted() {
    router.push('/lens/camera')
}
</script>

<style scoped>
.lens-hero {
    margin-top: var(--navbar-height);
    width: 250px;
    height: 250px;
    object-fit: contain;
    border-radius: 50%;
}

.terms-text {
    font-size: 0.7rem;
}
</style>
