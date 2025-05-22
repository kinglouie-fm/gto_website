<template>
    <section class="content container-pb">
        <h3 class="text-center h-yellow h-first">Terms and Conditions</h3>
        <p class="text-center content-text mb-4">Last Updated: May 22, 2025</p>

        <div class="container text-center terms-sections">
            <h4 class="h-white-small">1. Introduction</h4>
            <p class="content-text">
                Welcome to GTO Luxembourg. These Terms and Conditions ("Terms") govern your use of our website and
                AI-powered
                car recognition service ("Service"). Please read these terms carefully. By accessing or using the
                Service, you agree to be bound by these Terms. If you do not agree, please do not use the Service.
            </p>

            <h4 class="h-white-small">2. Who We Are</h4>
            <p class="content-text">
                GTO Lens is a product of GTO Luxembourg, a non-profit automotive enthusiast group based in Luxembourg
                ("we", "us", or "our").
            </p>

            <h4 class="h-white-small">3. Service Description</h4>
            <p class="content-text">
                GTO Lens uses your smartphone camera and AI to analyze uploaded images of cars and return detailed
                vehicle information.
            </p>

            <h4 class="h-white-small">4. User Content</h4>
            <p class="content-text">
                You retain ownership of images you upload. By submitting an image, you grant GTO Luxembourg a worldwide,
                royalty-free license to use, store, and process that image solely for providing the Service.
            </p>

            <h4 class="h-white-small">5. Prohibited Uses</h4>
            <p class="content-text">
                You agree not to use the Service for any unlawful purpose. You must not upload images you do not have
                rights to, and you must not attempt to disrupt or reverse-engineer our Service.
            </p>

            <h4 class="h-white-small">6. Limitation of Liability</h4>
            <p class="content-text">
                GTO Luxembourg provides the Service "as is" and makes no guarantees regarding accuracy or uptime.
                We are not liable for any damages arising from your use of the Service.
            </p>

            <h4 class="h-white-small">7. Changes to Terms</h4>
            <p class="content-text">
                We may update these Terms at any time. Continued use of the Service after changes indicates your
                acceptance.
            </p>

            <h4 class="h-white-small">8. Governing Law</h4>
            <p class="content-text">
                These Terms are governed by the laws of Luxembourg, without regard to conflict-of-law principles.
            </p>

            <h4 class="h-white-small">9. Contact Information</h4>
            <p class="content-text">
                For questions about these Terms, please contact us at <a
                    href="mailto:gto.luxembourg@hotmail.com">gto.luxembourg@hotmail.com</a>.
            </p>

            <div class="text-center mt-5">
                <ButtonFilled @click="goBack">Back</ButtonFilled>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ButtonFilled from '@/components/ButtonFilled.vue'

const router = useRouter()
function goBack() {
    router.back()
}
</script>

<style scoped>
/* Inherit dark background and white text from .content */
.container {
    max-width: 800px;
}

h3 {
    padding-top: var(--navbar-height);
}

.content-text {
    margin: 0.75rem 0;
}

/* Adjust subheading spacing */
.h-white-small {
    font-family: 'Source Serif Pro', serif;
    font-weight: 400;
    font-size: 1.25rem;
}

@media (min-width: 576px) {
    .content-text {
        font-size: 1.1rem;
    }

    .h-white-small {
        font-size: 1.5rem;
    }
}
</style>
