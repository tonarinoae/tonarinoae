import { AppFullscreen } from "quasar"

export function useFullscreen() {
  return computed({
    get: () => AppFullscreen.isActive,
    set: (val) => {
      if (val) void AppFullscreen.request()
      else void AppFullscreen.exit()
    }
  })
}
