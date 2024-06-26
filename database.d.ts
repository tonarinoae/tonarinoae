export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      hentai_follow: {
        Row: {
          created_at: string
          hentai_id: number
          id: number
          user_id: string
          value: boolean
        }
        Insert: {
          created_at?: string
          hentai_id: number
          id?: number
          user_id: string
          value: boolean
        }
        Update: {
          created_at?: string
          hentai_id?: number
          id?: number
          user_id?: string
          value?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "hentai_follow_hentai_id_fkey"
            columns: ["hentai_id"]
            isOneToOne: false
            referencedRelation: "hentai_meta"
            referencedColumns: ["raw_id"]
          },
          {
            foreignKeyName: "hentai_follow_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      hentai_meta: {
        Row: {
          alternative_titles: string[]
          category: string
          censorship: string
          id: number
          notes: string
          poster: string
          raw_id: number
          slug: string
          synopsis: string
          thumbnail: string
          title: string
        }
        Insert: {
          alternative_titles: string[]
          category: string
          censorship: string
          id?: number
          notes: string
          poster: string
          raw_id: number
          slug: string
          synopsis: string
          thumbnail: string
          title: string
        }
        Update: {
          alternative_titles?: string[]
          category?: string
          censorship?: string
          id?: number
          notes?: string
          poster?: string
          raw_id?: number
          slug?: string
          synopsis?: string
          thumbnail?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          first_name: string
          id: string
          last_name: string
        }
        Insert: {
          first_name?: string
          id: string
          last_name?: string
        }
        Update: {
          first_name?: string
          id?: string
          last_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      watch_history: {
        Row: {
          hentai_id: number
          id: number
          user_id: string
          watched_at: string
        }
        Insert: {
          hentai_id: number
          id?: number
          user_id: string
          watched_at?: string
        }
        Update: {
          hentai_id?: number
          id?: number
          user_id?: string
          watched_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "watch_history_hentai_id_fkey"
            columns: ["hentai_id"]
            isOneToOne: false
            referencedRelation: "hentai_meta"
            referencedColumns: ["raw_id"]
          },
          {
            foreignKeyName: "watch_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      watch_progress: {
        Row: {
          cur: number | null
          dur: number | null
          finished_at: string | null
          hentai_id: number
          id: number
          started_at: string
          user_id: string
        }
        Insert: {
          cur?: number | null
          dur?: number | null
          finished_at?: string | null
          hentai_id: number
          id?: number
          started_at?: string
          user_id: string
        }
        Update: {
          cur?: number | null
          dur?: number | null
          finished_at?: string | null
          hentai_id?: number
          id?: number
          started_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "watch_progress_hentai_id_fkey"
            columns: ["hentai_id"]
            isOneToOne: false
            referencedRelation: "hentai_meta"
            referencedColumns: ["raw_id"]
          },
          {
            foreignKeyName: "watch_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_hentai_follow: {
        Args: {
          _hentai_id: number
        }
        Returns: boolean
      }
      emit_watch_history: {
        Args: {
          _hentai_id: number
        }
        Returns: undefined
      }
      get_hentai_follow: {
        Args: {
          page: number
          pagesize: number
        }
        Returns: {
          created_at: string
          title: string
          slug: string
          synopsis: string
          alternative_titles: string[]
          thumbnail: string
          poster: string
          notes: string
          censorship: string
          category: string
          started_at: string
          finished_at: string
          cur: number
          dur: number
        }[]
      }
      get_watch_history: {
        Args: {
          page: number
          pagesize: number
        }
        Returns: {
          watched_at: string
          title: string
          slug: string
          synopsis: string
          alternative_titles: string[]
          thumbnail: string
          poster: string
          notes: string
          censorship: string
          category: string
          started_at: string
          finished_at: string
          cur: number
          dur: number
        }[]
      }
      save_watch_progress: {
        Args: {
          _hentai_id: number
          _cur: number
          _dur: number
        }
        Returns: undefined
      }
      toggle_hentai_follow: {
        Args: {
          _hentai_id: number
          value: boolean
        }
        Returns: undefined
      }
      upsert_hentai_meta: {
        Args: {
          _raw_id: number
          _title: string
          _slug: string
          _synopsis: string
          _alternative_titles: string[]
          _thumbnail: string
          _poster: string
          _notes: string
          _censorship: string
          _category: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
