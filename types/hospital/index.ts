import { Database } from '@/lib/supabase/database.types'

export type Patients = Database['public']['Tables']['patients']['Row']
export type Owner = Database['public']['Tables']['owners']['Row']
export type Users = Database['public']['Tables']['users']['Row']
export type IcuChart = Database['public']['Tables']['icu_chart']['Row']
export type IcuIo = Database['public']['Tables']['icu_io']['Row']

// supabase.auth.getUser() 시 return되는 유져타입
export type User = {
  id: string
  app_metadata: {
    provider?: string
    [key: string]: any
  }
  user_metadata: {
    [key: string]: any
  }
  aud: string
  confirmation_sent_at?: string
  recovery_sent_at?: string
  email_change_sent_at?: string
  new_email?: string
  new_phone?: string
  invited_at?: string
  action_link?: string
  email?: string
  phone?: string
  created_at: string
  confirmed_at?: string
  email_confirmed_at?: string
  phone_confirmed_at?: string
  last_sign_in_at?: string
  role?: string
  updated_at?: string
  identities?: {
    id: string
    user_id: string
    identity_data?: {
      [key: string]: any
    }
    identity_id: string
    provider: string
    created_at?: string
    last_sign_in_at?: string
    updated_at?: string
  }[]
  is_anonymous?: boolean
  factors?: {
    id: string
    friendly_name?: string
    factor_type: 'totp' | string
    status: 'verified' | 'unverified'
    created_at: string
    updated_at: string
  }[]
}

export type IcuChartJoined = IcuChart & {
  patient_id: Patients
  icu_io_id: IcuIo
  main_vet: Users
  sub_vet: Users
}

export type Vets = {
  user_id: string
  name: string | null
  position: string | null
}
