<template>
    <section class="container content container-pb">
        <h3 class="text-center h-yellow h-first">Cookie Policy</h3>
        <p class="text-center content-text mb-4">Last Updated: May 22, 2025</p>

        <div class="container">
            <h4 class="h-white-small">1. What Are Cookies?</h4>
            <p class="content-text">
                Cookies are small text files stored on your device to enhance site functionality and track preferences.
            </p>

            <h4 class="h-white-small">2. Types of Cookies We Use</h4>
            <ul class="content-text">
                <strong>Essential:</strong> Required for core functionality; always active.<br>
                <strong>Analytics:</strong> Help us understand usage patterns; opt-in via cookie settings.<br>
                <strong>Marketing:</strong> Enable advertising personalization; opt-in via cookie settings.
            </ul>

            <h4 class="h-white-small">3. Managing Cookies</h4>
            <p class="content-text">
                You can manage or withdraw cookie consent anytime via the "Cookie Settings" option in the banner or
                your browser settings. Disabling cookies may affect site functionality.
            </p>

            <h4 class="h-white-small">4. Changes to Cookie Policy</h4>
            <p class="content-text">
                We may revise this policy. Updates take effect when posted with the new date. Please revisit to stay
                informed.
            </p>
        </div>
    </section>
</template>

<script setup>
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

@media (min-width: 576px) {
    .content-text {
        font-size: 1.1rem;
    }

    .h-white-small {
        font-size: 1.5rem;
    }
}
</style>