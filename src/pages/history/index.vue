<route lang="yaml">
name: history
</route>

<template>history</template>

<script lang="ts" setup>
const route = useRoute()

useHead({
  templateParams: {
    name: "Phim bạn đã xem trên Tonarinoae",
    description:
      "Tổng hợp phim đã xem tại %site_name, web xem phim sex hoạt hình anime hentai vietsub miễn phí chất lượng cao lớn nhất VN.",
    url: () => route.fullPath
  }
})
watch(
  () => route.query.page,
  (page) => {
    if (!page) return

    void FirebaseAnalytics.logEvent({
      name: "history",
      params: {
        page
      }
    })
  }
)
</script>
