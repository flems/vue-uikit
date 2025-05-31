<template>
  <div class="ui-accordion">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watchEffect } from 'vue'
import { AccordionRootContextKey } from '../context/injectionKey'
import type { IAccordionItem, IAccordionRootCotext } from '../context/types'

const props = withDefaults(
  defineProps<{
    multiple?: boolean
    modelValue?: string[]
  }>(),
  {
    multiple: true,
    modelValue: () => [],
  },
)

const emit = defineEmits<{
  (eventName: 'update:modelValue', value: string[]): void
}>()

const openedItems = ref<string[]>([])
const accList = ref<IAccordionItem[]>([])
const registerItem = (item: IAccordionItem) => {
  accList.value.push(item)
}
const unregisterItem = (item: IAccordionItem) => {
  openedItems.value = openedItems.value.filter((el) => el !== item.name)
  accList.value = accList.value.filter((el) => el.name !== item.name)
}

const toggleOpenedItems = (name: string) => {
  const isOpened = openedItems.value.includes(name)

  if (!props.multiple) {
    openedItems.value = isOpened ? [] : [name]
  } else {
    openedItems.value = isOpened
      ? openedItems.value.filter((item) => item !== name)
      : [...openedItems.value, name]
  }

  emit('update:modelValue', openedItems.value)
}

watchEffect(() => {
  openedItems.value = props.multiple ? props.modelValue : props.modelValue.slice(0, 1)
})

provide(AccordionRootContextKey, {
  toggleOpenedItems,
  openedItems,
  accList,
  registerItem,
  unregisterItem,
} satisfies IAccordionRootCotext)
</script>

<style lang="scss">
.ui-accordion {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
}
</style>
