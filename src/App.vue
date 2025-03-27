<template>
    <Navbar />
    <RouterView />
    <Footer :bgColor="bgColor" />
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

const bgColor = computed(() =>
    route.path === '/portfolio' ? 'rgb(76, 84, 94)' : 'rgb(48, 56, 65)'
)
</script>

<style></style>