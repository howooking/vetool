import HospitalUsersButton from '@/components/hospital/header/hospital-users-button'
import NavigateHospitalSelects from '@/components/hospital/header/navigate-hospital-selects'
import type { HosListData } from '@/types/hospital'

export default async function HospitalHeader({
  isSuperAccount,
  hosList,
}: {
  isSuperAccount: boolean
  hosList: HosListData[]
}) {
  if (!isSuperAccount) return <header className="h-12 border-b" />

  return (
    <header className="cursor-disabled absolute left-0 top-0 flex h-12 w-full items-center justify-between border-b px-2">
      <NavigateHospitalSelects hosList={hosList} />

      <HospitalUsersButton />
    </header>
  )
}
