<template>
  <div class="bg-rgb(33,33,33) text-white !rounded-4px overflow-hidden">
    <div class="relative">
      <q-img no-spinner :src="taxonomy.thumbnail" :ratio="213 / 164" />
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-95"
      />
      <div class="absolute bottom-2 left-2 right-2">
        <h3 class="leading-tight text-lg md:text-xl font-semibold md:mb-0.5">
          {{ taxonomy.name
          }}<span class="font-mono text-base">({{ taxonomy.count }})</span>
        </h3>
        <p class="text-#fff/70 leading-4 text-xs md:text-sm">
          {{ taxonomy.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Term } from "api/index"

defineProps<{
  taxonomy: object
}>()
</script>
