<template>
  <filter-dialog
    @state-changed="onResetValue"
    :label
    class="w-full"
    :class-content="modeGrid ? 'row' : undefined"
    :items="items"
  >
    <template #action="{ onClick }">
      <q-btn rounded no-caps color="dark" @click="onClick">
        <Component :is="icon" class="size-1.5em mr-1" />
        {{ label }}
      </q-btn>
    </template>

    <template #addons>
      <div class="w-full min-w-0">
        <q-btn v-if="!enableGrid" flat round @click="modeGrid = !modeGrid">
          <i-fluent-grid-20-regular v-if="modeGrid" class="size-1.5em" />
          <i-fluent-apps-list-detail-20-regular v-else class="size-1.5em" />
        </q-btn>
      </div>
    </template>

    <template #item="{ data: genre }">
      <taxonomy-item
        v-if="!modeGrid || !enableGrid"
        :key="genre.id"
        class="cursor-pointer"
        :genre="genre"
        :color="genres.includes(genre.id) ? 'light-green-7' : 'grey-9'"
        :no-tooltip="!enableGrid"
        @click="
          genres.includes(genre.id)
            ? genres.splice(genres.indexOf(genre.id) >>> 0, 1)
            : genres.push(genre.id)
        "
      />

      <div v-else class="col-6 px-1 py-1">
        <card-taxonomy
          :taxonomy="genre"
          :class="{
            'border border-blue border-2px': genres.includes(genre.id)
          }"
          @click="
            genres.includes(genre.id)
              ? genres.splice(genres.indexOf(genre.id) >>> 0, 1)
              : genres.push(genre.id)
          "
        />
      </div>
    </template>

    <template #actions>
      <q-btn rounded no-caps @click="genres.splice(0)">Đặt lại</q-btn>
      <q-btn
        rounded
        no-caps
        @click="
          $router.replace({
            query: {
              ...$route.query,
              [name]: genres
            }
          })
        "
        color="light-green-7"
        >Lọc</q-btn
      >
    </template>
  </filter-dialog>
</template>

<script lang="ts" setup generic="T extends Term">
import type { Term } from "api/index"

const props = defineProps<{
  label: string
  icon: Component
  name: string

  enableGrid?: boolean

  items: T[]
}>()

const route = useRoute()

const modeGrid = ref(false)

const genres = shallowReactive<number[]>([])
watchImmediate(
  () => route.query[props.name],
  () => {
    onResetValue(false)
  }
)

function onResetValue(state: boolean) {
  if (state) return

  const value = route.query[props.name]

  if (Array.isArray(value)) {
    genres.splice(0)
    genres.push(...value.map(Number).filter(Boolean))

    return
  }

  if (value) {
    genres.splice(0)
    genres.push(Number(value))
  }
}
</script>
