import IcuHeaderDateSelector from '@/components/hospital/icu/header/date-picker/header-date-selector'
import { getIcuHeaderData } from '@/lib/services/icu/get-icu-header-data'
import RegisterDialog from './register-dialog/register-dialog'

export default async function IcuHeader({ hosId }: { hosId: string }) {
  const { hosGroupList, patientsData, vetsData } = await getIcuHeaderData(hosId)

  return (
    <div className="absolute top-2 z-10 flex w-full items-center justify-center gap-4 px-2 md:left-0 md:w-auto md:justify-start">
      <RegisterDialog
        hosId={hosId}
        patientsData={patientsData}
        vetsData={vetsData}
        groupList={hosGroupList}
      />
      <IcuHeaderDateSelector />
    </div>
  )
}
