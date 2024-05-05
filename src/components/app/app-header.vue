<template>
  <q-header class="!bg-[var(--q-dark-page)] py-1 px-2">
    <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          class="mr-5"
        />

        <router-link to="/" class="flex flex-nowrap items-end">
          <img src="~assets/app_icon.svg" width="35" height="35" />
          <span style="font-family: Caveat" class="text-[25px]">nimeVsub</span>
        </router-link>


      <q-toolbar-title> Quasar App </q-toolbar-title>

      <div>Quasar v{{ $q.version }}</div>
    </q-toolbar>
  </q-header>
</template>
