import { IcuOut, Patients } from '@/types'

export type OutDuePatientsData = IcuOut & {
  hos_id: string
  icu_io_id: string
  patient_id: string
  out_date: string | null
  patient: Pick<Patients, 'name' | 'breed' | 'species'>
}
