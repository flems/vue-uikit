export function scrollContainerToShowItem(el: HTMLElement, container: HTMLElement) {
  const elRect = el.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  const halfhalfElWidth = el.clientWidth / 2

  const offset = container.clientWidth - el.clientWidth - halfhalfElWidth < 0 ? 0 : halfhalfElWidth

  if (elRect.left < containerRect.left + offset) {
    const diff = container.scrollLeft - (containerRect.left - elRect.left) - offset
    container.scrollTo({ left: diff, behavior: 'smooth' })
  } else if (elRect.right > containerRect.right - offset) {
    const diff = container.scrollLeft + (elRect.right - containerRect.right) + offset
    container.scrollTo({ left: diff, behavior: 'smooth' })
  }
}
