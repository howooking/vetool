import { Database } from '@/lib/supabase/database.types'

export type Patients = Database['public']['Tables']['patients']['Row']
export type Owner = Database['public']['Tables']['owners']['Row']
export type Users = Database['public']['Tables']['users']['Row']
export type IcuChart = Database['public']['Tables']['icu_chart']['Row']
export type IcuIo = Database['public']['Tables']['icu_io']['Row']
export type IcuChartTx = Database['public']['Tables']['icu_chart_tx']['Row']
export type IcuChartOrder =
  Database['public']['Tables']['icu_chart_order']['Row']

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

type MainAndSubVet = {
  name: string
  user_id: string
  avatar_url: string
}

// !! join 했을 때 type overriding을 하기 위해서 omit 사용
export type IcuChartJoined = Omit<
  IcuChart,
  'main_vet' | 'sub_vet' | 'patient_id' | 'icu_io_id'
> & {
  patient_id: Patients
  icu_io_id: IcuIo
  main_vet: MainAndSubVet
  sub_vet: MainAndSubVet
}

export type IcuChartOrderJoined = Omit<
  IcuChartOrder,
  | 'icu_io_id'
  | 'icu_chart_order_tx_1'
  | 'icu_chart_order_tx_2'
  | 'icu_chart_order_tx_3'
  | 'icu_chart_order_tx_4'
  | 'icu_chart_order_tx_5'
  | 'icu_chart_order_tx_6'
  | 'icu_chart_order_tx_7'
  | 'icu_chart_order_tx_8'
  | 'icu_chart_order_tx_9'
  | 'icu_chart_order_tx_10'
  | 'icu_chart_order_tx_11'
  | 'icu_chart_order_tx_12'
  | 'icu_chart_order_tx_13'
  | 'icu_chart_order_tx_14'
  | 'icu_chart_order_tx_15'
  | 'icu_chart_order_tx_16'
  | 'icu_chart_order_tx_17'
  | 'icu_chart_order_tx_18'
  | 'icu_chart_order_tx_19'
  | 'icu_chart_order_tx_20'
  | 'icu_chart_order_tx_21'
  | 'icu_chart_order_tx_22'
  | 'icu_chart_order_tx_23'
  | 'icu_chart_order_tx_24'
> & {
  icu_io_id: IcuIo
  icu_chart_order_tx_1: IcuChartTx | null
  icu_chart_order_tx_2: IcuChartTx | null
  icu_chart_order_tx_3: IcuChartTx | null
  icu_chart_order_tx_4: IcuChartTx | null
  icu_chart_order_tx_5: IcuChartTx | null
  icu_chart_order_tx_6: IcuChartTx | null
  icu_chart_order_tx_7: IcuChartTx | null
  icu_chart_order_tx_8: IcuChartTx | null
  icu_chart_order_tx_9: IcuChartTx | null
  icu_chart_order_tx_10: IcuChartTx | null
  icu_chart_order_tx_11: IcuChartTx | null
  icu_chart_order_tx_12: IcuChartTx | null
  icu_chart_order_tx_13: IcuChartTx | null
  icu_chart_order_tx_14: IcuChartTx | null
  icu_chart_order_tx_15: IcuChartTx | null
  icu_chart_order_tx_16: IcuChartTx | null
  icu_chart_order_tx_17: IcuChartTx | null
  icu_chart_order_tx_18: IcuChartTx | null
  icu_chart_order_tx_19: IcuChartTx | null
  icu_chart_order_tx_20: IcuChartTx | null
  icu_chart_order_tx_21: IcuChartTx | null
  icu_chart_order_tx_22: IcuChartTx | null
  icu_chart_order_tx_23: IcuChartTx | null
  icu_chart_order_tx_24: IcuChartTx | null
}

export type IcuIoPatientsJoined = IcuIo & {
  patient_id: {
    name: string
    breed: string
    patient_id: string
  }
}

export type Vet = {
  user_id: string
  name: string | null
  position: string | null
}
