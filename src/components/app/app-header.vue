<template>
  <q-header class="!bg-[var(--q-dark-page)] py-1 px-2">
    <q-toolbar>
      <q-btn
        dense
        flat
        round
        icon="menu"
        class="mr-5"
        @click="emit('click:menu')"
      />

      <router-link to="/" class="flex flex-nowrap items-end">
        <img
          src="~assets/app_icon.png"
          width="35"
          height="35"
          class="hover:scale-110 hover:transition-transform"
        />
        <q-toolbar-title class="font-family-Atma">{{
          true ? "tonari no anime ecchi" : "となりのアニメえっち"
        }}</q-toolbar-title>
      </router-link>

      <q-space />
      <app-search />
      <q-space />

      <div>
        <btn-favorite class="mr-1" />
        <btn-history class="mr-1" />
        <btn-user />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import "@fontsource/atma"

const emit = defineEmits<{
  (name: "click:menu"): void
}>()
</script>
