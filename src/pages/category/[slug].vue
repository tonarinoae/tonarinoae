<route lang="yaml">
name: category
</route>

<template>
  <q-page class="px-1 sm:px-2 md:px-6">
    <div>
      <filter-taxonomy
        v-if="type !== 'genres'"
        label="Thể loại"
        :icon="iconCategory"
        :items="taxonomyStore.categories"
        name="genres"
        enable-grid
      />
      <filter-taxonomy
        v-if="type !== 'tags'"
        label="Series"
        :icon="iconSeries"
        :items="taxonomyStore.series"
        name="series"
      />
      <filter-taxonomy
        v-if="type !== 'studios'"
        label="Studio"
        :icon="iconStudio"
        :items="taxonomyStore.studios"
        name="studios"
      />
      <filter-taxonomy
        v-if="type !== 'years'"
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
      <div v-if="mData && !mError" class="col-12">
        <h1 class="text-h6 text-26px px-2 leading-normal">
          {{ mData.name }}
          <span class="text-14px text-gray-400"
            >({{ data.count }} kết quả)</span
          >
        </h1>
        <h3 class="text-16px text-gray-300 leading-normal px-2">
          {{ mData.description }}
        </h3>
      </div>
      <div v-else-if="!error" class="col-12 px-2">
        <q-skeleton
          type="text"
          class="text-h6 text-26px leading-normal"
          width="220px"
        />
        <q-skeleton
          type="text"
          class="text-16px text-gray-300 leading-normal"
          width="130px"
        />
      </div>

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
        :model-value="Math.max(1, current, parseInt($route.query.page) || 0)"
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
          class="text-h6 text-26px leading-normal"
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
import { getSearch, getTerm } from "api/index"

// import { NAvatar, NList, NListItem, NPagination, NSpin } from 'naive-ui';

const watches = ["genres", "studios", "tags", "years"] as const
const props = withDefaults(
  defineProps<{
    type?: "genres" | "tags" | "studios" | "years"
    typeTax?: string
    ignoreWatch?: (typeof watches)[0][]

    slug: string
  }>(),
  { type: "genres", typeTax: "category", ignoreWatch: ["genres"] }
)

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

const {
  data: mData,
  loading: mLoading,
  error: mError,
  refresh: mRefresh
} = useRequest(
  () => {
    return getTerm(props.typeTax, props.slug)
  },
  {
    refreshDeps: [() => $route.params.slug, () => props.type],
    refreshActions: () => mRefresh()
  }
)
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
          genres: $route.query.genres ?? "",
          studios: $route.query.studios ?? "",
          tags: $route.query.tags ?? "",
          series: $route.query.series ?? "",
          years: $route.query.years ?? "",
          [props.type]: props.slug
        },
        "slug"
      ).then((data) => Object.assign(data, { page })),
    {
      defaultParams: [
        {
          limit: 24
        }
      ],
      pagination: {
        currentKey: "page",
        totalKey: "count"
      },
      refreshDeps: [
        () => props.type,
        () => props.slug,
        () => $route.query.orderby,
        () => $route.query.order,
        () => $route.query.metaKey,

        () =>
          (props.ignoreWatch
            ? watches.filter((name) => !props.ignoreWatch.includes(name))
            : watches
          ).map((name) => $route.query[name]),

        () => $route.query.genres,
        () => $route.query.studios,
        () => $route.query.tags,
        () => $route.query.years,

        () => $route.query.page
      ],
      refreshDepsAction: () => (current.value = 0)
    }
  )
</script>
