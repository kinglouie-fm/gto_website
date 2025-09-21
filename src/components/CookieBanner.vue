<template>
    <div v-if="!dismissed" class="cookie-banner">
        <div class="banner-main" v-if="!customizing">
            <p class="banner-text">
                We use cookies to improve your experience. Read our
                <RouterLink to="/privacy">Privacy Policy</RouterLink> and
                <RouterLink to="/cookie-policy">Cookie Policy</RouterLink>.
            </p>
            <div class="banner-actions">
                <button @click="acceptEssential" class="btn-essential">
                    Essential only
                </button>
                <button @click="customizing = true" class="btn-customize">
                    Customize
                </button>
                <button @click="acceptAll" class="btn-accept-all">
                    Accept all
                </button>
            </div>
        </div>

        <div class="banner-customize" v-else>
            <h4>Manage your cookie preferences</h4>
            <form @submit.prevent="savePreferences">
                <div class="cookie-row">
                    <label>
                        <input type="checkbox" checked disabled />
                        Essential cookies (required)
                    </label>
                </div>
                <div class="cookie-row">
                    <label>
                        <input type="checkbox" v-model="prefs.analytics" />
                        Analytics cookies
                    </label>
                </div>
                <div class="cookie-row">
                    <label>
                        <input type="checkbox" v-model="prefs.marketing" />
                        Marketing cookies
                    </label>
                </div>
                <div class="customize-actions">
                    <button type="button" @click="cancelCustomize" class="btn-cancel">
                        Cancel
                    </button>
                    <button type="submit" class="btn-save">
                        Save preferences
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const dismissed = ref(false)
const customizing = ref(false)

// default prefs
const prefs = ref({ analytics: true, marketing: true })

const updateGaConsent = ({ analytics, marketing }) => {
  window.gtag?.('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  });
};

// cookie helpers
function setConsentCookie(valueObj) {
    const json = encodeURIComponent(JSON.stringify(valueObj))
    // expires in 365 days
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
    document.cookie = `cookieConsent=${json}; expires=${expires}; path=/; SameSite=Lax; Secure`
}

function getConsentCookie() {
    const match = document.cookie.match(/(?:^|; )cookieConsent=([^;]+)/)
    if (!match) return null
    try {
        return JSON.parse(decodeURIComponent(match[1]))
    } catch {
        return null
    }
}

onMounted(() => {
    const saved = getConsentCookie()
    if (saved !== null) {
        dismissed.value = true
        prefs.value = {
            analytics: !!saved.analytics,
            marketing: !!saved.marketing
        }
        updateGaConsent(prefs.value)
    }
})

function acceptEssential() {
    const value = { analytics: true, marketing: true }
    setConsentCookie(value)
    updateGaConsent(value)
    dismissed.value = true
}

function acceptAll() {
    const value = { analytics: false, marketing: false }
    setConsentCookie({ analytics: true, marketing: true })
    dismissed.value = true
}

function savePreferences() {
    const value = {
        analytics: !!prefs.value.analytics,
        marketing: !!prefs.value.marketing
    }
    setConsentCookie(value)
    updateGaConsent(value) 
    dismissed.value = true
}

function cancelCustomize() {
    customizing.value = false
    // reset checkboxes to last saved or defaults
    const saved = getConsentCookie()
    if (saved) prefs.value = { ...saved }
}
</script>

<style scoped>
.cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(48, 56, 65, 0.95);
    color: white;
    z-index: 2000;
    font-size: 0.9rem;
}

/* Main banner */
.banner-main {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
}

.banner-text {
    flex: 1 1 100%;
    margin: 0 0 0.5rem 0;
    text-align: center;
}

.banner-text a {
    color: #f5d442;
    text-decoration: underline;
}

.banner-actions {
    flex: 1 1 100%;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}

.banner-actions button {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
}

.btn-essential {
    background: #40464f;
    color: #fff;
}

.btn-customize {
    background: transparent;
    color: #f5d442;
    border: 1px solid #f5d442;
}

.btn-accept-all {
    background: #f5d442;
    color: #303841;
}

/* Customize panel */
.banner-customize {
    padding: 1rem;
    background: #303841;
}

.banner-customize h4 {
    margin: 0 0 1rem;
    font-size: 1.1rem;
}

.cookie-row {
    margin-bottom: 0.75rem;
}

.cookie-row label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.customize-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
}

.btn-cancel,
.btn-save {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
}

.btn-cancel {
    background: #40464f;
    color: #fff;
}

.btn-save {
    background: #f5d442;
    color: #303841;
}

/* Responsive */
@media (max-width: 576px) {

    .banner-main,
    .banner-customize {
        text-align: center;
    }

    .banner-text,
    .banner-actions {
        flex: 1 1 100%;
    }

    .customize-actions {
        flex-direction: column-reverse;
    }
}
</style>
