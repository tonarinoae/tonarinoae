<template>
  <q-btn round unelevated>
    <i-fluent-bookmark-24-filled v-if="show" class="size-24px" />
    <i-fluent-bookmark-24-regular v-else class="size-24px" />
  </q-btn>
</template>

<script lang="ts" setup>
const show = ref(false)
</script>
