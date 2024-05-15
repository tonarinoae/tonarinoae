import type { LocationQueryValue } from "vue-router"

interface TaxonomyItem {
  id: number
  name: string
}

interface Route {
  query: Record<string, LocationQueryValue | LocationQueryValue[]>
}

const queryKeys = ["genres", "studios", "tags", "series", "years"] as const
const queryTexts = ["thể loại", "studio", "tag", "series", "năm"]
const taxonomyKeys = [
  "categories",
  "studios",
  "series",
  "series",
  "releaseYears"
] as const

export function describeQueries(
  route: Route,
  taxonomyStore: ReturnType<typeof useTaxonomyStore>
): string {
  let description = ""

  for (let i = 0; i < queryKeys.length; i++) {
    const queryKey = queryKeys[i]
    const taxonomyKey = taxonomyKeys[i]

    const ids = Array.isArray(route.query[queryKey])
      ? (route.query[queryKey] as string[])
      : [route.query[queryKey] as string]

    const names = ids
      .map(
        (id) =>
          taxonomyStore[taxonomyKey].find(
            (item: TaxonomyItem) => item.id === Number(id)
          )?.name
      )
      .filter(Boolean)

    if (names.length > 0) description += `${queryTexts[i]} ${names.join(", ")} `
  }

  return description
}
