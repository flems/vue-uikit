<script setup lang="ts">
import { ref } from 'vue'
const activeTab = ref<string>('tab4')
const count = ref(16)
</script>

<template>
  <main>
    <ui-tabs>
      <ui-tab-list>
        <ui-tab-label :name="`tab${i}`" v-for="i in count" :key="i">Tab {{ i }}</ui-tab-label>
      </ui-tab-list>
      <ui-tab-list-panels>
        <template v-for="i in count" :key="i">
          <ui-tab-panel lazy :name="`tab${i}`"> Panel {{ i }} </ui-tab-panel>
        </template>
      </ui-tab-list-panels>
    </ui-tabs>
  </main>
</template>
