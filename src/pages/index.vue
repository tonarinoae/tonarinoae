<route lang="yaml">
name: home
</route>

<template>
  <q-page class="px-1 sm:px-2 md:px-6">
    <div
      v-if="data && !error"
      v-for="section in data?.sections"
      :key="section.title"
      class="row mt-6"
    >
      <h1 class="col-12 text-h6 px-2 flex items-center justify-between">
        {{ section.title }}

        <router-link
          v-if="section.to"
          :to="
            section.to.query?.category
              ? {
                  name: 'category',
                  params: { slug: section.to.query.category }
                }
              : section.to
          "
          class="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
        >
          Xem thêm
        </router-link>
      </h1>

      <div
        v-for="video in section.videos"
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
      <q-skeleton
        type="text"
        class="col-12 text-h6 px-2 flex items-center justify-between"
      />

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

<script lang="ts" setup>
import { home } from "src/api"

const { data, loading, error } = useRequest(() => {
  return home()
})
</script>
