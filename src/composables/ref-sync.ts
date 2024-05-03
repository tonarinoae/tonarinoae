export function refSync<T>(action: (state: T) => boolean, defaultValue?: T) {
  const state = ref<T>(defaultValue)

  return {
    raw: state,
    ref: computed<T>({
      get: () => state.value,
      set: (val) => {
        if (action(val)) {
          state.value = val
        }
      }
    })
  }
}
