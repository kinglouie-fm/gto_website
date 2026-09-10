import { onBeforeUnmount, onMounted } from 'vue'
import gsap from 'gsap'

/**
 * Mirrors the Lando Norris text-hover treatment: each visible character exits
 * independently, with a short stagger, then returns on pointer exit.
 */
export const useTextHoverAnimation = (rootRef, {
  targetSelector,
  characterSelector,
  y
}) => {
  let cleanup = () => {}

  onMounted(() => {
    const root = rootRef.value?.$el ?? rootRef.value
    if (!root) return

    const canAnimate = () => (
      window.matchMedia('(min-width: 768px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )

    const targets = targetSelector ? root.querySelectorAll(targetSelector) : [root]
    const listeners = []

    targets.forEach((target) => {
      const characters = target.querySelectorAll(characterSelector)
      if (!characters.length) return

      const animate = (position) => {
        if (!canAnimate()) return

        gsap.to(characters, {
          y: position,
          duration: 0.6,
          stagger: 0.02,
          ease: 'power3.out',
          overwrite: true
        })
      }

      const enter = () => animate(y)
      const leave = () => animate(0)
      target.addEventListener('mouseenter', enter)
      target.addEventListener('mouseleave', leave)
      target.addEventListener('focusin', enter)
      target.addEventListener('focusout', leave)
      listeners.push({ target, characters, enter, leave })
    })

    cleanup = () => {
      listeners.forEach(({ target, characters, enter, leave }) => {
        target.removeEventListener('mouseenter', enter)
        target.removeEventListener('mouseleave', leave)
        target.removeEventListener('focusin', enter)
        target.removeEventListener('focusout', leave)
        gsap.killTweensOf(characters)
      })
    }
  })

  onBeforeUnmount(() => cleanup())
}
