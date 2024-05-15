import { createClient } from "@supabase/supabase-js"
import type { Database } from "database"

export const db = createClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
