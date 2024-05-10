<template>
  <q-drawer
    :model-value="hideDrawer ? modelValue : true"
    @update:model-value="modelValue = $event"
      :width="250"
      :breakpoint="500"
      :mini="hideDrawer ? false : !modelValue"
      :overlay="hideDrawer"
      :behavior="hideDrawer ? 'mobile' : undefined"
    class="!bg-[var(--q-dark-page)]  overflow-visible column flex-nowrap"
  >
    <q-toolbar v-if="hideDrawer">
      <q-btn
        dense
        flat
        round
        icon="menu"
        class="mr-5"
        @click="modelValue = !modelValue"
      />

      <router-link to="/" class="flex items-end">
        <img src="~assets/app_icon.png" width="35" height="35" />
        <h1 class="text-h6 ml-1">iHentai</h1>
      </router-link>
    </q-toolbar>

    <div class="h-full overflow-y-auto scrollbar-custom">
      <q-list class="mx-2">
        <template
          v-for="{ icon, active, name, path, divider } in drawers"
          :key="name"
        >
          <q-separator
            v-if="divider"
            class="bg-[rgba(255,255,255,0.1)] my-6 mr-2"
          />
          <q-item
            v-else
            clickable
            v-ripple
            class="min-h-0 my-2 rounded-xl"
            :to="path"
            active-class=""
            exact-active-class="bg-[rgba(255,255,255,0.1)] text-main"
          >
            <q-item-section avatar class="pr-0 min-w-0">
              <component
                v-if="$router.resolve(path!).fullPath !== $route.fullPath"
                :is="icon!"
                width="23"
                height="23"
              />
              <component v-else :is="active!" width="23" height="23" />
            </q-item-section>
            <q-item-section class="ml-5">
              <q-item-label class="text-[16px]">{{ name }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>

      <div v-if="!(hideDrawer ? false : !modelValue)" class="text-gray-500">
        <a
          v-for="item in drawersBottom"
          :key="item.name"
          class="py-2 px-4 block"
          :href="item.href"
          target="_blank"
          >{{ item.name }}</a
        >
      </div>
    </div>
  </q-drawer>
</template>

<script lang="ts" setup>
import homeLine from "~icons/solar/home-2-line-duotone"
import homeBold from "~icons/solar/home-2-bold-duotone"
import exploreLine from "~icons/solar/compass-line-duotone"
import exploreBold from "~icons/solar/compass-bold-duotone"
import fireLine from "~icons/solar/fire-line-duotone"
import fireBold from "~icons/solar/fire-bold-duotone"
import subLine from "~icons/solar/subtitles-line-duotone"
import subBold from "~icons/solar/subtitles-bold-duotone"
import layerLine from "~icons/solar/layers-line-duotone"
import layerBold from "~icons/solar/layers-bold-duotone"
import tuneLine from "~icons/solar/colour-tuneing-line-duotone"
import tuneBold from "~icons/solar/colour-tuneing-bold-duotone"
import historyLine from "~icons/solar/history-line-duotone"
import historyBold from "~icons/solar/history-bold-duotone"
import favoriteLine from "~icons/solar/stars-minimalistic-line-duotone"
import favoriteBold from "~icons/solar/stars-minimalistic-bold-duotone"

const drawers = [
  {
    name: "Trang chủ",
    path: { name: "home" },
    icon: homeLine,
    active: homeBold
  },
  {
    name: "Khám phá",
    path: { name: "explore" },
    icon: exploreLine,
    active: exploreBold
  },
  { divider: true },
  {
    name: "Phổ biến",
    path: {
      name: "search",
      orderby: "meta_value_num",
      order: "desc",
      metaKey: "x_post_views_count"
    },
    icon: fireLine,
    active: fireBold
  },
  {
    name: "Vietsub",
    path: { name: "hentai-vietsub" },
    icon: subLine,
    active: subBold
  },
  {
    name: "Hentai 3D",
    path: { name: "hentai-3d" },
    icon: layerLine,
    active: layerBold
  },
  {
    name: "Không che",
    path: { name: "uncensored" },
    icon: tuneLine,
    active: tuneBold
  },
  {
    divider: true
  },
  {
    name: "Lịch sử",
    path: { name: "history" },
    icon: historyLine,
    active: historyBold
  },
  {
    name: "Phim đã lưu",
    path: { name: "favorite" },
    icon: favoriteLine,
    active: favoriteBold
  },
  { divider: true }
]
const drawersBottom = computed(() => [
  {
    name: "Về chúng tôi",
    href: "https://ihentai-app.github.io/about"
  },
  {
    name: "Liên hệ chúng tôi",
    href: "mailto:ogmo2r3q@duck.com?subject=Phản hồi ứng dụng web AnimeVsub"
  },
  {
    name: "Tải ứng dụng",
    href: "https://ihentai-app.github.io"
  },
  {
    name: "Điều khoản sử dụng",
    href: "https://ihentai-app.github.io/about/tems-of-use"
  },
  {
    name: "Chính sách riêng tư",
    href: "https://ihentai-app.github.io/about/privacy-police"
  },
  {
    name: "Khiếu nại vi phạm",
    href: "https://ihentai-app.github.io/about/disclaimer"
  }
])

const route = useRoute()

const modelValue = defineModel<boolean>("modelValue", { required: true })
const hideDrawer = computed(() => false)
</script>
