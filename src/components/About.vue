<template>
    <img alt="Lamborghini Aventador LP-700" class="aboutimg" src="../assets/Aventador.SRS-3.jpg"/>
    <!-- <div class="aboutimg">
        IMAGE
    </div> -->
    <section class="aboutsection">
        <h1 class="title">
            GTO Luxembourg<font size="5">&#169</font>
        </h1>
        <h3 class="subtitle">
            We share passion!
        </h3>
        <p class="description">
            Founded in 2018 by our president Julien Imhoff, GTO Luxembourg is a team of 13 members who have a
            passion for cars. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </section>
    <section class="teamsection">
        <h1 class="title">
            Team
        </h1>
    </section>
</template>
  
<style scoped>
    .aboutimg {
        height: 600px;
        width: 100%;
        background-color: grey;
    }

    h1, h3, p {
        text-align: center;
        font-family: "Inter", sans-serif;
        font-weight: 400;
    }

    section {
        padding-top: 40px;
    }

    .aboutsection {
        margin-top: 50px;
        margin-bottom: 500px;
    }

    .title {
        font-size: 114px;
        margin-bottom: 0px;
        margin-top: 0px;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }

    .subtitle {
        margin-top: 100px;
        font-size: 50px;
    }

    .description {
        font-family: serif;
        font-size: 30px;
        margin-left: 200px;
        margin-right: 200px;
    }

    .teamsection {
        background: rgba(61, 130, 134, 0.7);
        height: 1250px;
    }
</style>