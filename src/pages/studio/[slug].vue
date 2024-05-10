<route lang="yaml">
name: studio
</route>

<template>
  <Category
    type="studios"
    type-tax="studio"
    :ignore-watch="['studios']"
    :slug
  />
</template>

<script lang="ts" setup>
import Category from "pages/category/[slug].vue"

defineProps<{
  slug: string
}>()
</script>
