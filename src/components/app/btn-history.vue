<template>
  <q-btn round unelevated>
    <i-fluent-history-24-filled v-if="show" class="size-24px" />
    <i-fluent-history-24-regular v-else class="size-24px" />

    <q-menu
      v-model="show"
      class="!bg-dark py-1 px-2 rounded-lg shadow-none !max-h-80vh"
    >
      <div class="w-360px px-2">
        <div v-if="loading">
          <card-vertical-skeleton v-for="item in 20" :key="item" class="my-2" />
        </div>
        <screen-error v-else-if="error || !data" :error :refresh />
        <div v-else>
          <template v-for="(item, index) in data" :key="item.slug">
            <h4 v-if="index === 0 || item.watched_at_d.format('DD/MM') !== (data[index-1]?.watched_at_d).format('DD/MM')">
              <template v-if="item.watched_at_d.isToday()"> Hôm nay </template>
              <template v-else-if="item.watched_at_d.isYesterday()">
                Hôm qua
              </template>
              <template v-else
                >{{ item.watched_at_d.format("DD/MM") }}
              </template>
            </h4>
            <card-mini-vertical
              horizontal
              :video="item"
              :watched-at="item.watched_at"
              :p-watch="item"
              class="py-2"
            />
          </template>
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script lang="ts" setup>
import dayjs from "src/logic/dayjs"

const show = ref(false)

const historyStore = useHistoryStore()

const { data, loading, error, refresh } = useRequest(async () =>
  (await historyStore.queryPage(1, 30)).data.map((item) => {
    return {
      ...item,
      watched_at_d: dayjs(item.watched_at)
    }
  })
)
</script>
