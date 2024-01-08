<template>
  <div class="image-box">
    <Carousel :wrap-around="true" :autoplay="10000">
      <Slide v-for="(image, index) in carousel1Items" :key="index">
        <img class="carousel__item" :src="image" alt="Carousel Image">
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>

  <div class="content">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-10">
          <div class="row align-items-center">
            <div class="col-lg-4 col-md-6 text-center">
              <img alt="GTO logo" class="logo img-fluid" src="/GTO_round.png" />
            </div>
            <div class="col-lg-8 col-md-6">
              <h2 class="title content-title">Who are we?</h2>
              <p class="slogan"><em>We share passion!</em></p>
              <p>GTO Luxembourg is a group of car enthusiasts who organize events, photoshootings, and car tours.</p>
              <p>&rarr; Make sure to check the <a href="/#/about" class="about-link">About</a> page!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="sponsor py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <h1 class="title sponsor-title text-center mb-4">Sponsored by</h1>
          <div class="row align-items-center">
            <div class="col-md-6 text-center mb-3">
              <img src="/fm-detailing_logo-black.png" alt="Sponsor 1" class="img-fluid logo-fm-detailing">
            </div>
            <div class="col-md-6 text-center mb-3">
              <img src="/reinert_logo.png" alt="Sponsor 2" class="img-fluid">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'

const carousel1Items = ref([
  'image-gto-ben911.jpeg',
  '488-pista.jpeg',
])
</script>

<style scoped>
.logo {
  max-width: 100%;
  object-fit: contain;
}

.image-box,
.content {
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.5);
}

.title {
  font-size: 60px;
  margin-bottom: 0px;
  margin-top: 0px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.content {
  background-color: rgb(238, 238, 238);
}

.sponsor {
  background-color: rgb(58, 71, 80);
}

.content-title {
  color: rgb(58, 71, 80);
}

.slogan {
  color: rgb(255, 185, 22);
}

.sponsor-title {
  color: rgb(255, 185, 22);
}

.about-link {
  color: rgb(255, 185, 22);
  text-decoration: none;
  transition: font-size 0.3s ease;
}

.about-link:hover {
  font-size: 110%;
}

.carousel__item {
  height: 680px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
}

.sponsor-logos .sponsor-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sponsor-logos .sponsor-logo img {
  max-width: 80%;
  transition: transform 0.3s ease;
}

.sponsor-logos .sponsor-logo img:hover {
  transform: scale(1.05);
}

.logo-fm-detailing {
  max-width: 100%;
  object-fit: contain;
  height: 150px;
}

p {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 30px;
  color: rgb(58, 71, 80);
}
</style>
