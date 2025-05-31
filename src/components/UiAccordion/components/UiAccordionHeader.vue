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
  background: none;
  border: none;
  background: var(--bg-color-default);
  padding: var(--space-m) var(--space-l);
  display: block;
  width: 100%;
  transition: var(--transition-medium);
  cursor: pointer;
  font-size: var(--font-size-l);
  text-align: left;

  &:hover {
    background: var(--bg-color-accent);
  }

  &.is-open {
    color: var(--text-color-accent);
  }
}
</style>
