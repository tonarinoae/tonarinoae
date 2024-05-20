<route lang="yaml">
name: oauth2
meta:
  hiddenHeader: true
  hiddenFooter: true
  hiddenDrawer: true
  hiddenDrawerScope: true
</route>

<script lang="ts" setup>
import { useEventListener } from "@vueuse/core"

const auth = useAuthStore()

const isPopup = window.opener !== null

watchImmediate(
  () => auth.session,
  (session) => {
    if (session) {
      window.opener?.postMessage({
        type: "popup:oauth->authorized",
        refresh_token: session.refresh_token
      })
    }
  }
)

useEventListener(window, "close", () => window.close?.())


void FirebaseAnalytics.logEvent({
  name: "oauth2",
  params: {}
})
</script>

<template>
  <div class="text-center px-6 pt-10 text-20px">
    <img
      src="~assets/app_icon.png"
      alt="app icon"
      width="60"
      height="60"
      class="rounded-xl bg-white mx-auto"
    />

    <template v-if="!isPopup">
      <div un-pt="2">Đang cấp phép OAuth2</div>

      <div un-flex un-justify-center un-mt="5">
        <q-btn
          rounded
          outline
          class="before:text-#fff before:text-opacity-20 px-4"
          color="sakura3"
          padding="8px 20px"
          no-caps
          to="/"
          label="Trang chính"
        />
      </div>
    </template>
    <template v-else>
      <div un-pt="3">Đang cấp phép OAuth2...</div>

      <div un-flex un-justify-center>
        <q-spinner-dots color="sakura3" size="40px" />
      </div>
    </template>
  </div>
</template>
