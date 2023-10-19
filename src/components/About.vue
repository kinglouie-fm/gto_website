<script setup>
import AboutCards from './AboutCards.vue'
</script>

<template>
    <!-- 
        This is the About component for describing GTO Luxembourg.
        The imported TeamMember component is used to describe each Team Member.
    -->
    <div class="bgimg"></div>
    <section class="aboutsection">
        <h1 class="title">
            <!-- <p>&copy;</p> -->
            GTO Luxembourg
        </h1>
        <h3 class="subtitle">
            We share passion!
        </h3>
        <p class="description">
            <AboutCards/>
        </p>
    </section>
    <section class="teamsection">
        <h1 class="title">
            Our Team
        </h1>
        <section id="team" class="pb-5">
            <div class="container">
                <div class="box" tabindex="0">
                    <div class="imgBox">
                        <img src="/sample_avatar.jpg" alt="">
                    </div>
                    <div class="content">
                        <h2>Julien Imhoff<br/>
                        <span>President</span></h2>
                    </div>
                </div>
                <div class="box">
                    <div class="imgBox">
                        <img src="/sample_avatar.jpg" alt="">
                    </div>
                    <div class="content">
                        <h2>Max Mannes<br/>
                        <span>Vice President</span></h2>
                    </div>
                </div>
                <div class="box">
                    <div class="imgBox">
                        <img src="/sample_avatar.jpg" alt="">
                    </div>
                    <div class="content">
                        <h2>Jeff Nosbusch<br/>
                        <span>Secretary</span></h2>
                    </div>
                </div>
                <div class="box">
                    <div class="imgBox">
                        <img src="/sample_avatar.jpg" alt="">
                    </div>
                    <div class="content">
                        <h2>Ben Thillen<br/>
                        <span>Treasurer & Webmaster</span></h2>
                    </div>
                </div>
                <div class="box">
                    <div class="imgBox">
                        <img src="/sample_avatar.jpg" alt="">
                    </div>
                    <div class="content">
                        <h2>Gilles Declercq<br/>
                        <span>Clothing</span></h2>
                    </div>
                </div>
                <div class="box">
                    <div class="imgBox">
                        <img src="/sample_avatar.jpg" alt="">
                    </div>
                    <div class="content">
                        <h2>Laurent Reding<br/>
                        <span>TikTok</span></h2>
                    </div>
                </div>
                <div class="box">
                    <div class="imgBox">
                        <img src="/sample_avatar.jpg" alt="">
                    </div>
                    <div class="content">
                        <h2>Noah Leuck<br/>
                        <span>Facebook</span></h2>
                    </div>
                </div>
                <div class="box">
                    <div class="imgBox">
                        <img src="/sample_avatar.jpg" alt="">
                    </div>
                    <div class="content">
                        <h2>Jona Leuck<br/>
                        <span>Clothing</span></h2>
                    </div>
                </div>
                <div class="box">
                    <div class="imgBox">
                        <img src="/sample_avatar.jpg" alt="">
                    </div>
                    <div class="content">
                        <h2>Dylan Pereira<br/>
                        <span>Member</span></h2>
                    </div>
                </div>
                <div class="box">
                    <div class="imgBox">
                        <img src="/sample_avatar.jpg" alt="">
                    </div>
                    <div class="content">
                        <h2>Ben Steimens<br/>
                        <span>Always part of us!</span></h2>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
  
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
.aboutimg {
    height: 600px;
    width: 100%;
}

.bgimg {
    background-image: url('/Aventador.SRS-3.jpg');
    width: 100%;
    height: 50vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}


@media only screen and (max-width: 800px) {
    .bgimg {
        background-image: url('/Aventador.SRS-3-mobile.jpg');
    }
}

h1, h3, p {
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
}

section {
    padding-top: 40px;
}

.aboutsection {
    margin-top: 50px;
    margin-bottom: 100px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    font-size: 114px;
    margin-bottom: 0px;
    margin-top: 0px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.subtitle {
    margin-top: 10px;
    font-size: 60px;
    color: rgba(61, 130, 134, 0.7);
}

.description {
    font-family: "Roboto", serif;
    font-size: 25px;
    margin-left: 200px;
    margin-right: 200px;
}

@media only screen and (max-width: 991px) {    
    .aboutsection {
        margin-top: 0px;
    }
    
    .title {
        font-size: 50px;
    }

    .subtitle {
        margin-top: 10px;
        font-size: 30px;
    }
    
    .description {
        font-size: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }
}

.teamsection {
    background: rgba(61, 130, 134, 0.7);
    height: 100%;
    width: 100%;
}

.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.container .box {
  position: relative;
  width: 20rem;
  height: 20rem;
  margin: 3rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.container .box:hover .imgBox {
  transform: translate(-3.5rem, -3.5rem);
}

.container .box:hover .content {
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

.imgBox :is(img) {
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
  background-color: #fff;
  z-index: 1;
  align-items: flex-end;
  text-align: center;
  transition: 0.5s ease-in-out;
}

.content h2 {
  display: block;
  font-size: 20px;
  color: #111;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 1px;
}

.content span {
  color: #555;
  font-size: 15px;
  font-weight: 300;
  letter-spacing: 2px;
}

@media (max-width: 800px) {
  .container .box:hover .content {
    transform: translate(0, 3.5rem);
  }
  .container .box:hover .imgBox {
    transform: translate(0, -3.5rem);
  }
}

/* Default style for the "Hover or click here" tooltip */
.container .box:first-of-type::after {
    content: "Hover or click here";
    position: absolute;
    top: -30px;  /* Position it above the box */
    left: 50%;
    transform: translateX(-50%);
    background-color: #3D8286;  /* Sample color, you can adjust */
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    pointer-events: none;  /* Ensure the tooltip doesn't interfere with the hover of the box */
    transition: 0.5s ease-in-out;  /* Add a transition effect */
}

/* Move the tooltip behind the card when the first box is hovered */
.container .box:first-of-type:hover::after {
    top: 100%;  /* Moves it just below the box */
    opacity: 0;  /* Fade it out */
}
</style>