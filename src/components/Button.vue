<template>
  <a v-if="href" ref="buttonElement" data-anim="text-hover" :href="href" :target="newTab ? '_blank' : '_self'"
    rel="noopener noreferrer" class="btn" :aria-label="label">
    <span class="btn__label-window" aria-hidden="true">
      <span class="btn__label">
        <span v-for="(character, index) in characters" :key="index" class="btn__char"
          :style="{ '--char-index': index }">
          <span class="btn__char-track">
            <span>{{ displayCharacter(character) }}</span>
            <span>{{ displayCharacter(character) }}</span>
          </span>
        </span>
      </span>
    </span>
    <span class="btn-arrow" aria-hidden="true"><font-awesome-icon :icon="faArrowRightLong" /></span>
  </a>

  <router-link v-else-if="to" ref="buttonElement" data-anim="text-hover" :to="normalizedTo" class="btn"
    :aria-label="label">
    <span class="btn__label-window" aria-hidden="true">
      <span class="btn__label">
        <span v-for="(character, index) in characters" :key="index" class="btn__char"
          :style="{ '--char-index': index }">
          <span class="btn__char-track">
            <span>{{ displayCharacter(character) }}</span>
            <span>{{ displayCharacter(character) }}</span>
          </span>
        </span>
      </span>
    </span>
    <span class="btn-arrow" aria-hidden="true"><font-awesome-icon :icon="faArrowRightLong" /></span>
  </router-link>

  <button v-else ref="buttonElement" data-anim="text-hover" type="button" class="btn" :aria-label="label">
    <span class="btn__label-window" aria-hidden="true">
      <span class="btn__label">
        <span v-for="(character, index) in characters" :key="index" class="btn__char"
          :style="{ '--char-index': index }">
          <span class="btn__char-track">
            <span>{{ displayCharacter(character) }}</span>
            <span>{{ displayCharacter(character) }}</span>
          </span>
        </span>
      </span>
    </span>
    <span class="btn-arrow" aria-hidden="true"><font-awesome-icon :icon="faArrowRight" /></span>
  </button>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { useTextHoverAnimation } from '@/composables/useTextHoverAnimation'

const props = defineProps({
  to: { type: String, default: null },
  href: { type: String, default: null },
  newTab: { type: Boolean, default: true }
})

const slots = useSlots()
const buttonElement = ref(null)
const label = computed(() => (slots.default?.() ?? [])
  .map((node) => typeof node.children === 'string' ? node.children : '')
  .join('')
  .replace(/\s+/g, ' ')
  .trim())
const characters = computed(() => Array.from(label.value))
const normalizedTo = computed(() => props.to?.startsWith('/') ? props.to : `/${props.to}`)
const displayCharacter = (character) => character === ' ' ? '\u00a0' : character

useTextHoverAnimation(buttonElement, {
  characterSelector: '.btn__char-track',
  y: '-50%'
})
</script>

<style scoped>
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  width: auto;
  min-width: 132px;
  height: 44px;
  padding: 0 1.15rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  background: transparent;
  color: white;
  cursor: pointer;
  font-family: 'Airstrike', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.btn:hover,
.btn:focus-visible {
  border-color: rgb(246, 201, 14);
  background-color: rgba(255, 255, 255, 0.04);
  color: rgb(246, 201, 14);
  text-decoration: none;
}

.btn:focus-visible {
  outline: 2px solid rgb(246, 201, 14);
  outline-offset: 4px;
}

.btn__label-window {
  display: inline-flex;
  height: 1.3em;
  overflow: hidden;
  line-height: 1.3;
}

.btn__label {
  display: inline-flex;
  align-items: flex-start;
}

.btn__char {
  display: inline-block;
  vertical-align: top;
}

.btn__char-track {
  display: block;
  will-change: transform;
}

.btn__char-track>span {
  display: block;
  height: 1.3em;
  line-height: 1.3;
}

.btn-arrow {
  display: inline-flex;
  font-family: Arial, sans-serif;
  font-size: 1.15em;
  line-height: 1;
  transition: transform 0.25s ease;
}

@media (min-width: 576px) {
  .btn {
    min-width: 145px;
    font-size: 1rem;
  }
}

@media (min-width: 768px) {
  .btn {
    min-width: 165px;
    height: 50px;
    font-size: 1.1rem;
  }

  .btn:hover .btn-arrow,
  .btn:focus-visible .btn-arrow {
    transform: translateX(4px);
  }
}

@media (min-width: 992px) {
  .btn {
    min-width: 180px;
    font-size: 1.2rem;
  }
}

@media (max-width: 360px) {
  .btn .btn-arrow {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {

  .btn,
  .btn::after,
  .btn-arrow {
    transition: none;
  }
}
</style>
