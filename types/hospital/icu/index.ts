import { Patients, Vets } from '@/types/hospital'

export type IcuDialogProps = {
  hosId: string
  patients: Patients[]
  groupList: string[] | null
  vets: Vets[]
  icuIoId?: string
}
