import { ref, type ComputedRef, type Ref } from 'vue'
import { scrollContainerToShowItem } from '@/utils/scrollContainerToShowItem'

export const useTabsScroll = (
  container: Ref<HTMLElement | null>,
  activeTabNode: ComputedRef<HTMLElement | undefined>,
) => {
  const scrollLeftDisabled = ref(true)
  const scrollRightDisabled = ref(true)
  const canScroll = ref(false)

  function scrollBy(direction: -1 | 1) {
    if (!container.value) return
    container.value.scrollBy({
      left: direction * container.value.clientWidth,
      behavior: 'smooth',
    })
  }

  const updateScrollFlags = () => {
    if (!container.value) return
    const el = container.value
    canScroll.value = el.scrollWidth > el.clientWidth
    scrollLeftDisabled.value = el.scrollLeft <= 0
    scrollRightDisabled.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
  }

  const handleScroll = async () => {
    if (!activeTabNode.value || !container.value) return
    scrollContainerToShowItem(activeTabNode.value, container.value)
    updateScrollFlags()
  }

  return {
    scrollBy,
    scrollLeftDisabled,
    scrollRightDisabled,
    canScroll,
    updateScrollFlags,
    handleScroll,
  }
}
