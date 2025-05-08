<template>
  <div class="ui-tabs-labels">
    <button @click="scrollBy(-1)" :disabled="scrollLeftDisabled" v-if="canScroll">
      <svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
      </svg>
    </button>
    <div class="ui-tabs-labels__container" ref="container" @scroll.passive="updateScrollFlags">
      <slot />
    </div>
    <button @click="scrollBy(1)" :disabled="scrollRightDisabled" v-if="canScroll">
      <svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { inject, watch, ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { TabsContextKey } from '../context/injectionKey'
import type { ITabsContext } from '../context/types'

const tabContext = inject<ITabsContext>(TabsContextKey)
if (!tabContext) throw new Error('[ui-tab-label] missing TabsContext')

const { tabList, activeTab } = tabContext
const container = ref<HTMLElement | null>(null)

const activeTabNode = computed(() => tabList.value.find((el) => el.name === activeTab.value)?.node)

const scrollLeftDisabled = ref(true)
const scrollRightDisabled = ref(true)
const canScroll = ref(false)
let resizeObserver: ResizeObserver | null = null

function ensureVisibleByWidth(el: HTMLElement, container: HTMLElement) {
  const elRect = el.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  const offset =
    container.clientWidth - el.clientWidth - el.clientWidth / 2 < 0 ? 0 : el.clientWidth / 2

  if (elRect.left < containerRect.left + offset) {
    const diff = container.scrollLeft - (containerRect.left - elRect.left) - offset
    container.scrollTo({ left: diff, behavior: 'smooth' })
  } else if (elRect.right > containerRect.right - offset) {
    const diff = container.scrollLeft + (elRect.right - containerRect.right) + offset
    container.scrollTo({ left: diff, behavior: 'smooth' })
  }
}

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
  ensureVisibleByWidth(activeTabNode.value, container.value)
  updateScrollFlags()
}

watch([() => activeTab.value, () => tabList.value.length], handleScroll, {
  immediate: true,
  flush: 'post',
})

const addListeners = async () => {
  await nextTick()

  if (!activeTabNode.value || !container.value) return

  resizeObserver = new ResizeObserver(handleScroll)
  resizeObserver.observe(container.value)
}

const removeListeners = () => {
  resizeObserver?.disconnect()
}

onMounted(addListeners)
onBeforeUnmount(removeListeners)
</script>

<style lang="scss">
.ui-tabs-labels {
  display: flex;
  gap: 8px;

  &__container {
    display: flex;
    gap: 8px;
    border-bottom: 1px solid #d1d1d1;
    width: 100%;
    scroll-behavior: smooth;
    // scroll-snap-type: x mandatory;

    overflow-x: auto;
    overflow-y: hidden;

    /* Firefox */
    scrollbar-width: none;
    /* IE 10+ */
    -ms-overflow-style: none;

    /* плавный инерционный скролл на iOS */
    -webkit-overflow-scrolling: touch;

    /* разрешаем панорамирование по оси X, запрещаем по Y */
    touch-action: pan-x;

    &::-webkit-scrollbar {
      /* Chrome, Safari и новые Edge */
      width: 0;
      height: 0;
    }
  }
}
</style>
