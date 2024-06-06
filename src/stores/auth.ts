import {
  AuthError,
  type AuthResponse,
  type OAuthResponse,
  type Session
} from "@supabase/supabase-js"
import { defineStore } from "pinia"

function openCenteredPopup(url: string, title: string, w: number, h: number) {
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height

  const systemZoom = width / window.screen.availWidth
  const left = (width - w) / 2 / systemZoom + dualScreenLeft
  const top = (height - h) / 2 / systemZoom + dualScreenTop

  const popup = window.open(
    url,
    title,
    `target=_blank,popup=yes,toolbar=0,menubar=0,location=0,width=${
      w / systemZoom
    },height=${h / systemZoom},top=${top},left=${left}`
  )

  if (document.hasFocus()) popup?.focus()

  return popup
}

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter()

  async function signInOAuth2(
    provider: "google" | "twitter"
  ): Promise<OAuthResponse | AuthResponse> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: new URL(
            router.resolve({ name: "oauth2" }).fullPath,
            location.toString()
          ).href,
          skipBrowserRedirect: true
        }
      })

      if (error) return resolve({ data, error })

      const popup = openCenteredPopup(
        data.url!,
        `Login with OAuth 2 ${data.provider}`,
        600,
        700
      )
      const handler = async (
        event: MessageEvent<{
          type: "popup:oauth->authorized"
          refresh_token: string
        }>
      ) => {
        console.log(event)
        if (event.data?.type === "popup:oauth->authorized") {
          clean()

          const session = await supabase.auth.getSession()
          const user = await supabase.auth.getUser()

          if (session.data)
            resolve({
              data: {
                session: session.data.session,
                user: user.data.user
              },
              error: null
            })
          else
            resolve({
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data: null as unknown as any,
              error: new AuthError("Unknown error", 210)
            })

          popup?.postMessage("close")
        }
      }
      const popupTick = setInterval(() => {
        if (!popup || popup.closed) {
          clean()
          resolve({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: null as unknown as any,
            error: new AuthError("Login OAuth canceled by user.", 209)
            //   name: "canceled_by_user",
            //   __isError: true,
            // }
          })
        }
      }, 500)
      const clean = () => {
        window.removeEventListener("message", handler)
        clearInterval(popupTick)
        popup?.close()
      }

      window.addEventListener("message", handler)
    })
  }

  async function signUp(email: string, password: string) {
    return supabase.auth.signUp({ email, password })
  }

  async function signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password })
  }

  async function signOut() {
    return supabase.auth.signOut()
  }

  const session = shallowRef<Session | null>(null)

  const setup = ref<Promise<void>>()
  setup.value = supabase.auth
    .getSession()
    // eslint-disable-next-line no-void
    .then((res) => void (session.value = res.data.session))
    .finally(() => {
      setup.value = undefined
    })
  supabase.auth.onAuthStateChange((event, ses) => {
    session.value = ses
  })

  const isLogged = computed(
    () => setup.value === undefined && session.value !== null
  )
  const user = computed(() => session.value?.user)
  const profile = computedAsync(
    async () => {
      if (!user.value) return null

      return await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.value.id)
        .single()
        .throwOnError()
    },
    undefined,
    { onError: WARN }
  )

  watch([user, profile], ([user, profile]) => {
    if (user) {
      void FirebaseAnalytics.setUserId({
        userId: user.id
      })
      void FirebaseAnalytics.setUserProperty({
        name: "email",
        value: user.email ?? ""
      })
    } else {
      // void FirebaseAnalytics.setUserId({
      //   userId: ""
      // })
      // void FirebaseAnalytics.setUserProperty({
      //   name: "email",
      //   value: ""
      // })
    }

    if (profile?.data) {
      void FirebaseAnalytics.setUserProperty({
        name: "first_name",
        value: profile.data.first_name
      })
      void FirebaseAnalytics.setUserProperty({
        name: "last_name",
        value: profile.data.last_name
      })
    } else {
      void FirebaseAnalytics.setUserProperty({
        name: "first_name",
        value: ""
      })
      void FirebaseAnalytics.setUserProperty({
        name: "last_name",
        value: ""
      })
    }
  })

  return {
    setup,
    session,
    isLogged,
    user,
    profile,
    signInOAuth2,
    signIn,
    signUp,
    signOut
  }
})
