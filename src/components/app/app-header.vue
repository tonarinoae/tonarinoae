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
        <q-toolbar-title>iHentai</q-toolbar-title>
      </router-link>

      <q-space />
      <app-search />
      <q-space />

      <div>Quasar v{{ $q.version }}</div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (name: "click:menu"): void
}>()
</script>

<style lang="scss" scoped>
.notify {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.22s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  &-leave-active {
    position: absolute;
  }
}
</style>

<style lang="scss" scoped>
.login-input :deep(.q-field__native) {
  background-color: transparent !important;

  &,
  &:focus,
  &:focus-visible {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
}
.login-input :deep(.q-field__control),
.login-input :deep(.q-field__append) {
  height: 45px !important;
}
</style>

<style lang="scss" scoped>
.hidden-focus-helper :deep(.q-focus-helper) {
  display: none !important;
}
</style>
