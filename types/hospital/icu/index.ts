import { Patients } from '@/types/hospital'

export type IcuDialogProps = {
  hosId: string
  patients: Patients[]
  groupList: string[] | null
  vets: {
    name: string | null
    position: string | null
    user_id: string
  }[]
}
