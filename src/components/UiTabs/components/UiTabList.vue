<template>
  <div class="ui-tabs-labels" role="tabpanel">
    <button
      class="ui-tabs-labels__arrow"
      @click="scrollBy(-1)"
      :disabled="scrollLeftDisabled"
      v-if="canScroll"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
      </svg>
    </button>
    <div class="ui-tabs-labels__container" ref="container" @scroll.passive="updateScrollFlags">
      <slot />
    </div>
    <button
      class="ui-tabs-labels__arrow"
      @click="scrollBy(1)"
      :disabled="scrollRightDisabled"
      v-if="canScroll"
    >
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
import { useTabsScroll } from '../composable/useTabsScroll'
import { useThrottleFn } from '@/composable/useThrottleFn'

const tabContext = inject<ITabsContext>(TabsContextKey)
if (!tabContext) throw new Error('[ui-tab-label] missing TabsContext')

const { tabList, activeTab } = tabContext
const container = ref<HTMLElement | null>(null)

const activeTabNode = computed(() => tabList.value.find((el) => el.name === activeTab.value)?.node)

let resizeObserver: ResizeObserver | null = null

const {
  scrollBy,
  scrollLeftDisabled,
  scrollRightDisabled,
  canScroll,
  updateScrollFlags,
  handleScroll,
} = useTabsScroll(container, activeTabNode)

watch([() => activeTab.value, () => tabList.value.length], handleScroll, {
  immediate: true,
  flush: 'post',
})

const addListeners = async () => {
  await nextTick()
  if (!activeTabNode.value || !container.value) return

  const throtledHandleScroll = useThrottleFn(handleScroll, 100)
  resizeObserver = new ResizeObserver(throtledHandleScroll)
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
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: var(--border-width-m);
    background: var(--color-gray-200);
  }

  &__container {
    display: flex;
    gap: 1px;
    width: 100%;

    // SCROLL
    scroll-behavior: smooth;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-x;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    padding: 0;
    background: var(--color-white);
    border: none;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;

    @media (max-width: 600px) {
      display: none;
    }

    &:hover {
      color: var(--color-primary-600);
    }

    &[disabled] {
      pointer-events: none;
      opacity: 0.2;
    }

    svg path {
      fill: currentColor;
      transition: fill 0.2s ease-in-out;
    }
  }
}
</style>
