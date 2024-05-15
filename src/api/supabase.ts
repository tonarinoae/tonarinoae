import type { Video } from "api/index"

const hentaiMetaSaved = new Set<string>()
export async function upsertHentaiMeta(video: Video) {
  if (hentaiMetaSaved.has(video.slug)) return

  await db
    .rpc("upsert_hentai_meta", {
      _raw_id: video.id,
      _alternative_titles: video.alternativeTitles,
      _category: video.category,
      _censorship: video.censorship,
      _notes: video.notes,
      _poster: video.poster,
      _slug: video.slug,
      _synopsis: video.synopsis,
      _thumbnail: video.thumbnail,
      _title: video.title
    })
    .throwOnError()

  hentaiMetaSaved.add(video.slug)
}

export async function insertHentaiHistory(video: Video) {
  return db
    .rpc("emit_watch_history", {
      _hentai_id: video.id
    })
    .throwOnError()
}

export async function insertHentaiProgress(
  video: Video,
  _cur: number,
  _dur: number
) {
  return db
    .rpc("save_watch_progress", {
      _hentai_id: video.id,
      _cur,
      _dur
    })
    .throwOnError()
}

export async function getHentaiProgress(video: Video) {
  return db
    .from("watch_progress")
    .select("cur, dur")
    .eq("hentai_id", video.id)
    .single()
    .throwOnError()
}
