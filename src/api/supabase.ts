import type { Video } from "api/index"

const hentaiMetaSaved = new Set<number>()
export async function upsertHentaiMeta(video: Video) {
  if (hentaiMetaSaved.has(video.id)) return

  await supabase
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

  hentaiMetaSaved.add(video.id)
}

export async function insertHentaiHistory(video: Video) {
  return supabase
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
  return supabase
    .rpc("save_watch_progress", {
      _hentai_id: video.id,
      _cur,
      _dur
    })
    .throwOnError()
}

export async function getProgressHentai(video: Video) {
  return supabase
    .from("watch_progress")
    .select("cur, dur")
    .eq("hentai_id", video.id)
    .single()
    .throwOnError()
}

export async function getProgressHentaiList(video: Video[]) {
  return supabase
    .from("watch_progress")
    .select("cur, dur")
    .in(
      "hentai_id",
      video.map((item) => item.id)
    )
    .throwOnError()
}
