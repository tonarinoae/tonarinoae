<template>
  <router-link
    class="block relative"
    :class="{
      '!flex flex-nowrap': horizontal
    }"
  >
    <div
      :class="{
        'min-w-0 w-40% max-w-250px col-5 col-sm-4 col-md-3 col-lg-2 col-xl-4':
          horizontal
      }"
    >
      <q-responsive :ratio="480 / 300" class="rounded-md">
        <q-skeleton type="rect" class="absolute w-full h-full" />
      </q-responsive>
    </div>

    <div
      class="mt-1"
      :class="{
        'pl-2 min-w-0 flex-1 w-full': horizontal
      }"
    >
      <q-skeleton type="text" width="60%" class="text-16px" />
      <q-skeleton type="text" width="100px" height="15px" />
    </div>
  </router-link>
</template>

<script lang="ts" setup>
const props = defineProps<{
  horizontal?: boolean
}>()
</script>
