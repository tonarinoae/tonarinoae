<template>
  <q-btn round unelevated>
    <i-solar-bookmark-bold-duotone v-if="show" class="size-24px" />
    <i-solar-bookmark-line-duotone v-else class="size-24px" />
  </q-btn>
</template>

<script lang="ts" setup>
const show = ref(false)
</script>
