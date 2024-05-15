<template>
  <slot name="action" :on-click="() => (show = true)" />

  <q-dialog v-model="show" @update:model-value="emit('state-changed', $event)">
    <q-card v-bind="attrs" class="flex flex-nowrap column">
      <q-card-section>
        <h1 class="text-subtitle1 flex items-center justify-between">
          {{ label }}
          <q-btn round flat v-close-popup>
            <i-mingcute-close-fill class="size-1.5em" />
          </q-btn>
        </h1>
        <div class="flex flex-nowrap items-center justify-end">
          <slot name="addons" />
          <q-input
            v-model="query"
            dense
            outlined
            placeholder="Lọc"
            class="w-full"
          />
        </div>
      </q-card-section>

      <q-card-section class="h-full overflow-y-auto">
        <div class="mx--2 mt-3" :class="classContent">
          <slot v-for="item in items" name="item" :data="item" />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <slot name="actions" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup generic="T extends { id: number }">
defineProps<{
  label: string
  classContent?: string

  items: T[]
}>()
defineOptions({
  inheritAttrs: false
})
const emit = defineEmits<{
  (name: "state-changed", value: boolean): void
}>()

const attrs = useAttrs()

const show = ref(false)

const query = ref("")

defineSlots<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (props: { onClick: () => void }) => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: (props: { data: T }) => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: () => any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addons: () => any
}>()
</script>
