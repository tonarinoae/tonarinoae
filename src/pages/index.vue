<template>
  <q-page class="px-2 md:px-6">
    <div
      v-for="section in data?.sections"
      :key="section.title"
      class="row mt-6"
    >
      <h1 class="col-12 text-h6 px-2 flex items-center justify-between">
        {{ section.title }}

        <router-link
          v-if="section.to"
          :to="section.to"
          class="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
        >
          Xem thêm
        </router-link>
      </h1>

      <div
        v-for="video in section.videos"
        :key="video.id"
        class="col-3 px-2 py-3"
      >
        <card-vertical :video />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { home } from "src/api"

const { data, loading, error } = useRequest(() => {
  return home()
})
</script>
