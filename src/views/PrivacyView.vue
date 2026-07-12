<template>
    <main>
        <section class="container content container-pb">
            <h1 class="text-center h-yellow h-first">Privacy Policy</h1>
            <p class="text-center content-text mb-4">Last Updated: June 11, 2026</p>

            <div class="container">
                <h4 class="h-white-small">1. Introduction</h4>
                <p class="content-text">
                    We respect your privacy and are committed to protecting your personal data.
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
                    <strong>Preferences:</strong> Cookie consent choices stored in cookies.<br>
                    <strong>Third-party map data:</strong> If you choose to load Google Maps on an event page, Google
                    may receive technical data such as your IP address, browser and device information, and interaction
                    data.
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

                <h4 class="h-white-small">5. AI Processing</h4>
                <p class="content-text">
                    To generate detailed vehicle information, we securely transmit your uploaded image data to the
                    OpenAI
                    API.
                    Images are encoded and sent over HTTPS. OpenAI processes the data temporarily and returns a
                    response.
                    We do not store your image or the detailed response beyond the duration necessary to display results
                    in
                    your browser session.
                    <!-- No personal data is retained on third-party servers after processing. -->
                </p>

                <h4 class="h-white-small">5. Data Storage & Security</h4>
                <p class="content-text">
                    Your data is processed and stored securely on our servers with encryption in transit (HTTPS) and
                    appropriate access controls.
                    We implement technical and organizational measures to protect it against unauthorized access or
                    disclosure.
                </p>

                <h4 class="h-white-small">6. Data Retention</h4>
                <p class="content-text">
                    We retain your image and technical data only as long as needed to provide the Service or to comply
                    with
                    legal obligations.
                </p>

                <h4 class="h-white-small">7. Your Rights</h4>
                <p class="content-text">
                    You have the right to access, rectify, or delete your personal data. To exercise these rights, email
                    us
                    at
                    <a href="mailto:gto.luxembourg@hotmail.com">gto.luxembourg@hotmail.com</a>.
                </p>

                <h4 class="h-white-small">8. Cookies & Tracking</h4>
                <p class="content-text">
                    We use cookies to manage user preferences and essential functionality. For details, see our
                    <RouterLink to="/cookie-policy">Cookie Policy</RouterLink>.
                </p>

                <h4 class="h-white-small">9. Google Maps</h4>
                <p class="content-text">
                    Some event pages include an optional Google Maps embed to show the meeting point. The map is loaded
                    only after you click to load it. When loaded, Google may process data under its own
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy
                        Policy</a>
                    and
                    <a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noopener noreferrer">Google
                        Maps Terms</a>.
                </p>

                <h4 class="h-white-small">10. Changes to Policy</h4>
                <p class="content-text">
                    We may update this policy. Changes take effect when posted, with the updated date at the top.
                    Please review periodically.
                </p>
            </div>
        </section>
    </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.container {
    max-width: 800px;
}

h1 {
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
