import IcuHeaderDateSelector from '@/components/hospital/icu/header/date-picker/header-date-selector'
import RegisterDialog from '@/components/hospital/icu/header/register-dialog/register-dialog'
import { getIcuHeaderData } from '@/lib/services/icu/get-icu-header-data'

export default async function IcuHeader({ hosId }: { hosId: string }) {
  const { hosGroupList, patientsData, vetsData } = await getIcuHeaderData(hosId)

  return (
    <div className="absolute left-0 top-2 z-10 flex items-center gap-4 px-2">
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
