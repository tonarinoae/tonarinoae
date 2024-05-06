<template>
  <q-menu
    v-if="false"
    v-model="modelValue"
    @update:model-value="setHiddenTooltip"
    no-parent-event
    anchor="top middle"
    self="bottom middle"
    :offset="[0, 30]"
    class="transparent !shadow-none"
    :class="{
      'text-18px': fullscreen
    }"
  >
    <slot />
  </q-menu>
  <q-dialog
    v-else
    v-model="modelValue"
    :position="fullscreen ? 'right' : 'bottom'"
    :full-height="fullscreen"
    :full-width="!fullscreen"
    :maximized="fullscreen"
    class="children:!bg-transparent"
    :class="{
      '!bg-transparent children:!backdrop-blur-0': !fullscreen
    }"
  >
    <div
      class="bg-#000 !w-45vw py-3 px-4 !rounded-xl"
      :class="{
        '!bg-opacity-70': fullscreen,
        'max-w-320px': !fullscreen
      }"
    >
      <div v-if="fullscreen" class="flex items-center justify-between">
        <span />
        <span class="font-medium text-gray-300">Tập</span>
        <q-btn flat round v-close-popup>
          <i-mingcute-close-line class="text-1.5em" />
        </q-btn>
      </div>

      <div>
        <slot />
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts" setup>
const fullscreen = inject("fullscreen", false)
const setHiddenTooltip = inject("setHiddenTooltip", NOOP)

const modelValue = defineModel<boolean>("modelValue", { required: true })
</script>
