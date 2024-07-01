import { IcuIo, Owner, Vets } from '@/types/hospital'
import { Dispatch, SetStateAction } from 'react'
import { PatientData } from '../patients'

export type IcuDialogProps = {
  hosId: string
  patients: PatientData[]
  groupList: string[] | null
  vets: Vets[]
  icuIoId: string
  ownerData: Owner[]
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}
