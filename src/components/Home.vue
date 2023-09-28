<template>
  <!-- This is the Home component which creates the background image. -->
  <div class="bgimg"></div>
</template>

<style scoped>
/* Styles the Home component */
.bgimg {
  background-image: url('/McLaren765LT-7.jpg');
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

@media only screen and (min-width: 600px) {
  .bgimg {
  background-image: url('/image-gto-ben911.jpeg');
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  }
}

</style>
