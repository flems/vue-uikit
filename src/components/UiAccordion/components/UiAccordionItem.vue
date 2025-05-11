<template>
  <div class="ui-accordion-item" :data-name="localName">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, provide, ref, nextTick } from 'vue'
import { AccordionItemContextKey, AccordionRootContextKey } from '../context/injectionKey'
import type { AccordionItemContext, IAccordionRootCotext } from '../context/types'

const props = defineProps<{
  name: string
}>()

const emit = defineEmits<{
  (eventName: 'toggle', isOpen: boolean): void
}>()

const localName = ref<string>('')

const AccordionRootContext = inject<IAccordionRootCotext>(AccordionRootContextKey)
if (!AccordionRootContext) throw new Error('[ui-accordion-item] missing AccordionRootContext')

const { toggleOpenedItems, openedItems, registerItem, accList, unregisterItem } =
  AccordionRootContext

const isOpen = computed(() => openedItems.value.includes(localName.value))

const toggle = (): void => {
  toggleOpenedItems(localName.value)
  emit('toggle', isOpen.value)
}

provide(AccordionItemContextKey, {
  name: localName.value,
  isOpen,
  toggle,
} satisfies AccordionItemContext)

const checkNameAndRegister = () => {
  const isAlreadyRegistered = accList.value.some((el) => el.name === props.name)

  if (isAlreadyRegistered) {
    console.warn(`[Accordion]: item with name "${props.name}" is already registered`)
    localName.value = `${props.name}-${Date.now()}`
  } else {
    localName.value = props.name
  }
  registerItem({
    name: localName.value,
  })
}

onMounted(async () => {
  nextTick()
  checkNameAndRegister()
})

onBeforeUnmount(() => {
  unregisterItem({
    name: localName.value,
  })
})
</script>

<style lang="scss">
.ui-accordion-item {
}
</style>
