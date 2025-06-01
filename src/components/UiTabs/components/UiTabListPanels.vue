<template>
  <div class="ui-tabs-panels">
    <slot />
  </div>
</template>

<style lang="scss">
.ui-tabs-panels {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
