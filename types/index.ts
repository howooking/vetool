import { Database } from '@/lib/supabase/database.types'

export type Patients = Database['public']['Tables']['patients']['Row']
export type Owner = Database['public']['Tables']['owners']['Row']
export type User = Database['public']['Tables']['users']['Row']
export type IcuChart = Database['public']['Tables']['icu_chart']['Row']
export type IcuIo = Database['public']['Tables']['icu_io']['Row']
export type IcuChartTx = Database['public']['Tables']['icu_chart_tx']['Row']
export type Hospital = Database['public']['Tables']['hospitals']['Row']
export type IcuChartOrder =
  Database['public']['Tables']['icu_chart_order']['Row']
export type UserApproval = Database['public']['Tables']['user_approvals']['Row']
export type IcuChartBookmark =
  Database['public']['Tables']['icu_chart_bookmark']['Row']

// supabase.auth.getUser() 시 return되는 유져타입
export type AuthUser = {
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
