export function useAbortStore() {
  const stores = new Map<string, AbortController>()

  onBeforeUnmount(() => {
    for (const controller of stores.values()) {
      controller.abort()
    }
    stores.clear()
  })

  function set(name: string, controller: AbortController) {
    stores.get(name)?.abort()
    stores.set(name, controller)

    return controller.signal
  }

  return { set }
}
