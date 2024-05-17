<template>
  <q-btn round avatar>
    <q-avatar size="35px">
      <q-img v-if="avatarUrl" no-spinner :src="avatarUrl" />
      <i-solar-user-circle-bold-duotone v-else class="size-35px" />
    </q-avatar>

    <q-menu class="!bg-dark py-1 px-2 rounded-lg shadow-none !max-h-80vh">
      <q-list class="transparent">
        <q-item
          v-if="authStore.isLogged"
          clickable
          :to="{ name: 'profile' }"
          class="rounded-xl"
        >
          <q-item-section avatar>
            <q-avatar size="45px">
              <q-img v-if="avatarUrl" no-spinner :src="avatarUrl" />
              <i-solar-user-circle-bold-duotone v-else class="size-45px" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="whitespace-nowrap">{{ name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-else clickable @click="showPopup = true" class="rounded-xl">
          <q-item-section avatar>
            <q-avatar size="45px">
              <i-solar-user-circle-bold-duotone class="size-45px" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="whitespace-nowrap"
              >Đăng nhập / Đăng ký</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-separator />

        <template v-for="item in userMenus" :key="item.name">
          <q-separator v-if="'divider' in item" />
          <q-item
            v-else-if="item.reqAuth ? authStore.isLogged : true"
            :href="item.href"
            :to="item.to"
            clickable
            @click="item.onClick"
            class="rounded-xl"
          >
            <q-item-section avatar class="min-w-0">
              <Component :is="item.icon" class="size-25px" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-menu>
  </q-btn>

  <dialog-signin v-model="showPopup" />
</template>

<script lang="ts" setup>
import feedback from "~icons/fluent/person-feedback-24-regular"
import disscution from "~icons/fluent/plug-disconnected-24-regular"
import translate from "~icons/fluent/translate-24-regular"
import sponsor from "~icons/octicon/sponsor-tiers-24"
import code from "~icons/solar/code-bold-duotone"
import info from "~icons/solar/info-circle-line-duotone"
import exit from "~icons/solar/logout-2-line-duotone"
import setting from "~icons/solar/settings-line-duotone"

const authStore = useAuthStore()

const avatarUrl = computed(() => authStore.session?.user.user_metadata?.picture)
const name = computed(
  () => authStore.user?.user_metadata.full_name ?? "Anonymous"
)

const userMenus = [
  {
    icon: info,
    name: "Trung tâm cá nhân",
    to: { name: "profile" },
    reqAuth: true
  },
  {
    icon: translate,
    name: "Ngôn ngữ"
  },
  {
    icon: setting,
    name: "Cài đặt chung"
  },
  { divider: true },
  {
    icon: code,
    name: "Mã nguồn mở trên GitHub",
    href: "https://github.com/tonarinoae/tonarinoae"
  },
  {
    icon: feedback,
    name: "Phản hồi hoặc báo lỗi",
    href: "https://github.com/tonarinoae/tonarinoae/issues"
  },
  {
    icon: disscution,
    name: "Thảo luận",
    href: "https://github.com/tonarinoae/tonarinoae/discussions"
  },
  {
    icon: sponsor,
    name: "Tài trợ / Ủng hộ",
    href: "https://anime-vsub.github.io/about/sponsors"
  },
  {
    icon: exit,
    name: "Đăng xuất",
    onClick: () => authStore.signOut(),
    reqAuth: true
  }
]

const showPopup = ref(false)
</script>
