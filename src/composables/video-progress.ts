export function useVideoProgress() {
  const loaded = ref(0)

  function onProgress(event: Event) {
    const target = event.target as HTMLVideoElement

    let range = 0
    const bf = target.buffered
    const time = target.currentTime

    try {
      while (!(bf.start(range) <= time && time <= bf.end(range))) {
        range += 1
      }
      // const loadStartPercentage = bf.start(range) / target.duration
      const loadEndPercentage = bf.end(range) / target.duration
      // const loadPercentage = loadEndPercentage - loadStartPercentage

      loaded.value = loadEndPercentage
    } catch {
      try {
        loaded.value = bf.end(0) / target.duration
      } catch {}
    }
  }

  return { onProgress, loaded }
}
