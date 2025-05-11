<template>
  <button class="ui-accordion-header" :class="{ 'is-open': isOpen }" @click="onClick" type="button">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { AccordionItemContextKey } from '../context/injectionKey'
import type { AccordionItemContext } from '../context/types'

const accItemContext = inject<AccordionItemContext>(AccordionItemContextKey)
if (!accItemContext) throw new Error('[ui-accordion-header] missing AccordionItemContext')

const { isOpen, toggle } = accItemContext

const onClick = (): void => toggle()
</script>

<style lang="scss">
.ui-accordion-header {
}
</style>
