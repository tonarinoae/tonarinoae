<route lang="yaml">
name: tag
</route>

<template>
  <Category type="tags" type-tax="tag" :ignore-watch="['tags']" :slug />
</template>

<script lang="ts" setup>
import Category from "pages/category/[slug].vue"

defineProps<{
  slug: string
}>()
</script>
