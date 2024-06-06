import { computedAsync } from "@vueuse/core"
import type { Video } from "api/index"
import { getProgressHentaiList } from "api/supabase"

export function usePWatchVideos(
  videos: () => Video[],
  masterSignal: Ref<AbortSignal>
) {
  return computedAsync<null | Map<
    number,
    {
      id: number
      cur: number 
      dur: number 
    }
  >>(
    async () => {
      const items = videos()

      if (items.length === 0) return new Map()

      const { data } = await getProgressHentaiList(items, masterSignal.value)

      return new Map(data?.map((meta) => [meta.id, meta]))
    },
    null,
    {
      onError: WARN
    }
  )
}
