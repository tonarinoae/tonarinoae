<template>
  <router-link
    :to="video.slug"
    class="block relative"
    :class="{
      '!flex flex-nowrap': horizontal
    }"
  >
    <div
      :class="{
        'min-w-0 w-40% max-w-250px col-5 col-sm-4 col-md-3 col-lg-2 col-xl-4':
          horizontal
      }"
    >
      <q-img
        no-spinner
        :src="video.poster ?? video.thumbnail"
        :ratio="480 / 300"
        class="rounded-md"
      >
        <!-- <img
          v-if="video.isTrailer"
          src="~/assets/trailer.webp"
          class="w-50% max-w-110px"
        /> -->

        <div
          v-if="!video.poster"
          class="absolute size-100% top-0 left-0 bg-#000 bg-opacity-10 flex justify-center !pa-0 backdrop-blur-3px"
        >
          <img
            no-spinner
            :src="video.thumbnail"
            class="h-full absolute w-auto rounded-md"
          />
        </div>

        <bottom-blur>
          <div
            v-if="pWatch"
            class="absolute w-100% h-5px !py-0 left-0 bottom-0 !bg-#fff/20 backdrop-blur-5px"
          >
            <span
              class="block absolute h-full top-0 left-0 bg-fuchsia-400 rounded-xl"
              :style="{
                width: `${Math.round((pWatch.cur / pWatch.dur) * 100)}%`
              }"
            />
          </div>

          <span
            class="absolute left-1 bottom-1 bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 !bg-opacity-80 truncate max-w-70%"
          >
            Tập {{ epName }}
          </span>
          <span
            v-if="pWatch"
            class="absolute right-1 bottom-1 text-xs font-medium"
          >
            {{ parseTime(pWatch.cur) }}
          </span>
        </bottom-blur>
      </q-img>
    </div>

    <div
      class="mt-1"
      :class="{
        'pl-2 min-w-0 flex-1 w-full': horizontal
      }"
    >
      <h2 class="text-16px line-clamp-2 leading-normal">
        {{ video.title }}
      </h2>

      <span class="text-xs text-gray-400">
        Xem lúc
        {{
          timeWatched.isToday()
            ? timeWatched.format("HH:mm")
            : timeWatched.format("DD/MM/YYYY")
        }}
      </span>

      <br />

      <span class="text-11px text-gray-400 line-clamp-3 mt-2">
        {{ video.synopsis }}
      </span>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import type { Database } from "database"
import dayjs from "logic/dayjs"
import { getEpisodeName } from "logic/get-episode-name"
import { parseTime } from "logic/parse-time"

const props = defineProps<{
  video: Database["public"]["Functions"]["get_watch_history"]["Returns"][number]
  watchedAt: string

  horizontal?: boolean
  pWatch?: Readonly<{ cur: number; dur: number }>
}>()

const epName = computed(() => getEpisodeName(props.video))
const timeWatched = computed(() => dayjs(props.watchedAt))
</script>
