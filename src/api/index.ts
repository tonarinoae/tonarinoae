// import { Http } from "client-ext-animevsub-helper"

import type { LocationQueryValue, RouteLocationNormalized } from "vue-router"

function fetchPolyfill(
  url: string,
  body?: URLSearchParams | string,
  signal?: AbortSignal
) {
  return fetch(url, {
    body,
    signal,
    method: body ? "post" : "get"
  })
  // return Http[body ? "post" : "get"]({ url, data: body?.toString() }).then(
  //   (res) => {
  //     return {
  //       json: () => JSON.parse(res.data as string)
  //     }
  //   }
  // )
}

export interface StreamInfo {
  hls: { html: "Master"; url: string }[]
  id: string
  mp4: string[]
  player: number // 1
  playerLogo: string
  playerLogoLink: string
  platerLogoPosition: string // top-right
  playerThumbnail: string
  playerTvc: string
  playerTvcLink: string
  playerTvcPlaySeconds: number // 5
  title: string
}
export function getStreamInfo(hash: string): Promise<StreamInfo> {
  return fetchPolyfill(`https://ipa.sonar-cdn.com/play/${hash}`).then((res) =>
    res.json()
  )
}

export interface Genre {
  id: number
  name: string
  slug: string
  thumbnail: string
  taxonomy: "category"
  description: string
  count: number
}
export interface Tag {
  id: number
  name: string
  slug: string
  thumbnail: string
  taxonomy: string
  description: string
  count: number
}
export interface Studio {
  id: number
  name: string
  slug: string
  thumbnail: string
  taxonomy: string
  description: string
  count: number
}
export interface Series {
  id: number
  name: string
  slug: string
  thumbnail: string
  taxonomy: string
  description: string
  count: number
}
export interface ReleaseYear {
  id: number
  name: string
  slug: string
  thumbnail: string
  taxonomy: string
  description: string
  count: number
}
export interface Video {
  id: number
  title: string
  slug: string
  synopsis: string
  createdAt: string
  updatedAt: string
  url: string
  commentUrl: string
  genres: Genre[]
  tags: Tag[]
  studios: Studio[]
  series?: Series
  releaseYear: ReleaseYear
  views: number
  likes: number
  dislikes: number
  alternativeTitles: string[]
  thumbnail: string
  poster: string
  notes: string
  censorship: string
  category: string
  languages: string[]
  isTrailer: boolean
  isPopular: null
  links: string[]
}
export interface Watch {
  video: Video
  sections: {
    title: string
    to: RouteLocationNormalized
    // eslint-disable-next-line no-use-before-define
    term?: Term
    videos: Video[]
  }[]
}
export function getWatch(slug: string, signal: AbortSignal): Promise<Watch> {
  return fetchPolyfill(`${API_URL}/watch?slug=${slug}`, undefined, signal).then(
    (res) => res.json()
  )
}

export function markView(slug: string): Promise<boolean> {
  return fetchPolyfill(`${API_URL}/views`, new URLSearchParams({ slug }))
    .then((res) => res.json())
    .then((res) => res.success)
}

export interface Term {
  count: number
  description: string
  id: number
  name: string
  slug: string
  taxonomy: string
  thumbnail: string
}
export function getTerm(taxonomy: string, slug: string): Promise<Term> {
  return fetchPolyfill(
    `${API_URL}/term?${new URLSearchParams({ taxonomy, slug })}`
  ).then((res) => res.json())
}

export interface Episode {
  id: number
  title: string
  slug: string
  synopsis: string
  createdAt: string
  updatedAt: string
  url: string
  commentUrl: string
  genres: Genre[]
  tags: Tag[]
  studios: Studio[]
  series: Series
  releaseYear: ReleaseYear
  views: number
  likes: number
  dislikes: number
  alternativeTitles: string[]
  thumbnail: string
  notes: string
  censorship: string
  category: string
  languages: string[]
  isTrailer: boolean
  isPopular: boolean
  links: string[]
}

export interface Search {
  count: number
  videos: Video[]
}

/**
 * @description - Example get hot videos:
 * page: 1
 *
 * limit: 24
 *
 * orderby: meta_value_num
 *
 * order: desc
 *
 * s:
 *
 * metaKey: x_post_views_count
 *
 */
export function getSearch(
  page: number,
  limit: number,
  orderby: "date" | "meta_value_num",
  order: "desc",
  metaKey: string,
  options: { s: string }
): Promise<Search>
// eslint-disable-next-line no-redeclare
export function getSearch(
  page: number,
  limit: number,
  orderby: "date" | "meta_value_num",
  order: "desc",
  metaKey: string,
  options:
    | {
        studios: LocationQueryValue | LocationQueryValue[]
        tags: LocationQueryValue | LocationQueryValue[]
        years: LocationQueryValue | LocationQueryValue[]
        genres: LocationQueryValue | LocationQueryValue[]
        series: LocationQueryValue | LocationQueryValue[]
        s?: string
      }
    | { tags: LocationQueryValue | LocationQueryValue[] },
  searchBy?: "slug"
): Promise<Search>
// eslint-disable-next-line no-redeclare
export function getSearch(
  page: number,
  limit: number,
  orderby: "date" | "meta_value_num",
  order: "desc",
  metaKey: string,
  options:
    | {
        studios: LocationQueryValue | LocationQueryValue[]
        tags: LocationQueryValue | LocationQueryValue[]
        years: LocationQueryValue | LocationQueryValue[]
        genres: LocationQueryValue | LocationQueryValue[]
        series: LocationQueryValue | LocationQueryValue[]
      }
    | { tags: LocationQueryValue | LocationQueryValue[] }
    | { s: string },
  searchBy?: "slug"
): Promise<Search> {
  return fetchPolyfill(
    `${API_URL}/search?${new URLSearchParams({
      page: page + "",
      limit: limit + "",
      orderby: orderby as string,
      order: order as string,
      metaKey,
      ...(options as Record<string, string>),
      searchBy: (searchBy as string) ?? ""
    })}`
  ).then((res) => res.json())
}

export interface Explorer extends Array<Term> {}
export interface Categories
  extends Array<
    Omit<Term, "taxonomy"> & {
      taxonomy: "category"
    }
  > {}
export interface Seriess
  extends Array<
    Omit<Term, "taxonomy"> & {
      taxonomy: "series"
    }
  > {}
export interface Studios
  extends Array<
    Omit<Term, "taxonomy"> & {
      taxonomy: "studio"
    }
  > {}
export interface ReleaseYears
  extends Array<
    Omit<Term, "taxonomy"> & {
      taxonomy: "release_year"
    }
  > {}

export interface Taxonomies {
  category: Categories
  series: Seriess
  studio: Studios
  release_year: ReleaseYears
}
export function getExplorer<Taxonomy extends keyof Taxonomies>(
  taxonomy: Taxonomy
): Promise<Taxonomies[Taxonomy]> {
  return fetchPolyfill(`${API_URL}/terms?taxonomy=${taxonomy}`).then((res) =>
    res.json()
  )
}

export function getPostQuery(
  page: number,
  limit: number,
  metaQuery: { key: string; value: string }[],
  options:
    | {
        studios: LocationQueryValue | LocationQueryValue[]
        tags: LocationQueryValue | LocationQueryValue[]
        years: LocationQueryValue | LocationQueryValue[]
        series: LocationQueryValue | LocationQueryValue[]
        genres: LocationQueryValue | LocationQueryValue[]
      }
    | { tags: LocationQueryValue | LocationQueryValue[] },
  orderby: "date",
  order: "desc"
): Promise<Search> {
  return fetchPolyfill(
    `${API_URL}/post-query`,
    JSON.stringify({
      limit,
      metaQuery,
      order,
      orderby,
      page: page + "",
      years: 2023,
      ...options
    })
  ).then((res) => res.json())
}

export function gacha(limit: number): Promise<Video[]> {
  return fetchPolyfill(
    `${API_URL}/gacha?${new URLSearchParams({
      limit: limit + "",
      t: Date.now() + ""
    })}`
  ).then((res) => res.json())
}

export interface Home {
  sections: Watch["sections"]
}
export function home(): Promise<Home> {
  return fetchPolyfill(`${API_URL}/home`).then((res) => res.json())
}
