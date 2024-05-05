<template>
  <div
    class="d-toolbar-footer flex items-end"
    :class="{
      '!pb-20px': fullscreen,
      '!px-25px': fullscreen
    }"
  >
    <div class="w-full relative" @click.stop>
      <div class="h-5px flex items-center justify-center mb-3">
        <div
          class="w-full group relative cursor-pointer"
          @mousemove="onMouseMoveScope"
          @mouseout="onMouseOut"
          @mousedown.prevent="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
          @click="onTouchStart($event), onTouchMove($event), onTouchEnd()"
          ref="progressRef"
        >
          <div
            class="absolute bottom-0 w-full pt-16px px-2px group-hover:pt-22px"
          />

          <div
            class="w-full bg-#fff/20 h-3px relative rounded-sm group-hover:h-5px progress-bar before:hidden"
            :class="{
              '!before:block': timeHover !== null
            }"
            :data-time="timeHover !== null ? parseTime(timeHover) : undefined"
            :style="{
              '--before-pos-x': timeHover
                ? `${(timeHover / duration) * 100}%`
                : ''
            }"
          >
            <!-- preload resource -->
            <div
              class="absolute top-0 left-0 h-full bg-#fff/40"
              :style="{
                width: `${resourceLoaded * 100}%`
              }"
            />
            <!-- /preload resource -->

            <!-- hover -->
            <div class="absolute top-0 left-0 h-full bg-#fff/50" />
            <!-- /hover -->
            <div
              class="absolute top-0 left-0 h-full w-0 bg-green-400 before:(content-empty absolute right-0 top-1/2 size-0px bg-green-400 rounded-1/2 translate-y--1/2 translate-x-1/2 transition:width,height duration-222ms) group-hover:before:size-12px"
              :class="{
                'before:size-12px': hovering
              }"
              :style="{
                width: `${(currentTime / duration) * 100}%`
              }"
            />
          </div>
        </div>
      </div>

      <div class="mx--2 mb--1 flex items-center justify-between">
        <div class="flex items-center">
          <q-btn flat round dense class="d-action" @click="playing = !playing">
            <i-fluent-pause-24-filled v-if="playing" class="size-1.7em" />
            <i-fluent-play-24-filled v-else class="size-1.7em" />
          </q-btn>

          <slot name="btn-next" />

          <player-volume v-model:volume="volume" :add-notice :add-keybinding />

          <div
            class="ml-2"
            :class="{
              'text-16px': fullscreen
            }"
          >
            {{ parseTime(currentTime) }} /
            {{ parseTime(duration) }}
          </div>
        </div>

        <div class="flex items-center justify-end">
          <player-playback v-model="playback" />
          <player-settings v-model="playback" :levels v-model:level="level" />

          <q-btn
            flat
            round
            dens
            class="d-action"
            :disable="!supportPip"
            @click="pip = !pip"
          >
            <i-fluent-picture-in-picture-exit-24-regular
              v-if="pip"
              class="size-1.7em"
            />
            <i-fluent-picture-in-picture-enter-24-regular
              v-else
              class="size-1.7em"
            />

            <player-tooltip>{{
              pip ? "Phóng to (i)" : "Hình trong hình (i)"
            }}</player-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            class="d-action"
            @click="fullscreen = !fullscreen"
          >
            <i-fluent-full-screen-minimize-24-filled
              v-if="fullscreen"
              class="size-1.7em"
            />
            <i-fluent-full-screen-maximize-24-filled
              v-else
              class="size-1.7em"
            />

            <player-tooltip>{{
              fullscreen ? "Thu nhỏ (f)" : "Toàn màn hình (f)"
            }}</player-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEventListener } from "@vueuse/core"
import { parseTime } from "logic/parse-time"
import type { Level } from "hls.js"

import type { AddKeybinding } from "./index.vue"

const currentTime = defineModel<number>("currentTime", { required: true })
const playing = defineModel<boolean>("playing", { required: true })
const volume = defineModel<number>("volume", { required: true })
const playback = defineModel<number>("playback", { required: true })
const pip = defineModel<boolean>("pip", { required: true })
const fullscreen = defineModel<boolean>("fullscreen", { required: true })
const level= defineModel<number>("level", { required: true })

const props = defineProps<{
  duration: number

  levels: Level[]

  addNotice: (text: string) => void
  addKeybinding: AddKeybinding

  resourceLoaded: number

  supportPip: boolean
}>()

const progressRef = ref<HTMLDivElement>()

const timeHover = ref<number | null>(null)

const hovering = ref(false)

let mousePressingOnProgress = false
function onTouchStart(event: TouchEvent | MouseEvent) {
  if ("touches" in event) {
    // is touch skip
  } else {
    mousePressingOnProgress = true
  }
}
function onTouchMove(event: TouchEvent | MouseEvent) {
  if (!progressRef.value) return

  const nexTime =
    ((("touches" in event ? event.touches[0] : event).clientX -
      progressRef.value.getBoundingClientRect().left) /
      progressRef.value.offsetWidth) *
    props.duration

  if ("touches" in event || mousePressingOnProgress) {
    hovering.value = true
    currentTime.value = clamp(nexTime, 0, props.duration)
    timeHover.value = currentTime.value
  }
}
function onTouchEnd() {
  mousePressingOnProgress = false
  hovering.value = false
  timeHover.value = null
}

useEventListener(window, "mouseup", onTouchEnd)
useEventListener(window, "mousemove", onTouchMove)

function onMouseMoveScope(event: MouseEvent) {
  if (!progressRef.value) return
  console.log("touches" in event, mousePressingOnProgress)

  const nexTime =
    ((event.clientX - progressRef.value.getBoundingClientRect().left) /
      progressRef.value.offsetWidth) *
    props.duration

  timeHover.value = clamp(nexTime, 0, props.duration)
}
function onMouseOut() {
  timeHover.value = null
}

props.addKeybinding("skip time", (event) => {
  if (event.ctrlKey || event.shiftKey) return

  switch (event.code) {
    case "ArrowLeft":
      currentTime.value = Math.max(0, currentTime.value - 10)
      return true
    case "ArrowRight":
      currentTime.value = Math.min(currentTime.value + 10, props.duration)
      return true

    case "Space":
      playing.value = !playing.value
      return true

    case "KeyF":
      fullscreen.value = !fullscreen.value
      return true

    case "KeyI":
      pip.value = !pip.value
      return true
  }
})
</script>

<style lang="scss" scoped>
.d-toolbar-footer {
  transition: padding 0.2s ease-in-out;
  padding: 50px 20px 16px;
  min-height: 100px;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  background-image: linear-gradient(to bottom, #0000, #0006, #000);
  background-position: bottom;
  background-repeat: repeat-x;

  &.desktop-mode {
    background-image: none;
  }

  &:before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    z-index: -1;
    transition: opacity 0.25s cubic-bezier(0, 0, 0.2, 1);
    height: calc(100% + 37px);
    background-size: 100% 200%;
    background-repeat: repeat-x;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);

    background-position: bottom;
    padding-top: 37px;
    bottom: 0;
    z-index: 0;
  }
}

.progress-bar {
  @apply relative;

  &::before {
    content: attr(data-time);
    @apply absolute bottom-[100%] transform translate-x--1/2 translate-y-[-16px];
    background: rgba(0, 0, 0, 0.7);
    @apply py-2 px-3 font-weight-medium rounded-lg;
    left: var(--before-pos-x);
    white-space: pre-wrap;
  }
}
</style>
