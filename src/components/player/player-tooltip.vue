<template>
  <q-tooltip
    v-if="!hiddenTooltip"
    anchor="top middle"
    self="bottom middle"
    class="bg-dark text-14px text-weight-medium"
    transition-show="jump-up"
    transition-hide="jump-down"
  >
    <slot />
  </q-tooltip>
</template>

<script lang="ts" setup>
const hiddenTooltip = inject("hiddenTooltip", false)
</script>
