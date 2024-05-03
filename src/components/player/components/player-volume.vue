<template>
  <UseMouseInElement v-slot="{ isOutside }">
    <div class="flex items-center font-normal" ref="wrapVolumeRef">
      <q-btn round flat dense @click="toggleMute" class="d-action">
        <component :is="
            modelValue === 0 ? speaker0 : modelValue < 0.5 ? speaker1 : speaker2
          " class="size-1.7em" />
        <player-tooltip>
          {{ modelValue === 0 ? "Bật tiếng (m)" : "Tắt tiếng (m)" }}
        </player-tooltip>
      </q-btn>

      <div class="overflow-hidden py-1 flex items-center w-0 transition-width,padding duration-300 ease-in-out" :class="{
          'w-100px px-3': !isOutside
        }" @mouseout.stop>
        <q-slider v-model="modelValue" :min="0" :max="1" :step="0.05" dense color="white" track-size="3px"
          thumb-size="17px" />
      </div>
    </div>
  </UseMouseInElement>
</template>

<script lang="ts" setup>
  import { UseMouseInElement } from "@vueuse/components"

  import speaker0 from "~icons/fluent/speaker-off-24-regular"
  import speaker1 from "~icons/fluent/speaker-1-24-regular"
  import speaker2 from "~icons/fluent/speaker-2-24-regular"

  const props = defineProps<{
    addNotice : (text : string) => void
    addKeybinding : AddKeybinding
  }>()
  const modelValue = defineModel<number>("volume", { required: true })

  let lastVolume = 0
  function toggleMute() {
    const newValue = modelValue.value === 0 ? lastVolume || 0.05 : 0

    if (modelValue.value > 0) lastVolume = modelValue.value

    modelValue.value = newValue

    props.addNotice(`Âm lượng ${Math.round(newValue * 100)}%`)
  }

  function upVolume() {
    if (modelValue.value < 1) {
      const newVal = (modelValue.value = Math.min(1, modelValue.value + 0.05))
      props.addNotice(`Âm lượng ${Math.round(newVal * 100)}%`)
    }
  }
  function downVolume() {
    if (modelValue.value > 0) {
      const newVal = (modelValue.value = Math.max(0, modelValue.value - 0.05))
      props.addNotice(`Âm lượng ${Math.round(newVal * 100)}%`)
    }
  }

  props.addKeybinding(
    "volume",
    (event) => {
      if (event.ctrlKey || event.shiftKey) return

      switch (event.code) {
        case "ArrowUp":
          upVolume()
          return true
        case "ArrowDown":
          downVolume()
          return true

        case "KeyM":
          toggleMute()
          return true
      }
    },
    true
  )
</script>
