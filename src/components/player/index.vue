<template>
  <q-responsive
    :ratio="16 / 9"
    class="bg-#000 dplayer"
    :class="{
      '!h-screen !w-screen fullscreen-mode': hFullscreen,
      'is-mobile': $q.platform.is.mobile
    }"
  >
    <video
      ref="videoRef"
      :poster
      @play="$hPlaying = true"
      @pause="$hPlaying = false"
      @progress="onProgress"
      @durationchange="hDuration = ($event.target as HTMLVideoElement).duration"
      @timeupdate="
        ($hCurrentTime = ($event.target as HTMLVideoElement).currentTime),
          onTimeUpdate()
      "
      @ratechange="
        $hPlayback = ($event.target as HTMLVideoElement).playbackRate
      "
      @volumechange="$hVolume = ($event.target as HTMLVideoElement).volume"
      @canplay="(hLoading = false), onCanPlay()"
      @canplaythrough="hLoading = false"
      @suspend="hLoading = false"
      @waiting="hLoading = true"
      @ended="onEnd"
      @mousemove="resetTimeDelayControl(), (hControlShow = true)"
    />
    <div class="absolute size-100% top-0 left-0" @click="onClickBackdrop" />

    <transition name="q-transition--fade" :duration="333">
      <div
        v-show="hControlShow"
        class="d-container desktop absolute size-100% top-0 left-0"
        :class="{
          '!bg-#000/50': $q.platform.is.mobile
        }"
        @click="onClickBackdrop"
      >
        <player-header
          :class="{
            'desktop-mode': isDesktop
          }"
        >
          <template #left>
            <slot name="toolbar-top-left" />
          </template>
        </player-header>
        <div
          v-if="$q.platform.is.mobile"
          class="absolute left-0 top-1/2 w-full translate-y--1/2 flex items-center justify-center z-30"
        >
          <q-btn
            round
            flat
            class="text-20px"
            @click.stop="hPlaying = !hPlaying"
          >
            <i-pajamas-pause v-if="hPlaying" class="size-3em" />
            <i-pajamas-play v-else class="size-3em" />
          </q-btn>
        </div>

        <player-footer
          v-model:current-time="hCurrentTime"
          v-model:playing="hPlaying"
          v-model:volume="hVolume"
          v-model:playback="hPlayback"
          :support-pip="activePip"
          v-model:pip="hPip"
          v-model:fullscreen="hFullscreen"
          :duration="hDuration"
          :levels
          v-model:level="currentLevel"
          :add-notice
          :add-keybinding
          :resource-loaded="hResourceLoaded"
          :class="{
            'desktop-mode': isDesktop
          }"
        >
          <template #btn-next>
            <slot name="btn-next" />
          </template>
        </player-footer>
      </div>
    </transition>
    <!-- notices -->
    <transition-group
      tag="div"
      name="notices"
      class="notices absolute bottom-[40%] left-0 w-full flex column justify-end pl-10 text-[14px] pointer-events-none"
    >
      <div v-for="item in notices" :key="item.id" class="pb-2">
        <span
          class="text-[#fff] bg-[#0009] rounded-[3px] px-[16px] py-[10px] inline-block"
          >{{ item.text }}</span
        >
      </div>
    </transition-group>
    <!-- /notices -->

    <!-- loader -->
    <div
      v-if="hLoading"
      class="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-200"
    >
      <q-spinner size="60px" :thickness="3" />
    </div>
    <!-- /loader -->
  </q-responsive>
</template>

<script lang="ts" setup>
import { useEventListener } from "@vueuse/core"
import { getStreamInfo } from "api/index"
import type { Level } from "hls.js"
import Hls from "hls.js"
import workerHls from "hls.js/dist/hls.worker?url"

const props = defineProps<{
  poster?: string
  src: string
  isDesktop?: boolean
}>()
const $q = useQuasar()

const hash = computed(() => props.src.slice(props.src.indexOf("/play/") + 6))
const meta = computedAsync(() => getStreamInfo(hash.value), undefined, {
  onError: WARN
})

const videoRef = ref<HTMLVideoElement>()
const levels = shallowReactive<Level[]>([])
const currentLevel = ref(0)

watch([videoRef, meta], ([video, meta], _, onCleanup) => {
  if (!video || !meta) return
  const hls = new Hls({
    debug: false && import.meta.env.DEV,
    workerPath: workerHls,
    progressive: true
  })

  hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
    levels.splice(0)
    levels.push(...data.levels)
    currentLevel.value = hls.nextLevel = data.levels.length - 1
  })
  hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
    console.log("change level ", data)
    currentLevel.value = data.level
  })

  hls.loadSource(meta.hls[0].url)
  hls.attachMedia(video)

  const watcher = watch(currentLevel, (level) => {
    console.log("change quality ")
    hls.nextLevel = level
  })
  console.log(hls)
  if (hPlaying.value) void video.play()

  onCleanup(() => {
    hls.destroy()
    watcher()
  })
})

const { ref: hPlaying, raw: $hPlaying } = refSync((val) => {
  if (val) {
    void videoRef.value?.play()
  } else {
    videoRef.value?.pause()
    hControlShow.value = true
    resetTimeDelayControl()
  }

  return true
}, false)
const { onProgress, loaded: hResourceLoaded } = useVideoProgress()
const hDuration = ref(0)
const { ref: hCurrentTime, raw: $hCurrentTime } = refSync((val) => {
  if (videoRef.value) videoRef.value.currentTime = val
  return true
}, 0)
const { ref: hPlayback, raw: $hPlayback } = refSync((val) => {
  if (videoRef.value) videoRef.value.playbackRate = val
  addNotice(`Tốc độ phát ${val}x`)
  return true
}, 1)
const { ref: hVolume, raw: $hVolume } = refSync((val) => {
  if (videoRef.value) videoRef.value.volume = val
  return true
}, 1)
const { state: hPip, enabled: activePip } = usePip(videoRef)
const hFullscreen = useFullscreen()

const hLoading = ref(true)

const hControlShow = ref(true)

let activeTime = performance.now()
function resetTimeDelayControl() {
  activeTime = performance.now()
}
function onTimeUpdate() {
  if (
    hPlaying.value &&
    hControlShow.value &&
    performance.now() - activeTime >= 3e3
  )
    hControlShow.value = false
}
function onCanPlay() {
  resetTimeDelayControl()
}
function onEnd() {}

function onClickBackdrop() {
  if ($q.platform.is.mobile) {
    resetTimeDelayControl()
    hControlShow.value = !hControlShow.value
  } else {
    hPlaying.value = !hPlaying.value
  }
}

// ============== notice ===============
const notices = shallowReactive<
  {
    id: number
    text: string
  }[]
>([])

let id = 1
function addNotice(text: string) {
  const uuid = id++

  notices.push({ id: uuid, text })
  if (notices.length > 3) notices.splice(0, notices.length - 3)

  setTimeout(() => {
    notices.splice(notices.findIndex((item) => item.id === uuid) >>> 0, 1)
  }, 5000)
}
// ============== /notice ===============

// ============== keybinding ==============
const keyBinders = new Map<
  string,
  { fn: (event: KeyboardEvent) => void | boolean; fsc: boolean }
>()
useEventListener(window, "keydown", (event: KeyboardEvent) => {
  if (
    document.activeElement?.tagName === "INPUT" ||
    document.activeElement?.tagName === "TEXTAREA"
  )
    return

  let noPrevent = false
  keyBinders.forEach(({ fn, fsc }) => {
    if (fsc ? hFullscreen.value : true)
      if (fn(event) && !noPrevent) {
        noPrevent = true
        event.preventDefault()
      }
  })
})

function addKeybinding(
  name: string,
  fn: (event: KeyboardEvent) => void | boolean,
  onFullscreen?: boolean
) {
  keyBinders.set(name, { fn, fsc: onFullscreen ?? false })
}
export type AddKeybinding = typeof addKeybinding
// ============== /keybinding ==============

const hiddenTooltip = ref(false)

defineExpose({ fullscreen: hFullscreen })
provide("fullscreen", hFullscreen)
provide("hiddenTooltip", hiddenTooltip)
provide("setHiddenTooltip", (val: boolean) => (hiddenTooltip.value = val))
</script>

<style lang="scss" scoped>
.d-container {
  background-color: #00000080;
  background-image: linear-gradient(to bottom, #0006, #0000);

  &.desktop {
    background-image: none;
    background-color: transparent;
  }
}

.dplayer :deep(.d-action) {
  margin-right: 0.5em;

  &:last-child {
    margin-right: 0;
  }
}
.dplayer.fullscreen-mode:not(.is-mobile) :deep(.d-action) {
  margin-right: 1em;

  &:last-child {
    margin-right: 0;
  }
}

.fullscreen-mode:not(.is-mobile) :deep(.q-btn) {
  @apply text-18px;
}
</style>

<style lang="scss">
.notices {
  &-move,
  &-enter-active,
  &-leave-active {
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }

  &-active {
    position: absolute;
  }
}
</style>
