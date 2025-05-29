<template>
    <section class="container content container-pb">
        <h3 class="text-center h-yellow h-first">Privacy Policy</h3>
        <p class="text-center content-text mb-4">Last Updated: May 22, 2025</p>

        <div class="container">
            <h4 class="h-white-small">1. Introduction</h4>
            <p class="content-text">
                Welcome to GTO Lens ("we", "us", or "our"). We respect your privacy and are committed to protecting your
                personal data.
                This policy explains how we collect, use, and safeguard the personal data you provide when using our
                website or AI-powered car recognition service ("Service").
            </p>

            <h4 class="h-white-small">2. Data Controller</h4>
            <p class="content-text">
                GTO Luxembourg is the controller of your personal data. We do not share your personal data with
                unauthorized third parties;
                it remains essential for providing and improving the Service. For questions, contact us at
                <a href="mailto:gto.luxembourg@hotmail.com">gto.luxembourg@hotmail.com</a>.
            </p>

            <h4 class="h-white-small">3. Data We Collect</h4>
            <p class="content-text">
                We collect the following categories of data:
            </p>
            <ul class="content-text">
                <strong>Image Data:</strong> Photos of cars you upload for analysis.<br>
                <strong>Technical Data:</strong> IP address, browser type, device info, and usage logs.<br>
                <strong>Preferences:</strong> Cookie consent choices stored in cookies.
            </ul>

            <h4 class="h-white-small">4. How We Use Your Data</h4>
            <p class="content-text">
                We use your data to:
            </p>
            <ul class="content-text">
                Analyze images and provide car details via AI.<br>
                Improve system performance and user experience.<br>
                Manage cookie preferences and essential functionality.
            </ul>

            <h4 class="h-white-small">5. Data Storage & Security</h4>
            <p class="content-text">
                Your data is processed and stored securely on our servers.
                We implement technical and organizational measures to protect it against unauthorized access or
                disclosure.
            </p>

            <h4 class="h-white-small">6. Data Retention</h4>
            <p class="content-text">
                We retain your image and technical data only as long as needed to provide the Service or to comply with
                legal obligations.
            </p>

            <h4 class="h-white-small">7. Your Rights</h4>
            <p class="content-text">
                You have the right to access, rectify, or delete your personal data. To exercise these rights, email us
                at
                <a href="mailto:gto.luxembourg@hotmail.com">gto.luxembourg@hotmail.com</a>.
            </p>

            <h4 class="h-white-small">8. Cookies & Tracking</h4>
            <p class="content-text">
                We use cookies to manage user preferences and essential functionality. For details, see our
                <RouterLink to="/cookie-policy">Cookie Policy</RouterLink>.
            </p>

            <h4 class="h-white-small">9. Changes to Policy</h4>
            <p class="content-text">
                We may update this policy. Changes take effect when posted, with the updated date at the top.
                Please review periodically.
            </p>
        </div>
    </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.container {
    max-width: 800px;
}

h3 {
    padding-top: var(--navbar-height);
}

.content-text {
    margin: 0.75rem 0;
}

.h-white-small {
    font-size: 1.25rem;
}

a {
    color: #f5d442;
    text-decoration: none;
}

a:hover {
    color: #f5d442;
    text-decoration: underline;
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