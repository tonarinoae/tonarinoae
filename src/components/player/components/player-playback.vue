<template>
  <q-btn
    flat
    round
    dense
    no-caps
    class="d-action"
    @click="showMenu = !showMenu"
  >
    {{ playback }}x
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
        <q-item-label header class="pb-0">Tốc độ phát</q-item-label>
        <q-item
          v-for="{ name, value } in playbacks"
          :key="value"
          class="bg-opacity-10 rounded-xl text-center text-#fff text-opacity-80"
          :class="{
            '!text-opacity-100 text-pink-400': value === playback
          }"
          clickable
          @click="playback = value"
        >
          <q-item-section>{{ name }}</q-item-section>
        </q-item>
      </q-list>
    </menu-responsive>
  </q-btn>
</template>

<script lang="ts" setup>
import { playbacks } from "src/constants"

const playback = defineModel<number>("modelValue", { required: true })

const fullscreen = inject("fullscreen", false)
const setHiddenTooltip = inject("setHiddenTooltip", NOOP)

const showMenu = ref(false)
</script>
