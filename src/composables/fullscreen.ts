import { AppFullscreen } from "quasar"

export function useFullscreen() {
  return computed({
    get: () => AppFullscreen.isActive,
    set: (val) => {
      if (val) AppFullscreen.request()
      else AppFullscreen.exit()
    }
  })
}
