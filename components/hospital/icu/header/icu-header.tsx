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
  groupList: string[] | null
  vets: Vet[]
  ownersData: Owner[]
}) {
  return (
    <div className="absolute left-0 top-2 flex items-center gap-8 px-4">
      <IcuHeaderDateSelector />
      <IcuRegisterDialog
        hosId={hosId}
        patients={patients}
        vets={vets}
        groupList={groupList}
        ownersData={ownersData}
      />
    </div>
  )
}
