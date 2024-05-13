<template>
  <router-view />
</template>

<script setup lang="ts">
useHead({
  title: "%name",
  titleTemplate: "%s - Tonari no Anime Ecchi",
  templateParams: {
    name: "となりのアニメへんたい (Tonari no Anime Ecchi)",
    description:
      "となりのアニメへんたい (Tonari no Anime Ecchi)は、膨大なアニメ動画コレクションへのアクセスを提供するウェブアプリケーションです。ユーザーは、カテゴリ、俳優、キーワードで動画を閲覧できます。このアプリケーションは、プレイリストの作成、後で見るために動画を保存し、友達と動画を共有する機能など、さまざまな機能も提供します。",
    url: ""
  },
  meta: [
    {
      name: "description",
      content: "%description"
    },
    {
      property: "og:site_name",
      content: "%name"
    },
    {
      property: "og:url",
      content: `${location.protocol}://${location.hostname}/%url`
    }
  ]
})

useSeoMeta({
  title: "",
  description: ""
})
</script>
