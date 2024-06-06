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
          <card-mini-vertical
            v-for="item in data.data"
            horizontal
            :video="item"
            :watched-at="item.watched_at"
            :p-watch="item"
            :key="item.slug"
            class="py-2"
          />
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script lang="ts" setup>
const show = ref(false)

const historyStore = useHistoryStore()

const { data, loading, error, refresh } = useRequest(
  async () => await historyStore.queryPage(1, 30)
)
</script>
