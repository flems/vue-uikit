<template>
  <div
    class="ui-tab-panel"
    :class="{
      'is-active': isVisible,
    }"
    v-show="isVisible"
    :data-name="name"
    role="tabpanel"
    :id="`panel-${name}`"
    :aria-labelledby="`tab-${name}`"
  >
    <slot v-if="isLoaded" />
  </div>
</template>

<script setup lang="ts">
import type { ITabsContext } from '../context/types'
import { defineProps, inject, withDefaults, computed, ref, onMounted, watch } from 'vue'
import { TabsContextKey } from '../context/injectionKey'

const props = withDefaults(
  defineProps<{
    name: string
    lazy?: boolean
  }>(),
  {
    lazy: false,
  },
)
const tabsContext = inject<ITabsContext>(TabsContextKey)
if (!tabsContext) throw new Error('[ui-tab-panel] missing TabsContext')
const { activeTab } = tabsContext

const isVisible = computed(() => activeTab.value === props.name)
const isLoaded = ref<boolean>(!props.lazy)

onMounted(() => {
  if (props.lazy && activeTab.value === props.name) isLoaded.value = true
})

watch(
  () => activeTab.value,
  (newVal) => {
    if (props.lazy && newVal === props.name) {
      isLoaded.value = true
    }
  },
  { immediate: true },
)
</script>

<style lang="scss">
.ui-tab-content {
  padding: 8px 16px;
}
</style>
