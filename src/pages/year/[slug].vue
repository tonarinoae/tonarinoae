<route lang="yaml">
name: year
</route>

<template>
  <Category
    type="years"
    type-tax="release_year"
    :ignore-watch="['years']"
    :slug
  />
</template>

<script lang="ts" setup>
import Category from "pages/category/[slug].vue"

defineProps<{
  slug: string
}>()
</script>
