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
          city: string
          created_at: string
          district: string
          group_list: string[]
          hos_id: string
          is_personal: boolean
          master_user_id: string
          memo_list: string[]
          name: string
          plan: string
        }
        Insert: {
          business_number?: string
          city: string
          created_at?: string
          district: string
          group_list?: string[]
          hos_id?: string
          is_personal?: boolean
          master_user_id: string
          memo_list?: string[]
          name: string
          plan?: string
        }
        Update: {
          business_number?: string
          city?: string
          created_at?: string
          district?: string
          group_list?: string[]
          hos_id?: string
          is_personal?: boolean
          master_user_id?: string
          memo_list?: string[]
          name?: string
          plan?: string
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
      icu_chart: {
        Row: {
          caution: string | null
          created_at: string
          hos_id: string
          icu_chart_id: string
          icu_io_id: string | null
          main_vet: string
          memo_a: string | null
          memo_b: string | null
          memo_c: string | null
          patient_id: string
          sub_vet: string | null
          target_date: string | null
          weight: string | null
          weight_measured_date: string | null
        }
        Insert: {
          caution?: string | null
          created_at?: string
          hos_id: string
          icu_chart_id?: string
          icu_io_id?: string | null
          main_vet: string
          memo_a?: string | null
          memo_b?: string | null
          memo_c?: string | null
          patient_id: string
          sub_vet?: string | null
          target_date?: string | null
          weight?: string | null
          weight_measured_date?: string | null
        }
        Update: {
          caution?: string | null
          created_at?: string
          hos_id?: string
          icu_chart_id?: string
          icu_io_id?: string | null
          main_vet?: string
          memo_a?: string | null
          memo_b?: string | null
          memo_c?: string | null
          patient_id?: string
          sub_vet?: string | null
          target_date?: string | null
          weight?: string | null
          weight_measured_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "icu_chart_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "icu_chart_icu_io_id_fkey"
            columns: ["icu_io_id"]
            isOneToOne: false
            referencedRelation: "icu_io"
            referencedColumns: ["icu_io_id"]
          },
          {
            foreignKeyName: "icu_chart_main_vet_fkey"
            columns: ["main_vet"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "icu_chart_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
          {
            foreignKeyName: "icu_chart_sub_vet_fkey"
            columns: ["sub_vet"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      icu_chart_order: {
        Row: {
          created_at: string
          icu_chart_id: string | null
          icu_chart_order_comment: string | null
          icu_chart_order_id: string
          icu_chart_order_log: string[] | null
          icu_chart_order_name: string | null
          icu_chart_order_time: string[]
          icu_chart_order_tx_1: string | null
          icu_chart_order_tx_10: string | null
          icu_chart_order_tx_11: string | null
          icu_chart_order_tx_12: string | null
          icu_chart_order_tx_13: string | null
          icu_chart_order_tx_14: string | null
          icu_chart_order_tx_15: string | null
          icu_chart_order_tx_16: string | null
          icu_chart_order_tx_17: string | null
          icu_chart_order_tx_18: string | null
          icu_chart_order_tx_19: string | null
          icu_chart_order_tx_2: string | null
          icu_chart_order_tx_20: string | null
          icu_chart_order_tx_21: string | null
          icu_chart_order_tx_22: string | null
          icu_chart_order_tx_23: string | null
          icu_chart_order_tx_24: string | null
          icu_chart_order_tx_3: string | null
          icu_chart_order_tx_4: string | null
          icu_chart_order_tx_5: string | null
          icu_chart_order_tx_6: string | null
          icu_chart_order_tx_7: string | null
          icu_chart_order_tx_8: string | null
          icu_chart_order_tx_9: string | null
          icu_chart_order_type: string | null
          icu_io_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          icu_chart_id?: string | null
          icu_chart_order_comment?: string | null
          icu_chart_order_id?: string
          icu_chart_order_log?: string[] | null
          icu_chart_order_name?: string | null
          icu_chart_order_time?: string[]
          icu_chart_order_tx_1?: string | null
          icu_chart_order_tx_10?: string | null
          icu_chart_order_tx_11?: string | null
          icu_chart_order_tx_12?: string | null
          icu_chart_order_tx_13?: string | null
          icu_chart_order_tx_14?: string | null
          icu_chart_order_tx_15?: string | null
          icu_chart_order_tx_16?: string | null
          icu_chart_order_tx_17?: string | null
          icu_chart_order_tx_18?: string | null
          icu_chart_order_tx_19?: string | null
          icu_chart_order_tx_2?: string | null
          icu_chart_order_tx_20?: string | null
          icu_chart_order_tx_21?: string | null
          icu_chart_order_tx_22?: string | null
          icu_chart_order_tx_23?: string | null
          icu_chart_order_tx_24?: string | null
          icu_chart_order_tx_3?: string | null
          icu_chart_order_tx_4?: string | null
          icu_chart_order_tx_5?: string | null
          icu_chart_order_tx_6?: string | null
          icu_chart_order_tx_7?: string | null
          icu_chart_order_tx_8?: string | null
          icu_chart_order_tx_9?: string | null
          icu_chart_order_type?: string | null
          icu_io_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          icu_chart_id?: string | null
          icu_chart_order_comment?: string | null
          icu_chart_order_id?: string
          icu_chart_order_log?: string[] | null
          icu_chart_order_name?: string | null
          icu_chart_order_time?: string[]
          icu_chart_order_tx_1?: string | null
          icu_chart_order_tx_10?: string | null
          icu_chart_order_tx_11?: string | null
          icu_chart_order_tx_12?: string | null
          icu_chart_order_tx_13?: string | null
          icu_chart_order_tx_14?: string | null
          icu_chart_order_tx_15?: string | null
          icu_chart_order_tx_16?: string | null
          icu_chart_order_tx_17?: string | null
          icu_chart_order_tx_18?: string | null
          icu_chart_order_tx_19?: string | null
          icu_chart_order_tx_2?: string | null
          icu_chart_order_tx_20?: string | null
          icu_chart_order_tx_21?: string | null
          icu_chart_order_tx_22?: string | null
          icu_chart_order_tx_23?: string | null
          icu_chart_order_tx_24?: string | null
          icu_chart_order_tx_3?: string | null
          icu_chart_order_tx_4?: string | null
          icu_chart_order_tx_5?: string | null
          icu_chart_order_tx_6?: string | null
          icu_chart_order_tx_7?: string | null
          icu_chart_order_tx_8?: string | null
          icu_chart_order_tx_9?: string | null
          icu_chart_order_type?: string | null
          icu_io_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "icu_chart_order_icu_chart_id_fkey"
            columns: ["icu_chart_id"]
            isOneToOne: false
            referencedRelation: "icu_chart"
            referencedColumns: ["icu_chart_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_1_fkey"
            columns: ["icu_chart_order_tx_1"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_10_fkey"
            columns: ["icu_chart_order_tx_10"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_11_fkey"
            columns: ["icu_chart_order_tx_11"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_12_fkey"
            columns: ["icu_chart_order_tx_12"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_13_fkey"
            columns: ["icu_chart_order_tx_13"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_14_fkey"
            columns: ["icu_chart_order_tx_14"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_15_fkey"
            columns: ["icu_chart_order_tx_15"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_16_fkey"
            columns: ["icu_chart_order_tx_16"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_17_fkey"
            columns: ["icu_chart_order_tx_17"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_18_fkey"
            columns: ["icu_chart_order_tx_18"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_19_fkey"
            columns: ["icu_chart_order_tx_19"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_2_fkey"
            columns: ["icu_chart_order_tx_2"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_20_fkey"
            columns: ["icu_chart_order_tx_20"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_21_fkey"
            columns: ["icu_chart_order_tx_21"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_22_fkey"
            columns: ["icu_chart_order_tx_22"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_23_fkey"
            columns: ["icu_chart_order_tx_23"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_24_fkey"
            columns: ["icu_chart_order_tx_24"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_3_fkey"
            columns: ["icu_chart_order_tx_3"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_4_fkey"
            columns: ["icu_chart_order_tx_4"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_5_fkey"
            columns: ["icu_chart_order_tx_5"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_6_fkey"
            columns: ["icu_chart_order_tx_6"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_7_fkey"
            columns: ["icu_chart_order_tx_7"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_8_fkey"
            columns: ["icu_chart_order_tx_8"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_chart_order_tx_9_fkey"
            columns: ["icu_chart_order_tx_9"]
            isOneToOne: false
            referencedRelation: "icu_chart_tx"
            referencedColumns: ["icu_chart_tx_id"]
          },
          {
            foreignKeyName: "icu_chart_order_icu_io_id_fkey"
            columns: ["icu_io_id"]
            isOneToOne: false
            referencedRelation: "icu_io"
            referencedColumns: ["icu_io_id"]
          },
        ]
      }
      icu_chart_tx: {
        Row: {
          created_at: string
          icu_chart_order_id: string | null
          icu_chart_tx_comment: string | null
          icu_chart_tx_id: string
          icu_chart_tx_images: string[] | null
          icu_chart_tx_log: string[] | null
          icu_chart_tx_result: string | null
          icu_io_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          icu_chart_order_id?: string | null
          icu_chart_tx_comment?: string | null
          icu_chart_tx_id?: string
          icu_chart_tx_images?: string[] | null
          icu_chart_tx_log?: string[] | null
          icu_chart_tx_result?: string | null
          icu_io_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          icu_chart_order_id?: string | null
          icu_chart_tx_comment?: string | null
          icu_chart_tx_id?: string
          icu_chart_tx_images?: string[] | null
          icu_chart_tx_log?: string[] | null
          icu_chart_tx_result?: string | null
          icu_io_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "icu_chart_tx_icu_chart_order_id_fkey"
            columns: ["icu_chart_order_id"]
            isOneToOne: false
            referencedRelation: "icu_chart_order"
            referencedColumns: ["icu_chart_order_id"]
          },
          {
            foreignKeyName: "icu_chart_tx_icu_io_id_fkey"
            columns: ["icu_io_id"]
            isOneToOne: false
            referencedRelation: "icu_io"
            referencedColumns: ["icu_io_id"]
          },
        ]
      }
      icu_io: {
        Row: {
          age_in_days: number | null
          cc: string | null
          created_at: string
          dx: string | null
          group_list: string[] | null
          hos_id: string | null
          icu_io_id: string
          in_date: string
          out_date: string | null
          out_due_date: string | null
          patient_id: string
        }
        Insert: {
          age_in_days?: number | null
          cc?: string | null
          created_at?: string
          dx?: string | null
          group_list?: string[] | null
          hos_id?: string | null
          icu_io_id?: string
          in_date: string
          out_date?: string | null
          out_due_date?: string | null
          patient_id: string
        }
        Update: {
          age_in_days?: number | null
          cc?: string | null
          created_at?: string
          dx?: string | null
          group_list?: string[] | null
          hos_id?: string | null
          icu_io_id?: string
          in_date?: string
          out_date?: string | null
          out_due_date?: string | null
          patient_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "icu_io_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "icu_io_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["patient_id"]
          },
        ]
      }
      owners: {
        Row: {
          created_at: string
          hos_id: string
          hos_owner_id: string
          owner_address: string | null
          owner_id: string
          owner_level: Database["public"]["Enums"]["owner_level_enum"]
          owner_memo: string | null
          owner_name: string
          owner_phone_number: string | null
        }
        Insert: {
          created_at?: string
          hos_id: string
          hos_owner_id: string
          owner_address?: string | null
          owner_id?: string
          owner_level?: Database["public"]["Enums"]["owner_level_enum"]
          owner_memo?: string | null
          owner_name?: string
          owner_phone_number?: string | null
        }
        Update: {
          created_at?: string
          hos_id?: string
          hos_owner_id?: string
          owner_address?: string | null
          owner_id?: string
          owner_level?: Database["public"]["Enums"]["owner_level_enum"]
          owner_memo?: string | null
          owner_name?: string
          owner_phone_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "owners_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
        ]
      }
      patients: {
        Row: {
          birth: string
          breed: string
          created_at: string
          gender: Database["public"]["Enums"]["patient_gender"]
          hos_id: string
          hos_patient_id: string
          is_alive: boolean
          memo: string | null
          microchip_no: string | null
          name: string
          owner_id: string
          patient_id: string
          species: Database["public"]["Enums"]["patient_species"]
        }
        Insert: {
          birth: string
          breed: string
          created_at?: string
          gender: Database["public"]["Enums"]["patient_gender"]
          hos_id: string
          hos_patient_id?: string
          is_alive?: boolean
          memo?: string | null
          microchip_no?: string | null
          name?: string
          owner_id: string
          patient_id?: string
          species: Database["public"]["Enums"]["patient_species"]
        }
        Update: {
          birth?: string
          breed?: string
          created_at?: string
          gender?: Database["public"]["Enums"]["patient_gender"]
          hos_id?: string
          hos_patient_id?: string
          is_alive?: boolean
          memo?: string | null
          microchip_no?: string | null
          name?: string
          owner_id?: string
          patient_id?: string
          species?: Database["public"]["Enums"]["patient_species"]
        }
        Relationships: [
          {
            foreignKeyName: "patients_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "patients_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["owner_id"]
          },
        ]
      }
      user_approvals: {
        Row: {
          created_at: string
          hos_id: string | null
          is_approved: boolean
          updated_at: string | null
          user_approval_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          hos_id?: string | null
          is_approved?: boolean
          updated_at?: string | null
          user_approval_id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          hos_id?: string | null
          is_approved?: boolean
          updated_at?: string | null
          user_approval_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_approval_hos_id_fkey"
            columns: ["hos_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["hos_id"]
          },
          {
            foreignKeyName: "user_approval_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
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
          is_vet: boolean
          name: string | null
          position: string | null
          rank: number | null
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
          is_vet?: boolean
          name?: string | null
          position?: string | null
          rank?: number | null
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
          is_vet?: boolean
          name?: string | null
          position?: string | null
          rank?: number | null
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
      get_icu_patient_data_with_due: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      insert_icu_io_and_icu_chart_when_register_icu_patient: {
        Args: {
          hos_id_input: string
          patient_id_input: string
          dx_input: string
          cc_input: string
          in_date_input: string
          out_due_date_input: string
          main_vet_input: string
          sub_vet_input: string
          group_list_input: Json
          age_in_days_input: number
        }
        Returns: string
      }
      insert_icu_tx_data_with_icu_order: {
        Args: {
          order_id_input: string
          io_id_input: string
          result_input: string
          comment_input: string
          images_input: string
          log_input: string
          time_input: number
        }
        Returns: undefined
      }
      insert_patient_with_selected_owner: {
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
          owner_id_input: string
          body_weight_input: string
        }
        Returns: string
      }
      insert_patient_without_selected_owner: {
        Args: {
          hos_id_input: string
          owner_name_input: string
          owner_address_input: string
          owner_phone_number_input: string
          owner_memo_input: string
          hos_owner_id_input: string
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
        Returns: string
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
      update_icu_chart_with_vitals: {
        Args: {
          patient_id_input: string
          weight_input: string
          target_date_input: string
        }
        Returns: undefined
      }
      update_user_approval_and_user_hos_id_when_approved: {
        Args: {
          hos_id_input: string
          user_id_input: string
        }
        Returns: undefined
      }
      update_user_info_when_creating_new_hospital: {
        Args: {
          hos_name_input: string
          city_input: string
          district_input: string
          business_number_input: string
          user_name_input: string
          is_vet_input: boolean
        }
        Returns: string
      }
      update_user_info_when_sending_approval: {
        Args: {
          name_input: string
          is_vet_input: boolean
          hos_id_input: string
        }
        Returns: undefined
      }
    }
    Enums: {
      owner_level_enum: "S" | "A" | "B" | "C"
      patient_gender: "cm" | "sf" | "im" | "if" | "un"
      patient_species: "canine" | "feline"
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
