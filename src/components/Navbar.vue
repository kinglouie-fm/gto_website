<template>
  <!-- ===== MOBILE NAVBAR (updated) ===== -->
  <nav class="navbar fixed-top mobile-navbar d-md-none">
    <!-- Hamburger (same spot as before) -->
    <div class="toggle-container">
      <transition name="icon-fade" mode="out-in">
        <img
          v-if="!isMenuOpen"
          key="hamburger"
          src="/icons/hamburger.svg"
          alt="Menu"
          class="toggle-icon"
          @click="toggleMenu"
        />
        <img
          v-else
          key="close"
          src="/icons/close.svg"
          alt="Close"
          class="toggle-icon"
          @click="toggleMenu"
        />
      </transition>
    </div>

    <!-- Centered logo while closed (your old behavior) -->
    <div class="logo-container" :class="{ open: isMenuOpen, closed: !isMenuOpen }">
      <img src="/images/gto_logo.png" alt="Logo" class="logo" @click="toHome()" />
    </div>

    <!-- Backdrop -->
    <transition name="fade">
      <div v-if="isMenuOpen" class="backdrop" @click="closeNavbar"></div>
    </transition>

    <!-- LEFT Drawer -->
    <transition name="slide">
      <aside
        v-if="isMenuOpen"
        class="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobileMenuTitle"
      >
        <!-- Drawer top bar: close icon (same spot as trigger) + centered logo -->
        <div class="drawer-toprow">
          <!-- Close icon (exactly where the hamburger lives) -->
          <button class="close-btn" @click="closeNavbar" aria-label="Close menu">
            <img src="/icons/close.svg" alt="Close" />
          </button>

          <!-- Centered GTO logo in the drawer header row -->
          <img src="/images/gto_logo.png" alt="GTO" class="drawer-logo" />
        </div>

        <!-- Social icons (centered), then divider with 60px spacing above the line -->
        <div class="social-wrap">
          <SocialIcons />
        </div>

        <hr class="drawer-sep" />

        <!-- Nav list (starts 60px below the line) -->
        <nav class="menu">
          <RouterLink to="/" class="menu-item" @click="closeNavbar">
            <span class="material-symbols-outlined">home</span>
            <span class="mi-text">Home</span>
          </RouterLink>

          <RouterLink to="/team" class="menu-item" @click="closeNavbar">
            <span class="material-symbols-outlined">group</span>
            <span class="mi-text">Team</span>
          </RouterLink>

          <RouterLink to="/portfolio" class="menu-item" @click="closeNavbar">
            <span class="material-symbols-outlined">cases</span>
            <span class="mi-text">Portfolio</span>
          </RouterLink>

          <RouterLink to="/events" class="menu-item" @click="closeNavbar">
            <span class="material-symbols-outlined">festival</span>
            <span class="mi-text">Events</span>
          </RouterLink>

          <RouterLink to="/lens" class="menu-item" @click="closeNavbar">
            <span class="material-symbols-outlined">photo_camera</span>
            <span class="mi-text">GTOLens</span>
          </RouterLink>
        </nav>

        <!-- CTA 60px below links -->
        <div class="drawer-cta">
          <p class="cta-text">Photoshooting for free?</p>
          <ButtonFilled to="portfolio">Book</ButtonFilled>
        </div>
      </aside>
    </transition>
  </nav>

  <!-- ===== DESKTOP NAVBAR (unchanged) ===== -->
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
import ButtonFilled from '@/components/ButtonFilled.vue'

const isMenuOpen = ref(false)
const router = useRouter()

const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value }
const closeNavbar = () => { isMenuOpen.value = false }
const toHome = () => { if (isMenuOpen.value) isMenuOpen.value = false; router.push('/') }
</script>

<style scoped>
.navbar {
  top: 0;
  background-color: rgba(48, 56, 65, 0.75);
  height: var(--navbar-height);
  overflow: hidden;
  padding: 0;
}

/* ===== MOBILE ONLY ===== */
.mobile-navbar { width: 100%; }
@media (min-width: 768px) { .mobile-navbar { display: none; } }

/* Toggle (hamburger/close) — top-left */
.toggle-container {
  position: absolute; left: 20px; top: 0; bottom: 0;
  display: flex; align-items: center; justify-content: center;
  width: 30px;
}
.toggle-icon { width: 30px; height: 23px; cursor: pointer; }

/* Centered logo in the top bar while closed */
.logo-container {
  position: absolute; top: 0; height: var(--navbar-height);
  transition: left 0.3s ease;
}
.logo-container.closed { left: calc(50% - 40.5px); }
.logo-container.open { display: none; }
.logo {
  width: 81px; height: 40px; object-fit: contain;
  margin-top: calc((var(--navbar-height) - 40px) / 2);
  cursor: pointer;
}

/* Backdrop */
.backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.45); z-index: 999; }

/* Drawer (LEFT) */
.drawer {
  position: fixed; top: 0; left: 0; bottom: 0;
  width: 86vw; max-width: 420px; height: 100dvh;
    background-color: rgb(48, 56, 65);
  color: #fff; z-index: 1000;
  padding: 16px 18px 24px;
  box-shadow: 8px 0 24px rgba(0,0,0,.35);
  display: flex; flex-direction: column;
}

/* Top row: close button at the same spot, logo centered horizontally */
.drawer-toprow {
  position: relative;
  height: var(--navbar-height); /* keeps same vertical rhythm as top bar */
  display: flex; align-items: center; justify-content: center;
}
.close-btn {
  position: absolute; left: 20px; top: 50%; transform: translateY(-50%);
  width: 30px; height: 30px; background: transparent; border: 0; padding: 0; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
}
.close-btn img { width: 26px; height: 26px; }
.drawer-logo { height: 40px; width: auto; object-fit: contain; }

/* Social icons centered, then a thin line; 60px spacing above the line */
.social-wrap {
  display: flex; align-items: center; justify-content: center;
  padding-top: 16px;
  margin-top: 0;
}
.drawer-sep {
  border: 0; border-top: 1px solid rgba(255,255,255,.14);
  margin: 60px 0 0 0;         /* 60px space above the line */
}

/* Menu starts 60px below the line; centered */
.menu {
  display: flex; flex-direction: column; align-items: center;
  margin-top: 60px;           /* 60px below the line */
}

/* Menu item: icon + 15px gap + text; centered block */
.menu-item {
  display: inline-flex; align-items: center; justify-content: center;
  color: #fff; text-decoration: none;
  font-size: 1.125rem; line-height: 1;
  padding: 10px 0;
  width: 100%;
  gap: 15px;
}
.menu-item:hover { border-radius: 10px; }
.mi-icon { display: inline-flex; align-items: center; justify-content: center; }
.mi-text { display: inline-block; }

/* CTA 60px below the links */
.drawer-cta {
  margin-top: 60px;
  display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px;
}
.cta-text { margin: 0; }
.drawer-cta .btn {
  margin: 0;             /* remove any default side margin */
}

/* Transitions */
.icon-fade-enter-active, .icon-fade-leave-active { transition: opacity .2s ease; }
.icon-fade-enter-from, .icon-fade-leave-to { opacity: 0; }

.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform .22s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); } /* from LEFT */

/* ===== DESKTOP (unchanged) ===== */
.desktop-navbar { width: 100%; }
.desktop-container {
  position: relative; display: flex; justify-content: space-between; align-items: center; height: var(--navbar-height);
}
.desktop-navbar .logo-container { position: absolute; left: 50%; transform: translateX(-50%); }
.desktop-navbar .nav-link { color: white; font-size: 16px; text-decoration: none; }
.nav-link { padding: 8px 10px; cursor: pointer; border-radius: 10px; }
.nav-link:hover { text-decoration: none; color: rgba(48,56,65); background-color: white; }
.nav-link.router-link-active { border: 1px solid white; }

@media (min-width: 576px) {
  .navbar, .logo-container, .desktop-container { height: var(--navbar-height); }
  .logo { margin-top: calc((var(--navbar-height) - 40px) / 2); }
  .desktop-navbar .nav-link { font-size: 18px; }
}
@media (min-width: 768px) {
  .navbar, .logo-container, .desktop-container { height: var(--navbar-height); }
  .logo { margin-top: calc((var(--navbar-height) - 40px) / 2); }
  .desktop-navbar .nav-link { font-size: 20px; }
  .right-container .nav-link-me { margin-right: 5px; }
}
@media (min-width: 992px) {
  .navbar, .logo-container, .desktop-container { height: var(--navbar-height); }
  .logo { margin-top: calc((var(--navbar-height) - 40px) / 2); }
  .desktop-navbar .nav-link { font-size: 22px; }
  .right-container .nav-link-me { margin-right: 10px; }
}
@media (min-width: 1200px) {
  .right-container .nav-link-me { margin-right: 25px; }
}
</style>
