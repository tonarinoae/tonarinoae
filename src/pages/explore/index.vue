<route lang="yaml">
name: explore
</route>

<template>
  <q-page class="px-1 sm:px-2 md:px-6">
    <div class="row sm:mx-12 md:mx-24 mb-8">
      <div v-for="banner in banners" :key="banner.name" class="col-3 px-1">
        <router-link
          :to="banner.to"
          class="block relative rounded-xl overflow-hidden hover:scale-105 hover:transition-transform"
        >
          <q-img no-spinner :ratio="95 / 179" :src="banner.image" />
          <div
            class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-95"
          />
          <div class="absolute left-1 right-1 bottom-8 text-center">
            <Component
              :is="banner.icon"
              class="!text-5xl sm:!text-6xl mb-6 mx-auto"
            />
            <h2
              class="text-xl sm:text-2xl text-uppercase leading-3 font-700 md:mb-1"
            >
              {{ banner.name }}
            </h2>
            <p
              class="text-#fff/70 text-xs sm:text-sm md:text-base font-medium line-clamp-2"
            >
              {{ banner.capt }}
            </p>
          </div>
        </router-link>
      </div>
    </div>

    <div class="mb-8">
      <div
        class="border-t-8 border-t-white/80 rounded mb-5"
        style="width: 15vw"
      />
      <h2 class="text-3xl sm:text-4xl font-bold sm:font-extrabold">THỂ LOẠI</h2>

      <div
        class="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4"
        :class="{
          '!grid-cols-5': $q.screen.width >= 1280
        }"
      >
        <router-link
          v-for="taxonomy in taxonomyStore.categories"
          :key="taxonomy.id"
          :to="{ name: 'category', params: { slug: taxonomy.slug } }"
        >
          <card-taxonomy :taxonomy />
        </router-link>
      </div>
    </div>

    <div class="mb-8">
      <div
        class="border-t-8 border-t-white/80 rounded mb-5"
        style="width: 15vw"
      />
      <h2 class="text-3xl sm:text-4xl font-bold sm:font-extrabold">
        HÃNG PHIM
      </h2>

      <div class="mx--2 mt-3">
        <router-link
          v-for="genre in taxonomyStore.studios"
          :key="genre.id"
          :to="{ name: 'studio', params: { slug: genre.slug } }"
        >
          <taxonomy-item
            class="cursor-pointer"
            :genre
            color="grey-9"
            no-tooltip
          />
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import top_views from "src/assets/top-views.jpg"
import gallery from "src/assets/gallery.jpg"
import genres from "src/assets/genres.jpg"
import gacha from "src/assets/gacha.jpg"

import iconHot from "~icons/zondicons/hot"
import iconGallery from "~icons/solar/gallery-minimalistic-bold"
import iconCategory from "~icons/iconamoon/category"
import iconMagic from "~icons/game-icons/magick-trick"

const taxonomyStore = useTaxonomyStore()

const banners = [
  {
    name: "Hentai hot",
    capt: "Phim nhiều lượt xem nhất",
    image: top_views,
    icon: iconHot,
    to: {
      name: "search",
      query: {
        orderby: "meta_value_num",
        order: "desc",
        metaKey: "x_post_views_count"
      }
    }
  },
  {
    name: "Bộ sưu tập",
    capt: "Tìm nguồn, ảnh gái xinh",
    image: gallery,
    icon: iconGallery,
    to: {
      name: "gallery"
    }
  },
  {
    name: "Thể loại",
    capt: "Tổng hợp tất cả thể loại",
    image: genres,
    icon: iconCategory,
    to: {
      name: "explore"
    }
  },
  {
    name: "Gacha",
    capt: "Thử vận may tí chứ?",
    image: gacha,
    icon: iconMagic,
    to: {
      name: "gacha"
    }
  }
]
</script>
