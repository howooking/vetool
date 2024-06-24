import { Database } from '@/lib/supabase/database.types'

export type Patients = Database['public']['Tables']['patients']['Row']
export type Users = Database['public']['Tables']['users']['Row']
export type IcuChart = Database['public']['Tables']['icu_chart']['Row']
export type IcuIo = Database['public']['Tables']['icu_io']['Row']

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
