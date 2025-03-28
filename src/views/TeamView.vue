<template>
    <section class="hero">
        <img v-if="!highQualityLoaded" src="/images/team/team.webp" alt="GTO Team Picture low quality"
            class="hero-img low-res" />
        <transition name="fade">
            <img v-if="highQualityLoaded" src="/images/team/team.jpeg" alt="GTO Team Picture high quality"
                class="hero-img high-res" />
        </transition>
    </section>

    <VerticalSlider />

    <section class="content container-pb">
        <h3 class="text-center h-yellow h-first">Who are we?</h3>
        <p class="text-center">
            We share passion!
        </p>
        <p class="text-center content-text">
            Founded in 2017, GTO Luxembourg is a non-profit organization built on friendship and a shared passion for
            cars. What started as a simple idea among friends has grown into a team of 8 members, united by the beauty
            of automotive design.
            <br>
            <br>
            We enjoy bringing people together—whether it's by organizing events, setting up photoshoots, or going on
            tours with special cars. While we appreciate all types of cars, our hearts beat a little faster for
            supercars and hypercars.
        </p>
    </section>

    <section class="photoshooting container-p">
        <div class="photoshooting-wrapper">
            <div class="photoshooting-text text-center">
                <h3 class="h-white">Want to book a <br>photoshooting?</h3>
                <div class="button-container d-flex justify-content-center align-items-center">
                    <ButtonFilled to="portfolio" class="portfolio-button">Portfolio</ButtonFilled>
                </div>
            </div>
            <div class="ferrari-container">
                <img src="/images/other/ferrari_488pista.webp" alt="Ferrari 488 Pista"
                    class="img-fluid ferrari-488-pista"
                    @click="openImageModal('/images/other/ferrari_488pista.webp', 'Ferrari 488 Pista')" />
            </div>
        </div>
    </section>

    <section class="events text-center container-p">
        <h3 class="text-center h-yellow">Events</h3>

        <div class="scs-container">
            <div class="scs-img-container">
                <img src="/images/other/gto_scs6.webp" alt="Porsche 992 GT3" class="img-fluid gto_scs6"
                    @click="openImageModal('/images/other/gto_scs6.webp', 'Porsche 992 GT3')" />
            </div>
            <h4 class="text-center h-white-small heading-pt">Supercar Sunday</h4>
            <p class="text-center content-text">
                Our main event is the Supercar Sunday (SCS) by GTO Luxembourg. Once a year, we bring together car
                enthusiasts to share their passion, to check out some cool cars, and spend a great day in good company.
            </p>
        </div>

        <div class="tour-container">
            <div class="tour-img-container">
                <img src="/images/other/gto_tours.webp" alt="GTO goes Luxembourg" class="img-fluid gto_tour"
                    @click="openImageModal('/images/other/gto_tours.webp', 'GTO goes Luxembourg')" />
            </div>
            <h4 class="text-center h-white-small heading-pt">GTO goes Luxembourg</h4>
            <p class="text-center content-text">
                GTO goes Luxembourg is our smaller car tour that we organize a few times a year. It's usually held in a
                more private and relaxed setting, giving everyone a chance to enjoy the drive, have some fun, and
                connect with other car enthusiasts along the way.
            </p>
        </div>
    </section>

    <section class="team container-p">
        <h3 class="text-center h-white">Get to know the team</h3>
        <div class="team-grid">
            <div class="team-member">
                <img src="/images/team/julien.webp" alt="Julien Imhoff" class="img-fluid team-img" />
                <h4 class="h-member">Julien Imhoff</h4>
                <p class="team-role">Founder, President</p>
            </div>
            <div class="team-member">
                <img src="/images/team/ben.webp" alt="Ben Thillen" class="img-fluid team-img" />
                <h4 class="h-member">Ben Thillen</h4>
                <p class="team-role">Vice-President, <br />Webmaster</p>
            </div>
            <div class="team-member">
                <img src="/images/team/laurent.webp" alt="Laurent Reding" class="img-fluid team-img" />
                <h4 class="h-member">Laurent Reding</h4>
                <p class="team-role">Treasurer</p>
            </div>
            <div class="team-member">
                <img src="/images/team/jeff.webp" alt="Jeff Nosbusch" class="img-fluid team-img" />
                <h4 class="h-member">Jeff Nosbusch</h4>
                <p class="team-role">Secretary</p>
            </div>
            <div class="team-member">
                <img src="/images/team/gilles.webp" alt="Gilles Declercq" class="img-fluid team-img" />
                <h4 class="h-member">Gilles Declercq</h4>
                <p class="team-role">Administration, Legal</p>
            </div>
            <div class="team-member">
                <img src="/images/team/noah.webp" alt="Noah Leuck" class="img-fluid team-img" />
                <h4 class="h-member">Noah Leuck</h4>
                <p class="team-role">Facebook</p>
            </div>
            <div class="team-member">
                <img src="/images/team/jona.webp" alt="Jona Leuck" class="img-fluid team-img" />
                <h4 class="h-member">Jona Leuck</h4>
                <p class="team-role">Organisation</p>
            </div>
            <div class="team-member">
                <img src="/images/team/dylan.webp" alt="Dylan Perreira" class="img-fluid team-img" />
                <h4 class="h-member">Dylan Perreira</h4>
                <p class="team-role">Media Relations</p>
            </div>
        </div>
    </section>

    <section class="friend container-p">
        <div class="friend-container">
            <img src="/images/team/ben_steimens.webp" alt="Our beloved friend Ben Steimens"
                class="img-fluid ben_steimens" />
        </div>
        <h4 class="text-center h-white-small heading-pt">Ben Steimens</h4>
        <p class="text-center content-text">
            Special thanks to our beloved friend, who sadly passed away a few years ago. Your smile and kindness will be
            missed but never forgotten. We will always keep you in our hearts.
            <br>
            <br>
            <i>Mia san GTO.</i>
            <br>
            Rest in peace, Ben.
        </p>
    </section>

    <ImageModal v-if="selectedImage" :imageSrc="selectedImage" :carName="selectedCarName"
        @close="selectedImage = null" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import VerticalSlider from '@/components/VerticalSlider.vue';
import ButtonFilled from '@/components/ButtonFilled.vue';
import ImageModal from '@/components/ImageModal.vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const highQualityLoaded = ref(false)

// Reactive property to hold the URL of the clicked image
const selectedImage = ref(null);
const selectedCarName = ref('');

// Function to open the image modal
const openImageModal = (imageUrl, carName) => {
    selectedImage.value = imageUrl;
    selectedCarName.value = carName;
}

onMounted(() => {
    const img = new Image()
    img.src = '/images/team/team.jpeg'
    img.onload = () => {
        highQualityLoaded.value = true
    }

    // Animate .photoshooting when it scrolls into view
    gsap.from('.photoshooting', {
        scrollTrigger: {
            trigger: '.photoshooting',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2
    })

    // Animate .events when it scrolls into view
    gsap.from('.events', {
        scrollTrigger: {
            trigger: '.events',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2
    })

    // Animate .team when it scrolls into view
    gsap.from('.team', {
        scrollTrigger: {
            trigger: '.team',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2
    })

    // Animate .friend when it scrolls into view
    gsap.from('.friend', {
        scrollTrigger: {
            trigger: '.friend',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2
    })
})
</script>

<style scoped>
/* ---------------------- Base Styles (for screens below 576px) ---------------------- */
.hero {
    margin-top: var(--navbar-height);
}

.team-grid {
    display: grid;
    gap: 30px;
    padding: 0 20px;
    justify-content: center;
    /* Default: two columns for mobile */
    grid-template-columns: repeat(2, 1fr);
}

/* Content section overlaps the hero by 80px */
.content {
    background-color: rgb(48, 56, 65);
    margin-top: -80px;
    padding-top: 80px;
    color: white;
}

.photoshooting,
.team {
    background-color: rgb(76, 84, 94);
    color: white;
}

/* The wrapper remains a flex container that stacks vertically on mobile */
.photoshooting-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* add some vertical spacing */
    gap: 20px;
}

/* Ferrari container – add padding/margin so the image doesn't touch the container edges */
.ferrari-container {
    display: flex;
    justify-content: center;
    align-items: center;
    /* Set a max-width to control the size on mobile */
    max-width: 90%;
}

/* Optionally, adjust the image size if needed */
.ferrari-488-pista {
    width: 100%;
    height: auto;
    max-width: 243px;
    /* Base size for mobile */
    border-radius: 10px;
}

.events {
    background-color: rgb(48, 56, 65);
}

.img-fluid {
    cursor: pointer;
}

.events .h-yellow,
.team .h-white {
    padding-bottom: 1.25rem;
}

/* Container to center the image using flexbox */
.scs-img-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Base styles for the Ferrari image on mobile (e.g. ~393px width screens) */
.gto_scs6 {
    width: 243px;
    height: 160px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
}

/* Container to center the image using flexbox */
.tour-img-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Base styles for the Ferrari image on mobile (e.g. ~393px width screens) */
.gto_tour {
    width: 243px;
    height: 160px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
}

.friend-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ben_steimens {
    width: 157px;
    height: 181px;
    object-fit: cover;
    border-radius: 10px;
}

/* Paragraph base font size */
.content .photoshooting .events p {
    font-size: 1rem;
    /* line-height: 15px; */
}

.team-member {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
}

.team-img {
    /* On mobile (~393px width), this will be about 243px wide; adjust as needed */
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%;
    /* Fully rounded; use a fixed value like 100px if desired */
}

.heading-pt {
    padding-top: 1.25rem;
}

.team-role {
    font-size: 0.875rem;
    color: white;
    margin: 0;
    line-height: 1rem;
}

.team-member h4 {
    margin-bottom: 0;
}

/* ---------------------- Responsive Adjustments ---------------------- */

/* For screens 576px and wider */
@media (min-width: 576px) {
    .content {
        margin-top: -100px;
        padding-top: 100px;
    }

    .ferrari-488-pista,
    .gto_scs6,
    .gto_tour,
    .ben_steimens {
        width: 40%;
        max-width: 300px;
        height: auto;
        max-height: 160px;
    }

    .team-img {
        width: 140px;
        height: 140px;
    }

    .events .h-yellow,
    .team .h-white {
        padding-bottom: 1.5rem;
    }

    .heading-pt {
        padding-top: 1.5rem;
    }

    .h-member {
        font-size: 1.125rem;
    }

    .team-role {
        font-size: 1rem;
        line-height: 1.125rem;
    }

    .team-member {
        margin-bottom: 15px;
    }

    .ferrari-488-pista {
        width: 100%;
        height: auto;
        max-width: 300px;
        /* This can be increased by media queries below */
    }
}

/* For screens 768px and wider */
@media (min-width: 768px) {
    .hero-img {
        object-position: 50% 10%;
    }

    .content {
        margin-top: -120px;
        padding-top: 120px;
    }

    /* Since it is a special layout when screen larger */
    .photoshooting .h-white {
        padding-top: 0;
    }

    /* Since it is a special layout when screen larger */
    .portfolio-button {
        margin-top: 20px;
    }

    .ferrari-488-pista,
    .gto_scs6,
    .gto_tour,
    .ben_steimens {
        width: 35%;
        max-width: 400px;
        max-height: 200px;
    }

    .team-img {
        width: 160px;
        height: 160px;
    }

    .h-member {
        font-size: 1.25rem;
    }

    .team-role {
        font-size: 1.125rem;
        line-height: 1.25rem;
    }

    .team-member {
        margin-bottom: 20px;
    }

    .photoshooting-wrapper {
        flex-direction: row;
        align-items: center;
        margin: 0 auto;
        max-width: 1200px;
    }

    /* Ensure the text container and image container have equal widths or specific ratios */
    .photoshooting-text {
        flex: 1;
        text-align: left;
    }

    .ferrari-container {
        flex: 1;
        max-width: 50%;
    }

    .ferrari-488-pista {
        width: 100%;
        height: auto;
        max-width: 300px;
        /* This can be increased by media queries below */
    }
}

/* For screens 992px and wider */
@media (min-width: 992px) {
    .content {
        margin-top: -140px;
        padding-top: 140px;
    }

    .ferrari-488-pista,
    .gto_scs6,
    .gto_tour,
    .ben_steimens {
        width: 35%;
        max-width: 600px;
        max-height: 350px;
    }

    .team-img {
        width: 200px;
        height: 200px;
    }

    .team .h-white {
        padding-bottom: 2.5rem;
    }

    .h-member {
        font-size: 1.5rem;
    }

    .team-role {
        font-size: 1.25rem;
        line-height: 1.5rem;
    }

    .team-member {
        margin-bottom: 25px;
    }

    .team-member:hover {
        transform: scale(1.05);
        transition: transform 0.2s ease;
    }

    .ferrari-488-pista {
        width: 100%;
        height: auto;
        max-width: 400px;
    }
}

/* For screens over 1200px: use three columns.
   With 8 items, this yields 3 rows: first two rows with 3 items, last row with 2 items.
   The last row will be centered via justify-content */
@media (min-width: 1200px) {
    .team-grid {
        grid-template-columns: repeat(3, 1fr);
        justify-content: center;
    }

    .team .h-white {
        padding-bottom: 3rem;
    }

    .team-member {
        margin-bottom: 40px;
    }
}

/* For screens over 1400px: use four columns (2 rows of 4 items) */
@media (min-width: 1400px) {
    .team-grid {
        grid-template-columns: repeat(4, 1fr);
        justify-content: center;
    }

    .team .h-white {
        padding-bottom: 4rem;
    }

    .team-member {
        margin-bottom: 50px;
    }
}
</style>
