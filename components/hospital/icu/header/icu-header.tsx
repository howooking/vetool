import type { Owner } from '@/types'
import type { IcuVetList } from '@/types/icu'
import { PatientData } from '@/types/patients'
import IcuHeaderDateSelector from './date-picker/icu-header-date-selector'
import IcuRegisterDialog from './register-dialog/icu-register-dialog'

export default function IcuHeader({
  hosId,
  patientsData,
  groupList,
  vetsData,
  ownersData,
}: {
  hosId: string
  patientsData: PatientData[]
  groupList: string[]
  vetsData: IcuVetList[]
  ownersData: Owner[]
}) {
  return (
    <div className="absolute left-0 top-2 z-10 flex items-center gap-4 px-2">
      <IcuRegisterDialog
        hosId={hosId}
        patientsData={patientsData}
        vetsData={vetsData}
        groupList={groupList}
      />
      <IcuHeaderDateSelector />
    </div>
  )
}
