import IcuHeaderDateSelector from '@/components/hospital/icu/header/date-picker/header-date-selector'
import RegisterDialog from './register-dialog/register-dialog'
import type { PatientData } from '@/types/patients'
import type { Vet } from '@/types/icu/chart'
import RefreshButton from './refresh-button'

export default async function IcuHeader({
  hosId,
  patientsData,
  vetsData,
  groupList,
}: {
  hosId: string
  patientsData: PatientData[]
  vetsData: Vet[]
  groupList: string[]
}) {
  return (
    <div className="absolute top-2 z-10 flex w-full items-center justify-center gap-2 px-2 md:left-0 md:w-auto md:justify-start">
      <RefreshButton />

      <RegisterDialog
        hosId={hosId}
        patientsData={patientsData}
        vetsData={vetsData}
        groupList={groupList}
      />
      <IcuHeaderDateSelector />
    </div>
  )
}
