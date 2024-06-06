import { defineStore } from "pinia"

export const useHistoryStore = defineStore("history", () => {
  async function queryPage(page: number, pagesize: number) {
    return supabase.rpc("get_watch_history", { page, pagesize }).throwOnError()
  }

  return { queryPage }
})
