import { IcuIo, Patients } from '@/types'
import { Vet } from '@/types/icu/chart'

export type IcuAnalysisData = {
  icu_io: Pick<IcuIo, 'in_date' | 'out_date' | 'group_list'>
  patient: Pick<Patients, 'name' | 'breed' | 'species'>
  main_vet: Pick<Vet, 'name'>
  sub_vet: Pick<Vet, 'name'>
  target_date: string
}
