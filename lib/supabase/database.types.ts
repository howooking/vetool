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
      drug_doses: {
        Row: {
          bw_unit: string
          created_at: string
          cri_unit: string | null
          default_dose: string
          description: string | null
          does_id: string
          dose_unit: string
          drug_id: string | null
          max_dose: string | null
          min_dose: string | null
          route: string
          species: string
        }
        Insert: {
          bw_unit?: string
          created_at?: string
          cri_unit?: string | null
          default_dose?: string
          description?: string | null
          does_id?: string
          dose_unit?: string
          drug_id?: string | null
          max_dose?: string | null
          min_dose?: string | null
          route?: string
          species?: string
        }
        Update: {
          bw_unit?: string
          created_at?: string
          cri_unit?: string | null
          default_dose?: string
          description?: string | null
          does_id?: string
          dose_unit?: string
          drug_id?: string | null
          max_dose?: string | null
          min_dose?: string | null
          route?: string
          species?: string
        }
        Relationships: [
          {
            foreignKeyName: "drug_doses_drug_id_fkey"
            columns: ["drug_id"]
            isOneToOne: false
            referencedRelation: "drugs"
            referencedColumns: ["drug_id"]
          },
        ]
      }
      drug_products: {
        Row: {
          company: string | null
          created_at: string
          description: string | null
          drug_id: string | null
          drug_product_id: string
          hos_id: string | null
          mass_unit: string
          name: string
          price: string | null
          tag: string | null
          type: string
          unit: string
          volume: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          description?: string | null
          drug_id?: string | null
          drug_product_id?: string
          hos_id?: string | null
          mass_unit?: string
          name?: string
          price?: string | null
          tag?: string | null
          type?: string
          unit?: string
          volume?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          description?: string | null
          drug_id?: string | null
          drug_product_id?: string
          hos_id?: string | null
          mass_unit?: string
          name?: string
          price?: string | null
          tag?: string | null
          type?: string
          unit?: string
          volume?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drug_products_drug_id_fkey"
            columns: ["drug_id"]
            isOneToOne: false
            referencedRelation: "drugs"
            referencedColumns: ["drug_id"]
          },
          {
            foreignKeyName: "drug_products_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
        ]
      }
      drugs: {
        Row: {
          classification: string | null
          created_at: string
          description: string | null
          drug_id: string
          hos_id: string | null
          indication: string | null
          name: string | null
          side_effect: string | null
          tag: string | null
        }
        Insert: {
          classification?: string | null
          created_at?: string
          description?: string | null
          drug_id?: string
          hos_id?: string | null
          indication?: string | null
          name?: string | null
          side_effect?: string | null
          tag?: string | null
        }
        Update: {
          classification?: string | null
          created_at?: string
          description?: string | null
          drug_id?: string
          hos_id?: string | null
          indication?: string | null
          name?: string | null
          side_effect?: string | null
          tag?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "drugs_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
        ]
      }
      hospitals: {
        Row: {
          business_number: string
          city: string | null
          created_at: string
          district: string | null
          group_list: string[] | null
          hos_id: string
          is_personal: boolean | null
          master_user_id: string | null
          memo_list: string[] | null
          name: string | null
          plan: string | null
          position_list: string[] | null
        }
        Insert: {
          business_number?: string
          city?: string | null
          created_at?: string
          district?: string | null
          group_list?: string[] | null
          hos_id?: string
          is_personal?: boolean | null
          master_user_id?: string | null
          memo_list?: string[] | null
          name?: string | null
          plan?: string | null
          position_list?: string[] | null
        }
        Update: {
          business_number?: string
          city?: string | null
          created_at?: string
          district?: string | null
          group_list?: string[] | null
          hos_id?: string
          is_personal?: boolean | null
          master_user_id?: string | null
          memo_list?: string[] | null
          name?: string | null
          plan?: string | null
          position_list?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "hospitals_master_user_id_fkey"
            columns: ["master_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      patients: {
        Row: {
          birth: string | null
          breed: string
          created_at: string
          gender: string
          hos_id: string | null
          hos_owner_id: string | null
          hos_patient_id: string
          memo: string | null
          microchip_no: string | null
          name: string
          patient_id: string
          species: string
          state: string | null
        }
        Insert: {
          birth?: string | null
          breed?: string
          created_at?: string
          gender?: string
          hos_id?: string | null
          hos_owner_id?: string | null
          hos_patient_id?: string
          memo?: string | null
          microchip_no?: string | null
          name?: string
          patient_id?: string
          species?: string
          state?: string | null
        }
        Update: {
          birth?: string | null
          breed?: string
          created_at?: string
          gender?: string
          hos_id?: string | null
          hos_owner_id?: string | null
          hos_patient_id?: string
          memo?: string | null
          microchip_no?: string | null
          name?: string
          patient_id?: string
          species?: string
          state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          group: string[] | null
          hos_id: string | null
          is_active: boolean | null
          is_admin: boolean
          name: string | null
          position: string | null
          rank: number | null
          user_approved: boolean | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          group?: string[] | null
          hos_id?: string | null
          is_active?: boolean | null
          is_admin?: boolean
          name?: string | null
          position?: string | null
          rank?: number | null
          user_approved?: boolean | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          group?: string[] | null
          hos_id?: string | null
          is_active?: boolean | null
          is_admin?: boolean
          name?: string | null
          position?: string | null
          rank?: number | null
          user_approved?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      vitals: {
        Row: {
          blood_pressure: string | null
          body_weight: string | null
          created_at: string
          heart_rate: string | null
          patient_id: string | null
          respiratory_rate: string | null
          temperature: string | null
          vital_id: number
        }
        Insert: {
          blood_pressure?: string | null
          body_weight?: string | null
          created_at?: string
          heart_rate?: string | null
          patient_id?: string | null
          respiratory_rate?: string | null
          temperature?: string | null
          vital_id?: number
        }
        Update: {
          blood_pressure?: string | null
          body_weight?: string | null
          created_at?: string
          heart_rate?: string | null
          patient_id?: string | null
          respiratory_rate?: string | null
          temperature?: string | null
          vital_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "vitals_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_patient_data_when_register_patient: {
        Args: {
          hos_id_input: string
          hos_patient_id_input: string
          birth_input: string
          species_input: string
          breed_input: string
          gender_input: string
          name_input: string
          memo_input: string
          microchip_no_input: string
          body_weight_input: string
        }
        Returns: undefined
      }
      insert_user_data_when_create_hospital: {
        Args: {
          name_input: string
          city_input: string
          district_input: string
          business_number_input: string
        }
        Returns: string
      }
      update_user_hos_id_when_select_hospital: {
        Args: {
          hos_id_input: string
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
