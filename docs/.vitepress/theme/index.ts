import DefaultTheme from 'vitepress/theme'
import './custom.css'

if (typeof window !== 'undefined') {
  const applyCourseCardTilt = () => {
    const cards = document.querySelectorAll<HTMLElement>('.course-card')

    cards.forEach((card) => {
      if (card.dataset.tiltBound === 'true') return
      card.dataset.tiltBound = 'true'

      const content = card.querySelector<HTMLElement>('.course-card__content')
      const glow = card.querySelector<HTMLElement>('.course-card__glow')
      const sheen = card.querySelector<HTMLElement>('.course-card__sheen')
      const icon = card.querySelector<HTMLElement>('.course-card__icon')

      const reset = () => {
        card.style.setProperty('--rotate-x', '0deg')
        card.style.setProperty('--rotate-y', '0deg')
        card.style.setProperty('--mouse-x', '50%')
        card.style.setProperty('--mouse-y', '50%')
        card.style.setProperty('--lift', '0px')
        content?.style.setProperty('transform', 'translate3d(0, 0, 0)')
        glow?.style.setProperty('transform', 'translate3d(0, -50%, 14px) scale(1)')
        sheen?.style.setProperty('transform', 'rotate(14deg) translate3d(0, 0, 18px)')
        icon?.style.setProperty('transform', 'translate3d(0, 0, 0)')
      }

      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const xRatio = x / rect.width
        const yRatio = y / rect.height
        const rx = (0.5 - yRatio) * 7.5
        const ry = (xRatio - 0.5) * 10.5
        const contentX = (xRatio - 0.5) * 6
        const contentY = (yRatio - 0.5) * 4.5
        const glowScale = 1.02 + Math.abs(xRatio - 0.5) * 0.10

        card.style.setProperty('--rotate-x', `${rx.toFixed(2)}deg`)
        card.style.setProperty('--rotate-y', `${ry.toFixed(2)}deg`)
        card.style.setProperty('--mouse-x', `${(xRatio * 100).toFixed(2)}%`)
        card.style.setProperty('--mouse-y', `${(yRatio * 100).toFixed(2)}%`)
        card.style.setProperty('--lift', '-7px')
        content?.style.setProperty('transform', `translate3d(${contentX.toFixed(2)}px, ${contentY.toFixed(2)}px, 18px)`)
        glow?.style.setProperty('transform', `translate3d(${((xRatio - 0.5) * 12).toFixed(2)}px, calc(-50% + ${((yRatio - 0.5) * 7).toFixed(2)}px), 14px) scale(${glowScale.toFixed(3)})`)
        sheen?.style.setProperty('transform', `rotate(${(11 + xRatio * 7).toFixed(2)}deg) translate3d(${((xRatio - 0.5) * 8).toFixed(2)}px, ${((yRatio - 0.5) * 6).toFixed(2)}px, 18px)`)
        icon?.style.setProperty('transform', `translate3d(${((xRatio - 0.5) * 3.6).toFixed(2)}px, ${((yRatio - 0.5) * 3).toFixed(2)}px, 14px)`)
      })

      card.addEventListener('pointerleave', reset)
      card.addEventListener('blur', reset)
      reset()
    })
  }

  const init = () => window.requestAnimationFrame(applyCourseCardTilt)

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true })
  } else {
    init()
  }

  document.addEventListener('vitepress:afterRouteChanged', init)
}

export default DefaultTheme
