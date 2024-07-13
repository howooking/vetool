import { getIcuHeaderData } from '@/lib/services/icu/get-icu-header-data'
import IcuHeaderDateSelector from './date-picker/icu-header-date-selector'
import IcuRegisterDialog from './register-dialog/icu-register-dialog'

export default async function IcuHeader({ hosId }: { hosId: string }) {
  const { hosGroupList, patientsData, vetsData } = await getIcuHeaderData(hosId)

  return (
    <div className="absolute left-0 top-2 z-10 flex items-center gap-4 px-2">
      <IcuRegisterDialog
        hosId={hosId}
        patientsData={patientsData}
        vetsData={vetsData}
        groupList={hosGroupList}
      />
      <IcuHeaderDateSelector />
    </div>
  )
}
