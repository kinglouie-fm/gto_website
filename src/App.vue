<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fs-5">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <div class="images">
          <img alt="GTO logo" class="logo" src="@/assets/GTO_round.png"/>
        </div>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/contact">Contact</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/events">Events</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/gallery">Gallery</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
      <!-- <nav>
        <div class="images">
          <img alt="GTO logo" class="logo" src="@/assets/GTO_round.png"/>
        </div>
        <div class="routerlinks">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
          <RouterLink to="/events">Events</RouterLink>
          <RouterLink to="/gallery">Gallery</RouterLink>
        </div>
      </nav> -->
  </header>
  <RouterView />
</template>

<style>

.logo {
  height: 80px;
}

.images {
  width: 100%;
}

.nav-item:hover {
  background-color: rgb(68, 65, 65);
  border-radius: 3px;
}

</style>