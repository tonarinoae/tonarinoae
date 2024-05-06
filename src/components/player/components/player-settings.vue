<template>
  <q-btn flat round dense class="d-action" @click="showMenu = !showMenu">
    <i-fluent-settings-28-filled class="size-1.7em" />
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
      ref="menuRef"
    >
      <q-list v-if="mode === 'general'">
        <q-item-label header class="pb-0">Cài đặt</q-item-label>
        <q-item
          v-for="item in list"
          :key="item.name"
          clickable
          @click="'onClick' in item ? item.onClick() : undefined"
        >
          <q-item-section avatar>
            <component :is="item.icon" class="size-1.5em" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <div class="flex items-center flex-nowrap">
              {{ item.caption?.() }}
              <i-fluent-chevron-right-24-regular
                v-if="'onClick' in item"
                class="size-1.2em"
              />
              <q-toggle
                v-else
                v-model="item.model.value"
                :dense="!fullscreen"
                color="pink"
                size="sm"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list v-else-if="mode === 'playback'">
        <q-item class="!py-1">
          <q-item-section avatar>
            <q-btn flat round dense @click="mode = 'general'">
              <i-fluent-chevron-left-24-regular class="size-1.5em" />
            </q-btn>
          </q-item-section>

          <q-item-section>
            <q-item-label>Tốc độ phát</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

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

      <q-list v-else-if="mode === 'quality'">
        <q-item class="!py-2">
          <q-item-section avatar class="min-w-0 pr-0 mr-2">
            <q-btn flat round :dense="!fullscreen" @click="mode = 'general'">
              <i-fluent-chevron-left-24-regular class="size-1.5em" />
            </q-btn>
          </q-item-section>

          <q-item-section>
            <q-item-label>Chất lượng phát</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

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
import { QMenu } from "quasar"
import { playbacks } from "src/constants"
import type { Level } from "hls.js"

import iHd from "~icons/system-uicons/filtering"
import iPlaylist from "~icons/solar/clapperboard-open-play-linear"
import iSpeed from "~icons/fluent/top-speed-24-regular"

const playback = defineModel<number>("modelValue", { required: true })
const level = defineModel<number>("level", { required: true })

const fullscreen = inject("fullscreen", false)
const setHiddenTooltip = inject("setHiddenTooltip", NOOP)

const props = defineProps<{
  levels: Level[]
}>()

const menuRef = ref<QMenu>()

const showMenu = ref(false)
watch(showMenu, (val) => {
  if (!val) mode.value = "general"
})

const mode = ref<"general" | "playback" | "quality">("general")
watch(mode, async () => {
  await nextTick()
  menuRef.value?.updatePosition?.()
})

const list: ({
  name: string
  icon: Component
  caption?: () => string
} & (
  | {
      model: Ref<boolean>
    }
  | {
      onClick: () => void
    }
))[] = [
  {
    name: "Tự động phát",
    icon: iPlaylist,
    model: ref(false)
  },
  {
    name: "Chất lượng phát",
    caption: () => `${props.levels[level.value].height}p`,
    icon: iHd,
    onClick() {
      mode.value = "quality"
    }
  },
  {
    name: "Tốc độ phát",
    icon: iSpeed,
    onClick() {
      mode.value = "playback"
    }
  }
]
</script>
