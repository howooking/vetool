import IcuHeaderDateSelector from '@/components/hospital/icu/header/date-picker/header-date-selector'
import type { Vet } from '@/types/icu/chart'
import type { PatientData } from '@/types/patients'
import RegisterDialog from './register-dialog/register-dialog'

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
    <div className="absolute top-1.5 z-10 flex w-full items-center justify-center gap-2 bg-white px-2 md:left-0 md:w-auto md:justify-start">
      {/* <InstructionDialog /> */}

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
