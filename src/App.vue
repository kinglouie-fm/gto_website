<template>
    <CookieBanner />
    <Navbar />
    <RouterView />
    <Footer v-if="route.path !== '/lens/camera'" :bgColor="bgColor" />
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import CookieBanner from './components/CookieBanner.vue'

const route = useRoute()

const bgColor = computed(() =>
    route.path === '/portfolio' || route.path === '/events' ? 'rgb(76, 84, 94)' : 'rgb(48, 56, 65)'
)
</script>

<style></style>