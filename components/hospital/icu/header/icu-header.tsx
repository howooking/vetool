import type { Owner, Vet } from '@/types'
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
  vetsData: Vet[]
  ownersData: Owner[]
}) {
  return (
    <div className="absolute left-0 top-2 z-10 flex items-center gap-4 px-2">
      <IcuRegisterDialog
        hosId={hosId}
        patientsData={patientsData}
        vetsData={vetsData}
        groupList={groupList}
        ownersData={ownersData}
      />
      <IcuHeaderDateSelector />
    </div>
  )
}
