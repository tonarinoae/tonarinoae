<template>
  <q-btn
    flat
    round
    dense
    no-caps
    class="d-action"
    @click="showMenu = !showMenu"
  >
    <i-system-uicons-filtering class="size-1.7em" />
    <menu-responsive
      v-model="showMenu"
      @update:model-value="setHiddenTooltip"
      anchor="top middle"
      self="bottom middle"
      :offset="[0, 30]"
      class="transparent !shadow-none min-w-223px children:!bg-#000 children:!bg-opacity-70 children:backdrop-blur-5px children:rounded-xl"
      :class="{
        'text-18px': fullscreen
      }"
    >
      <q-list>
        <q-item-label header class="pb-0">Chất lượng phát</q-item-label>

        <q-item
          v-for="(item, id) in levels"
          :key="id"
          class="bg-opacity-10 rounded-xl text-#fff text-opacity-80"
          :class="{
            '!text-opacity-100 text-pink-400': level === id
          }"
          clickable
          @click="level = id"
        >
          <q-item-section avatar />
          <q-item-section>
            <q-item-label>{{ item.height }}p</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </menu-responsive>
  </q-btn>
</template>

<script lang="ts" setup>
import type { Level } from "hls.js"

defineProps<{
  levels: Level[]
}>()

const level = defineModel<number>("modelValue", { required: true })

const fullscreen = inject("fullscreen", false)
const setHiddenTooltip = inject("setHiddenTooltip", NOOP)

const showMenu = ref(false)
</script>
