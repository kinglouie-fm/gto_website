<template>
<nav class="navbar fixed-top mobile-navbar d-md-none">
        <div class="toggle-container">
            <transition name="icon-fade" mode="out-in">
                <img v-if="!isMenuOpen" key="hamburger" src="/icons/hamburger.svg" alt="Menu" class="toggle-icon"
                    @click="toggleMenu" />
                <img v-else key="close" src="/icons/close.svg" alt="Close" class="toggle-icon" @click="toggleMenu" />
            </transition>
        </div>

        <div class="nav-links-container" :class="{ open: isMenuOpen }">
            <div class="nav-links" :class="{ visible: isMenuOpen }">
                <RouterLink class="nav-link nav-link-mobile" to="/" @click="closeNavbar">Home</RouterLink>
                <RouterLink class="nav-link nav-link-mobile" to="/team" @click="closeNavbar">Team</RouterLink>
                <RouterLink class="nav-link nav-link-mobile" to="/portfolio" @click="closeNavbar">Portfolio</RouterLink>
                <RouterLink class="nav-link nav-link-mobile" to="/lens" @click="closeNavbar">Lens</RouterLink>
            </div>
        </div>

        <div class="logo-container" :class="{ open: isMenuOpen, closed: !isMenuOpen }">
            <img src="/images/gto_logo.png" alt="Logo" class="logo" @click="toHome()" />
        </div>
    </nav>

    <nav class="navbar desktop-navbar fixed-top d-none d-md-block">
        <div class="desktop-container mx-4">
            <div class="left-container">
                <SocialIcons />
            </div>
            <div class="logo-container">
                <img src="/images/gto_logo.png" alt="Logo" class="logo" @click="toHome()" />
            </div>
            <div class="right-container">
                <div class="nav-links d-flex">
                    <RouterLink class="nav-link nav-link-me" to="/" @click="closeNavbar">Home</RouterLink>
                    <RouterLink class="nav-link nav-link-me" to="/team" @click="closeNavbar">Team</RouterLink>
                    <RouterLink class="nav-link nav-link-me" to="/portfolio" @click="closeNavbar">Portfolio</RouterLink>
                    <RouterLink class="nav-link" to="/events" @click="closeNavbar">Events</RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import SocialIcons from './SocialIcons.vue'

const isMenuOpen = ref(false)
const router = useRouter()

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

// Close the mobile navbar when a router link is clicked
const closeNavbar = () => {
    isMenuOpen.value = false
}

const toHome = () => {
    if (isMenuOpen.value) {
        isMenuOpen.value = false
    }
    router.push('/')
}
</script>

<style scoped>
.navbar {
    top: 0;
    background-color: rgba(48, 56, 65, 0.75);
    height: var(--navbar-height);
    overflow: hidden;
    padding: 0;
}

/* MOBILE STYLES */
.mobile-navbar {
    /* position: relative; */
    width: 100%;
}

/* Toggle Icon Container */
.toggle-container {
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
}

.toggle-icon {
    width: 30px;
    height: 23px;
    cursor: pointer;
}

/* Nav Links Container */
.nav-links-container {
    position: absolute;
    left: 60px;
    right: 81px;
    /* keeps space for the logo in the open state */
    top: 0;
    height: var(--navbar-height);
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Nav Links Flex Container */
.nav-links {
    display: flex;
    width: 80%;
    justify-content: space-around;
    align-items: center;
}

/* Mobile nav links styling (initially invisible) */
.nav-link-mobile {
    color: white;
    font-size: 16px;
    opacity: 0;
}

.nav-links-container.open {
    /* remove the 81px right-offset (logo width), leave just enough for the close-icon */
    right: 20px !important;
}

.nav-links-container.open .nav-links {
    width: 100% !important;
}

/* When visible, staggered fade-in via nth-child selectors */
.nav-links.visible .nav-link:nth-child(1) {
    transition: opacity 0.3s ease-in 0.05s;
    opacity: 1;
}

.nav-links.visible .nav-link:nth-child(2) {
    transition: opacity 0.3s ease-in 0.1s;
    opacity: 1;
}

.nav-links.visible .nav-link:nth-child(3) {
    transition: opacity 0.3s ease-in 0.15s;
    opacity: 1;
}

.nav-links.visible .nav-link:nth-child(4) {
    transition: opacity 0.3s ease-in 0.2s;
    opacity: 1;
}

/* Mobile Logo Container: position changes based on state */
.logo-container {
    position: absolute;
    top: 0;
    height: var(--navbar-height);
    transition: left 0.3s ease;
}

.logo-container.closed {
    /* Center the logo: 50% of the width minus half its width (81px / 2) */
    left: calc(50% - 40.5px);
}

.logo-container.open {
    /* In open state, position the logo 20px from the right edge */
    /* left: calc(100% - 20px - 81px); */
    display: none;
}

.logo {
    width: 81px;
    height: 40px;
    object-fit: contain;
    margin-top: calc((var(--navbar-height) - 40px) / 2);
    cursor: pointer;
}

/* Toggle icon fade transition */
.icon-fade-enter-active,
.icon-fade-leave-active {
    transition: opacity 0.2s ease;
}

.icon-fade-enter-from,
.icon-fade-leave-to {
    opacity: 0;
}

/* DESKTOP STYLES */
.desktop-navbar {
    width: 100%;
}

/* Desktop container holds the logo and right-side elements */
.desktop-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--navbar-height);
}

/* Desktop Logo: absolutely centered */
.desktop-navbar .logo-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

/* Desktop nav links styling */
.desktop-navbar .nav-link {
    color: white;
    font-size: 16px;
    text-decoration: none;
}

.nav-link {
    padding: 8px 10px;
    cursor: pointer;
    border-radius: 10px;
}

.nav-link:hover {
    text-decoration: none;
    color: rgba(48, 56, 65);
    border-radius: 10px;
    background-color: white;
}

.nav-link.router-link-active {
    border: 1px solid white;
}

/* For screens 576px and wider */
@media (min-width: 576px) {
    .navbar,
    .logo-container,
    .nav-links-container,
    .desktop-container {
        height: var(--navbar-height);
    }

    .logo {
        margin-top: calc((var(--navbar-height) - 40px) / 2);
    }

    .nav-link-mobile,
    .desktop-navbar .nav-link {
        font-size: 18px;
    }
}

/* For screens 768px and wider */
@media (min-width: 768px) {
    .navbar,
    .logo-container,
    .nav-links-container,
    .desktop-container {
        height: var(--navbar-height);
    }

    .logo {
        margin-top: calc((var(--navbar-height) - 40px) / 2);
    }

    .nav-link-mobile,
    .desktop-navbar .nav-link {
        font-size: 20px;
    }

    .right-container .nav-link-me {
        margin-right: 5px;
    }
}

/* For screens 992px and wider */
@media (min-width: 992px) {
    .navbar,
    .logo-container,
    .nav-links-container,
    .desktop-container {
        height: var(--navbar-height);
    }

    .logo {
        margin-top: calc((var(--navbar-height) - 40px) / 2);
    }

    .nav-link-mobile,
    .desktop-navbar .nav-link {
        font-size: 22px;
    }

    .right-container .nav-link-me {
        margin-right: 10px;
    }
}

@media (min-width: 1200px) {
    .right-container .nav-link-me {
        margin-right: 25px;
    }
}
</style>
