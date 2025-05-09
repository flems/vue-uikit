<template>
  <button
    class="ui-tab-label"
    :class="{
      'is-active': isActive,
    }"
    role="tab"
    :data-name="name"
    @click="onClick"
    ref="item"
    :aria-selected="isActive"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, ref, computed } from 'vue'
import type { ITab, ITabsContext } from '../context/types'
import { TabsContextKey } from '../context/injectionKey'

const props = defineProps<{ name: string }>()

const tabContext = inject<ITabsContext>(TabsContextKey)
if (!tabContext) throw new Error('[ui-tab-label] missing TabsContext')

const { activeTab, setActiveTab, registerTab, unregisterTab } = tabContext

const isActive = computed(() => activeTab.value === props.name)
const item = ref<HTMLElement | null>(null)

const onClick = (): void => {
  if (activeTab.value !== props.name) setActiveTab(props.name)
}

// Регистрируем и снимаем регистрацию для поддержки v-if/v-for
onMounted(() => {
  registerTab({
    name: props.name,
    node: item.value,
  } as ITab)
})
onBeforeUnmount(() =>
  unregisterTab({
    name: props.name,
    node: item.value,
  } as ITab),
)
</script>

<style lang="scss">
.ui-tab-label {
  padding: var(--space-s) var(--space-l);
  cursor: pointer;
  scroll-snap-align: center;
  display: block;
  flex-shrink: 0;
  border: none;
  background: var(--color-white);
  transition: color 0.2s ease-in-out;
  position: relative;
  font-size: inherit;

  &:after {
    content: '';
    height: var(--border-width-m);
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    transition: width 0.2s ease-in-out;
    width: 0%;
    background: var(--border-color-accent);
    z-index: 1;
  }

  &:hover {
    &:after {
      width: 100%;
    }
  }

  &.is-active {
    color: var(--text-color-accent);

    &:after {
      width: 100%;
    }
  }
}
</style>
