<route lang="yaml">
name: uncensored
</route>

<template>
  <Hentai
    title="Hentai 3D"
    :query="[{ key: 'censorship', value: 'uncensored' }]"
  />
</template>

<script lang="ts" setup>
import Hentai from "./hentai-vietsub.vue"
</script>

<style></style>
