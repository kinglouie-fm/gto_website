<template>
    <div class="social-icons d-flex">
        <a class="social-icon" style="color: white;" href="https://www.instagram.com/gto.lu/" target="_blank"
            role="button">
            <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>
        <a class="social-icon mx-3" style="color: white;" href="https://www.tiktok.com/@gto.lu" target="_blank"
            role="button">
            <font-awesome-icon :icon="['fab', 'tiktok']" />
        </a>
        <a class="social-icon" style="color: white;" href="https://www.facebook.com/GTOLuxembourg" target="_blank"
            role="button">
            <font-awesome-icon :icon="['fab', 'facebook']" />
        </a>
    </div>
</template>

<style scoped>
.social-icon {
    font-size: 26px;
    cursor: pointer;
    display: inline-block;
    line-height: 0;
    vertical-align: middle;
}

/* For screens 576px and wider */
@media (min-width: 576px) {
    .social-icon {
        font-size: 28px;
    }
}

/* For screens 768px and wider */
@media (min-width: 768px) {
    .social-icon {
        font-size: 32px;
    }
}

/* For screens 992px and wider */
@media (min-width: 992px) {
    .social-icon {
        font-size: 36px;
    }
}
</style>