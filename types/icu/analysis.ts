import { IcuIo, Patients } from '@/types'

export type IcuAnalysisData = {
  icu_io: Pick<IcuIo, 'in_date' | 'out_date'>
  patient: Pick<Patients, 'name' | 'breed' | 'species'>
  main_vet: string
  sub_vet: string | null
  target_date: string
}
