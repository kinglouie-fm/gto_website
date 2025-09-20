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

    <section class="team container-p">
        <h3 class="text-center h-white">Get to know the team</h3>
        <div class="team-grid">
            <TeamMemberCard image="/images/team/julien.webp" name="Julien Imhoff" role="Founder, President" 
            @click="openImageModal('/images/team/julien.webp', 'Julien Imhoff, Founder and President of GTO Luxembourg')" />
            <TeamMemberCard image="/images/team/ben.webp" name="Ben Thillen" role="Vice-President, <br />Webmaster"
            @click="openImageModal('/images/team/ben.webp', 'Ben Thillen, Vice-President and Webmaster of GTO Luxembourg')" />
            <TeamMemberCard image="/images/team/laurent.webp" name="Laurent Reding" role="Treasurer"
            @click="openImageModal('/images/team/laurent.webp', 'Laurent Reding, Treasurer of GTO Luxembourg')" />
            <TeamMemberCard image="/images/team/jeff.webp" name="Jeff Nosbusch" role="Secretary"
            @click="openImageModal('/images/team/jeff.webp', 'Jeff Nosbusch, Secretary of GTO Luxembourg')" />
            <TeamMemberCard image="/images/team/gilles.webp" name="Gilles Declercq" role="Administration, Legal"
            @click="openImageModal('/images/team/gilles.webp', 'Gilles Declercq, responsible for Administration and Legal matters.')" />
            <TeamMemberCard image="/images/team/noah.webp" name="Noah Leuck" role="Facebook"
            @click="openImageModal('/images/team/noah.webp', 'Noah Leuck, responsible for our Facebook presence.')" />
            <TeamMemberCard image="/images/team/jona.webp" name="Jona Leuck" role="Organisation"
            @click="openImageModal('/images/team/jona.webp', 'Jona Leuck, responsible for Organisation.')" />
            <TeamMemberCard image="/images/team/dylan.webp" name="Dylan Perreira" role="Media Relations"
            @click="openImageModal('/images/team/dylan.webp', 'Dylan Perreira, responsible for media relations.')" />
        </div>
    </section>

    <section class="friend container-p">
        <div class="friend-container">
            <img src="/images/team/ben_steimens.webp" alt="Our beloved friend Ben Steimens"
                class="img-fluid ben_steimens border" />
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
import ImageModal from '@/components/ImageModal.vue';
import TeamMemberCard from '@/components/TeamMemberCard.vue'
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

    // Animate .team when it scrolls into view
    gsap.from('.team', {
        scrollTrigger: {
            trigger: '.team',
            start: 'top 50%',
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
            start: 'top 60%',
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
.hero {
    margin-top: var(--navbar-height);
}

.team-grid {
    display: grid;
    gap: 30px;
    padding: 0 20px;
    justify-content: center;
    grid-template-columns: repeat(2, 1fr);
}

.content {
    background-color: rgb(48, 56, 65);
    margin-top: -80px;
    padding-top: 80px;
    color: white;
}

.team {
    background-color: rgb(76, 84, 94);
    color: white;
}

.img-fluid {
    cursor: pointer;
}

.h-yellow .team .h-white {
    padding-bottom: 1.25rem;
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
.content, p {
    font-size: 1rem;
}

.heading-pt {
    padding-top: 1.25rem;
}

/* For screens 576px and wider */
@media (min-width: 576px) {
    .content {
        margin-top: -100px;
        padding-top: 100px;
    }

    .ben_steimens {
        width: 40%;
        max-width: 300px;
        height: auto;
        max-height: 160px;
    }

    .h-yellow .team .h-white {
        padding-bottom: 1.5rem;
    }

    .heading-pt {
        padding-top: 1.5rem;
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

    .ben_steimens {
        width: 35%;
        max-width: 400px;
        max-height: 200px;
    }
}

/* For screens 992px and wider */
@media (min-width: 992px) {
    .content {
        margin-top: -140px;
        padding-top: 140px;
    }

    .ben_steimens {
        width: 35%;
        max-width: 600px;
        max-height: 350px;
    }

    .team .h-white {
        padding-bottom: 2.5rem;
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
}
</style>
