<template>
  <div class="ui-accordion-panel" v-show="isOpen">
    <slot v-if="isLoaded" />
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { AccordionItemContextKey } from '../context/injectionKey'
import type { AccordionItemContext } from '../context/types'

const accItemContext = inject<AccordionItemContext>(AccordionItemContextKey)
if (!accItemContext) throw new Error('[ui-accordion-panel] missing AccordionItemContext')

const { isOpen } = accItemContext

const isLoaded = ref(true)
</script>

<style lang="scss">
.ui-accordion-panel {
}
</style>
