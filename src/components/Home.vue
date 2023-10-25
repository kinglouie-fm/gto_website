<template>
  <div class="container outer-container-home vh-100 mt-5">
  <div class="container middle-container-home">
    <div class="container d-flex align-items-center">
      <div class="row w-100">
        <div class="col-md-5 d-flex flex-column justify-content-center">
          <h1 class="heading-home">Discover
            <div class="images">
              <img alt="GTO logo" class="logo" src="/GTO_round.png"/>
            </div>
          </h1>
          <p class="p-home">We share passion! GTO Luxembourg is a group of car enthusiasts who organize events, photoshootings and car tours.</p>
          <button class="btn btn-primary about-button">About</button>
          <div class="social-buttons mt-5">
            <!-- Instagram -->
            <a class="social-icon" style="color: #ac2bac;" href="https://www.instagram.com/gto.lu/" target=”_blank” role="button">
                <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <!-- Facebook -->
            <a class="social-icon" style="color: #3b5998;" href="https://www.facebook.com/GTOLuxembourg" target=”_blank” role="button">
                <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
            <!-- TikTok -->
            <a class="social-icon" style="color: #868686ae;" href="https://www.tiktok.com/@gto.lu" target=”_blank” role="button">
                <font-awesome-icon :icon="['fab', 'tiktok']" />
            </a>
          </div>
        </div>

        <div class="col-md-4">
          <Carousel :wrap-around="true" v-if="showFirstCarousel">
            <Slide v-for="(image, index) in carousel1Items" :key="index">
              <img class="carousel__item" :src="image" alt="Carousel Image">
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
          <Carousel :wrap-around="true" v-if="showSecondCarousel">
            <Slide v-for="(image, index) in carousel2Items" :key="index">
              <img class="carousel__item" :src="image" alt="Carousel Image">
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>

        <div class="col-md-3 d-flex align-items-center justify-content-end">
          <div class="button-container p-3">
            <button 
              :class="['btn', 'btn-custom', { 'btn-active': showFirstCarousel }]"
              @click="showFirstCarousel = true, showSecondCarousel = false">Photo-shooting</button>
            <button 
              :class="['btn', 'btn-custom', { 'btn-active': showSecondCarousel }]"
              @click="showFirstCarousel = false, showSecondCarousel = true">Supercar Sunday</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'

const showFirstCarousel = ref(true)
const showSecondCarousel = ref(false)
const carousel1Items = ref([
  '/Aventador.SRS-2.jpeg',
  '/F8 Tributo-15.jpeg',
  '/McLaren765LT-7.jpg'
])
const carousel2Items = ref([
  '/SCSBen-14.jpeg',
  '/SCSBen-24.jpeg',
  '/SCSBen-44.jpeg'
])
</script>

<style scoped>
.logo {
  width: 50%;
  height: 50%;
}

.middle-container-home {
  background-color: rgba(61, 130, 134, 0.7);
  padding: 100px 0px 50px 50px;
  border-radius: 30px; /* Adjust this value as per your preference */
}

.social-buttons {
  display: flex;
  justify-content: space-between; /* Adjust as needed */
  width: 100px; /* Adjust as needed */
}
.outer-container-home {
  padding-top: 70px; /* offset for fixed navbar */
}

.heading-home {
  font-weight: 800;
  letter-spacing: 2px;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  font-size: 4vw;
  line-height: 1.2;
}

.heading-home, .p-home {
  padding-left: 0;
  margin-left: 0;
}
.about-button {
  font-size: 20px;
  width: 120px;
  height: 60px;
  background-color: rgba(61, 130, 134, 0.7);
  color: black;
  border-radius: 10px;
  border: 1px rgba(61, 130, 134, 0.7);
}

.heading-home {
  font-size: 70px;
}

.carousel__item {
  min-height: 200px;
  max-height: 700px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.btn-custom {
  font-size: 20px;
  padding: 0;
  margin-bottom: 10px;
  height: 90px;
  width: 180px;
  background-color: white;
  color: black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-active {
  background-color: rgba(61, 130, 134, 0.7);
  color: black;
  border-radius: 10px;
  border: 1px solid rgba(61, 130, 134, 0.7);
}

.button-container button + button {
  border-top: none;
}
.social-icon {
  font-size: 50px; /* or any size you prefer */
  display: inline-block; /* Aligns the icon correctly */
  transition: transform 0.2s; /* Smooth transition for hover effect */
}

.social-icon:hover {
  transform: scale(1.1); /* Slightly enlarge the icon on hover */
}
</style>
