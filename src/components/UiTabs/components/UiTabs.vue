<template>
  <div class="ui-tabs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { ITab, TActiveTab, ITabsContext } from '../context/types'
import { TabsContextKey } from '../context/injectionKey'

const props = defineProps<{
  modelValue?: TActiveTab
}>()
const emit = defineEmits<{
  (eventName: 'update:modelValue', value: TActiveTab): void
}>()
const tabList = ref<ITab[]>([])
const activeTab = ref<TActiveTab>(props.modelValue ?? undefined)
const hasInitialActiveTab = ref<boolean>(props.modelValue !== undefined)

const setActiveTab = (name: TActiveTab) => {
  activeTab.value = name

  if (props.modelValue !== undefined) emit('update:modelValue', name)
}

const registerTab = (tab: ITab) => {
  if (!tabList.value.some((el) => el.name === tab.name)) tabList.value.push(tab)

  if (hasInitialActiveTab.value === false) {
    setActiveTab(tab.name)
    hasInitialActiveTab.value = true
  }
}

const unregisterTab = (tab: ITab) => {
  tabList.value = tabList.value.filter((el) => el.name !== tab.name)
}

const tabsContext: ITabsContext = {
  activeTab,
  setActiveTab,
  registerTab,
  unregisterTab,
  tabList,
}

provide(TabsContextKey, tabsContext)

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== undefined && activeTab.value === newVal) return
    setActiveTab(newVal)
    hasInitialActiveTab.value = true
  },
)

watch(
  () => tabList.value.map((el) => el.name),
  (names) => {
    if (props.modelValue === undefined || names.includes(props.modelValue)) return
    console.warn(`[Tabs]: modelValue="${props.modelValue}" for tabs is not found in tabs list`)
    setActiveTab(names[0])
  },
)
</script>

<style lang="scss">
.ui-tabs {
  overflow: hidden;
}
</style>
