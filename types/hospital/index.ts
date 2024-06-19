import { Database } from '@/lib/supabase/database.types'

export type Patients = Database['public']['Tables']['patients']['Row']
export type Users = Database['public']['Tables']['users']['Row']
