<template>
  <q-layout view="lHh Lpr lFf">
    <app-header
      :model-value="!$q.fullscreen.isActive"
      @click:menu="showDivider = true"
    />
    <app-divider v-model="showDivider" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
const showDivider = ref(false)
</script>
