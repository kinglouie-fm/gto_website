<template>
    <!-- 
        This is the About component for describing GTO Luxembourg.
        The imported TeamMember component is used to describe each Team Member.
    -->
    <div class="image-box p-0">
        <Carousel :wrap-around="true" :autoplay="5000">
            <Slide v-for="(image, index) in carousel1Items" :key="index">
                <img class="carousel__item" :src="image" alt="Carousel Image">
            </Slide>
            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>
    <section class="aboutsection">
        <h1 class="title about-title">
            <!-- <p>&copy;</p> -->
            GTO Luxembourg
        </h1>
        <h3 class="subtitle">
            We share passion!
        </h3>
        <p class="description p-about">
            <AboutCards />
        </p>
    </section>
    <section class="teamsection">
        <h1 class="title team-title">
            Our Team
        </h1>
        <section id="team" class="pb-5">
            <div class="team-container">
                <div class="box col-lg-4 col-md-6 m-5">
                    <div class="imgBox">
                        <img src="/images/members/GTO-members-1.jpeg" alt="Julien Imhoff">
                    </div>
                    <div class="content">
                        <h2>Julien Imhoff<br><span class="span-title">Founder, President</span></h2>
                    </div>
                </div>
                <div class="box col-lg-4 col-md-6 m-5">
                    <div class="imgBox">
                        <img src="/images/members/GTO-members-7.jpeg" alt="Max Mannes">
                    </div>
                    <div class="content">
                        <h2>Ben Thillen<br />
                            <span class="span-title">Vice-President, Webmaster</span>
                        </h2>
                    </div>
                </div>
                <div class="box col-lg-4 col-md-6 m-5">
                    <div class="imgBox">
                        <img src="/images/members/GTO-members-10.jpeg" alt="">
                    </div>
                    <div class="content">
                        <h2>Jeff Nosbusch automated deploy check<br />
                            <span class="span-title">Secretary</span>
                        </h2>
                    </div>
                </div>
                <div class="box col-lg-4 col-md-6 m-5">
                    <div class="imgBox">
                        <img src="/images/members/GTO-members-2.jpeg" alt="">
                    </div>
                    <div class="content mt-4">
                        <h2>Laurent Reding<br />
                            <span class="span-title">Treasurer</span>
                        </h2>
                    </div>
                </div>
                <div class="box col-lg-4 col-md-6 m-5">
                    <div class="imgBox">
                        <img src="/images/members/GTO-members-4.jpeg" alt="">
                    </div>
                    <div class="content">
                        <h2>Gilles Declercq<br />
                            <span class="span-title">Administration, Legal</span>
                        </h2>
                    </div>
                </div>
                <div class="box col-lg-4 col-md-6 m-5">
                    <div class="imgBox">
                        <img src="/images/members/GTO-members-3.jpeg" alt="">
                    </div>
                    <div class="content">
                        <h2>Max Mannes<br />
                            <span class="span-title">Media Relations</span>
                        </h2>
                    </div>
                </div>
                <div class="box col-lg-4 col-md-6 m-5">
                    <div class="imgBox">
                        <img src="/images/members/GTO-members-6.jpeg" alt="">
                    </div>
                    <div class="content">
                        <h2>Noah Leuck<br />
                            <span class="span-title">Facebook</span>
                        </h2>
                    </div>
                </div>
                <div class="box col-lg-4 col-md-6 m-5">
                    <div class="imgBox">
                        <img src="/images/members/GTO-members-5.jpeg" alt="">
                    </div>
                    <div class="content">
                        <h2>Jona Leuck<br />
                            <span class="span-title">Organisation</span>
                        </h2>
                    </div>
                </div>
                <div class="box col-lg-4 col-md-6 m-5">
                    <div class="imgBox">
                        <img src="/images/members/GTO-members-9.png" alt="">
                    </div>
                    <div class="content">
                        <h2>Dylan Pereira<br />
                            <span class="span-title">Media Relations</span>
                        </h2>
                    </div>
                </div>
                <div class="box col-lg-4 col-md-6 m-5">
                    <div class="imgBox">
                        <img src="/images/members/GTO-members-8.jpeg" alt="">
                    </div>
                    <div class="content">
                        <h2>Ben Steimens<br />
                            <span class="span-title">Always part of us!</span>
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script setup>
import AboutCards from './AboutCards.vue'
import { ref } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'

const carousel1Items = ref([
    "/images/Aventador.SRS-3.jpeg",
    "/images/members/GTO-Luxembourg.jpg",
])
</script>

<style scoped>
/* Styles the About component */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap");

*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.image-box {
    box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.5);
}

.carousel__item {
    height: calc(30vw + 20vh);
    width: 100%;
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
}

.aboutimg {
    height: 600px;
    width: 100%;
}

.bgimg {
    background-image: url('/images/Aventador.SRS-3.jpeg');
    width: 100%;
    height: 50vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

@media only screen and (max-width: 800px) {
    .bgimg {
        background-image: url('/images/Aventador.SRS-3-mobile.jpeg');
    }
}

h1,
h3,
.p-about {
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
}

.aboutsection {
    padding-top: 50px;
    padding-bottom: 100px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(238, 238, 238);

    @media screen and (max-width: 576px) {
        padding-bottom: 10px;
    }
}

.title {
    font-size: calc(4vw + 4vh);
    margin-bottom: 0px;
    margin-top: 0px;
}

.about-title {
    color: rgb(48, 56, 65);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.team-title {
    color: rgb(246, 201, 14);
}

.subtitle {
    margin-top: 10px;
    font-size: calc(3vw + 3vh);
    color: rgb(246, 201, 14);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
}

.description {
    font-family: "Roboto", sans-serif;
}

@media only screen and (max-width: 991px) {
    .aboutsection {
        margin-top: 0px;
    }

    .subtitle {
        margin-top: 10px;
    }

    .description {
        margin-left: 20px;
        margin-right: 20px;
    }
}

.teamsection {
    background: rgb(58, 71, 80);
}

.team-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.team-container .box {
    position: relative;
    width: calc(15vw + 10vh);
    height: calc(15vw + 10vh);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin: 10px;

    /* @media (max-width: 576px) {
        width: 100px;
        height: 100px;
    } */
}

.team-container .box:hover .imgBox {
    transform: translate(-3.5rem, -3.5rem);
}

.team-container .box:hover .content {
    transform: translate(3.5rem, 3.5rem);
}

.imgBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    transition: all 0.5s ease-in-out;
}

.imgBox img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    resize: both;
}

.content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    display: flex;
    justify-content: center;
    z-index: 1;
    align-items: flex-end;
    text-align: center;
    transition: 0.5s ease-in-out;
}

.content h2 {
    display: block;
    font-size: calc(1vw + 1.2vh);
    color: rgb(246, 201, 14);
    font-weight: 500;
    letter-spacing: 1px;

    @media screen and (max-width: 576px) {
        font-size: 10px;
    }
}

.content span {
    color: rgb(246, 201, 14);
    font-size: calc(0.5vw + 1vh);
    font-weight: 300;
    letter-spacing: 2px;
}

@media (max-width: 800px) {
    .team-container .box:hover .content {
        transform: translate(0, 3.5rem);
    }

    .team-container .box:hover .imgBox {
        transform: translate(0, -3.5rem);
    }
}

@media (max-width: 576px) {
    .team-container .box:hover .content {
        transform: translate(0, 2.5rem);
    }

    .team-container .box:hover .imgBox {
        transform: translate(0, -2.5rem);
    }
}

/* Default style for the "Hover or click here" tooltip */
.team-container .box:first-of-type::after {
    content: "Hover/Click";
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgb(246, 201, 14);
    color: rgb(258, 258, 258);
    padding: 5px 10px;
    border-radius: 5px;
    pointer-events: none;
    transition: 0.5s ease-in-out;
}

/* Move the tooltip behind the card when the first box is hovered */
.team-container .box:first-of-type:hover::after {
    top: 100%;
    opacity: 0;
}
</style>