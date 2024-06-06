<template>
  <router-link
    :to="video.slug"
    class="block relative"
    :class="{
      '!flex flex-nowrap': horizontal
    }"
    v-element-hover="onHover"
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
        <img
          v-if="video.isTrailer"
          src="~/assets/trailer.webp"
          class="w-50% max-w-110px"
        />

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
      </q-img>
    </div>

    <div
      class="mt-1"
      :class="{
        'pl-2 min-w-0 flex-1 w-full': horizontal
      }"
    >
      <h2 class="text-16px line-clamp-2 leading-normal">
        {{
          video.tags[0]?.name ??
          (video.title.slice(0, video.title.indexOf(epName) >>> 0) ||
            video.title)
        }}
      </h2>

      <span class="text-xs text-gray-400">
        {{ convertNumber(video.views) }} lượt xem
        <span class="px-1">&bull;</span>
        {{ dayjs(video.updatedAt).locale("vi").fromNow() }}
      </span>

      <br />

      <span class="text-11px text-gray-400 truncate block mt-2">
        <router-link
          v-for="studio in video.studios"
          :key="studio.id"
          :to="{ name: 'studio', params: { slug: studio.slug } }"
          class="bg-#aaa bg-opacity-50 text-white text-opacity-30 rounded-sm px-1 py-0.5 mx-1 whitespace-nowrap inline-block my-0.5"
          >{{ studio.name }}</router-link
        >
      </span>
    </div>

    <div
      v-if="hovering && !horizontal"
      class="absolute w-full h-120% bg-dark rounded-md top-1/2 left-1/2 translate--1/2 py-3 px-2"
    >
      <div class="flex flex-nowrap">
        <div class="min-w-0 w-max-110px w-30%">
          <q-img
            no-spinner
            :ratio="3 / 4"
            :src="video.thumbnail"
            class="rounded-md"
          />
        </div>

        <div class="min-w-0 pl-1 flex-1">
          <h2 class="text-base leading-normal line-clamp-2">
            {{ video.title.slice(0, video.title.indexOf(epName) >>> 0) }}
          </h2>
          <h3 class="text-gray-400 leading-normal mt-1 text-xs">
            {{ video.alternativeTitles.join(", ") }}
          </h3>
        </div>
      </div>

      <p class="my-2 line-clamp-4 text-gray-400 text-xs">
        {{ video.synopsis }}
      </p>

      <div class="line-clamp-2">
        <span
          v-for="genre in video.genres"
          :key="genre.id"
          class="bg-gray-100 text-gray-800 text-11px font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
        >
          {{ genre.name }} ({{ genre.count }})

          <q-tooltip>{{ genre.description }}</q-tooltip>
        </span>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { vElementHover } from "@vueuse/components"
import { convertNumber } from "logic/convert-number"
import dayjs from "logic/dayjs"
import { getEpisodeName } from "logic/get-episode-name"
import type { Video } from "src/api"

const hovering = ref(false)
let timeoutHovering: NodeJS.Timeout | number | null = null
function onHover(state: boolean) {
  if (timeoutHovering) clearTimeout(timeoutHovering)
  if (state)
    timeoutHovering = setTimeout(() => {
      hovering.value = true
      timeoutHovering = null
    }, 1_500)
  else hovering.value = false
}

const props = defineProps<{
  video: Video

  horizontal?: boolean
  pWatch?: Readonly<{ cur: number; dur: number }>
}>()

const epName = computed(() => getEpisodeName(props.video))
</script>
