<template>
  <q-btn
    no-caps
    rounded
    unelevated
    class="bg-[rgba(113,113,113,0.3)] mr-4 text-weight-normal"
    @click="setFollowed(!followed)"
  >
    <i-material-symbols-bookmark-added-rounded
      v-if="followed"
      class="size-28px"
    />
    <i-material-symbols-bookmark-add-outline-rounded v-else class="size-28px" />
    <span class="text-[14px] font-weight-normal ml-1">{{
      followed ? "Bỏ theo" : "Theo dõi"
    }}</span>
  </q-btn>
</template>

<script lang="ts" setup>
import { getHentaiFollowed, updateHentaiFollowed } from "api/supabase"
const props = defineProps<{
  video: Video
}>()

const followed = ref(false)
watchEffect(async () => {
  followed.value = (await getHentaiFollowed(props.video)).data
})

async function setFollowed(value: boolean) {
  followed.value = value
  await updateHentaiFollowed(props.video, value)
}
</script>
