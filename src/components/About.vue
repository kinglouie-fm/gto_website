<script setup>
    import TeamMember from './TeamMember.vue'
</script>

<template>
    <div class="bgimg"></div>
    <section class="aboutsection">
        <h1 class="title">
            <!-- TODO: warning in chrome console with font-->
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
            Our Team
        </h1>
        <section id="team" class="pb-5">
            <div class="container">
                <div class="row">
                    <TeamMember image='<img class=" img-fluid" src="src/assets/GTO_round.png" alt="card image" />'
                        name="Julien Imhoff" frontmsg="President" 
                        backmsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam elementum quam, non tincidunt nunc tristique blandit. Praesent sed neque at ante lacinia congue. Praesent vulputate consectetur lorem id vulputate."/>
                    <TeamMember 
                        name="Max Mannes" frontmsg="Vice President" 
                        backmsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam elementum quam, non tincidunt nunc tristique blandit. Praesent sed neque at ante lacinia congue. Praesent vulputate consectetur lorem id vulputate."/>
                    <TeamMember 
                        name="Jeff Nosbusch" frontmsg="Secretary" 
                        backmsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam elementum quam, non tincidunt nunc tristique blandit. Praesent sed neque at ante lacinia congue. Praesent vulputate consectetur lorem id vulputate."/>
                    <TeamMember 
                        name="Ben Steimens" frontmsg="Always part of the team" 
                        backmsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam elementum quam, non tincidunt nunc tristique blandit. Praesent sed neque at ante lacinia congue. Praesent vulputate consectetur lorem id vulputate."/>
                    <TeamMember 
                        name="Gilles Declerq" frontmsg="Law Futzi" 
                        backmsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam elementum quam, non tincidunt nunc tristique blandit. Praesent sed neque at ante lacinia congue. Praesent vulputate consectetur lorem id vulputate."/>
                    <TeamMember 
                        name="Ben Thillen" frontmsg="Webmaster & Social Media Manager" 
                        backmsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam elementum quam, non tincidunt nunc tristique blandit. Praesent sed neque at ante lacinia congue. Praesent vulputate consectetur lorem id vulputate."/>
                    <TeamMember 
                        name="Mika Wilmes" frontmsg="Treasurer" 
                        backmsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam elementum quam, non tincidunt nunc tristique blandit. Praesent sed neque at ante lacinia congue. Praesent vulputate consectetur lorem id vulputate."/>
                    <TeamMember 
                        name="Jona Leuck" frontmsg="Organization" 
                        backmsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam elementum quam, non tincidunt nunc tristique blandit. Praesent sed neque at ante lacinia congue. Praesent vulputate consectetur lorem id vulputate."/>
                    <TeamMember 
                        name="Noah Leuck" frontmsg="Organization" 
                        backmsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam elementum quam, non tincidunt nunc tristique blandit. Praesent sed neque at ante lacinia congue. Praesent vulputate consectetur lorem id vulputate."/>
                    <TeamMember 
                        name="Tom Lekl" frontmsg="Organization" 
                        backmsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam elementum quam, non tincidunt nunc tristique blandit. Praesent sed neque at ante lacinia congue. Praesent vulputate consectetur lorem id vulputate."/>
                    <TeamMember 
                        name="Dylan Pereira" frontmsg="Sponsor" 
                        backmsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam elementum quam, non tincidunt nunc tristique blandit. Praesent sed neque at ante lacinia congue. Praesent vulputate consectetur lorem id vulputate."/>
                    <TeamMember 
                        name="Dave Feiereisen" frontmsg="Nichtsnutz" 
                        backmsg="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquam elementum quam, non tincidunt nunc tristique blandit. Praesent sed neque at ante lacinia congue. Praesent vulputate consectetur lorem id vulputate."/>
                </div>
            </div>
        </section>
    </section>
</template>
  
<style scoped>
.aboutimg {
    height: 600px;
    width: 100%;
}

.bgimg {
    background-image: url('@/assets/Aventador.SRS-3.jpg');
    height: 50vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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
    height: 100%;
}
</style>