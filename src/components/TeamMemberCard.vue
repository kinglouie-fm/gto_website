<template>
    <div class="team-member">
        <img :src="image" :alt="name" class="img-fluid team-img border" />
        <h4 class="h-member">{{ name }}</h4>
        <p class="team-role" v-html="role"></p>
    </div>
</template>

<script setup>
defineProps({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
})
</script>

<style scoped>
.team-member {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
}

.team-img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%;
}

.h-member {
    margin-bottom: 0;
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

.img-fluid {
    cursor: pointer;
}

@media (min-width: 576px) {
    .team-img {
        width: 140px;
        height: 140px;
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
}

@media (min-width: 768px) {
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
}

@media (min-width: 992px) {
    .team-img {
        width: 200px;
        height: 200px;
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

    .team-img:hover {
        transform: scale(1.05);
        transition: transform 0.2s ease;
    }
}

@media (min-width: 1200px) {
    .team-member {
        margin-bottom: 40px;
    }
}

@media (min-width: 1400px) {
    .team-member {
        margin-bottom: 50px;
    }
}
</style>
