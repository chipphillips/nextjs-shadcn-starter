export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface AIPreferences {
  id: string;
  user_id: string;
  communication_style: 'formal' | 'casual' | 'technical';
  technical_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  learning_style: 'detailed' | 'concise' | 'bullet-points';
  code_examples_format: 'typescript' | 'javascript' | 'python' | 'mixed';
  special_instructions?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectHistory {
  id: string;
  user_id: string;
  project_name: string;
  description?: string;
  role: string;
  technologies: string[];
  start_date: string;
  end_date?: string;
  performance_metrics?: Json;
  ai_interactions_summary?: string;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
      }
      ai_preferences: {
        Row: AIPreferences
        Insert: Omit<AIPreferences, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<AIPreferences, 'id' | 'created_at' | 'updated_at'>>
      }
      project_history: {
        Row: ProjectHistory
        Insert: Omit<ProjectHistory, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ProjectHistory, 'id' | 'created_at' | 'updated_at'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}