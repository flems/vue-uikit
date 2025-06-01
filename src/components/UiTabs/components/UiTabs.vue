<template>
  <div class="ui-tabs" :class="{ [`ui-tabs--theme-${theme}`]: theme }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch, computed } from 'vue'
import type { ITab, TActiveTab, ITabsContext, TTabsTheme } from '../context/types'
import { TabsContextKey } from '../context/injectionKey'

const props = withDefaults(
  defineProps<{
    modelValue?: TActiveTab
    theme?: TTabsTheme
  }>(),
  {
    theme: 'horizontal',
  },
)
const emit = defineEmits<{
  (eventName: 'update:modelValue', value: TActiveTab): void
  (eventName: 'update:activeTab', value: TActiveTab): void
}>()
const tabList = ref<ITab[]>([])
const activeTab = ref<TActiveTab>(props.modelValue ?? undefined)
const hasInitialActiveTab = ref<boolean>(props.modelValue !== undefined)

const setActiveTab = (name: TActiveTab) => {
  activeTab.value = name

  if (props.modelValue !== undefined) emit('update:modelValue', name)
  emit('update:activeTab', name)
}

const currentTab = computed(() => tabList.value.find((tab) => tab.name === activeTab.value))

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

const updateRegisteredTab = (tab: ITab) => {
  tabList.value = tabList.value.map((el) => (el.name === tab.name ? tab : el))
}

const tabsContext: ITabsContext = {
  activeTab,
  setActiveTab,
  registerTab,
  unregisterTab,
  tabList,
  updateRegisteredTab,
  theme: props.theme,
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
    setActiveTab(names[0])
  },
)

watch(
  () => currentTab.value,
  (tab) => {
    if (tab === undefined || tab.disabled)
      setActiveTab(tabList.value.filter((el) => !el.disabled)[0]?.name || undefined)
  },
)
</script>

<style lang="scss">
.ui-tabs {
  overflow: hidden;

  &--theme-vertical {
    display: flex;
  }
}
</style>
