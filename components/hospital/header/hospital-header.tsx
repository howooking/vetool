import HospitalSelector from '@/components/hospital/header/hospital-selector'
import { isSuperAccount } from '@/lib/services/auth/authorization'
import { getHosList } from '@/lib/services/hospital-home/get-hos-name'

export default async function HospitalHeader() {
  const hosList = await getHosList()
  const isSuper = await isSuperAccount()

  return (
    <header className="flex h-12 items-center border-b px-2">
      {isSuper && <HospitalSelector hosList={hosList} />}
    </header>
  )
}
