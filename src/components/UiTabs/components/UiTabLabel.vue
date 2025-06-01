<template>
  <button
    class="ui-tab-label"
    :class="{
      'is-active': isActive,
      'is-disabled': disabled,
      [`ui-tab-label--theme-${theme}`]: theme,
    }"
    :data-name="name"
    @click="onClick"
    ref="item"
    type="button"
    role="tab"
    :aria-selected="isActive"
    :aria-controls="`panel-${name}`"
    :id="`tab-${name}`"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount, ref, computed, watch } from 'vue'
import type { ITab, ITabsContext, TTabNode } from '../context/types'
import { TabsContextKey } from '../context/injectionKey'

const props = withDefaults(
  defineProps<{
    name: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const tabContext = inject<ITabsContext>(TabsContextKey)
if (!tabContext) throw new Error('[ui-tab-label] missing TabsContext')

const { activeTab, setActiveTab, registerTab, unregisterTab, updateRegisteredTab, theme } =
  tabContext

const isActive = computed(() => activeTab.value === props.name)
const item = ref<TTabNode>()

const onClick = (): void => {
  if (activeTab.value !== props.name) setActiveTab(props.name)
}

// Регистрируем и снимаем регистрацию для поддержки v-if/v-for
onMounted(() => {
  registerTab({
    name: props.name,
    node: item.value,
    disabled: props.disabled,
  } satisfies ITab)
})

onBeforeUnmount(() =>
  unregisterTab({
    name: props.name,
    node: item.value,
    disabled: props.disabled,
  } satisfies ITab),
)

watch(
  () => props.disabled,
  (newVal) => {
    updateRegisteredTab({
      name: props.name,
      node: item.value,
      disabled: newVal,
    } satisfies ITab)
  },
)
</script>

<style lang="scss">
$parent: '.ui-tab-label';

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

  &.is-disabled {
    pointer-events: none;
    opacity: 0.4;
  }
}

.ui-tab-label--theme-horizontal {
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

.ui-tab-label--theme-vertical {
  text-align: left;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    background: var(--border-color-accent);
    transform: translate(0, -50%);
    height: 0;
    width: var(--border-width-m);
    right: 0;
    z-index: 2;
    transition: height var(--transition-medium);
  }

  &:hover {
    color: var(--text-color-accent);
    background: var(--bg-color-default);

    &:after {
      height: 100%;
      opacity: 0.5;
    }
  }

  &.is-active {
    color: var(--text-color-accent);
    background: var(--bg-color-accent);

    &:after {
      height: 100%;
    }
  }
}
</style>
