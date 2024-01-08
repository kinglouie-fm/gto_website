<template>
    <div class="container outer-container">
        <div class="row mt-5">
            <!-- Team -->
            <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-4">
                <div class="card text-center p-4 rounded-custom">
                    <p class="card-title">
                        <font-awesome-icon :icon="['fas', 'people-group']" style="color: #3d8286;" />
                        Team
                    </p>
                    <p class="card-description">Established in 2017, GTO Luxembourg is a group of car enthusiasts
                        which has grown to a cool crew of 10 members.
                        We're just regular individuals who adore all types of cars, but we hold a particular fascination for
                        supercars and hypercars.</p>
                </div>
            </div>

            <!-- Community -->
            <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-4">
                <div class="card text-center p-4 rounded-custom">
                    <p class="card-title">
                        <font-awesome-icon :icon="['fas', 'heart']" style="color: rgb(175, 30, 30, 0.7);" />
                        Community
                    </p>
                    <p class="card-description">But we're not just about cars; we're about people who share our passion.
                        Whether you're a car expert or just curious, we want to hear from you.
                        Ask questions, write us, or just say hi - we're here to make friends as well as memories.</p>
                </div>
            </div>

            <!-- Events -->
            <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-4">
                <div class="card text-center p-4 rounded-custom">
                    <p class="card-title">
                        <font-awesome-icon :icon="['fas', 'location-arrow']" style="color: #3d8286;" />
                        Events
                    </p>
                    <p class="card-description">Our main gig is our annual event, the Supercar Sunday (SCS) by GTO
                        Luxembourg. It's the day when sportcars and supercars roll
                        in to steal the show. Trust us; you don't want to miss it!</p>
                </div>
            </div>

            <!-- Tours -->
            <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-4">
                <div class="card text-center p-4 rounded-custom">
                    <p class="card-title">
                        <font-awesome-icon :icon="['fas', 'car']" style="color: #bd8214cb;" />
                        Car Tours
                    </p>
                    <p class="card-description">But wait, there's more! We also organize smaller car tours that you can
                        join.
                        It's an opportunity to experience the road in a more intimate setting and
                        to share stories with fellow enthusiasts. Let's hit the road together!</p>
                </div>
            </div>

            <!-- Photoshooting -->
            <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-4">
                <div class="card text-center p-4 rounded-custom">
                    <p class="card-title">📸 Photoshooting</p>
                    <p class="card-description">Got a car that deserves the spotlight? We've got your back with professional
                        photoshoots.
                        Just drop us a message via our website's contact form or hit us up on social media - the links are
                        down below.</p>
                </div>
            </div>

            <!-- Social Media -->
            <div class="col-lg-4 col-md-6 d-flex align-items-stretch mb-4">
                <div class="card text-center p-4 rounded-custom">
                    <p class="card-title">
                        <font-awesome-icon :icon="['fas', 'share-from-square']" style="color: #4b525e;" />
                        Social Media
                    </p>
                    <p class="card-description">Speaking of social media, check out our profile for some cool car pics.
                        And keep an eye out because we're planning to show off our best shots right here on the website too.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.outer-container {
    width: 1200px !important;
    padding: 0 !important;
    margin-right: auto;
    margin-left: auto;

    @media screen and (min-width: 992px) and (max-width: 1439px) {
        max-width: 1279px !important;
        padding: 0 !important;
        margin: 0 80px !important;
        width: auto !important;
    }

    @media screen and (max-width: 991px) {
        max-width: 959px !important;
        margin: 0 16px !important;
        padding: 0 !important;
        width: auto !important;
    }
}

.gradient-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    padding: 30px;

    @media screen and (max-width: 991px) {
        grid-template-columns: 1fr;
    }
}

.card {
    max-width: 550px;
    border: 0;
    width: 100%;
    margin-inline: auto;
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
    background-color: rgb(58, 71, 80) !important;
}

.card::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.card:hover::before {
    opacity: 0.5;
}

.card:hover {
    transform: scale(1.05);
}

.container-card {
    position: relative;
    border: 2px solid transparent;
    background: linear-gradient(71deg, #080509, #1a171c, #080509);
    background-clip: padding-box;
    border-radius: 45px;
    padding: 40px;
}

.container-card img {
    margin-bottom: 32px;
}

.card-title {
    font-weight: 400;
    color: rgb(238, 238, 238);
    letter-spacing: -0.02em;
    line-height: 40px;
    font-style: normal;
    font-size: 28px;
    padding-bottom: 8px;
}

.card-description {
    font-weight: 600;
    line-height: 32px;
    color: rgb(238, 238, 238);
    font-size: 16px;
    max-width: 470px;
}
</style>
