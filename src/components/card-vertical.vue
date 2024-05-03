<template>
  <router-link
    :to="video.slug"
    class="block relative"
    :class="{
      '!flex flex-nowrap': horizontal
    }"
    v-element-hover="onHover"
  >
    <div
      :class="{
        'min-w-0 w-40% max-w-250px col-5 col-sm-4 col-md-3 col-lg-2 col-xl-4':
          horizontal
      }"
    >
      <q-img
        no-spinner
        :src="video.poster ?? video.thumbnail"
        :ratio="480 / 300"
        class="rounded-md"
      >
        <img
          v-if="video.isTrailer"
          src="~/assets/trailer.webp"
          class="w-50% max-w-110px"
        />

        <div
          v-if="!video.poster"
          class="absolute size-100% top-0 left-0 bg-#000 bg-opacity-10 flex justify-center !pa-0 backdrop-blur-3px"
        >
          <img
            no-spinner
            :src="video.thumbnail"
            class="h-full absolute w-auto rounded-md"
          />
        </div>

        <span
          class="absolute left-1 bottom-1 bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 !bg-opacity-80"
        >
          Tập {{ epName }}
        </span>
      </q-img>
    </div>

    <div
      class="mt-1"
      :class="{
        'pl-2 min-w-0 flex-1 w-full': horizontal
      }"
    >
      <h2 class="text-16px line-clamp-2 leading-normal">
        {{
          video.tags[0]?.title ??
          (video.title.slice(0, video.title.indexOf(epName) >>> 0) ||
            video.title)
        }}
      </h2>

      <span class="text-xs text-gray-400">
        {{ convertNumber(video.views) }} lượt xem
        <span class="px-1">&bull;</span>
        {{ dayjs(video.updatedAt).locale("vi").fromNow() }}
      </span>

      <br />

      <span class="text-11px text-gray-400 truncate block mt-2">
        <router-link
          v-for="studio in video.studios"
          :key="studio.id"
          :to="{ name: 'studio', params: { slug: studio.slug } }"
          class="bg-#aaa bg-opacity-50 text-white text-opacity-30 rounded-sm px-1 py-0.5 mx-1 whitespace-nowrap inline-block my-0.5"
          >{{ studio.name }}</router-link
        >
      </span>
    </div>

    <div
      v-if="hovering && !horizontal"
      class="absolute w-full h-120% bg-dark rounded-md top-1/2 left-1/2 translate--1/2 py-3 px-2"
    >
      <div class="flex flex-nowrap">
        <div class="min-w-0 w-max-110px w-30%">
          <q-img
            no-spinner
            :ratio="3 / 4"
            :src="video.thumbnail"
            class="rounded-md"
          />
        </div>

        <div class="min-w-0 pl-1 flex-1">
          <h2 class="text-base leading-normal line-clamp-2">
            {{ video.title.slice(0, video.title.indexOf(epName) >>> 0) }}
          </h2>
          <h3 class="text-gray-400 leading-normal mt-1 text-xs">
            {{ video.alternativeTitles.join(", ") }}
          </h3>
        </div>
      </div>

      <p class="my-2 line-clamp-4 text-gray-400 text-xs">
        {{ video.synopsis }}
      </p>

      <div class="line-clamp-2">
        <span
          v-for="genre in video.genres"
          :key="genre.id"
          class="bg-gray-100 text-gray-800 text-11px font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
        >
          {{ genre.name }} ({{ genre.count }})

          <q-tooltip>{{ genre.description }}</q-tooltip>
        </span>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { vElementHover } from "@vueuse/components"
import { convertNumber } from "logic/convert-number"
import { getEpisodeName } from "logic/get-episode-name"
import dayjs from "logic/dayjs"
import type { Video } from "src/api"

const hovering = ref(false)
let timeoutHovering: NodeJS.Timeout | number | null = null
function onHover(state: boolean) {
  if (timeoutHovering) clearTimeout(timeoutHovering)
  if (state)
    timeoutHovering = setTimeout(() => {
      hovering.value = true
      timeoutHovering = null
    }, 1_500)
  else hovering.value = false
}

const d = {
  id: 7734,
  title: "Konomi ja Nai kedo Mukatsuku Ane to Aishou Batsugun Ecchi 1",
  slug: "/konomi-ja-nai-kedo-mukatsuku-ane-to-aishou-batsugun-ecchi-1/",
  synopsis:
    "Ritsuki và Kyouya là hai chị em ruột của nhau. Từ nhỏ hai chị em luôn đùm bọc che chở cho nhau. \nNhưng rồi tuổi nổi loạn của Kyouya cũng đến khiến tình cảm chị em bị rạn nứt.\nRitsuki và Kyouya luôn luôn cãi nhau thậm chí là không thêm nhìn mặt.\n\nTrong một lần về nhà khi trời mưa, Ritsuki vô tình ngã bong gân và bắt Kyouya mát-xa chuộc lỗi.\nTrong lúc làm Kyouya thấy cơ thể Ritsuki quá múp nên đã ra tay sờ soạn và anh đã húp luôn chị ruột mình... \n",
  createdAt: "20240428 134907",
  updatedAt: "20240428 134917",
  url: "https://ihentai.xyz/konomi-ja-nai-kedo-mukatsuku-ane-to-aishou-batsugun-ecchi-1/",
  commentUrl:
    "https://google.com/hz/konomi-ja-nai-kedo-mukatsuku-ane-to-aishou-batsugun-ecchi-1/",
  genres: [
    {
      id: 4,
      name: "Big Boobs",
      slug: "big-boobs",
      thumbnail: "https://irex.cc/images/app/category/big-boobs.jpg",
      taxonomy: "category",
      description: "Vú To! Gái còn thích chứ đừng nói đến trai ;)",
      count: 2219
    },
    {
      id: 10,
      name: "Loạn luân",
      slug: "loan-luan",
      thumbnail: "https://irex.cc/images/app/category/loan-luan.jpg",
      taxonomy: "category",
      description: "Họ chỉ muốn gắn kết tình cảm ruột thịt thôi mà",
      count: 486
    },
    {
      id: 84,
      name: "Tsundere",
      slug: "tsundere",
      thumbnail: "https://irex.cc/images/app/category/tsundere.jpg",
      taxonomy: "category",
      description:
        "Đồ ngốc, tôi chưa có phép thì đừng có nhét vào đột ngột như thế",
      count: 451
    },
    {
      id: 58,
      name: "Vanilla",
      slug: "vanilla",
      thumbnail: "https://irex.cc/images/app/category/vanilla.jpg",
      taxonomy: "category",
      description: "Tình dục nhẹ nhàng, sao cứ như xem phim gia đình vậy?",
      count: 518
    }
  ],
  tags: [
    {
      id: 3241,
      name: "Konomi ja Nai kedo",
      slug: "konomi-ja-nai-kedo",
      thumbnail: "https://irex.cc/images/app/post_tag/konomi-ja-nai-kedo.jpg",
      taxonomy: "post_tag",
      description: "",
      count: 1
    },
    {
      id: 3242,
      name: "好みじゃないけど-ムカつく姉と相性抜群エッチ-",
      slug: "%e5%a5%bd%e3%81%bf%e3%81%98%e3%82%83%e3%81%aa%e3%81%84%e3%81%91%e3%81%a9-%e3%83%a0%e3%82%ab%e3%81%a4%e3%81%8f%e5%a7%89%e3%81%a8%e7%9b%b8%e6%80%a7%e6%8a%9c%e7%be%a4%e3%82%a8%e3%83%83%e3%83%81",
      thumbnail:
        "https://irex.cc/images/app/post_tag/%e5%a5%bd%e3%81%bf%e3%81%98%e3%82%83%e3%81%aa%e3%81%84%e3%81%91%e3%81%a9-%e3%83%a0%e3%82%ab%e3%81%a4%e3%81%8f%e5%a7%89%e3%81%a8%e7%9b%b8%e6%80%a7%e6%8a%9c%e7%be%a4%e3%82%a8%e3%83%83%e3%83%81.jpg",
      taxonomy: "post_tag",
      description: "",
      count: 1
    }
  ],
  studios: [
    {
      id: 90,
      name: "Mary Jane",
      slug: "mary-jane",
      thumbnail: "https://irex.cc/images/app/studio/mary-jane.jpg",
      taxonomy: "studio",
      description: "",
      count: 136
    }
  ],
  releaseYear: {
    id: 3194,
    name: "2024",
    slug: "2024",
    thumbnail: "https://irex.cc/images/app/release_year/2024.jpg",
    taxonomy: "release_year",
    description: "",
    count: 34
  },
  views: 311601,
  likes: 0,
  dislikes: 0,
  alternativeTitles: ["好みじゃないけど-ムカつく姉と相性抜群エッチ-"],
  thumbnail:
    "https://irex.cc/images/thumb/Konomi-ja-Nai-kedo-Mukatsuku-Ane-to-Aishou-Batsugun-Ecchi-1.jpg",
  poster:
    "https://irex.cc/images/thumb-h/Konomi-ja-Nai-kedo-Mukatsuku-Ane-to-Aishou-Batsugun-Ecchi-1.jpg",
  notes: "",
  censorship: "censored",
  category: "hen2d",
  languages: ["vi"],
  isTrailer: false,
  isPopular: false,
  links: [
    "https://play.sonar-cdn.com/play/beaacda4-2768-4bf6-9508-e7c953a9fc4e"
  ]
}
const props = defineProps<{
  video: Video

  horizontal?: boolean
}>()

const epName = computed(() => getEpisodeName(props.video))
</script>
