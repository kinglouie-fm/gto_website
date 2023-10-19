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
    <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark fs-5">
      <div class="button-logo-container">
        <div class="logo-container">
          <div class="images">
            <img alt="GTO logo" class="logo" src="/gto_logo.png"/>
          </div>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <font-awesome-icon icon="bars" style="color: #fff;" />
        </button>
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
    </nav>
  </header>
  <RouterView />

  <!-- 
            Two social media buttons with the corresponding color and link.
            Here, fortawesome is used to get the icons
          -->
  <footer v-if="$route.path !== '/'">
    <div class="footer-center">
        <h4 class="text-white-50">Follow us on:</h4>
        <!-- Instagram -->
        <a style="color: #ac2bac;" href="https://www.instagram.com/gto.lu/" target=”_blank” role="button">
            <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>
        <!-- Facebook -->
        <a style="color: #3b5998;" href="https://www.facebook.com/GTOLuxembourg" target=”_blank” role="button">
            <font-awesome-icon :icon="['fab', 'facebook']" />
        </a>
        <!-- TikTok -->
        <a style="color: #868686ae;" href="https://www.tiktok.com/@gto.lu" target=”_blank” role="button">
            <font-awesome-icon :icon="['fab', 'tiktok']" />
        </a>
    </div>
    <div class="copyright">
        <p class="text-white-50">&copy; 2023 GTO Luxembourg. All rights reserved.</p>
    </div>
  </footer>
</template>

<style>
.logo {
  height: 80px;
}

.button-logo-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-item:hover {
  background-color: rgb(68, 65, 65);
  border-radius: 3px;
}

.footer-center, p {
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
}

h4 {
  padding-top: 15px;
  margin-bottom: 0 !important;
}

a {
    padding: 0 10px;
    font-size: 50px;
}

html, footer {
    background-color: #212529;
}

@media only screen and (max-width: 800px) {

  .button-logo-container, .navbar-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
  }

  .nav-item {
    display: flex;
    align-items: center; /* Center vertically */
    justify-content: center; /* Center horizontally */
  }

  .nav-item:hover {
    background-color: transparent;
    border-radius: 0px;
  }
}
</style>