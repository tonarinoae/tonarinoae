<template>
  <q-btn flat round dense no-caps class="d-action">
    {{ playback }}x
    <q-menu
      anchor="top middle"
      self="bottom middle"
      class="transparent !shadow-none"
      :class="{
        'text-18px': fullscreen
      }"
    >
      <q-list
        class="!bg-#000 !bg-opacity-50 backdrop-blur-5px rounded-xl min-w-220px"
      >
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
    </q-menu>
  </q-btn>
</template>

<script lang="ts" setup>
import { playbacks } from "src/constants"

const playback = defineModel<number>("modelValue", { required: true })

const fullscreen = inject("fullscreen", false)
</script>
