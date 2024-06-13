import { defineStore } from "pinia"

export const useFavoriteStore = defineStore("favorite", () => {
  async function queryPage(page: number, pagesize: number) {
    return supabase.rpc("get_hentai_follow", { page, pagesize }).throwOnError()
  }

  return { queryPage }
})
