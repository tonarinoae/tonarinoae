<route lang="yaml">
name: gacha
</route>

<template>
  <q-page class="px-1 sm:px-2 md:px-6">
    <div>
      <q-radio v-model="limit" v-for="val in gachas" :val :label="val + ''" />
      <br />
      <q-btn rounded color="blue" no-caps @click="refresh">Lấy</q-btn>
    </div>

    <div v-if="data && !error" class="row">
      <div
        v-for="video in data"
        :key="video.id"
        class="col-6 col-sm-4 col-md-3 px-2 py-3"
        :class="{
          'col-12': $q.screen.width <= 423
        }"
      >
        <card-vertical :video />
      </div>
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
    <screen-error v-else :error :refresh />
  </q-page>
</template>

<script lang="ts" setup>
import { gacha } from "api/index"

const gachas = [1, 10, 20, 30]

const limit = ref(1)

const { data, error, refresh } = useRequest(() => gacha(limit.value))

const route = useRoute()

useHead({
  templateParams: {
    name: "Gacha phiên bản Unlimited",
    description:
      "Cùng xem nhân phẩm của bạn như thế nào với tính năng GACHA cực hot tại %site_name, web xem phim sex hoạt hình anime hentai vietsub miễn phí chất lượng cao lớn nhất VN",
    url: () => route.fullPath
  }
})
void FirebaseAnalytics.logEvent({
  name: "gacha",
  params: {}
})
</script>
