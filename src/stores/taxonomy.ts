import { getExplorer } from "api/index"
import { get, set } from "idb-keyval"
import { ExpiringLocalStorage } from "logic/expiring-local-storage"
import { defineStore } from "pinia"
import type { Ref } from "vue"

function useStorageContract<T>(
  storage: ExpiringLocalStorage,
  name: string,
  defaultValue: T,
  fn: () => Promise<T>
): Readonly<Ref<T>> {
  return computedAsync(
    async () => {
      const promiseDB = get(name)

      return Promise.race([
        get(name),
        fn().then((data) => {
          const json = JSON.stringify(data)
          void promiseDB
            // eslint-disable-next-line promise/no-nesting
            .catch(() => null)
            .then((inDB) => {
              // eslint-disable-next-line promise/always-return
              if (inDB !== json) void set(name, json)
            })

          return data
        })
      ])
    },
    defaultValue,
    { onError: WARN }
  )
}

export const useTaxonomyStore = defineStore("taxonomy", () => {
  const storage = new ExpiringLocalStorage(localStorage, 60 * 24 * 30)

  const categories = useStorageContract(storage, "category", [], () =>
    getExplorer("category")
  )
  const series = useStorageContract(storage, "series", [], () =>
    getExplorer("series")
  )
  const studios = useStorageContract(storage, "studios", [], () =>
    getExplorer("studio")
  )
  const releaseYears = useStorageContract(storage, "releaseYears", [], () =>
    getExplorer("release_year")
  )

  return { categories, series, studios, releaseYears }
})
