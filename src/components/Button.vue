<template>
  <!-- External link -->
  <a
    v-if="href"
    :href="href"
    :target="newTab ? '_blank' : '_self'"
    rel="noopener noreferrer"
    class="btn"
  >
    <slot />
    <span class="btn-arrow" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z"
        />
      </svg>
    </span>
  </a>

  <!-- Internal route -->
  <button
    v-else-if="to"
    class="btn"
    @click="handleClick"
  >
    <slot />
    <span class="btn-arrow" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z"
        />
      </svg>
    </span>
  </button>

  <!-- Fallback plain button -->
  <button v-else class="btn">
    <slot />
    <span class="btn-arrow" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z"
        />
      </svg>
    </span>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  to: { type: String, default: null },
  href: { type: String, default: null },
  newTab: { type: Boolean, default: true }
})

const router = useRouter()

const handleClick = () => {
  try {
    if (props.to) {
      const path = props.to.startsWith('/') ? props.to : '/' + props.to
      router.push(path)
    }
  } catch (error) {
    console.error("Route not provided/found", error)
  }
}
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;            /* keep space between text and arrow */
  text-decoration: none;

  /* Make width responsive to content */
  width: auto;            /* was: fixed width */
  min-width: 120px;       /* preserve your size rhythm */
  padding: 0 14px;        /* add horizontal padding instead of fixed width */

  /* Prevent wrapping */
  white-space: nowrap;

  /* keep your colors/border/transition as is */
  height: 40px;
  color: inherit;         /* or your specific color */
  border: 1px solid white;/* for Button.vue; remove if not needed in Filled */
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;       /* 600 for Filled */
  transition: all 0.2s ease;
  margin-right: 3rem;     /* if you need spacing to neighbor */
}

.btn:hover {
  color: rgb(48, 56, 65);
  background-color: white;
}

.btn-arrow {
  display: inline-flex;
  transition: transform 0.2s ease;
}

.btn:hover .btn-arrow {
  transform: translateX(4px); /* arrow slides right */
}

/* Responsiveness like before */
@media (min-width: 576px) {
  .btn {
    width: 135px;
    height: 45px;
    font-size: 16px;
  }
}

@media (min-width: 768px) {
  .btn {
    width: 165px;
    height: 50px;
    font-size: 18px;
  }
}

@media (min-width: 992px) {
  .btn {
    width: 180px;
    height: 70px;
    font-size: 20px;
  }
}
</style>
