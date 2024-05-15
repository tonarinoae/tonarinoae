<template>
  <q-chip size="small" clickable
    >{{ genre.name }}
    <span class="text-0.85em text-yellow ml-1">{{ genre.count }}</span>
    <player-tooltip
      v-if="!noTooltip"
      class="flex flex-nowrap max-w-350px"
      :delay="500"
    >
      <div class="min-w-0 max-w-175px">
        <q-img
          no-spinner
          :src="genre.thumbnail"
          :ratio="390 / 300"
          class="w-162px rounded-xl"
        />
      </div>
      <div class="pl-2 py-1 flex-1">
        <h3 class="text-subtitle2 text-18px">{{ genre.name }}</h3>
        <p class="mt-3 text-gray-300">{{ genre.description }}</p>
      </div>
    </player-tooltip>
  </q-chip>
</template>

<script lang="ts" setup>
import type { Explorer } from "api/index"

defineProps<{
  genre: Explorer[0]

  noTooltip?: boolean
}>()
</script>

<style></style>
