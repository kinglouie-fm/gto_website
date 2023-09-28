<script setup>
/**
 * Import router components
*/
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()

/**
 * Function: Gets called when a link in the navbar gets clicked.
 * In this case, the dropdown menu which appears on smaller screens gets closed.
 */
const closeNavbar = () => {
  const navbarToggler = document.querySelector('.navbar-toggler')
  const navbarCollapse = document.querySelector('.navbar-collapse')
  
  if (navbarToggler && navbarCollapse) {
    navbarToggler.classList.add('collapsed')
    navbarCollapse.classList.remove('show')
  }
}
</script>

<template>
  <header>
    <!-- Navigation bar -->
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fs-5">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="logo-button-container">
        <div class="images">
          <img alt="GTO logo" class="logo" src="/gto_round.png"/>
        </div>
        <div class="collapse navbar-collapse" id="navbarToggler">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <RouterLink class="nav-link" to="/" @click="closeNavbar">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about" @click="closeNavbar">About</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/contact" @click="closeNavbar">Contact</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <RouterView />
</template>

<style>
/* Styles the navigation bar */
.logo {
  height: 80px;
}

.images {
  width: 100%;
}

.logo-button-container {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Spacing between logo and button */
}

@media only screen and (max-width: 460px) {
  .images, .navbar-nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.nav-item:hover {
  background-color: rgb(68, 65, 65);
  border-radius: 3px;
}
</style>