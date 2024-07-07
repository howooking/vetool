import { PatientData } from '@/types/hospital/patients'
import IcuHeaderDateSelector from './date-picker/icu-header-date-selector'
import IcuRegisterDialog from './register-dialog/icu-register-dialog'
import { Owner, Vet } from '@/types/hospital'

export default function IcuHeader({
  hosId,
  patients,
  groupList,
  vets,
  ownersData,
}: {
  hosId: string
  patients: PatientData[]
  groupList: string[]
  vets: Vet[]
  ownersData: Owner[]
}) {
  return (
    <div className="absolute left-0 top-2 flex items-center gap-4 px-2">
      {/* <IcuRegisterDialog
        hosId={hosId}
        patients={patients}
        vets={vets}
        groupList={groupList}
        ownersData={ownersData}
      /> */}
      <IcuHeaderDateSelector />
    </div>
  )
}
