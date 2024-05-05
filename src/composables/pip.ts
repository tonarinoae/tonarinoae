import type { MaybeRef } from "@vueuse/core"

export function usePip(videoRef: MaybeRef<HTMLVideoElement|undefined>) {
  if (!isRef(videoRef)) videoRef = ref(videoRef)

  const state = ref(false)
  const support = ref("exitPictureInPicture" in document)
  const enabled  = ref(support.value && (document.pictureInPictureEnabled ?? false))

  watchImmediate(videoRef, (video) => {
    state.value = document.pictureInPictureElement === video
  })

  useEventListener(videoRef, "enterpictureinpicture", () => {
    state.value = true
  })
  useEventListener(videoRef, "leavepictureinpicture", () => {
    state.value = false
  })

  const stateOut = computed({
    get: () => state.value,
    set: (val) => {
      if (val) {
        void videoRef.value?.requestPictureInPicture()
      } else {
        void document.exitPictureInPicture()
      }
    }
  })

  return {
    enabled,
    support,
    state: stateOut,
  }
}
