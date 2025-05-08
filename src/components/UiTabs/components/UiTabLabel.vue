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
  padding: 8px 16px;
  cursor: pointer;
  scroll-snap-align: center;
  width: 200px;
  display: block;
  flex-shrink: 0;

  &:hover {
    background: #eee;
  }

  &.is-active {
    color: rgb(75, 4, 4);
    background: #d1d1d1;
  }
}
</style>
