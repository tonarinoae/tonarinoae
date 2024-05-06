<template>
  <div class="relative md:min-w-164px md:w-full max-w-460px">
    <!-- 460px -->
    <q-input
      v-model="query"
      outlined
      rounded
      dense
      clearable
      placeholder="Tìm kiếm"
      class="input-search"
      @focus="focusing = true"
      @blur="focusing = false"
    >
      <template v-slot:append>
        <q-separator vertical inset class="bg-[rgba(153,153,153,0.3)]" />
        <button
          type="submit"
          class="flex items-center"
          @click.stop.prevent="router.push(`/tim-kiem/${query}`)"
          @mousedown.stop.prevent
        >
          <q-icon name="search" class="pl-6 pr-4 cursor-pointer" />
        </button>
      </template>
    </q-input>

    <transition name="q-transition--fade">
      <ul
        class="absolute w-full bg-[var(--q-dark-page)] left-0 max-h-[80vh] overflow-y-auto scrollbar-custom pb-4 top-[calc(100%+8px)] !shadow-8"
        v-show="focusing"
        @click.stop.prevent
        @mousedown="
          (event) => {
            if (event.button === 2) event.preventDefault()
          }
        "
      >
        <li
          v-if="query"
          class="px-4 mt-1 py-[0.5rem] flex items-center w-full justify-between"
        >
          <div>
            <span class="text-gray-400 mr-1">Tìm kiếm từ khóa: </span>
            <span class="font-bold truncate">{{ query }}</span>
          </div>

          <button class="key-enter" type="submit">
            <span>Enter</span>
          </button>
        </li>
        <li
          v-if="loading"
          v-for="video in 20"
          :key="video"
          class="pa-4"
        >
          <card-vertical-skeleton horizontal />
        </li>
        <li
          v-else-if="data?.count"
          v-for="video in data.videos"
          :key="video.slug"
          class="pa-4"
        >
          <card-vertical :video horizontal />
        </li>
        <li v-else class="px-4 py-5 text-center text-gray-400 w-full">
          {{ query ? "Không tìm thấy" : "Nhập để tìm kiếm" }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { getSearch } from "api/index"
import { refDebounced } from "@vueuse/core"
import { useDebounceFn } from "@vueuse/core"
const focusing = ref(false)

const query = ref("")
const { data, loading, error, refresh } = useRequest(() =>
  getSearch(1, 30, "date", "desc", "", { s: query.value })
)

watch(
  query,
  useDebounceFn(() => refresh(), 500)
)
</script>

<style lang="scss" scoped>
.input-search {
  & :deep(.q-field__control) {
    height: 40px !important;

    &:before {
      border-color: rgba(153, 153, 153, 0.3) !important;
    }
    &:after {
      border-width: 1px !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.key-enter {
  color: #f6f6f7;
  forced-color-adjust: none;
  height: 23px;
  width: auto;
  overflow: hidden;
  font-size: 12px;
  line-height: 1;
  text-transform: uppercase;

  &:hover {
    @apply pt-1;
  }

  span {
    background-color: #727d74;
    box-shadow: inset 0 -4px #202225;
    border: 1px solid hsl(220deg, 7.7%, 22.9%);
    padding: 3px 6px 4px;
    border-radius: 4px;
    min-width: 14px;
    min-height: 14px;
    height: 23px;
    color: #b9bbbe;
  }
}
</style>
