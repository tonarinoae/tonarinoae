<route lang="yaml">
name: search
</route>

<template>
  <q-page class="px-1 sm:px-2 md:px-6">
    <div>
      <filter-taxonomy
        label="Thể loại"
        :icon="iconCategory"
        :items="taxonomyStore.categories"
        name="genres"
        enable-grid
      />
      <filter-taxonomy
        label="Series"
        :icon="iconSeries"
        :items="taxonomyStore.series"
        name="series"
      />
      <filter-taxonomy
        label="Studio"
        :icon="iconStudio"
        :items="taxonomyStore.studios"
        name="studios"
      />
      <filter-taxonomy
        label="Năm"
        :icon="iconYear"
        :items="taxonomyStore.releaseYears"
        name="years"
      />

      <q-btn-dropdown rounded no-caps color="dark">
        <template v-slot:label>
          <i-flowbite-sort-outline class="size-1.5em mr-1" />
          Sắp xếp
        </template>

        <q-list>
          <q-item
            v-for="sort in sorters"
            :key="sort.label"
            clickable
            v-close-popup
            @click="
              $router.replace({
                query: {
                  ...$route.query,
                  ...sort.query
                }
              })
            "
          >
            <q-item-section>
              <q-item-label>{{ sort.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <div v-if="data && !error" class="row mt-6">
      <h1 class="col-12 text-h6 px-2">
        Tìm kiếm cho: <b>{{ $route.query.s }}</b>
        <span class="text-14px text-gray-400">({{ data.count }} kết quả)</span>
      </h1>

      <div
        v-for="video in data.videos"
        :key="video.id"
        class="col-6 col-sm-4 col-md-3 px-2 py-3"
        :class="{
          'col-12': $q.screen.width <= 423
        }"
      >
        <card-vertical :video />
      </div>

      <q-pagination
        :model-value="Math.max(1, parseInt($route.query.page) ?? 0)"
        :max="Math.ceil(data.count / 24)"
        :max-pages="7"
        direction-links
        flat
        :to-fn="(page) => ({ query: { ...$route.query, page } })"
        color="grey"
        active-color="primary"
        class="mx-auto"
      />

      <q-inner-loading :showing="loading">
        <q-spinner size="40px" />
      </q-inner-loading>
    </div>
    <div v-else-if="!error" v-for="i in 5" :key="i" class="row mt-6">
      <div class="col-12 px-2">
        <q-skeleton
          type="text"
          class="text-h6 flex items-center justify-between"
          width="220px"
        />
      </div>

      <div
        v-for="video in 12"
        :key="video"
        class="col-6 col-sm-4 col-md-3 px-2 py-3"
        :class="{
          'col-12': $q.screen.width <= 423
        }"
      >
        <card-vertical-skeleton />
      </div>
    </div>
    <div v-else class="text-center col-12 py-8 px-6">
      <code class="block">{{ error }}</code>

      <q-btn rounded color="blue" no-caps class="mt-3" @click="refresh"
        >Thử lại</q-btn
      >
    </div>
  </q-page>
</template>

<script lang="tsx" setup>
import iconCategory from "~icons/fluent/tag-multiple-24-filled"
import iconSeries from "~icons/iconoir/playlist-play"
import iconStudio from "~icons/simple-icons/youtubestudio"
import iconYear from "~icons/iwwa/year"
import { usePagination } from "vue-request"
import { getSearch } from "api/index"

// import { NAvatar, NList, NListItem, NPagination, NSpin } from 'naive-ui';

const taxonomyStore = useTaxonomyStore()
const $route = useRoute()
const $router = useRouter()

const sorters = [
  {
    label: "Mới nhất",
    query: { orderby: "", order: "desc" }
  },
  {
    label: "Xem nhiều nhất",
    query: { orderby: "x_post_views_count", order: "desc" }
  },
  {
    label: "Theo tên",
    query: { orderby: "meta_value_num", order: "desc" }
  }
]

const { data, current, totalPage, pageSize, loading, error, refresh } =
  usePagination(
    ({ page = 1, limit = 24 }) =>
      getSearch(
        Math.max(1, parseInt($route.query.page) || 0),
        limit,
        $route.query.orderby ?? "",
        $route.query.order ?? "",
        $route.query.metaKey ?? "",
        {
          studios: $route.query.studios ?? "",
          tags: $route.query.tags ?? "",
          years: $route.query.years ?? "",
          genres: $route.query.genres ?? "",
          s: $route.query.s ?? ""
        }
      ).then((data) => Object.assign(data, { page })),
    {
      defaultParams: [
        {
          page: Math.max(1, parseInt($route.query.page) || 0),
          limit: 24
        }
      ],
      pagination: {
        currentKey: "page",
        totalKey: "count"
      },
      refreshDeps: [
        () => $route.query.orderby,
        () => $route.query.order,
        () => $route.query.metaKey,

        () => $route.query.studios,
        () => $route.query.tags,
        () => $route.query.years,
        () => $route.query.genres,
        () => $route.query.series,

        () => $route.query.s,
        () => $route.query.page
      ],
      refreshDepsAction: () => (current.value = 0)
    }
  )
</script>