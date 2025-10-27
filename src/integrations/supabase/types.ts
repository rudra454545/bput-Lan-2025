export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action_type: string
          details: Json | null
          id: string
          performed_by: string | null
          timestamp: string | null
        }
        Insert: {
          action_type: string
          details?: Json | null
          id?: string
          performed_by?: string | null
          timestamp?: string | null
        }
        Update: {
          action_type?: string
          details?: Json | null
          id?: string
          performed_by?: string | null
          timestamp?: string | null
        }
        Relationships: []
      }
      match_scores_br: {
        Row: {
          booyah: number | null
          match_id: string
          match_kills: number | null
          match_number: number
          match_standing_points: number | null
          team_id: string
          total_kills: number | null
          total_points: number | null
          total_standing_points: number | null
          updated_at: string | null
        }
        Insert: {
          booyah?: number | null
          match_id?: string
          match_kills?: number | null
          match_number: number
          match_standing_points?: number | null
          team_id: string
          total_kills?: number | null
          total_points?: number | null
          total_standing_points?: number | null
          updated_at?: string | null
        }
        Update: {
          booyah?: number | null
          match_id?: string
          match_kills?: number | null
          match_number?: number
          match_standing_points?: number | null
          team_id?: string
          total_kills?: number | null
          total_points?: number | null
          total_standing_points?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "match_scores_br_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_id"]
          },
        ]
      }
      match_scores_cs: {
        Row: {
          match_id: string
          match_kills: number | null
          match_standing_points: number | null
          round_number: number
          team_id: string
          total_kills: number | null
          total_points: number | null
          total_standing_points: number | null
          updated_at: string | null
        }
        Insert: {
          match_id?: string
          match_kills?: number | null
          match_standing_points?: number | null
          round_number: number
          team_id: string
          total_kills?: number | null
          total_points?: number | null
          total_standing_points?: number | null
          updated_at?: string | null
        }
        Update: {
          match_id?: string
          match_kills?: number | null
          match_standing_points?: number | null
          round_number?: number
          team_id?: string
          total_kills?: number | null
          total_points?: number | null
          total_standing_points?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "match_scores_cs_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_id"]
          },
        ]
      }
      player_stats_br: {
        Row: {
          id: string
          kills: number | null
          match_number: number
          team_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          kills?: number | null
          match_number: number
          team_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          kills?: number | null
          match_number?: number
          team_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_stats_br_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "player_stats_br_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      player_stats_cs: {
        Row: {
          assists: number | null
          deaths: number | null
          id: string
          kills: number | null
          round_number: number
          team_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assists?: number | null
          deaths?: number | null
          id?: string
          kills?: number | null
          round_number: number
          team_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assists?: number | null
          deaths?: number | null
          id?: string
          kills?: number | null
          round_number?: number
          team_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_stats_cs_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "player_stats_cs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          game_uid: string
          id: string
          in_game_name: string
          is_verified: boolean | null
          phone_number: string
          profile_screenshot_url: string | null
          unique_player_id: string
          university_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          game_uid: string
          id: string
          in_game_name: string
          is_verified?: boolean | null
          phone_number: string
          profile_screenshot_url?: string | null
          unique_player_id: string
          university_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          game_uid?: string
          id?: string
          in_game_name?: string
          is_verified?: boolean | null
          phone_number?: string
          profile_screenshot_url?: string | null
          unique_player_id?: string
          university_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      schedules: {
        Row: {
          created_at: string | null
          date_time: string
          description: string | null
          id: string
          match_number: number
          match_type: Database["public"]["Enums"]["match_mode"]
          status: Database["public"]["Enums"]["match_status"] | null
        }
        Insert: {
          created_at?: string | null
          date_time: string
          description?: string | null
          id?: string
          match_number: number
          match_type: Database["public"]["Enums"]["match_mode"]
          status?: Database["public"]["Enums"]["match_status"] | null
        }
        Update: {
          created_at?: string | null
          date_time?: string
          description?: string | null
          id?: string
          match_number?: number
          match_type?: Database["public"]["Enums"]["match_mode"]
          status?: Database["public"]["Enums"]["match_status"] | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          id: string
          is_igl: boolean | null
          joined_at: string | null
          roles: Database["public"]["Enums"]["app_role"][]
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          is_igl?: boolean | null
          joined_at?: string | null
          roles: Database["public"]["Enums"]["app_role"][]
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          is_igl?: boolean | null
          joined_at?: string | null
          roles?: Database["public"]["Enums"]["app_role"][]
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["team_id"]
          },
          {
            foreignKeyName: "team_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          br_mode: boolean | null
          created_at: string | null
          cs_mode: boolean | null
          igl_user_id: string
          is_verified: boolean | null
          members_count: number | null
          team_id: string
          team_logo_url: string | null
          team_name: string
          unique_team_id: string
          updated_at: string | null
        }
        Insert: {
          br_mode?: boolean | null
          created_at?: string | null
          cs_mode?: boolean | null
          igl_user_id: string
          is_verified?: boolean | null
          members_count?: number | null
          team_id?: string
          team_logo_url?: string | null
          team_name: string
          unique_team_id: string
          updated_at?: string | null
        }
        Update: {
          br_mode?: boolean | null
          created_at?: string | null
          cs_mode?: boolean | null
          igl_user_id?: string
          is_verified?: boolean | null
          members_count?: number | null
          team_id?: string
          team_logo_url?: string | null
          team_name?: string
          unique_team_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_igl_user_id_fkey"
            columns: ["igl_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_unique_player_id: { Args: never; Returns: string }
      generate_unique_team_id: { Args: never; Returns: string }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "rusher" | "flanker" | "bomber" | "supporter"
      match_mode: "BR" | "CS"
      match_status: "scheduled" | "ongoing" | "completed"
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["rusher", "flanker", "bomber", "supporter"],
      match_mode: ["BR", "CS"],
      match_status: ["scheduled", "ongoing", "completed"],
      user_role: ["admin", "user"],
    },
  },
} as const
