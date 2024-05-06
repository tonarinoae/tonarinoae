<route lang="toml">
  name = "hentai"
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
          :src="data.video.links[0]"
          ref="playerRef"
          :is-desktop
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
                  'text-25px': $q.screen.width > 814 && fullscreenOrLtMd
                }"
              >
                {{ data.video.tags[0]?.name ?? data.video.title }}
              </h1>
              <h3
                class="text-16px leading-normal truncate"
                :class="{
                  'text-18px': $q.screen.width > 617 && fullscreenOrLtMd,
                  'text-20px': $q.screen.width > 814 && fullscreenOrLtMd
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

        <div class="row">
          <div
            v-if="data"
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
                <q-btn
                  no-caps
                  rounded
                  unelevated
                  class="bg-[rgba(113,113,113,0.3)] mr-4 text-weight-normal"
                >
                  <i-material-symbols-bookmark-added-rounded
                    v-if="true"
                    class="size-28px"
                  />
                  <i-material-symbols-bookmark-add-outline-rounded
                    v-else
                    class="size-28px"
                  />
                  <span class="text-[14px] font-weight-normal ml-1"
                    >Theo dõi</span
                  >
                </q-btn>

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
            <h1 class="col-12 text-h6 px-2 flex items-center justify-between">
              Danh sách phát ({{ series.count }})
            </h1>

            <div class="mx--4 row">
              <card-vertical
                v-for="video in series.videos"
                :key="video.id"
                :video
                :horizontal="$q.screen.width > 960 || $q.screen.width < 625"
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
            v-for="section in data?.sections"
            :key="section.title"
            class="mt-6"
          >
            <h1 class="text-h6 flex items-center justify-between">
              {{ section.title }}

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
                <card-vertical :video :horizontal="$q.screen.width > 960" />
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { getSearch, getWatch } from "api/index"
import Player from "components/player/index.vue"
import { convertNumber } from "logic/convert-number"
import dayjs from "logic/dayjs"
import { getEpisodeName } from "logic/get-episode-name"

const props = defineProps<{
  hentaiSlug: string
}>()
const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const siloRef = ref<HTMLDivElement>()

const playerRef = ref<InstanceType<typeof Player>>()
const fullscreenOrLtMd = computed(() => {
  if (playerRef.value?.fullscreen) return true

  return $q.screen.lt.md
})

const { data, loading, error } = useRequest(() => getWatch(props.hentaiSlug), {
  refreshDeps: () => props.hentaiSlug
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
</script>
