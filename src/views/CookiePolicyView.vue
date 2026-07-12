<template>
    <main>
        <section class="container content container-pb">
            <h1 class="text-center h-yellow h-first">Cookie Policy</h1>
            <p class="text-center content-text mb-4">Last Updated: June 11, 2026</p>

            <div class="container">
                <h4 class="h-white-small">1. What Are Cookies?</h4>
                <p class="content-text">
                    Cookies are small text files stored on your device to enhance site functionality and track
                    preferences.
                </p>

                <h4 class="h-white-small">2. Types of Cookies We Use</h4>
                <ul class="content-text">
                    <strong>Essential:</strong> Required for core functionality; always active.<br>
                    <strong>Analytics:</strong> Help us understand usage patterns; opt-in via cookie settings.<br>
                    <strong>Marketing:</strong> Enable advertising personalization; opt-in via cookie settings.
                </ul>

                <h4 class="h-white-small">3. Third-party Maps</h4>
                <p class="content-text">
                    Event pages may offer an optional Google Maps embed. The map is not loaded automatically. If you
                    click "Load Google Maps", Google Maps may set or read cookies and similar technologies, and Google
                    may receive technical data about your visit. You can read more in Google's
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy
                        Policy</a>.
                </p>

                <h4 class="h-white-small">4. Managing Cookies</h4>
                <p class="content-text">
                    You can manage or withdraw cookie consent anytime via the "Cookie Settings" option in the banner or
                    your browser settings. Disabling cookies may affect site functionality.
                </p>

                <h4 class="h-white-small">5. Changes to Cookie Policy</h4>
                <p class="content-text">
                    We may revise this policy. Updates take effect when posted with the new date. Please revisit to stay
                    informed.
                </p>
            </div>
        </section>
    </main>
</template>

<script setup>
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
