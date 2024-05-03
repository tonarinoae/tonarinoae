<template>
  <q-tooltip
    anchor="top middle"
    self="bottom middle"
    class="bg-dark text-14px text-weight-medium"
    transition-show="jump-up"
    transition-hide="jump-down"
  >
    <slot />
  </q-tooltip>
</template>
