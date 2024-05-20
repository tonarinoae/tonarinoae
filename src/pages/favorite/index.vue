<route lang="yaml">
name: favorite
</route>

<template>favorite</template>

<script lang="ts" setup>
const route = useRoute()

useHead({
  templateParams: {
    name: "Phim bạn đã lưu trên Tonarinoae",
    description:
      "Tổng hợp phim đã lưu tại %site_name, web xem phim sex hoạt hình anime hentai vietsub miễn phí chất lượng cao lớn nhất VN.",
    url: () => route.fullPath
  }
})
watch(
  () => route.query.page,
  (page) => {
    if (!page) return

    void FirebaseAnalytics.logEvent({
      name: "favorite",
      params: {
        page
      }
    })
  }
)
</script>
