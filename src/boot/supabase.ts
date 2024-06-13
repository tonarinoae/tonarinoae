import { createClient } from "@supabase/supabase-js"
import type { Database } from "database"

export const supabase = createClient<Database>(
  import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL,
  import.meta.env.SUPABASE_KEY || process.env.SUPABASE_KEY
)
