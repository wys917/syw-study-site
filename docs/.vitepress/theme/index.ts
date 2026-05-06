import DefaultTheme from 'vitepress/theme'
import { h, nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import './custom.css'

function bindCourseCardTilt() {
  const cards = document.querySelectorAll<HTMLElement>('.course-card')

  cards.forEach((card) => {
    if (card.dataset.tiltBound === 'true') return
    card.dataset.tiltBound = 'true'

    const content = card.querySelector<HTMLElement>('.course-card__content')
    const glow = card.querySelector<HTMLElement>('.course-card__glow')
    const sheen = card.querySelector<HTMLElement>('.course-card__sheen')
    const icon = card.querySelector<HTMLElement>('.course-card__icon')
    const halo = card.querySelector<HTMLElement>('.course-card__halo')
    const orbit = card.querySelector<HTMLElement>('.course-card__orbit')

    let pointerInside = false
    let rafId = 0
    let targetX = 0.5
    let targetY = 0.5
    let currentX = 0.5
    let currentY = 0.5

    const applyTransforms = (xRatio: number, yRatio: number) => {
      const rx = (0.5 - yRatio) * 9.5
      const ry = (xRatio - 0.5) * 14
      const contentX = (xRatio - 0.5) * 10
      const contentY = (yRatio - 0.5) * 7
      const glowScale = 1.05 + Math.abs(xRatio - 0.5) * 0.16
      const haloOpacity = 0.34 + (1 - Math.abs(yRatio - 0.5) * 2) * 0.18
      const orbitShiftX = (xRatio - 0.5) * 18
      const orbitShiftY = (yRatio - 0.5) * 10

      card.style.setProperty('--rotate-x', `${rx.toFixed(2)}deg`)
      card.style.setProperty('--rotate-y', `${ry.toFixed(2)}deg`)
      card.style.setProperty('--mouse-x', `${(xRatio * 100).toFixed(2)}%`)
      card.style.setProperty('--mouse-y', `${(yRatio * 100).toFixed(2)}%`)
      card.style.setProperty('--lift', '-11px')
      content?.style.setProperty('transform', `translate3d(${contentX.toFixed(2)}px, ${contentY.toFixed(2)}px, 24px)`)
      glow?.style.setProperty('transform', `translate3d(${((xRatio - 0.5) * 16).toFixed(2)}px, calc(-50% + ${((yRatio - 0.5) * 10).toFixed(2)}px), 18px) scale(${glowScale.toFixed(3)})`)
      sheen?.style.setProperty('transform', `rotate(${(10 + xRatio * 8).toFixed(2)}deg) translate3d(${((xRatio - 0.5) * 12).toFixed(2)}px, ${((yRatio - 0.5) * 8).toFixed(2)}px, 24px)`)
      icon?.style.setProperty('transform', `translate3d(${((xRatio - 0.5) * 5).toFixed(2)}px, ${((yRatio - 0.5) * 4).toFixed(2)}px, 18px)`)
      halo?.style.setProperty('transform', `translate3d(${((xRatio - 0.5) * 10).toFixed(2)}px, ${((yRatio - 0.5) * 6).toFixed(2)}px, 14px) scale(${(1.02 + Math.abs(xRatio - 0.5) * 0.08).toFixed(3)})`)
      halo?.style.setProperty('opacity', `${haloOpacity.toFixed(3)}`)
      orbit?.style.setProperty('transform', `translate3d(${orbitShiftX.toFixed(2)}px, ${orbitShiftY.toFixed(2)}px, 20px) rotate(${((xRatio - 0.5) * 10).toFixed(2)}deg)`)
    }

    const reset = () => {
      pointerInside = false
      currentX = 0.5
      currentY = 0.5
      targetX = 0.5
      targetY = 0.5
      card.style.setProperty('--rotate-x', '0deg')
      card.style.setProperty('--rotate-y', '0deg')
      card.style.setProperty('--mouse-x', '50%')
      card.style.setProperty('--mouse-y', '50%')
      card.style.setProperty('--lift', '0px')
      content?.style.setProperty('transform', 'translate3d(0, 0, 0)')
      glow?.style.setProperty('transform', 'translate3d(0, -50%, 14px) scale(1)')
      sheen?.style.setProperty('transform', 'rotate(14deg) translate3d(0, 0, 18px)')
      icon?.style.setProperty('transform', 'translate3d(0, 0, 0)')
      halo?.style.setProperty('transform', 'translate3d(0, 0, 0) scale(1)')
      halo?.style.setProperty('opacity', '0.28')
      orbit?.style.setProperty('transform', 'translate3d(0, 0, 0) rotate(0deg)')
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.14
      currentY += (targetY - currentY) * 0.14
      applyTransforms(currentX, currentY)

      if (pointerInside && (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001)) {
        rafId = window.requestAnimationFrame(animate)
      } else {
        rafId = 0
      }
    }

    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect()
      pointerInside = true
      targetX = (event.clientX - rect.left) / rect.width
      targetY = (event.clientY - rect.top) / rect.height

      if (!rafId) {
        rafId = window.requestAnimationFrame(animate)
      }
    })

    card.addEventListener('pointerenter', () => {
      pointerInside = true
      if (!rafId) {
        rafId = window.requestAnimationFrame(animate)
      }
    })

    card.addEventListener('pointerleave', () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
        rafId = 0
      }
      reset()
    })
    card.addEventListener('blur', reset)
    reset()
  })
}

const enhanceCourseCards = () => {
  if (typeof window === 'undefined') return
  window.requestAnimationFrame(() => {
    bindCourseCardTilt()
  })
}

export default {
  ...DefaultTheme,
  Layout() {
    const route = useRoute()

    onMounted(() => {
      enhanceCourseCards()
    })

    watch(
      () => route.path,
      async () => {
        await nextTick()
        enhanceCourseCards()
      }
    )

    return h(DefaultTheme.Layout)
  }
}
