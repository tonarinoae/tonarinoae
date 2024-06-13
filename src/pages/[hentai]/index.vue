<route lang="yaml">
name: hentai
meta:
  hideDrawer: true
</route>

<template>
  <q-page>
    <div class="row">
      <div
        class="col-8"
        :class="{
          'col-12': fullscreenOrLtMd
        }"
      >
        <player
          v-if="data"
          :poster="data.video.poster ?? data.video.thumbnail"
          :src="data.video.links[0]"
          ref="playerRef"
          :is-desktop="!$q.platform.is.mobile"
          :class="{
            'mx-4': !fullscreenOrLtMd
          }"
        >
          <template #toolbar-top-left>
            <q-btn
              v-if="!$q.platform.is.mobile"
              flat
              round
              @click.stop="
                playerRef?.fullscreen
                  ? (playerRef.fullscreen = false)
                  : $router.back()
              "
              class="ml--2"
            >
              <i-fluent-chevron-down-24-regular class="size-1.5em" />
            </q-btn>

            <div class="ml-1">
              <h1
                class="text-18px leading-normal font-600 truncate"
                :class="{
                  'text-20px': $q.screen.width > 617 && fullscreenOrLtMd,
                  'text-22px': $q.screen.width > 617 && playerRef?.fullscreen,
                  'text-25px': $q.screen.width > 1124 && fullscreenOrLtMd
                }"
              >
                {{ data.video.tags[0]?.name ?? data.video.title }}
              </h1>
              <h3
                class="text-16px leading-normal truncate"
                :class="{
                  'text-16px': $q.screen.width > 617 && fullscreenOrLtMd,
                  'text-18px': $q.screen.width > 617 && playerRef?.fullscreen,
                  'text-20px': $q.screen.width > 1124 && fullscreenOrLtMd
                }"
              >
                Tập {{ getEpisodeName(data.video) }}
              </h3>
            </div>
          </template>

          <template #btn-next>
            <q-btn
              v-if="!$q.screen.lt.sm"
              flat
              round
              dense
              :disable="!nextEp"
              :to="nextEp?.slug"
              class="d-action"
            >
              <i-fluent-next-24-regular class="size-1.7em" />
              <player-tooltip v-if="nextEp"
                >Tiếp theo: Tập {{ getEpisodeName(nextEp) }}</player-tooltip
              >
            </q-btn>
          </template>
        </player>
        <q-responsive
          v-else
          :ratio="16 / 9"
          class="bg-#000"
          :class="{
            'mx-4': !fullscreenOrLtMd
          }"
        >
          <div
            class="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-200"
          >
            <q-spinner size="60px" :thickness="3" />
          </div>
        </q-responsive>

        <div class="row">
          <div
            v-if="loading"
            class="px-4 col-12"
            :class="{
              'col-sm-8': fullscreenOrLtMd,
              'col-sm-12': !fullscreenOrLtMd || $q.screen.width <= 625
            }"
          >
            <q-skeleton
              type="text"
              class="text-h6 text-20px w-60% mt-2 line-clamp-3"
            />

            <div class="flex md:flex-nowrap justify-between">
              <div>
                <q-skeleton type="text" class="text-sm w-180px" />

                <!-- basic info -->
                <div class="text-gray-400 text-sm mt-3 flex items-center">
                  <q-skeleton type="text" class="text-sm w-4em" />

                  <span class="inline-block h-1em w-1px bg-#fff/20 mx-2" />

                  <q-skeleton type="text" class="text-sm w-6em" />

                  <span class="inline-block h-1em w-1px bg-#fff/20 mx-2" />
                </div>
              </div>

              <div class="flex items-center justify-end pt-3 md:pt-0">
                <q-skeleton
                  type="QBtn"
                  no-caps
                  rounded
                  unelevated
                  class="mr-4 text-weight-normal rounded-30px"
                />

                <q-skeleton
                  type="QBtn"
                  no-caps
                  rounded
                  unelevated
                  class="mr-4 text-weight-normal rounded-30px"
                />

                <q-skeleton
                  type="QBtn"
                  no-caps
                  rounded
                  unelevated
                  class="mr-4 text-weight-normal rounded-30px"
                />
              </div>
            </div>

            <div class="mt-4">
              <q-skeleton type="text" class="text-sm w-19em" />
              <q-skeleton type="text" class="text-sm w-6em" />
            </div>
            <!-- /basic info-->

            <!-- genres -->
            <div class="mx--1 mt-3">
              <q-skeleton
                class="inline-block mx-1"
                type="QChip"
                v-for="item in 3 + Math.round(7 * Math.random())"
                :key="item"
                :style="{
                  width: 3 + 5 * Math.random() + 'em'
                }"
              />
            </div>
            <!-- /gerens -->

            <h6 v-if="$q.screen.width >= 625" class="text-16px mt-4">
              <q-skeleton type="text" class="text-16px w-90px" />
            </h6>
            <div v-if="$q.screen.width >= 625" class="flex flex-nowrap">
              <div>
                <q-responsive :ratio="3 / 4" class="w-170px rounded-xl">
                  <q-skeleton type="rect" class="absolute fit" />
                </q-responsive>
              </div>
              <div class="ml-4 w-full">
                <p
                  class="text-14px leading-loose whitespace-pre-wrap text-[#9a9a9a]"
                >
                  <q-skeleton type="text" class="w-full" />
                  <q-skeleton type="text" class="w-full" />
                  <q-skeleton type="text" class="w-1/2" />
                </p>
              </div>
            </div>
          </div>
          <div
            v-else-if="data && !error"
            class="px-4 col-12"
            :class="{
              'col-sm-8': fullscreenOrLtMd,
              'col-sm-12': !fullscreenOrLtMd || $q.screen.width <= 625
            }"
          >
            <h1 class="text-h6 20px mt-2 line-clamp-3">
              {{ data.video.title }}
            </h1>

            <div class="flex md:flex-nowrap justify-between">
              <div>
                <span class="text-sm text-gray-400">
                  {{ convertNumber(data.video.views) }} lượt xem
                  <span class="px-1">&bull;</span>
                  {{ dayjs(data.video.updatedAt).locale("vi").fromNow() }}
                </span>

                <!-- basic info -->
                <div class="text-gray-400 text-sm mt-3 flex items-center">
                  <span class="mr-2">Sản xuất bởi </span>

                  <template
                    v-for="(studio, index) in data.video.studios"
                    :key="studio.id"
                  >
                    <router-link
                      :to="{ name: 'studio', params: { slug: studio.slug } }"
                      class="text-green-400"
                      >{{ studio.name }}</router-link
                    ><template v-if="index < data.video.studios.length - 1"
                      >,
                    </template>
                  </template>

                  <span class="inline-block h-1em w-1px bg-#fff/20 mx-2" />

                  <router-link
                    v-if="data.video.releaseYear"
                    :to="{
                      name: 'year',
                      params: { slug: data.video.releaseYear.slug }
                    }"
                    class="text-green-400"
                    >{{ data.video.releaseYear.name }}</router-link
                  >

                  <span class="inline-block h-1em w-1px bg-#fff/20 mx-2" />

                  <span
                    class="bg-green-100 text-green-800 text-14px font-medium me-2 px-2.5 py-0.25 rounded dark:bg-green-700 dark:text-#fff/90 text-capitalize"
                    >{{ data.video.censorship }}</span
                  >

                  <span
                    class="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.25 rounded dark:bg-purple-900 dark:text-#fff/90 text-capitalize"
                    >{{ data.video.category }}</span
                  >
                </div>
              </div>

              <div class="flex items-center justify-end pt-3 md:pt-0">
                <button-follow :video="data.video" />

                <q-btn
                  no-caps
                  rounded
                  unelevated
                  class="bg-[rgba(113,113,113,0.3)] mr-4 text-weight-normal"
                >
                  <i-fluent-share-ios-24-regular class="size-28px" />
                  <span class="text-[14px] font-weight-normal ml-1"
                    >Chia sẻ</span
                  >
                </q-btn>

                <q-btn
                  no-caps
                  rounded
                  unelevated
                  class="bg-[rgba(113,113,113,0.3)] mr-4 text-weight-normal"
                >
                  <i-fluent-add-square-multiple-16-regular class="size-28px" />
                  <span class="text-[14px] font-weight-normal ml-1">Lưu</span>
                </q-btn>
              </div>
            </div>

            <div class="mt-4">
              <span class="text-gray-400">Tên khác: </span>

              <template v-for="(tag, index) in data.video.tags" :key="tag.id">
                <router-link
                  :to="{ name: 'tag', params: { slug: tag.slug } }"
                  >{{ tag.name }}</router-link
                ><template v-if="index < data.video.tags.length - 1"
                  >,
                </template>
              </template>
            </div>
            <!-- /basic info-->

            <!-- genres -->
            <div class="mx--2 mt-3">
              <router-link
                v-for="genre in data.video.genres"
                :key="genre.id"
                :to="{ name: 'category', params: { slug: genre.slug } }"
                class="inline-block"
              >
                <q-chip size="small" color="grey-9"
                  >{{ genre.name }} ({{ genre.count }})
                  <player-tooltip class="flex flex-nowrap max-w-350px">
                    <div class="min-w-0 max-w-175px">
                      <q-img
                        no-spinner
                        :src="genre.thumbnail"
                        :ratio="390 / 300"
                        class="w-162px rounded-xl"
                      />
                    </div>
                    <div class="pl-2 py-1 flex-1">
                      <h3 class="text-subtitle2 text-18px">{{ genre.name }}</h3>
                      <p class="mt-3 text-gray-300">{{ genre.description }}</p>
                    </div>
                  </player-tooltip>
                </q-chip>
              </router-link>
            </div>
            <!-- /gerens -->

            <h6 v-if="$q.screen.width >= 625" class="text-16px mt-4">
              Giới thiệu
            </h6>
            <div v-if="$q.screen.width >= 625" class="flex flex-nowrap">
              <div>
                <q-img
                  :src="data.video.thumbnail"
                  no-spinner
                  class="w-170px rounded-xl"
                />
              </div>
              <div class="ml-4">
                <p
                  class="text-14px leading-loose whitespace-pre-wrap text-[#9a9a9a]"
                >
                  {{ data.video.synopsis }}
                </p>
              </div>
            </div>
          </div>
          <screen-error v-else-if="error" :error :refresh />
          <div
            v-else
            class="px-4 col-12"
            :class="{
              'col-sm-8': fullscreenOrLtMd,
              'col-sm-12': !fullscreenOrLtMd || $q.screen.width <= 625
            }"
          >
            <q-skeleton type="text" class="text-h6 20px mt-2 line-clamp-3" />

            <div class="flex md:flex-nowrap justify-between">
              <div>
                <q-skeleton type="text" class="text-sm w-180px" />

                <!-- basic info -->
                <div class="text-gray-400 text-sm mt-3 flex items-center">
                  <q-skeleton type="text" class="text-sm w-180px" />

                  <span class="inline-block h-1em w-1px bg-#fff/20 mx-2" />

                  <q-skeleton type="text" class="text-sm w-180px" />

                  <span class="inline-block h-1em w-1px bg-#fff/20 mx-2" />
                </div>
              </div>

              <div class="flex items-center justify-end pt-3 md:pt-0">
                <q-skeleton
                  type="QBtn"
                  no-caps
                  rounded
                  unelevated
                  class="bg-[rgba(113,113,113,0.3)] mr-4 text-weight-normal"
                />

                <q-skeleton
                  type="QBtn"
                  no-caps
                  rounded
                  unelevated
                  class="bg-[rgba(113,113,113,0.3)] mr-4 text-weight-normal"
                />

                <q-skeleton
                  type="QBtn"
                  no-caps
                  rounded
                  unelevated
                  class="bg-[rgba(113,113,113,0.3)] mr-4 text-weight-normal"
                />
              </div>
            </div>

            <div class="mt-4">
              <q-skeleton type="text" class="text-sm w-180px" />
              <q-skeleton type="text" class="text-sm w-50px" />
            </div>
            <!-- /basic info-->

            <!-- genres -->
            <div class="mx--2 mt-3">
              <q-skeleton type="QChip" v-for="item in 10" :key="item" />
            </div>
            <!-- /gerens -->

            <h6 v-if="$q.screen.width >= 625" class="text-16px mt-4">
              <q-skeleton type="text" class="text-16px w-90px" />
            </h6>
            <div v-if="$q.screen.width >= 625" class="flex flex-nowrap">
              <div>
                <q-responsive :ratio="3 / 4" class="w-170px rounded-xl">
                  <q-skeleton type="rect" class="absolute fit" />
                </q-responsive>
              </div>
              <div class="ml-4">
                <p
                  class="text-14px leading-loose whitespace-pre-wrap text-[#9a9a9a]"
                >
                  <q-skeleton type="text" class="w-full" />
                  <q-skeleton type="text" class="w-full" />
                  <q-skeleton type="text" class="w-1/2" />
                </p>
              </div>
            </div>
          </div>
          <div
            v-if="fullscreenOrLtMd"
            class="col-12 col-sm-4"
            :class="{
              'col-sm-12': !fullscreenOrLtMd || $q.screen.width <= 625
            }"
            ref="siloRef"
          />
        </div>
      </div>

      <Teleport :to="siloRef" :disabled="!siloRef">
        <div
          class="col-4"
          :class="{
            'px-4': fullscreenOrLtMd || $q.screen.width <= 625
          }"
        >
          <!-- playlist series -->
          <div v-if="series" class="bg-#a1a1a1/10 rounded-xl px-4 pt-3">
            <h1
              class="col-12 leading-normal text-16px md:text-h6 px-2 flex items-center justify-between truncate"
            >
              Danh sách phát ({{ series.count }})
            </h1>

            <div class="mx--4 row">
              <card-vertical
                v-for="video in series.videos"
                :key="video.id"
                :video
                :horizontal="$q.screen.width > 960 || $q.screen.width < 625"
                :p-watch="seriesPWatch?.get(video.id)"
                class="py-3 px-4 col-12"
                :class="{
                  // '!w-1/2': $q.screen.width > 500 && ($q.screen.width < 625),
                  'bg-#a1a1a1/20 rounded-xl':
                    router.resolve(video.slug).fullPath === route.fullPath
                }"
              />
            </div>
          </div>
          <!-- /playlist series -->

          <div
            v-if="data"
            v-for="section in data?.sections"
            :key="section.title"
            class="mt-6"
          >
            <h1
              class="leading-normal text-16px md:text-h6 flex items-center justify-between"
            >
              <span class="inline-block truncate min-w-0">
                {{ section.title }}
              </span>

              <router-link
                v-if="section.to"
                :to="section.to"
                class="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
              >
                Xem thêm
              </router-link>
            </h1>

            <div class="row">
              <div
                v-for="video in section.videos"
                :key="video.id"
                class="col-12 px-2 py-3"
                :class="{
                  '!w-1/2': $q.screen.width > 500 && $q.screen.width < 625
                }"
              >
                <card-vertical
                  :video
                  :horizontal="$q.screen.width > 960"
                  :p-watch="sectionsPWatch?.get(video.id)"
                />
              </div>
            </div>
          </div>
          <div v-else v-for="section in 3" :key="section" class="mt-6">
            <q-skeleton type="text" class="text-h6 w-110px" />

            <div class="row">
              <div
                v-for="video in 10"
                :key="video"
                class="col-12 px-2 py-3"
                :class="{
                  '!w-1/2': $q.screen.width > 500 && $q.screen.width < 625
                }"
              >
                <card-vertical-skeleton :horizontal="$q.screen.width > 960" />
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useThrottleFn, watchThrottled } from "@vueuse/core"
import type { Video } from "api/index"
import { getSearch, getWatch } from "api/index"
import {
  insertHentaiHistory as $insertHentaiHistory,
  getProgressHentai,
  insertHentaiProgress,
  upsertHentaiMeta
} from "api/supabase"
import Player from "components/player/index.vue"
import { convertNumber } from "logic/convert-number"
import dayjs from "logic/dayjs"
import { getEpisodeName } from "logic/get-episode-name"

const props = defineProps<{
  hentai: string
}>()
const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const authStore = useAuthStore()

const abortStore = useAbortStore()

const siloRef = ref<HTMLDivElement>()

const playerRef = ref<InstanceType<typeof Player>>()
const fullscreenOrLtMd = computed(() => {
  if (playerRef.value?.fullscreen) return true

  return $q.screen.lt.md
})

const masterSignal = computed(() =>
  abortStore.set(props.hentai, new AbortController())
)
const { data, loading, error, refresh } = useRequest(
  () =>
    getWatch(props.hentai, masterSignal.value).then((data) => {
      if (data.sections[0]?.title.toLocaleLowerCase() === "phim gợi ý")
        data.sections.shift()

      return data
    }),
  {
    refreshDeps: () => props.hentai
  }
)

useHead({
  templateParams: {
    name: () => {
      if (!data.value) return null

      const serieName = data.value.video.tags[0]?.name ?? data.value.video.title
      const episodeText = `Tập ${getEpisodeName(data.value.video)}`

      return `${episodeText} ${[serieName, ...data.value.video.alternativeTitles].join(", ")}`
    },
    description: () => data.value?.video.synopsis ?? null,
    url: () => route.fullPath
  },
  meta: [
    {
      property: "og:image",
      content: () =>
        data.value?.video.poster ?? data.value?.video.thumbnail ?? null
    }
  ]
})
watch(data, (data) => {
  if (!data) return

  void FirebaseAnalytics.logEvent({
    name: "watching",
    params: {
      season: data.video.tags[0].name,
      title: data.video.title
    }
  })
})

// /search?page=1&limit=24&orderby=date&order=desc&tags=slime-living-together&searchBy=slug
const series = computedAsync(
  () => {
    if (!data.value?.video?.tags?.[0]) return

    return getSearch(
      1,
      100,
      "date",
      "desc",
      "",
      { tags: data.value.video.tags[0].slug },
      "slug"
    ).then((data) => {
      data.videos.sort((a, b) => {
        const epA = getEpisodeName(a)
        const epB = getEpisodeName(b)

        for (let i = 0; i < Math.min(epA.length, epB.length); i++) {
          if (epA.charCodeAt(i) !== epB.charCodeAt(i)) {
            return epA.charCodeAt(i) - epB.charCodeAt(i)
          }
        }

        return 0
      })

      return data
    })
  },
  undefined,
  {
    onError: WARN
  }
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prevEp = computed(() => {
  if (!series.value) return
  return series.value.videos[
    (series.value.videos.findIndex((item) => {
      return router.resolve(item.slug).fullPath === route.fullPath
    }) >>>
      0) -
      1
  ]
})
const nextEp = computed(() => {
  if (!series.value) return
  return series.value.videos[
    (series.value.videos.findIndex((item) => {
      return router.resolve(item.slug).fullPath === route.fullPath
    }) >>>
      0) +
      1
  ]
})

watch(
  () => playerRef.value?.fullscreen,
  (value) => {
    if (value) {
      document.documentElement.classList.add("scrollbar-hidden")
    } else {
      document.documentElement.classList.remove("scrollbar-hidden")
    }
  }
)

// =============== api save / restore progress watch =============
const insertHentaiHistory = useThrottleFn($insertHentaiHistory, 60_000)
const restoredProgressStore = new Set<number>()
const restoringProgressStore = new Set<number>()

watchThrottled(
  [
    () => playerRef.value?.currentTime,
    () => playerRef.value?.durationTime,
    () => data.value?.video,
    () => authStore.isLogged
  ],
  async ([currentTime, durationTime, video, isLogged]) => {
    if (!isLogged) return

    if (
      !video ||
      !durationTime ||
      durationTime < currentTime ||
      typeof currentTime !== "number" ||
      Number.isNaN(currentTime) ||
      !durationTime
    )
      return

    if (restoringProgressStore.has(video.id)) {
      WARN("skip save progress because restoring progress id %i", video.id)
      return
    }
    if (!restoredProgressStore.has(video.id)) {
      WARN("skip save progress because not restore progress")
      return
    }

    if (video.isTrailer) return WARN("skip save progress because is trailer")

    // init data
    await upsertHentaiMeta(video, masterSignal.value)
    // save history
    await insertHentaiHistory(video, masterSignal.value)
    // save progress
    await insertHentaiProgress(
      video,
      currentTime,
      durationTime,
      masterSignal.value
    )
  },
  { throttle: 10_000 }
)

watch(
  [() => playerRef.value, () => data.value?.video, () => authStore.isLogged],
  async ([playerRef, video, isLogged]) => {
    if (!isLogged) return

    if (!video || !playerRef) return

    restoringProgressStore.add(video.id)

    try {
      const { data } = await getProgressHentai(video, masterSignal.value)
      // restore now
      console.log({ data })
      if (typeof data?.cur !== "number") throw data

      playerRef.currentTime = data.cur
      playerRef.addNotice(`Khôi phục tiến trình xem ${parseTime(data.cur)}`)
    } catch (err) {
      WARN(err)
    } finally {
      restoringProgressStore.delete(video.id)
      restoredProgressStore.add(video.id)
    }
  }
)
// =============== /api save / restore progress watch =============

// =============== api get progress watch in videos ================
const sectionsPWatch = usePWatchVideos(() => {
  if (!data.value) return createEmptyArray<Video>()

  return Array.from(
    new Set(
      data.value.sections.reduce(
        (arr, section) => {
          arr.push(...section.videos)
          return arr
        },
        <Video[]>[]
      )
    )
  )
}, masterSignal)

// =============== /api get progress watch in videos ================

// ================== api get progress watch in series ==================
const seriesPWatch = usePWatchVideos(() => {
  if (!series.value) return createEmptyArray<Video>()

  return series.value.videos
}, masterSignal)
// ================== /api get progress watch in series ==================
</script>
