<template>
  <q-layout view="lHh Lpr lFf">
    <app-header :model-value="!$q.fullscreen.isActive" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
