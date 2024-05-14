<template>
  <router-view />
</template>

<script setup lang="ts">
useHead({
  title: "%name",
  titleTemplate: "%s %separator Tonari no Anime Ecchi",
  templateParams: {
    name: "となりのアニメへんたい (Tonari no Anime Ecchi)",
    description:
      "となりのアニメへんたい (Tonari no Anime Ecchi)は、膨大なアニメ動画コレクションへのアクセスを提供するウェブアプリケーションです。ユーザーは、カテゴリ、俳優、キーワードで動画を閲覧できます。このアプリケーションは、プレイリストの作成、後で見るために動画を保存し、友達と動画を共有する機能など、さまざまな機能も提供します。",
    separator: "-",
    url: "",
    site_name: "Tonari no Anime Ecchi"
  },
  meta: [
    {
      name: "description",
      content: "%description"
    },
    {
      name: "og:title",
      content: "%name %separator Tonari no Anime Ecchi"
    },
    {
      property: "og:description",
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
</script>
