<template>
    <section class="footer text-center" :style="{ backgroundColor: bgColor }">
        <a href="https://www.reinert.lu" target="_blank">
            <img src="/images/reinert_logo.png" alt="Reinert Logo" class="reinert-logo me-5" />
        </a>
        <a href="https://www.wot.lu" target="_blank">
            <img src="/images/wot_white_logo.svg" alt="WOT Logo" class="wot-logo" />
        </a>
        <p class="mb-0 pb-5">
            &copy; 2025 GTO Luxembourg. All rights reserved.
        </p>
    </section>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    bgColor: {
        type: String,
        default: 'rgb(48, 56, 65)'
    }
})
</script>

<style scoped>
/* Base text styles for screens below 576px */
.text-center {
    color: white;
    font-size: 10px;
}

/* Logo sizes for small screens */
.reinert-logo {
    width: 135px;
    height: 45px;
}

.wot-logo {
    width: 125px;
    height: 20px;
}

/* For screens 576px and wider */
@media (min-width: 576px) {
    .text-center {
        font-size: 12px;
    }

    .reinert-logo {
        width: 150px;
        height: 50px;
    }

    .wot-logo {
        width: 140px;
        height: 25px;
    }
}

/* For screens 768px and wider */
@media (min-width: 768px) {
    .text-center {
        font-size: 14px;
    }

    .reinert-logo {
        width: 170px;
        height: 60px;
    }

    .wot-logo {
        width: 160px;
        height: 30px;
    }
}

/* For screens 992px and wider */
@media (min-width: 992px) {
    .text-center {
        font-size: 16px;
    }

    .reinert-logo {
        width: 190px;
        height: 70px;
    }

    .wot-logo {
        width: 180px;
        height: 35px;
    }
}

@media (min-width: 1200px) {
    .text-center {
        font-size: 18px;
    }

    .reinert-logo {
        width: 250px;
        height: auto;
    }

    .wot-logo {
        width: 230px;
        height: auto;
    }
}
</style>