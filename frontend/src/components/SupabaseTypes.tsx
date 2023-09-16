export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Row<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertDto<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateDto<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
export type Enum<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

export interface Database {
  public: {
    Tables: {
      Entities: {
        Row: {
          created_at: string
          id: number
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      InputBlocks: {
        Row: {
          attribute: string
          created_at: string
          entity_id: number
          id: number
          image_processor: Database["public"]["Enums"]["processor_type"] | null
          input_type: Database["public"]["Enums"]["input_type"]
          mcq_options: string[] | null
          outgoing_type: Database["public"]["Enums"]["data_type"]
          title: string
          user_id: string
        }
        Insert: {
          attribute: string
          created_at?: string
          entity_id: number
          id?: number
          image_processor?: Database["public"]["Enums"]["processor_type"] | null
          input_type: Database["public"]["Enums"]["input_type"]
          mcq_options?: string[] | null
          outgoing_type: Database["public"]["Enums"]["data_type"]
          title: string
          user_id?: string
        }
        Update: {
          attribute?: string
          created_at?: string
          entity_id?: number
          id?: number
          image_processor?: Database["public"]["Enums"]["processor_type"] | null
          input_type?: Database["public"]["Enums"]["input_type"]
          mcq_options?: string[] | null
          outgoing_type?: Database["public"]["Enums"]["data_type"]
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      OutputBlocks: {
        Row: {
          attribute: string | null
          created_at: string
          email: string | null
          email_subject: string | null
          entity_id: number
          gsheet_url: string | null
          id: number
          incoming_type: Database["public"]["Enums"]["data_type"]
          output_type: Database["public"]["Enums"]["output_type"]
          phone_number: string | null
          text_content: string | null
          title: string
          user_id: string
        }
        Insert: {
          attribute?: string | null
          created_at?: string
          email?: string | null
          email_subject?: string | null
          entity_id: number
          gsheet_url?: string | null
          id?: number
          incoming_type: Database["public"]["Enums"]["data_type"]
          output_type: Database["public"]["Enums"]["output_type"]
          phone_number?: string | null
          text_content?: string | null
          title: string
          user_id?: string
        }
        Update: {
          attribute?: string | null
          created_at?: string
          email?: string | null
          email_subject?: string | null
          entity_id?: number
          gsheet_url?: string | null
          id?: number
          incoming_type?: Database["public"]["Enums"]["data_type"]
          output_type?: Database["public"]["Enums"]["output_type"]
          phone_number?: string | null
          text_content?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      ProcessorBlocks: {
        Row: {
          attribute: string
          created_at: string
          entity_id: number
          id: number
          incoming_type: Database["public"]["Enums"]["data_type"]
          outgoing_type: Database["public"]["Enums"]["data_type"]
          processor_type: Database["public"]["Enums"]["processor_type"]
          prompt: string
          user_id: string
        }
        Insert: {
          attribute: string
          created_at?: string
          entity_id: number
          id?: number
          incoming_type: Database["public"]["Enums"]["data_type"]
          outgoing_type: Database["public"]["Enums"]["data_type"]
          processor_type: Database["public"]["Enums"]["processor_type"]
          prompt: string
          user_id?: string
        }
        Update: {
          attribute?: string
          created_at?: string
          entity_id?: number
          id?: number
          incoming_type?: Database["public"]["Enums"]["data_type"]
          outgoing_type?: Database["public"]["Enums"]["data_type"]
          processor_type?: Database["public"]["Enums"]["processor_type"]
          prompt?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      block_type: "input" | "processor" | "output"
      data_type: "text" | "image" | "csv"
      input_type: "text" | "image" | "voice" | "pdf" | "csv" | "mcq" | "date"
      output_type: "text" | "image" | "sms" | "email" | "gsheet"
      processor_type: "text2text" | "text2image" | "image2text" | "ocr"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
