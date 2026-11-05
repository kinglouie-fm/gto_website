<template>
    <main>
        <section class="container content container-pb">
            <h1 class="text-center h-yellow h-first">Legal Notice</h1>

            <div class="container">
                <h2 class="h-white-small">GTO Luxembourg</h2>
                <p class="content-text">Association sans but lucratif (ASBL)</p>
                <p class="content-text">
                    Registered with the Luxembourg Trade and Companies Register (RCS) under number
                    <a href="https://www.lbr.lu/mjrcs-web-front/consult-company/F11601?tab=deposit">F11601</a>.
                </p>
                <p class="content-text">
                    Registered office: 4, Lengerwiss, L-9184 Schrondweiler, Luxembourg.
                </p>
                <p class="content-text">
                    Official website: <a href="https://gto-luxembourg.lu">https://gto-luxembourg.lu</a>
                </p>
                <p class="content-text">
                    Contact: <a href="mailto:gto.luxembourg@hotmail.com">gto.luxembourg@hotmail.com</a>
                </p>
                <p class="content-text">
                    This contact email address will be updated once an email address on our official domain,
                    gto-luxembourg.lu, is set up.
                </p>

                <h2 class="h-white-small">About the association</h2>
                <p class="content-text">
                    Founded in 2017, GTO Luxembourg is a non-profit organization built on friendship and a shared passion
                    for cars. Since then, we have grown into a team of 9 members.
                </p>
                <p class="content-text">
                    Whether it's by organizing events, going on tours with special cars, or arranging photoshoots, we're
                    dedicated to promoting the car culture in Luxembourg. While we appreciate all kinds of cars, our
                    main focus lies on the exclusive niche of supercars and hypercars.
                </p>

                <h2 class="h-white-small">Website ownership</h2>
                <p class="content-text">
                    This website is the official website of GTO Luxembourg ASBL, registered in Luxembourg under RCS
                    number F11601.
                </p>
            </div>
        </section>
    </main>
</template>

<style scoped>
.container {
    max-width: 800px;
}

h1 {
    padding-top: var(--navbar-height);
}

.content-text {
    margin: 0.75rem 0;
}

.h-white-small {
    font-size: 1.25rem;
}

h2:not(:first-child) {
    margin-top: 1.5rem;
}

a {
    color: #f5d442;
    text-decoration: none;
}

a:hover,
a:focus-visible {
    text-decoration: underline;
}

@media (min-width: 576px) {
    .content-text {
        font-size: 1.1rem;
    }

    .h-white-small {
        font-size: 1.5rem;
    }
}
</style>
