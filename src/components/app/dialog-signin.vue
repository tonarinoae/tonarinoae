<template>
  <q-dialog v-model="modelValue">
    <q-card class="bg-gray-50 dark:bg-gray-900 rounded-lg box-shadow-none">
      <div
        class="flex flex-col items-center justify-center px-6 py-6 min-w-400px lg:py-0"
      >
        <router-link
          to="/"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img class="w-8 h-8 mr-2" src="~assets/app_icon.png" alt="logo" />
          となりのアニメえっち
        </router-link>
        <div class="w-full">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Sign in to your account
            </h1>
            <form @submit.prevent="signIn" class="space-y-4 md:space-y-6">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <input
                  v-model="email"
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  v-model="password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <!-- <div class="flex items-center h-5">
                    <input
                      v-model="remember"
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                      >Remember me</label
                    >
                  </div> -->
                </div>
                <a
                  href="#"
                  class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >Forgot password?</a
                >
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>

              <div class="relative py-2">
                <q-separator />
                <span
                  class="absolute top-1/2 left-1/2 translate--1/2 bg-gray-50 dark:bg-gray-900 px-3"
                  >or</span
                >
              </div>

              <div class="flex items-center justify-around">
                <q-btn
                  no-caps
                  unelevated
                  class="bg-gray-800 py-1 mr-1"
                  rounded
                  @click="authStore.signInOAuth2('google')"
                >
                  <i-logos-google-icon class="size-2em mr-1" />
                  Sign in with Google
                </q-btn>
                <q-btn
                  no-caps
                  unelevated
                  class="bg-gray-800 py-1 ml-1"
                  rounded
                  @click="authStore.signInOAuth2('twitter')"
                >
                  <i-logos-twitter class="size-2em mr-1" />
                  Sign in with Twttier
                </q-btn>
              </div>

              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <a
                  href="#"
                  class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >Sign up</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
const $q = useQuasar()

const authStore = useAuthStore()

const modelValue = defineModel<boolean>("modelValue", { required: true })

const email = ref("")
const password = ref("")

async function signIn() {
  $q.loading.show()

  try {
    const data = await authStore.signIn(email.value, password.value)

    if (data.error) throw data.error

    $q.notify({ message: "Đã đăng nhập với tư cách " + data.data.user.email })

    modelValue.value = false
  } catch (err) {
    $q.notify({ message: "Đã xảy ra lỗi khi đăng nhập", caption: err + "" })
  } finally {
    $q.loading.hide()
  }
}
</script>
