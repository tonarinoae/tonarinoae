<template>
  <div class="text-center col-12 py-8 px-6">
    <code class="block">{{ error }}</code>

    <q-btn rounded color="blue" no-caps class="mt-3" @click="refresh"
      >Thử lại</q-btn
    >
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
defineProps<{ error: any; refresh: () => void }>()
</script>
